-- CreateTable
CREATE TABLE `sub_permissoes` (
    `id` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissoes_relacao` (
    `id` VARCHAR(191) NOT NULL,
    `permissaoId` VARCHAR(191) NOT NULL,
    `subPermissaoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `permissoes_relacao` ADD CONSTRAINT `permissoes_relacao_permissaoId_fkey` FOREIGN KEY (`permissaoId`) REFERENCES `permissoes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `permissoes_relacao` ADD CONSTRAINT `permissoes_relacao_subPermissaoId_fkey` FOREIGN KEY (`subPermissaoId`) REFERENCES `sub_permissoes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
