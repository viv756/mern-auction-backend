import { config } from "dotenv";
import express from "express";

const app = express();
config({
  path: "./config/config.env",
});

export default app;
