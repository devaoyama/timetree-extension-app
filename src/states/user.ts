import { OAuthClient, User } from "@timetreeapp/web-api";
import { selector, useRecoilValueLoadable } from "recoil";
import { RecoilSelectorKeys } from "./keys";
import { accessTokenState } from "./accessToken";

const userQuery = selector<User | undefined>({
  key: RecoilSelectorKeys.USER_QUERY,
  get: async ({ get }) => {
    const accessToken = get(accessTokenState);
    if (!accessToken) return;
    const client = new OAuthClient(accessToken);
    return await client.getUser();
  },
});

export const userSelectors = {
  useUser: (): {
    data?: User;
    loading: boolean;
    error?: Error;
  } => {
    const queryResult = useRecoilValueLoadable(userQuery);
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
