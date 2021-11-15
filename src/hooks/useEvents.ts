import { OAuthClient } from "@timetreeapp/web-api";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { accessTokenSelectors } from "../states/accessToken";

type AddArgs = {
  userIds: string[];
  title: string;
  allDay: boolean;
  startAtDate: string;
  startAtTime: string;
  endAtDate: string;
  endAtTime: string;
  calendars: { id: string; name: string; labelId?: string }[];
  onAddEvent?: () => void;
  onAddEventError?: () => void;
};

export const useEvents = () => {
  const [client, setClient] = useState<OAuthClient | undefined>();
  const accessToken = accessTokenSelectors.useAccessToken();

  useEffect(() => {
    if (!accessToken) return;
    const client = new OAuthClient(accessToken);
    setClient(client);
  }, [accessToken]);

  const add = async ({
    userIds,
    title,
    allDay,
    startAtDate,
    startAtTime,
    endAtDate,
    endAtTime,
    calendars,
    onAddEvent,
    onAddEventError,
  }: AddArgs) => {
    if (!client) return;
    const startAt = allDay
      ? dayjs(`${startAtDate} 09:00:00`).toISOString()
      : dayjs(`${startAtDate} ${startAtTime}`).toISOString();
    const endAt = allDay
      ? dayjs(`${endAtDate} 09:00:00`).toISOString()
      : dayjs(`${endAtDate} ${endAtTime}`).toISOString();
    for (const calendar of calendars) {
      await client
        .createEvent({
          calendarId: calendar.id,
          title,
          category: "schedule",
          allDay,
          startAt,
          endAt,
          label: {
            id: calendar.labelId || "",
            type: "label",
          },
          attendees: userIds.map((userId) => ({ id: userId, type: "user" })),
        })
        .then(() => {
          onAddEvent && onAddEvent();
        })
        .catch(() => {
          onAddEventError && onAddEventError();
        });
    }
  };

  return { add };
};
