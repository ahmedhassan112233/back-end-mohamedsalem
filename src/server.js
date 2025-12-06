import dotenv from "dotenv";
dotenv.config(); // ← أهم سطر في المشروع

import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";

import { connectDB } from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";
import settingsRoutes from "./routes/settings.js";
import projectsRoutes from "./routes/projects.js";
import leadsRoutes from "./routes/leads.js";
import mediaRoutes from "./routes/media.js";
import assistantRoutes from "./routes/assistant.js";
import seoRoutes from "./routes/seo.js";
import requestsRoutes from "./routes/requests.js";
import dashboardRoutes from "./routes/dashboard.js";

const app = express();

// --- DEBUG ENV CHECK ---
console.log("ENV CLOUDINARY_NAME:", process.env.CLOUDINARY_NAME);
console.log("ENV CLOUDINARY_KEY:", process.env.CLOUDINARY_KEY);
console.log("ENV CLOUDINARY_SECRET:", process.env.CLOUDINARY_SECRET);
// -----------------------

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/assistant", assistantRoutes);
app.use("/api/seo", seoRoutes);
app.use("/api/requests", requestsRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Backend running on port ${process.env.PORT}`)
);
