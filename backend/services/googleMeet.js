import { google } from "googleapis";
import oauth2Client from "./googleAuth.js";

export async function createGoogleMeet({
  title = "Skill Swap Session",
  durationMinutes = 30,
}) {
  // Check if we have tokens
  if (!global.googleTokens) {
    throw new Error("Google not connected. Please authenticate first.");
  }

  oauth2Client.setCredentials(global.googleTokens);

  const calendar = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  const start = new Date();
  const end = new Date(start.getTime() + durationMinutes * 60000);

  const event = await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: title,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });

  return event.data.hangoutLink;
}
