/*
  Warnings:

  - A unique constraint covering the columns `[isbn]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isbn` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPages` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` ADD COLUMN `edition` INTEGER NULL,
    ADD COLUMN `isbn` VARCHAR(191) NOT NULL,
    ADD COLUMN `totalPages` INTEGER NOT NULL,
    ADD COLUMN `volume` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `books_isbn_key` ON `books`(`isbn`);
