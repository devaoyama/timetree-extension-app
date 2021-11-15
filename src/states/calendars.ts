import { Calendar } from "@timetreeapp/web-api";
import { selector, useRecoilValueLoadable } from "recoil";
import { RecoilSelectorKeys } from "./keys";
import { timetreeClientState } from "./timetreeClient";

const calendarsQuery = selector<readonly Calendar[] | undefined>({
  key: RecoilSelectorKeys.CALENDARS_QUERY,
  get: async ({ get }) => {
    const timetree = get(timetreeClientState);
    if (!timetree) return;
    return await timetree.getCalendars();
  },
});

export const calendarSelectors = {
  useCalendars: (): {
    data?: readonly Calendar[];
    loading: boolean;
    error?: Error;
  } => {
    const queryResult = useRecoilValueLoadable(calendarsQuery);
    switch (queryResult.state) {
      case "hasValue":
        return {
          data: queryResult.contents,
          loading: false,
        };
      case "hasError":
        return {
          loading: false,
          error: queryResult.contents,
        };
      default:
        return {
          loading: true,
        };
    }
  },
};
