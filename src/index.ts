import express, { Request, Response } from "express";
import { config } from "dotenv";

config();
const app = express();
const port = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.static("public"))

app.get("/", (req: Request, res: Response) => {
  res.render("index");
})

app.get("/signup", (req: Request, res: Response) => {
  res.render("pages/signup");
})

app.get("/login", (req: Request, res: Response) => {
  res.render("pages/login");
})


app.listen(port, () => console.log(`Server is running on port: ${port}`))
