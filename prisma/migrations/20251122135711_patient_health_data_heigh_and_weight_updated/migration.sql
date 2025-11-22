/*
  Warnings:

  - Changed the type of `height` on the `patientHealthData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `weight` on the `patientHealthData` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "patientHealthData" DROP COLUMN "height",
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
DROP COLUMN "weight",
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;
