// pages/api/user/getIsNewUser.ts

import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

export default async function getIsNewUser(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const cookies = req.headers.cookie;
  if (!cookies) {
    return res.status(200).json({ isNewUser: false });
  }

  const parsedCookies = parse(cookies);
  const isNewUser = parsedCookies.isNewUser === "true";

  return res.status(200).json({ isNewUser });
}
