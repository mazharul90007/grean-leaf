/*
  Warnings:

  - You are about to drop the column `appointtmentId` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appointmentId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appointmentId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_appointtmentId_fkey";

-- DropIndex
DROP INDEX "public"."Payment_appointtmentId_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "appointtmentId",
ADD COLUMN     "appointmentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_appointmentId_key" ON "Payment"("appointmentId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appoinments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
