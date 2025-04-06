/*
  Warnings:

  - You are about to drop the column `user_id` on the `Roles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[role_id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role_id` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_user_id_fkey";

-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_role_id_key" ON "Users"("role_id");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;
