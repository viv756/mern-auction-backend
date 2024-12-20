import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  addNewAuctionItem,
  getAllItems,
  getAuctionDetails,
  getMyAuctionItems,
} from "../controllers/auctionItem.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, isAuthorized("Auctioneer"), addNewAuctionItem);
router.get("/allItems", getAllItems);
router.get("/auction/:id", isAuthenticated, getAuctionDetails);
router.get("/myitems", isAuthenticated, isAuthorized("Auctioneer"), getMyAuctionItems);

export default router;
