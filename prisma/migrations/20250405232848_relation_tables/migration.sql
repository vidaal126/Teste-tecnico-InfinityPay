-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'PROGRESSING', 'CONCLUED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MANAGER', 'WORKER');

-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "task_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "dead_line" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "role_id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'WORKER',

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
