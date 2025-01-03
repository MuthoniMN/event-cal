import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

interface AuthUser {
  id: string
  role: string
}

export interface AuthenticatedRequest extends Request {
  user: AuthUser
}

interface Payload {
  userId: string
  role: string
}

export default function authenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    res.status(401).json({ status: 401, message: "Unauthenticated user", data: {} });
    return;
  }

  const token = (authHeader as string).split(' ')[1];

  if(!token) {
    res.status(401).json({ status: 401, message: "Unauthenticated user", data: {} });
    return;
  }

const decoded = jwt.verify(token, (process.env.JWT_SECRET_KEY as string));

  if(!decoded) {
    res.status(401).json({ status: 401, message: "Invalid token!", data: {} });
    return;
  }

  (req as AuthenticatedRequest).user = {
    id: (decoded as Payload).userId,
    role: (decoded as Payload).role
  };

  next();
}
