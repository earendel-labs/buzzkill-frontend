// Create an API route to clear the isNewUser cookie
// pages/api/user/clearIsNewUser.ts

import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { logger } from "@/app/utils/logger";
export default async function clearIsNewUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const clearedCookie = serialize("isNewUser", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });
  logger.log("isNewUser cookie cleared");

  res.setHeader("Set-Cookie", clearedCookie);
  return res.status(200).json({ message: "isNewUser cookie cleared" });
}


 