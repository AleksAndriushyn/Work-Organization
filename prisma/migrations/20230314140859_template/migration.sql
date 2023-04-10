/*
  Warnings:

  - You are about to drop the column `email` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "email",
DROP COLUMN "image",
DROP COLUMN "name",
ADD COLUMN     "message" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "assignee" TEXT NOT NULL DEFAULT '',
    "reporter" TEXT NOT NULL DEFAULT '',
    "projectId" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
