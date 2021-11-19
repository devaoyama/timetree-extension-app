import React from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  AtomEffect,
} from "recoil";
import { RecoilAtomKeys } from "./keys";

export type AccessTokenState = string | null | undefined;

const localStorageEffect =
  (key: string): AtomEffect<AccessTokenState> =>
  ({ setSelf, onSet }) => {
    if (typeof window === "undefined") return;
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(savedValue);
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, newValue || "");
    });
  };

export const accessTokenState = atom<AccessTokenState>({
  key: RecoilAtomKeys.ACCESS_TOKEN_STATE,
  default: undefined,
  effects_UNSTABLE: [localStorageEffect("TimeTreeKey")],
});

type AccessTokenActions = {
  useRequestAccessToken: () => (code: string) => void;
  useSetAccessToken: () => (token: string) => void;
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
  useSetAccessToken: () => {
    const setAccessToken = useSetRecoilState(accessTokenState);

    return React.useCallback(
      (accessToken) => {
        setAccessToken(accessToken);
      },
      [setAccessToken]
    );
  },
};

type AccessTokenSelectors = {
  useAccessToken: () => AccessTokenState;
};

export const accessTokenSelectors: AccessTokenSelectors = {
  useAccessToken: () => useRecoilValue(accessTokenState),
};
