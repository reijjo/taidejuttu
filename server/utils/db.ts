import mongoose from "mongoose";
import chalk from "chalk";
import { MONGO_URI } from "./config";

export const connectMongoDB = async () => {
  try {
    if (process.env.NODE_ENV !== "test") {
      console.log(chalk.yellowBright("..."));
    }

    await mongoose.connect(String(MONGO_URI));

    if (process.env.NODE_ENV !== "test") {
      console.log(chalk.yellowBright("Connected to MongoDB."));
    }
  } catch (error: unknown) {
    console.log("mongoose connect err", error);
  }
};
