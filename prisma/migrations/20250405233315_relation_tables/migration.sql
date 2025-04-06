/*
  Warnings:

  - The values [WORKER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('MANAGER', 'EMPLOYEE');
ALTER TABLE "Roles" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Roles" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "Roles" ALTER COLUMN "role" SET DEFAULT 'EMPLOYEE';
COMMIT;

-- AlterTable
ALTER TABLE "Roles" ALTER COLUMN "role" SET DEFAULT 'EMPLOYEE';
