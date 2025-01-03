import express, { Request, Response } from "express";
import { config } from "dotenv";
import AppDataSource from "./config/db";
import authRouter, { TSession } from "./routes/auth.router";
import loggerMiddleware from "./middleware/logger";
import errorHandler from "./middleware/errorHandler";
import UserController from "./controllers/user.controller";
import session from "express-session"
import IORedis from "ioredis";
import { RedisStore } from "connect-redis";

config();
const app = express();
const port = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
app.use(loggerMiddleware);

// session setup
const redisClient = new IORedis(process.env.REDIS_URL as string);
const redisStore = new RedisStore({ client: redisClient });
app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 7
    }
  })
)

//controllers
const userController = new UserController();

// endpoints
app.use("/auth", authRouter);

// frontend views
app.get("/", (req: Request, res: Response) => {
  res.render("index");
})

app.get("/signup", (req: Request, res: Response) => {
  res.render("pages/signup");
})

app.get("/login", (req: Request, res: Response) => {
  res.render("pages/login");
})

app.get('/profile', async (req: Request, res: Response) => {
  console.log((req.session as TSession).user);
  const val = await userController.getUser((req.session as TSession).user);
  const user = val.data.user;
  res.render("pages/profile", { "user": user });
})

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)

  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Initialization Error: ", err)
    })
})
