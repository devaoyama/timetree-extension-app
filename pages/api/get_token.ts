import type { NextApiRequest, NextApiResponse } from "next";
import { OAuthAuthenticator } from "@timetreeapp/web-api";

type Data = {
  accessToken: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const authenticator = new OAuthAuthenticator();

  const response = await authenticator.getToken({
    clientId: process.env.NEXT_PUBLIC_TIMETREE_CLIENT_ID as string,
    clientSecret: process.env.TIMETREE_CLIENT_SECRET as string,
    redirectUri: process.env.NEXT_PUBLIC_TIMETREE_REDIRECT_URI as string,
    code: req.body.code,
    grantType: "authorization_code",
  });
  res.status(200).json({ accessToken: response.accessToken });
}
