import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { addNewAuctionItem, getAllItems, getAuctionDetails } from "../controllers/auctionItem.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, isAuthorized("Auctioneer"), addNewAuctionItem);
router.get("/allItems", getAllItems);
router.get("/auction/:id", isAuthenticated, getAuctionDetails);

export default router;
