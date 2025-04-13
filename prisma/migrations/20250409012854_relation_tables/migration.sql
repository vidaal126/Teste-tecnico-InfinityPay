/*
  Warnings:

  - You are about to drop the column `user_id` on the `Tasks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_user_id_fkey";

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "UsersTasks" (
    "user_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,

    CONSTRAINT "UsersTasks_pkey" PRIMARY KEY ("user_id","task_id")
);

-- AddForeignKey
ALTER TABLE "UsersTasks" ADD CONSTRAINT "UsersTasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersTasks" ADD CONSTRAINT "UsersTasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Tasks"("task_id") ON DELETE RESTRICT ON UPDATE CASCADE;
