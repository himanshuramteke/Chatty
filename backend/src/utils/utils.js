import { JWT_SECRET, NODE_ENV } from "../config/serverConfig.js";
import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true, //prevent XSS attack cross-site scripting attacks
    sameSite: "strict",
    secure: NODE_ENV !== "development",
  });

  return token;
};
