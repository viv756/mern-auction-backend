import fs from "fs";
import path from "path";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connectDB } from "./lib/db.js";
import { endedAuctionCron } from "./automation/endedAuctionCron.js";
import { verifyCommission } from "./automation/verifyCommissionCron.js";
import { errorMiddleware } from "./middlewares/errorHandler.js";
import userRouter from "./routes/user.route.js";
import auctionItemRouter from "./routes/auctionItem.route.js";
import bidRouter from "./routes/bid.route.js";
import commissionRouter from "./routes/commission.route.js";
import superAdminRouter from "./routes/superAdmin.route.js";

const app = express();
config();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

const tempDir = process.env.TEMP_FILE_DIR || path.join(process.cwd(), "temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: tempDir,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionItemRouter);
app.use("/api/v1/bid", bidRouter);
app.use("/api/v1/commission", commissionRouter);
app.use("/api/v1/superadmin", superAdminRouter);

endedAuctionCron();
verifyCommission();

connectDB();

app.use(errorMiddleware);

export default app;
