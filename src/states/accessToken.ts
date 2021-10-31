import React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { RecoilAtomKeys } from "./keys";

type AccessTokenState = string | null | undefined;

const accessTokenState = atom<AccessTokenState>({
  key: RecoilAtomKeys.ACCESS_TOKEN_STATE,
  default: undefined,
});

type AccessTokenActions = {
  useRequestAccessToken: () => (code: string) => void;
};

export const accessTokenActions: AccessTokenActions = {
  useRequestAccessToken: () => {
    const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

    return React.useCallback(
      (code) => {
        if (accessToken !== undefined) return;
        fetch("/api/get_token", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        })
          .then(async (response) => {
            const data = await response.json();
            setAccessToken(data.accessToken || "");
          })
          .catch(() => {
            setAccessToken(null);
          });
      },
      [accessToken, setAccessToken]
    );
  },
};

type AccessTokenSelectors = {
  useAccessToken: () => AccessTokenState;
};

export const accessTokenSelectors: AccessTokenSelectors = {
  useAccessToken: () => useRecoilValue(accessTokenState),
};
