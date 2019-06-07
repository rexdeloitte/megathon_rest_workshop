export const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      status: 403,
      message: "FORBIDDEN"
    });
  } else {
    if (authHeader === "secretkey") next();
    else
      return res.status(401).json({
        status: 401,
        message: "UNAUTHORIZED"
      });
  }
};
