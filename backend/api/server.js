import app from "../app.js";
import connectDB from "../config/db.js";
import serverless from "serverless-http";

let cachedHandler;

export default async function handler(req, res) {
  if (!cachedHandler) {
    await connectDB();
    cachedHandler = serverless(app);
  }
  return cachedHandler(req, res);
}
