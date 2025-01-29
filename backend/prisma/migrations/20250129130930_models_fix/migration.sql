/*
  Warnings:

  - You are about to drop the column `popular` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Item` table. All the data in the column will be lost.
  - Made the column `amount` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "popular",
ADD COLUMN     "popularity" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "orderId",
ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "amount" SET DEFAULT 0;
