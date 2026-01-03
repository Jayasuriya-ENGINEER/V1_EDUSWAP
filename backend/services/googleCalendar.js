import { google } from "googleapis";

export async function createMeetEvent(auth, title = "Skill Swap Session") {
  const calendar = google.calendar({ version: "v3", auth });

  const start = new Date();
  const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour

  const event = await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: title,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
      conferenceData: {
        createRequest: {
          requestId: crypto.randomUUID(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });

  return event.data.hangoutLink;
}
