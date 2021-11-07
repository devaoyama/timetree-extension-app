import { OAuthClient, Label } from "@timetreeapp/web-api";
import { selectorFamily, useRecoilValueLoadable } from "recoil";
import { RecoilSelectorKeys } from "./keys";
import { accessTokenState } from "./accessToken";

const labelsQuery = selectorFamily<readonly Label[] | undefined, string>({
  key: RecoilSelectorKeys.CALENDARS_QUERY,
  get:
    (calendarId) =>
    async ({ get }) => {
      const accessToken = get(accessTokenState);
      if (!accessToken) return;
      const client = new OAuthClient(accessToken);
      return await client.getLabels(calendarId);
    },
});

export const calendarSelectors = {
  useCalendars: (
    calendarId: string
  ): {
    data?: readonly Label[];
    loading: boolean;
    error?: Error;
  } => {
    const queryResult = useRecoilValueLoadable(labelsQuery(calendarId));
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
