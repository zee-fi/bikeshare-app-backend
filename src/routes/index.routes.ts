import { Response, Request, NextFunction } from "express";
import prisma from "../db";

const router = require("express").Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json("All good in here");
});

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json("All good in here");
});

router.get('/health', async (req: Request, res: Response) => {
  try {
  await prisma.$queryRaw`SELECT 1`;
      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString()
      })
    } catch (err) {
      console.error('PostgreSQL ping failed:', err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to connect to PostgeSQL',
      });
    };
});


export default router;