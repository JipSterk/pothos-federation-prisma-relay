-- CreateEnum
CREATE TYPE "OrganizationMembershipRole" AS ENUM ('Admin', 'Member');

-- CreateTable
CREATE TABLE "Comment" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,
    "userPk" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("pk")
);

-- CreateTable
CREATE TABLE "User" (
    "pk" SERIAL NOT NULL,
    "id" UUID NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_key" ON "Comment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userPk_fkey" FOREIGN KEY ("userPk") REFERENCES "User"("pk") ON DELETE RESTRICT ON UPDATE CASCADE;
