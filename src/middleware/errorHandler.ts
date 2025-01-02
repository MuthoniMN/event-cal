import { Request, Response, NextFunction } from "express"
import responseInterceptor from "../config/responseInterceptor";

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction){
  console.error((err as Error).message);
  const response = responseInterceptor(500, "Internal Server Error. Please try again", {});

  res.status(response.status).json(response);
  next();

}
