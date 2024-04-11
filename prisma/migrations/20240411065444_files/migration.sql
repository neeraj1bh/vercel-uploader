-- CreateTable
CREATE TABLE "Filename" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Filename_pkey" PRIMARY KEY ("id")
);
