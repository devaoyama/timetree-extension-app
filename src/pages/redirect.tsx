import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { accessTokenActions } from "../states/accessToken";
import { Loading } from "../components/Loading";

const Redirect: NextPage = () => {
  const router = useRouter();
  const requestAccessToken = accessTokenActions.useRequestAccessToken();

  useEffect(() => {
    if (!router.query.code) {
      router.push("/login");
      return;
    }
    requestAccessToken(router.query.code as string);
    router.push("/");
  }, [requestAccessToken, router, router.query.code]);

  return <Loading />;
};

export default Redirect;
