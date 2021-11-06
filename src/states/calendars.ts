import { OAuthClient, Calendar } from "@timetreeapp/web-api";
import { selector, useRecoilValueLoadable } from "recoil";
import { RecoilSelectorKeys } from "./keys";
import { accessTokenState } from "./accessToken";

const calendarsQuery = selector<readonly Calendar[] | undefined>({
  key: RecoilSelectorKeys.CALENDARS_QUERY,
  get: async ({ get }) => {
    const accessToken = get(accessTokenState);
    if (!accessToken) return;
    const client = new OAuthClient(accessToken);
    return await client.getCalendars();
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
