/*
  Warnings:

  - You are about to drop the `_booktoloan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `book_copies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `books` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `loans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_booktoloan` DROP FOREIGN KEY `_BookToLoan_A_fkey`;

-- DropForeignKey
ALTER TABLE `_booktoloan` DROP FOREIGN KEY `_BookToLoan_B_fkey`;

-- DropForeignKey
ALTER TABLE `book_copies` DROP FOREIGN KEY `book_copies_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `loans` DROP FOREIGN KEY `loans_bookCopyId_fkey`;

-- DropForeignKey
ALTER TABLE `loans` DROP FOREIGN KEY `loans_userId_fkey`;

-- DropForeignKey
ALTER TABLE `permissions_users` DROP FOREIGN KEY `permissions_users_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `permissions_users` DROP FOREIGN KEY `permissions_users_userId_fkey`;

-- DropTable
DROP TABLE `_booktoloan`;

-- DropTable
DROP TABLE `book_copies`;

-- DropTable
DROP TABLE `books`;

-- DropTable
DROP TABLE `loans`;

-- DropTable
DROP TABLE `permissions`;

-- DropTable
DROP TABLE `permissions_users`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `livros` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `autor` VARCHAR(191) NOT NULL,
    `ano` INTEGER NOT NULL,
    `edicao` INTEGER NULL,
    `editora` VARCHAR(191) NOT NULL,
    `volume` INTEGER NULL,
    `isbn` VARCHAR(191) NOT NULL,
    `totalPaginas` INTEGER NOT NULL,
    `totalCopias` INTEGER NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `livros_isbn_key`(`isbn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `copias_livro` (
    `id` VARCHAR(191) NOT NULL,
    `livroId` VARCHAR(191) NOT NULL,
    `disponivel` BOOLEAN NOT NULL DEFAULT true,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    UNIQUE INDEX `usuarios_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emprestimos` (
    `id` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `copiaLivroId` VARCHAR(191) NOT NULL,
    `dataEmprestimo` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataDevolucao` DATETIME(3) NULL,
    `dataDevolucaoPrevista` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'emprestado',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissoes` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `nivel` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `permissoes_titulo_key`(`titulo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissoes_usuarios` (
    `usuarioId` VARCHAR(191) NOT NULL,
    `permissaoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`usuarioId`, `permissaoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmprestimoToLivro` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_EmprestimoToLivro_AB_unique`(`A`, `B`),
    INDEX `_EmprestimoToLivro_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `copias_livro` ADD CONSTRAINT `copias_livro_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `livros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `emprestimos` ADD CONSTRAINT `emprestimos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `emprestimos` ADD CONSTRAINT `emprestimos_copiaLivroId_fkey` FOREIGN KEY (`copiaLivroId`) REFERENCES `copias_livro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permissoes_usuarios` ADD CONSTRAINT `permissoes_usuarios_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permissoes_usuarios` ADD CONSTRAINT `permissoes_usuarios_permissaoId_fkey` FOREIGN KEY (`permissaoId`) REFERENCES `permissoes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmprestimoToLivro` ADD CONSTRAINT `_EmprestimoToLivro_A_fkey` FOREIGN KEY (`A`) REFERENCES `emprestimos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmprestimoToLivro` ADD CONSTRAINT `_EmprestimoToLivro_B_fkey` FOREIGN KEY (`B`) REFERENCES `livros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
