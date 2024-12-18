export const generateToken = (user, message, statuscode, res) => {
  const token = user.generateJsonWebToken();
  res
    .status(statuscode)
    .cookie("token", token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
