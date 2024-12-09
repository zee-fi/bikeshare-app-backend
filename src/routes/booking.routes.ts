import express, { Request, Response, NextFunction } from 'express';
import prisma from '../db/index';
import { RequestCreateBooking } from '../types/requests';

const router = express.Router();


router.post(
  "/booking/:bikeId",
  async (req: RequestCreateBooking, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { startDate, endDate } = req.body;
      const { bikeId } = req.params;

      const bike = await prisma.bike.findUnique({ where: { id: bikeId } });

      if (!bike) {
        return res.status(404).json({ message: "bike not found" });
      }

      const start = new Date(startDate);
      const end = new Date(endDate);
      const duration =
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

      const totalPrice = bike.price * duration;

      const bookingDetails = {
        startDate,
        endDate,
        totalPrice,
        bikeId,
      };

      const newBooking = await prisma.booking.create({ data: bookingDetails });
      return res.status(201).json(newBooking);
    } catch (err) {
      console.log("error creating bike", err);
      next(err);
      return res.status(500).json({ message: "Error creating booking" });
    }
  }
);

export default router;