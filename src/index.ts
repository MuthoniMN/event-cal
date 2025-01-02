import express, { Request, Response } from "express";
import { config } from "dotenv";
import AppDataSource from "./config/db";
import authRouter from "./routes/auth.router";

config();
const app = express();
const port = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.static("public"))

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
