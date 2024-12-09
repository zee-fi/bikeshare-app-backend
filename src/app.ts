// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
import express from "express";

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
import indexRoutes from "./routes/index.routes";
app.use("/api", indexRoutes);

import bikeRoutes from "./routes/bike.routes";
app.use("/api", bikeRoutes);

import bookingRoutes from "./routes/booking.routes";
app.use("/api", bookingRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
