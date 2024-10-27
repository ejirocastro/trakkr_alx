import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const apiKey = process.env.IPSTACK_API_KEY;

// Middleware to parse JSON
app.use(express.json());

