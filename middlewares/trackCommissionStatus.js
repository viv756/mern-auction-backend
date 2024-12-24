import User from "../models/user.model.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { errorMiddleware } from "./errorHandler.js";

export const trackCommissionStatus = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.unpaidCommission > 0) {
    return next(
      new errorMiddleware(
        "You have unpaid commissions. Please pay them before posting a new auction",
        403
      )
    );
  }
  next();
});
