/*
  Warnings:

  - The values [CONCLUED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `role_id` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDING', 'PROGRESSING', 'CONCLUDED');
ALTER TABLE "Tasks" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Tasks" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Tasks" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_role_id_fkey";

-- DropIndex
DROP INDEX "Users_role_id_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "role_id",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'EMPLOYEE';

-- DropTable
DROP TABLE "Roles";
