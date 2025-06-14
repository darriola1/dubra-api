-- CreateTable
CREATE TABLE `empresa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_fantasia` VARCHAR(191) NOT NULL,
    `razon_social` VARCHAR(191) NOT NULL,
    `RUT` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Empresa_nombre_fantasia_key`(`nombre_fantasia`),
    UNIQUE INDEX `Empresa_razon_social_key`(`razon_social`),
    UNIQUE INDEX `Empresa_RUT_key`(`RUT`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,
    `pickupAddress` VARCHAR(191) NOT NULL,
    `dropoffAddress` VARCHAR(191) NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `status` ENUM('pendiente', 'en_camino', 'entregado', 'cancelado') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Order_usuarioId_fkey`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `empresaId` INTEGER NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    INDEX `Usuario_empresaId_fkey`(`empresaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `Order_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `Usuario_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
