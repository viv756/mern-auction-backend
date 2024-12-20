import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  addNewAuctionItem,
  getAllItems,
  getAuctionDetails,
  getMyAuctionItems,
  removeFromAuction,
} from "../controllers/auctionItem.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, isAuthorized("Auctioneer"), addNewAuctionItem);
router.get("/allItems", getAllItems);
router.get("/auction/:id", isAuthenticated, getAuctionDetails);
router.get("/myitems", isAuthenticated, isAuthorized("Auctioneer"), getMyAuctionItems);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Auctioneer"), removeFromAuction);

export default router;
