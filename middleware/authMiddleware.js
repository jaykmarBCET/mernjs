// /middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import { getUserFromCache } from "../cache/userCache.js";

const authVerify = async (req, res, next) => {
  let token;

  // Support for header and cookie tokens
  token =
    req.headers.authorization?.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await getUserFromCache(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    req.auth = decoded; // optional: gives access to entire token payload
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export { authVerify}
