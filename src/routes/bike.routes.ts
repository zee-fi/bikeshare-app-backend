import express, { response } from "express";
import { Router } from "express";
const router = Router();
import prisma from "../db/index";

import { Request, Response, NextFunction } from "express";

//////  CREATE  //////

router.post(
  "/bikes",
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, tags, description, price, deposit, image, owner } =
    req.body;
    try {

      const newBike = {
        title,
        tags,
        description,
        price,
        deposit: deposit || null,
        image: image || null,
        owner: owner || null,
      };

      const response = await prisma.bike.create({ data: newBike });
      res.status(201).json(newBike);
    } catch (err) {
      console.log("error creating bike", err);
      res.status(500).json({ message: "error creating bike" });
    }
  }
);

//////  READ  //////

router.get("/bikes", async (req, res, next) => {
  try {
    const bikes = await prisma.bike.findMany();
    res.status(200).json(bikes);
  } catch (err) {
    console.log("error fetching bikes from DB", err);
    res.status(500).json({ message: "error fetching bikes from DB" });
  }
});

router.get("/bikes/:bikeId", async (req, res, next): Promise<any> => {
  try {
    const bike = await prisma.bike.findUnique({
      where: { id: req.params.bikeId },
    });
    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    } else {
      return res.status(200).json(bike);
    }
  } catch (err) {
    console.log("error fetching bike from DB", err);
    res.status(500).json({ message: "error fetching bike from DB" });
  }
});

//////  UPDATE  //////

router.put("/bikes/:bikeId", async (req, res, next): Promise<any> => {
  try {
    const { title, tags, description, price, deposit, image, owner } = req.body;

    const updatedBike = {
      title,
      tags,
      description,
      price,
      deposit,
      image,
      owner,
    };

    const bike = await prisma.bike.update({
      where: { id: req.params.bikeId },
      data: updatedBike,
    });
    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    } else {
      return res.status(200).json(bike);
    }
  } catch (err) {
    console.log("error updating bike details", err);
    res.status(500).json({ message: "error updating bike details" });
  }
});

//////  DELETE  //////

router.delete("/bikes/:bikeId", async (req, res, next) => {
  try {
    const deletedBike = await prisma.bike.delete({
      where: { id: req.params.bikeId },
    });
    res.json(deletedBike);
  } catch (err) {
    console.log("error deleting bike from DB", err);
    res.status(500).json({ message: "error deleting bike from DB" });
  }
});

export default router;
