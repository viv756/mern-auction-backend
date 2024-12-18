import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addNewAuctionItem } from "../controllers/auctionItem.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, addNewAuctionItem);

export default router;
