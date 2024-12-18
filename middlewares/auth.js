import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new ErrorHandler("User not authenticated.", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
});
