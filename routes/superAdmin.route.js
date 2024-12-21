import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { deleteAuctionItem, deletePaymentProof, getAllPaymentProofs, getPaymentProofDetail, updateProofStatus } from "../controllers/superAdmin.controller.js";

const router = express.Router();

router.delete("/auctionitem/delete/:id", isAuthenticated, isAuthorized("Super Admin"), deleteAuctionItem);
router.get("/paymentproofs/getall", isAuthenticated, isAuthorized("Super Admin"), getAllPaymentProofs);
router.get("/paymentproof/:id", isAuthenticated, isAuthorized("Super Admin"), getPaymentProofDetail);
router.put("/paymentproof/status/update/:id", isAuthenticated, isAuthorized("Super Admin"), updateProofStatus);
router.delete("/paymentproof/delete/:id",isAuthenticated,isAuthorized("Super Admin"),deletePaymentProof);

export default router;
