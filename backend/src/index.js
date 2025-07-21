import express from "express";
import { PORT } from "./config/serverConfig.js";
import { createServer } from "http";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { connectDB } from "./config/dbConfig.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { setupSocketIO } from "./config/socket.js";

const app = express();
const server = createServer(app);

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

setupSocketIO(server);

server.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
  connectDB();
});
