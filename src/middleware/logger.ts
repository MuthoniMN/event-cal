import { Request, Response, NextFunction } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date();
  console.log(`${timestamp.toISOString()}: ${req.method} ${req.path}`);
  next();
}

export default loggerMiddleware;
