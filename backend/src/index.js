import express from "express";
import { PORT } from "./config/serverConfig.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectDB } from "./config/dbConfig.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.get("/ping", (req, res) => {
  return res.json({ message: "Pong" });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
  connectDB();
});
