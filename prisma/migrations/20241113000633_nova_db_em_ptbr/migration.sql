/*
  Warnings:

  - You are about to drop the column `copiaLivroId` on the `emprestimos` table. All the data in the column will be lost.
  - You are about to drop the column `totalCopias` on the `livros` table. All the data in the column will be lost.
  - You are about to drop the column `nivel` on the `permissoes` table. All the data in the column will be lost.
  - You are about to drop the `_emprestimotolivro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `copias_livro` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `livroId` to the `emprestimos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `criadoPor` to the `livros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalExemplares` to the `livros` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_emprestimotolivro` DROP FOREIGN KEY `_EmprestimoToLivro_A_fkey`;

-- DropForeignKey
ALTER TABLE `_emprestimotolivro` DROP FOREIGN KEY `_EmprestimoToLivro_B_fkey`;

-- DropForeignKey
ALTER TABLE `copias_livro` DROP FOREIGN KEY `copias_livro_livroId_fkey`;

-- DropForeignKey
ALTER TABLE `emprestimos` DROP FOREIGN KEY `emprestimos_copiaLivroId_fkey`;

-- AlterTable
ALTER TABLE `emprestimos` DROP COLUMN `copiaLivroId`,
    ADD COLUMN `livroId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `livros` DROP COLUMN `totalCopias`,
    ADD COLUMN `criadoPor` VARCHAR(191) NOT NULL,
    ADD COLUMN `totalExemplares` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `permissoes` DROP COLUMN `nivel`;

-- DropTable
DROP TABLE `_emprestimotolivro`;

-- DropTable
DROP TABLE `copias_livro`;

-- CreateTable
CREATE TABLE `historico_multas` (
    `id` VARCHAR(191) NOT NULL,
    `emprestimoId` VARCHAR(191) NOT NULL,
    `valorMulta` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_HistoricoMultasToUsuario` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_HistoricoMultasToUsuario_AB_unique`(`A`, `B`),
    INDEX `_HistoricoMultasToUsuario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `emprestimos` ADD CONSTRAINT `emprestimos_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `livros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `historico_multas` ADD CONSTRAINT `historico_multas_emprestimoId_fkey` FOREIGN KEY (`emprestimoId`) REFERENCES `emprestimos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HistoricoMultasToUsuario` ADD CONSTRAINT `_HistoricoMultasToUsuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `historico_multas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HistoricoMultasToUsuario` ADD CONSTRAINT `_HistoricoMultasToUsuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
