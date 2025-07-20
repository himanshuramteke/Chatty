import express from "express";
import { PORT } from "./config/serverConfig.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectDB } from "./config/dbConfig.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./config/socket.js";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/ping", (req, res) => {
  return res.json({ message: "Pong" });
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
  connectDB();
});
