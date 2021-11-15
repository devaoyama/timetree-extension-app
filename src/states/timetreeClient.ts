import { useRecoilValue, selector } from "recoil";
import { OAuthClient } from "@timetreeapp/web-api";
import { accessTokenState } from "./accessToken";
import { RecoilSelectorKeys } from "./keys";

type TimeTreeClient = undefined | OAuthClient;

export const timetreeClientState = selector<TimeTreeClient>({
  key: RecoilSelectorKeys.TIMETREE_CLIENT_SELECTOR,
  get: ({ get }) => {
    const accessToken = get(accessTokenState);
    return accessToken ? new OAuthClient(accessToken) : undefined;
  },
});

type TimeTreeSelectors = {
  useTimeTree: () => TimeTreeClient;
};

export const timeTreeSelectors: TimeTreeSelectors = {
  useTimeTree: () => useRecoilValue(timetreeClientState),
};
