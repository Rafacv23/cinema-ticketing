-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_movieId_fkey";

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "movieId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
