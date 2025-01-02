import express, { Request, Response } from "express";
import AuthController from "../controllers/auth.controller";
import errorHandler from "../config/errorHandler";

const authRouter = express.Router();
const authController = new AuthController()

authRouter.post("/signup", async (req: Request, res: Response) => {
  const body = req.body();

  const response = await authController.register(body);
  
  res.status(response.status).json(response);
  return;
})

authRouter.post("/login", async (req: Request, res: Response) => {
  const body = req.body();

  const response = await errorHandler(authController.login(body));

  res.status(response.status).json(response);
  return;
})

export default authRouter;