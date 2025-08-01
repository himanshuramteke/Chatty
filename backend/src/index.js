import express from "express";
import { NODE_ENV, PORT } from "./config/serverConfig.js";
import { createServer } from "http";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import { connectDB } from "./config/dbConfig.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { setupSocketIO } from "./config/socket.js";
import path from "path";

const app = express();
const server = createServer(app);

const __dirname = path.resolve();

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
app.use("/api/ai", aiRoutes);

app.get("/ping", (req, res) => {
  return res.json({ message: "Pong" });
});

setupSocketIO(server);

if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
  connectDB();
});
