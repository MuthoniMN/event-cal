import express, { Request, Response } from "express";

require("dotenv").config()
const app = express();
const port = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.static("public"))

app.get("/", (req: Request, res: Response) => {
  res.send("Fully set up!");
})

app.listen(port, () => console.log(`Server is running on port: ${port}`))
