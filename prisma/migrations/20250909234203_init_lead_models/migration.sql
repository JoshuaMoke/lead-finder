/*
  Warnings:

  - You are about to drop the column `company` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `proof` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `seenDays` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `why` on the `Lead` table. All the data in the column will be lost.
  - You are about to alter the column `city` on the `Lead` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserLead` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email,phone]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."LeadStatus" AS ENUM ('NEW', 'VALIDATED', 'QUEUED', 'CONTACTED', 'BOOKED', 'WON', 'LOST');

-- CreateEnum
CREATE TYPE "public"."ActivityType" AS ENUM ('CALL', 'EMAIL', 'VISIT', 'NOTE');

-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserLead" DROP CONSTRAINT "UserLead_leadId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserLead" DROP CONSTRAINT "UserLead_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Lead" DROP COLUMN "company",
DROP COLUMN "grade",
DROP COLUMN "proof",
DROP COLUMN "seenDays",
DROP COLUMN "why",
ADD COLUMN     "email" VARCHAR(255),
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" VARCHAR(30),
ADD COLUMN     "province" VARCHAR(100),
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "source" TEXT,
ADD COLUMN     "status" "public"."LeadStatus" NOT NULL DEFAULT 'NEW',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "website" VARCHAR(255),
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "city" SET DATA TYPE VARCHAR(100);

-- DropTable
DROP TABLE "public"."Account";

-- DropTable
DROP TABLE "public"."Session";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."UserLead";

-- DropTable
DROP TABLE "public"."VerificationToken";

-- DropEnum
DROP TYPE "public"."Grade";

-- DropEnum
DROP TYPE "public"."Plan";

-- DropEnum
DROP TYPE "public"."Status";

-- CreateTable
CREATE TABLE "public"."Tag" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LeadTag" (
    "leadId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "LeadTag_pkey" PRIMARY KEY ("leadId","tagId")
);

-- CreateTable
CREATE TABLE "public"."Activity" (
    "id" TEXT NOT NULL,
    "type" "public"."ActivityType" NOT NULL,
    "summary" TEXT NOT NULL,
    "when" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leadId" TEXT NOT NULL,
    "nextStep" TEXT,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_label_key" ON "public"."Tag"("label");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "public"."Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_score_idx" ON "public"."Lead"("score");

-- CreateIndex
CREATE INDEX "Lead_city_province_idx" ON "public"."Lead"("city", "province");

-- CreateIndex
CREATE UNIQUE INDEX "unique_contact_combo" ON "public"."Lead"("email", "phone");

-- AddForeignKey
ALTER TABLE "public"."LeadTag" ADD CONSTRAINT "LeadTag_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "public"."Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeadTag" ADD CONSTRAINT "LeadTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "public"."Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
