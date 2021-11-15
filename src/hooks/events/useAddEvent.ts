import dayjs from "dayjs";
import { timeTreeSelectors } from "../../states/timetreeClient";

type Args = {
  onAddEvent?: () => void;
  onAddEventError?: () => void;
};

type AddArgs = {
  userIds: string[];
  title: string;
  allDay: boolean;
  startAtDate: string;
  startAtTime: string;
  endAtDate: string;
  endAtTime: string;
  calendars: { id: string; name: string; labelId?: string }[];
};

export const useAddEvent = ({ onAddEvent, onAddEventError }: Args) => {
  const timetree = timeTreeSelectors.useTimeTree();

  const add = async ({
    userIds,
    title,
    allDay,
    startAtDate,
    startAtTime,
    endAtDate,
    endAtTime,
    calendars,
  }: AddArgs) => {
    if (!timetree) return;
    const startAt = allDay
      ? dayjs(`${startAtDate} 09:00:00`).toISOString()
      : dayjs(`${startAtDate} ${startAtTime}`).toISOString();
    const endAt = allDay
      ? dayjs(`${endAtDate} 09:00:00`).toISOString()
      : dayjs(`${endAtDate} ${endAtTime}`).toISOString();
    for (const calendar of calendars) {
      await timetree
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
