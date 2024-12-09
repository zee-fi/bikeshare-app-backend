import { Response, Request, NextFunction } from "express";

const router = require("express").Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json("All good in here");
});

export default router;