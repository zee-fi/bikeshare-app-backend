-- CreateEnum
CREATE TYPE "Tag" AS ENUM ('City_Bike', 'E_Bike', 'Road_Bike', 'Touring_Bike', 'Mountain_Bike', 'Mens', 'Womens', 'Unisex', 'Kids');

-- CreateTable
CREATE TABLE "Bike" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tags" "Tag"[],
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "deposit" DOUBLE PRECISION,
    "image" TEXT NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Bike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "bikeId" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "Bike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
