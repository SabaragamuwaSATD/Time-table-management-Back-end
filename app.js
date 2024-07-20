import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { requireAuth, checkUser } from "./middleware/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import timeTableRoutes from "./routes/timeTableRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const url = process.env.MONGO_URL;

mongoose.connect(url);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Route-specific middlewares
app.use("/auth", authRoutes);

// Global middleware
app.use(checkUser);

// Routes
app.get("/", requireAuth, (req, res) => {
  res.sendFile(__dirname + "/views/Home.html");
});

app.use("/api/users", userRoutes);
app.use("/api/timetable", timeTableRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/resource", resourceRoutes);
app.use("/api/notification", notificationRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

export default app;
