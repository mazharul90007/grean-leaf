/*
  Warnings:

  - Made the column `averageRating` on table `doctors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "doctors" ALTER COLUMN "averageRating" SET NOT NULL,
ALTER COLUMN "averageRating" SET DEFAULT 0.0;
