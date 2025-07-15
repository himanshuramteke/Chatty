import express from "express";
import { PORT } from "./config/serverConfig.js";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./config/dbConfig.js";

const app = express();

app.use("/api/auth", authRoutes);

app.get("/ping", (req, res) => {
  return res.json({ message: "Pong" });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
  connectDB();
});
