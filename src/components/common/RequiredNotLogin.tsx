import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { accessTokenSelectors } from "../../states/accessToken";
import { Loading } from "../loading/Loading";

type Props = {
  children?: React.ReactNode;
  redirectTo?: string;
};

export const RequiredNotLogin: React.FC<Props> = ({
  children,
  redirectTo = "/",
}) => {
  const [loading, setLoading] = useState(true);
  const accessToken = accessTokenSelectors.useAccessToken();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <Loading />;

  if (accessToken) {
    router.push(redirectTo);
    return null;
  }

  return <>{children}</>;
};
