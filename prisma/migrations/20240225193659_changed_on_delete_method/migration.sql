-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_contactOwnerId_fkey";

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_contactOwnerId_fkey" FOREIGN KEY ("contactOwnerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
