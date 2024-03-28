import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectMongoDB } from "./utils/db";
import rahaRouter from "./routes/rahaRouter";

const app = express();

connectMongoDB();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/rahat", rahaRouter);

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

export { app };
