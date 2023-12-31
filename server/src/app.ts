import express, { Request, Response } from "express";

const app = express();

const PORT = 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`Server is listning to ${PORT}`);
});
