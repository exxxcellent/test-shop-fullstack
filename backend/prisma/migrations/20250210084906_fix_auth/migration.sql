/*
  Warnings:

  - You are about to drop the column `isActivated` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isActivated",
DROP COLUMN "password",
ADD COLUMN     "isAuth" BOOLEAN NOT NULL DEFAULT false;
