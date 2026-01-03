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

// ✅ Configure CORS properly for production
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL, // Your Vercel URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
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
});
