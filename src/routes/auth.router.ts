import express, { Request, Response } from "express";
import AuthController from "../controllers/auth.controller";
import { Session } from "express-session";
import User from "../models/user.model";

export type TSession = {
  authenticated: boolean,
  user: string,
  role: string
} & Session;

const authRouter = express.Router();
const authController = new AuthController()

authRouter.post("/signup", async (req: Request, res: Response) => {
  const body = req.body;

  const response = await authController.register(body);
  
  res.status(response.status).json(response);
  return;
})

authRouter.post("/login", async (req: Request, res: Response) => {
  const body = req.body;

  const response = await authController.login(body);
  console.log((req.session as TSession))

  if(!(req.session as TSession)){
    (req.session as TSession) = {
      authenticated: true,
      user: (response.data.user as User).id,
      role: (response.data.user as User).role
    } as TSession;
  }
    res.status(response.status).json(response);
    return;

})

export default authRouter;
