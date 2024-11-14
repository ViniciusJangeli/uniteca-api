/*
  Warnings:

  - You are about to drop the column `criadoPor` on the `livros` table. All the data in the column will be lost.
  - Added the required column `criadoPorId` to the `livros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `livros` DROP COLUMN `criadoPor`,
    ADD COLUMN `criadoPorId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `_UsuarioLivro` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_UsuarioLivro_AB_unique`(`A`, `B`),
    INDEX `_UsuarioLivro_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `livros` ADD CONSTRAINT `livros_criadoPorId_fkey` FOREIGN KEY (`criadoPorId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UsuarioLivro` ADD CONSTRAINT `_UsuarioLivro_A_fkey` FOREIGN KEY (`A`) REFERENCES `livros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UsuarioLivro` ADD CONSTRAINT `_UsuarioLivro_B_fkey` FOREIGN KEY (`B`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
