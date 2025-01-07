export const generateToken = (user, message, statuscode, res) => {
  const isAuth = {
    username: user.userName,
    role: user.role,
  };
  const token = user.generateJsonWebToken();
  res
    .status(statuscode)
    .cookie("token", token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message,
      user,
      token,
      isAuth,
    });
};
