import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { accessTokenSelectors } from "../../states/accessToken";
import { Loading } from "../loading/loading";

type Props = {
  children?: React.ReactNode;
  redirectTo?: string;
};

export const RequiredLogin: React.FC<Props> = ({
  children,
  redirectTo = "/login",
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

  if (!accessToken) {
    router.push(redirectTo);
    return null;
  }

  return <>{children}</>;
};
