/*
  Warnings:

  - You are about to drop the column `titlt` on the `jobs` table. All the data in the column will be lost.
  - Added the required column `title` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "titlt",
ADD COLUMN     "title" TEXT NOT NULL;
