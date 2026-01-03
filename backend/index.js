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

app.use(cors());
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
app.use("/api/conversations", conversationsRoutes); // ✅ Make sure this is here
app.use("/api/messages", messagesRoutes);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
