-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `empresaId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Empresa` (
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

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
