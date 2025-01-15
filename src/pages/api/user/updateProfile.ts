import { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";
import jwt, { JwtPayload } from "jsonwebtoken";

const updateProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const cookies = req.headers.cookie?.split("; ") || [];
  const sessionToken = cookies
    .find(
      (cookie) =>
        cookie.startsWith("next-auth.session-token=") ||
        cookie.startsWith("__Secure-next-auth.session-token=")
    )
    ?.split("=")[1];

  if (!sessionToken) {
    return res.status(401).json({ error: "Session token not found" });
  }

  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("Error: NEXTAUTH_SECRET not defined");
  }

  try {
    const decodedToken = jwt.verify(sessionToken, process.env.NEXTAUTH_SECRET);
    const jwtPayload = decodedToken as JwtPayload;

    const address = jwtPayload.sub;
    if (!address) {
      throw new Error("Error: No address found in JWT payload");
    }

    const { account_name, email_address } = req.body;

    if (!account_name) {
      return res.status(400).json({ error: "Account name is required." });
    }

    const updateData: Record<string, any> = { account_name };

    if (email_address) {
      updateData.email_address = email_address;
    }

    const supabase = getSupabaseClientWithAuth(sessionToken);
    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("address", address);

    if (error) {
      console.error("Error updating profile:", error);

      if (error.code === "23505" && error.message.includes("users_email_key")) {
        return res
          .status(409)
          .json({ error: "Email address is already in use." });
      }

      return res.status(500).json({
        error: "An unexpected error occurred while updating the profile.",
      });
    }

    return res
      .status(200)
      .json({ message: "Profile updated successfully", data });
  } catch (err) {
    console.error("Error decoding token or updating profile:", err);
    return res.status(401).json({ error: "Invalid token or unauthorized" });
  }
};

// Ensure this default export is present
export default updateProfile;
