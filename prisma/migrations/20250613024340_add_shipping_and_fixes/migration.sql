/*
  Warnings:

  - You are about to drop the column `descripcion` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `dropoffAddress` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `pickupAddress` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_empresaId_fkey`;

-- DropIndex
DROP INDEX `Order_usuarioId_fkey` ON `order`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `descripcion`,
    DROP COLUMN `dropoffAddress`,
    DROP COLUMN `pickupAddress`,
    DROP COLUMN `status`,
    DROP COLUMN `usuarioId`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `usuario`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `customerId` INTEGER NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    INDEX `User_customerId_fkey`(`customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shipping` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `fromAddress` VARCHAR(191) NOT NULL,
    `toAddress` VARCHAR(191) NOT NULL,
    `contactName` VARCHAR(191) NULL,
    `contactPhone` VARCHAR(191) NULL,
    `trackingId` VARCHAR(191) NOT NULL,
    `carrier` VARCHAR(191) NOT NULL,
    `status` ENUM('pendiente', 'en_camino', 'entregado', 'cancelado') NOT NULL,
    `sequence` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Shipping_trackingId_key`(`trackingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShippingStatusHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `status` ENUM('pendiente', 'en_camino', 'entregado', 'cancelado') NOT NULL,
    `changedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Order_userId_fkey` ON `Order`(`userId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `Usuario_empresaId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Empresa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_usuarioId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shipping` ADD CONSTRAINT `Shipping_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShippingStatusHistory` ADD CONSTRAINT `ShippingStatusHistory_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
