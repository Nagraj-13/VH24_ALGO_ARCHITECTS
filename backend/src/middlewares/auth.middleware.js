import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      token = token.replace(/"/g, "");
      console.log(token);
      if (!token) {
        return res.status(401).json({ error: "Not authorized, no token" });
      }
      const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);
      console.log("Decoded Token", decodedToken);

      if (!decodedToken || !decodedToken.id || !decodedToken.str) {
        return res.status(401).json({ msg: "Invalid token structure" });
      }
      req.user = {
        id: decodedToken.id,
        type: decodedToken.str,
      };

      console.log("Req.User", req.user);
      next();
    } catch (error) {
      res.status(401).json({ msg: "Internal Server Error" });
    }
  }
  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }
});
