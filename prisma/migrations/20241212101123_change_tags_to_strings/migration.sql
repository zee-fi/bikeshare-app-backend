/*
  Warnings:

  - The `tags` column on the `Bike` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Bike" DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];

-- DropEnum
DROP TYPE "Tag";
