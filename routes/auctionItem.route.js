import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { addNewAuctionItem } from "../controllers/auctionItem.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, isAuthorized("Auctioneer"), addNewAuctionItem);

export default router;
