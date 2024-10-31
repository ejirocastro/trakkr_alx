import express from "express";
import userRouter from "../Routes/userRoutes.js";

// Function to mount routes on the Express app
export const mountedRoutes = function (app)
{
  // Middleware to parse incoming JSON requests
  app.use(express.json());

  // Mount the userRouter on the "/api/v1/users" path
  // Any route beginning with "/api/v1/users" will be handled by userRouter
  app.use("/api/v1/users", userRouter);
};