import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connectDB } from "./lib/db.js";
import { errorMiddleware } from "./middlewares/errorHandler.js";
import userRouter from "./routes/user.route.js";
import auctionItemRouter from "./routes/auctionItem.route.js";
import bidRouter from "./routes/bid.route.js";
import commissionRouter from "./routes/commission.route.js";

const app = express();
config();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
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

connectDB();

app.use(errorMiddleware);

export default app;
