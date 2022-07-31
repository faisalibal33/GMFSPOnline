import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    console.log("verify berhasil")
    req.user = user;
    // console.log(reqUser) 
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authoriza")
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  console.log("verify 2")
  // console.log(req.user)
  verifyToken(req, res, () => {
    console.log("coba token")
    if (req.user.isAdmin === true) {
      console.log("anda admin")
      next();
    } else {
      res.status(403).json("You are not authoriza")
      console.log("anda bukan admin")
    }
  });
};
