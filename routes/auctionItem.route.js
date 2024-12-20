import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { addNewAuctionItem, getAllItems } from "../controllers/auctionItem.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, isAuthorized("Auctioneer"), addNewAuctionItem);
router.get("/allItems", getAllItems);

export default router;
