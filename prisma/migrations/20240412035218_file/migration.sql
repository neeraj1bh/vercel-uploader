/*
  Warnings:

  - You are about to drop the column `filename` on the `Filename` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[file]` on the table `Filename` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `file` to the `Filename` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Filename" DROP COLUMN "filename",
ADD COLUMN     "file" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Filename_file_key" ON "Filename"("file");
