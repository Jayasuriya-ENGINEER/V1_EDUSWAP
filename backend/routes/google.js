import express from "express";
import oauth2Client from "../services/googleAuth.js";

const router = express.Router();

/**
 * Check if Google is connected
 */
router.get("/status", (req, res) => {
  res.json({ connected: !!global.googleTokens });
});

/**
 * STEP 1: Redirect to Google
 */
router.get("/auth", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ],
  });

  res.redirect(url);
});

/**
 * STEP 2: Google callback
 */
router.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send("No code provided");
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Store tokens globally
    global.googleTokens = tokens;

    console.log("✅ Google connected successfully");

    res.send(`
      <html>
        <body>
          <h2>✅ Google connected successfully!</h2>
          <p>You can close this tab now.</p>
          <script>window.close();</script>
        </body>
      </html>
    `);
  } catch (err) {
    console.error("❌ GOOGLE AUTH ERROR:", err);
    res.status(500).send("Google auth failed");
  }
});

export default router;
