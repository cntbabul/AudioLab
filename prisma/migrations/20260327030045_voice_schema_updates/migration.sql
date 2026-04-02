/*
  Warnings:

  - You are about to drop the column `model` on the `Voice` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Voice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Voice" DROP COLUMN "model",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
