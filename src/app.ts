// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();
import prisma from "./db";

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
import express from "express";

import cors from 'cors';
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here

app.use(cors({
    origin: ['http://localhost:5173', 'https://bikeshare-berlin.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  

app.use(express.json());
app.options('*', cors());

app.get("/test-db", async (req, res) => {
    try {
      const testQuery = await prisma.bike.findMany();
      res.status(200).json(testQuery);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

import indexRoutes from "./routes/index.routes";
app.use("/api", indexRoutes);

import bikeRoutes from "./routes/bike.routes";
app.use("/api", bikeRoutes);

import bookingRoutes from "./routes/booking.routes";
app.use("/api", bookingRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

export default app;
