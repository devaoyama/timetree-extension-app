import { Label } from "@timetreeapp/web-api";
import { selectorFamily, useRecoilValueLoadable } from "recoil";
import { RecoilSelectorKeys } from "./keys";
import { timetreeClientState } from "./timetreeClient";

const labelsQuery = selectorFamily<readonly Label[] | undefined, string>({
  key: RecoilSelectorKeys.LABELS_QUERY,
  get:
    (calendarId) =>
    async ({ get }) => {
      const timetree = get(timetreeClientState);
      if (!timetree) return;
      return await timetree.getLabels(calendarId);
    },
});

export const labelSelectors = {
  useLabels: (
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
