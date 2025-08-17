import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: "Please log in to access this resource!",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Token missing!",
      });
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
      async (error: any, decoded: any) => {
        if (error) {
          return res.status(401).json({
            message: "Invalid token",
          });
        }
        const userData = await prisma.user.findUnique({
          where: {
            id: decoded.id,
          },
        });
        req.user = userData;
        next();
      }
    );
  } catch (error) {
    console.log(error);
  }
};
