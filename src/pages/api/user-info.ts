// src/pages/api/user-info.ts
import { NextApiRequest, NextApiResponse } from "next";
import { UserInfo } from "@/types/UserInfo";

const defaultUserInfo: UserInfo = {
  pollen: 75000,
  nectar: 235000,
  sap: 75000,
  honey: 6200,
  queenBees: 5,
  workerBees: 50,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Return the default user info as JSON
    return res.status(200).json(defaultUserInfo);
  } else {
    // Return 405 Method Not Allowed for unsupported methods
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
