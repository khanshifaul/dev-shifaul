-- AlterTable
ALTER TABLE "tag" ADD COLUMN     "projectId" TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "client" TEXT,
    "logo" TEXT,
    "services" TEXT[],
    "technologies" TEXT[],
    "website" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "execution" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    "goalImages" TEXT[],
    "resultImages" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_slug_key" ON "project"("slug");

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
