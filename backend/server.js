import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/taskRoutes.js";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors({
  origin: "https://todos-mostafa-hamdi.vercel.app"
}));
app.use(express.json());
app.use("/api/tasks", router);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("Error: " + err));

app.listen(PORT, () => console.log(`🚀server running on port ${PORT}`));
