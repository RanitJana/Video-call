import mongoose from "mongoose";
import { _env, MODEL_NAME } from "../constants.js";

export default async function connectDB() {
  try {
    await mongoose.connect(`${_env.MONGODB_URI}/${MODEL_NAME}`);
  } catch (error) {
    console.log(error);
  }
}
