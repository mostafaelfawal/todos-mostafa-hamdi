import express from "express";
import cors from "cors";
import router from "./routes/taskRoutes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://todos-mostafa-hamdi.vercel.app",
  })
);

app.use("/api/tasks", router);

export default app;
