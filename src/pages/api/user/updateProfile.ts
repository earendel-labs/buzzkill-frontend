import { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";
import jwt, { JwtPayload } from "jsonwebtoken";

const updateProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Retrieve the session token from cookies
  const cookies = req.headers.cookie?.split("; ") || [];
  const sessionToken = cookies
    .find((cookie) => cookie.startsWith("next-auth.session-token="))
    ?.split("=")[1];
  console.log("Session token:", sessionToken);

  if (!sessionToken) {
    return res.status(401).json({ error: "Session token not found" });
  }

  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("Error: NEXTAUTH_SECRET not defined");
  }

  try {
    const decodedToken = jwt.verify(sessionToken, process.env.NEXTAUTH_SECRET);
    const jwtPayload = decodedToken as JwtPayload;
    console.log("Decoded Token:", jwtPayload);

    const address = jwtPayload.sub;
    if (!address) {
      throw new Error("Error: No address found in JWT payload");
    }

    const { account_name, email_address } = req.body;
    if (!account_name || !email_address) {
      return res
        .status(400)
        .json({ error: "Account name and email are required" });
    }

    const supabase = getSupabaseClientWithAuth(sessionToken);
    const { data, error } = await supabase
      .from("users")
      .update({ account_name, email_address })
      .eq("address", address);

    if (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({ error: "Error updating profile data" });
    }

    return res
      .status(200)
      .json({ message: "Profile updated successfully", data });
  } catch (err) {
    console.error("Error decoding token or updating profile:", err);
    return res.status(401).json({ error: "Invalid token or unauthorized" });
  }
};

export default updateProfile;
