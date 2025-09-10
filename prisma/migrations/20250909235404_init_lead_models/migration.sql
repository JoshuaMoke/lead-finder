/*
  Warnings:

  - You are about to drop the column `nextStep` on the `Activity` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Lead_city_province_idx";

-- DropIndex
DROP INDEX "public"."unique_contact_combo";

-- AlterTable
ALTER TABLE "public"."Activity" DROP COLUMN "nextStep";

-- AlterTable
ALTER TABLE "public"."Lead" ALTER COLUMN "city" SET DATA TYPE TEXT,
ALTER COLUMN "province" SET DATA TYPE TEXT;
