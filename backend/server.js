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

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB Connected");
}

app.use(async (_, _, next) => {
  await connectDB();
  next();
});

app.listen(PORT, () => console.log(`🚀server running on port ${PORT}`));
