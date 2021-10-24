import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) {
      return res.status(401).json({ errorCode: "token.invalid" });
    }

    const [, token] = authToken.split(" ");
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).json({ errorCode: "token.expired" });
  }
}
