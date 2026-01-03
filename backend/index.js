import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";
import dashboardRoutes from "./routes/dashboard.js";
import skillsRoutes from "./routes/skills.js";
import mentorSkillsRoutes from "./routes/mentorSkills.js";
import requestsRoutes from "./routes/requests.js";
import googleRoutes from "./routes/google.js";
import conversationsRoutes from "./routes/conversations.js";
import messagesRoutes from "./routes/messages.js";

const app = express();

// ✅ Simple CORS configuration
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

// Add production frontend URL if it exists
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
  // Also add without trailing slash
  allowedOrigins.push(process.env.FRONTEND_URL.replace(/\/$/, ""));
}

console.log("Allowed origins:", allowedOrigins); // ✅ Debug log

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("Blocked origin:", origin); // ✅ Debug log
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

// Add a health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    allowedOrigins,
    frontendUrl: process.env.FRONTEND_URL,
  });
});

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/user", userRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/mentor-skills", mentorSkillsRoutes);
app.use("/api/requests", requestsRoutes);
app.use("/api/google", googleRoutes);
app.use("/api/conversations", conversationsRoutes);
app.use("/api/messages", messagesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log("Environment:", {
    PORT,
    FRONTEND_URL: process.env.FRONTEND_URL,
    SUPABASE_URL: process.env.SUPABASE_URL ? "SET" : "NOT SET",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? "SET" : "NOT SET",
  });
});
