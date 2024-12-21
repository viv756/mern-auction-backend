import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  addNewAuctionItem,
  getAllItems,
  getAuctionDetails,
  getMyAuctionItems,
  removeFromAuction,
  republishItem,
} from "../controllers/auctionItem.controller.js";
import { trackCommissionStatus } from "../middlewares/trackCommissionStatus.js";

const router = express.Router();

router.post("/create", isAuthenticated, isAuthorized("Auctioneer"),trackCommissionStatus, addNewAuctionItem);
router.get("/allItems", getAllItems);
router.get("/auction/:id", isAuthenticated, getAuctionDetails);
router.get("/myitems", isAuthenticated, isAuthorized("Auctioneer"), getMyAuctionItems);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Auctioneer"), removeFromAuction);
router.put("/item/republish/:id", isAuthenticated, isAuthorized("Auctioneer"), republishItem);

export default router;
