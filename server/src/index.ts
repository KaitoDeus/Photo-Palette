import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { branchRouter } from "./routes/branches.js";
import { frameRouter } from "./routes/frames.js";
import { bookingRouter } from "./routes/bookings.js";
import { statsRouter } from "./routes/stats.js";
import { seedRouter } from "./routes/seed.js";
import { shareRouter } from "./routes/shares.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// API Routes
app.use("/api/branches", branchRouter);
app.use("/api/frames", frameRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/stats", statsRouter);
app.use("/api/seed", seedRouter);
app.use("/api/share", shareRouter);

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Photo Palette Studio Backend API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get("/", (_req, res) => {
  res.send("Photo Palette API Server is running. Visit /api/health for system status.");
});

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 Photo Palette Backend API Server is running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});

export default app;
