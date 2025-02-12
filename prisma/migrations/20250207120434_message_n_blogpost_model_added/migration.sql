-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "reactions" INTEGER;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
