import { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";
import jwt, { JwtPayload } from "jsonwebtoken";

const getProfile = async (req: NextApiRequest, res: NextApiResponse) => {
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
    console.log("Manually decoded token:", jwtPayload);

    const supabase = getSupabaseClientWithAuth(sessionToken);
    const address = jwtPayload.sub;
    if (!address) {
      throw new Error("error no JWT payload");
    }
    console.log("address from payload", address);
    const { data: userData, error } = await supabase
      .from("users")
      .select(
        "account_name, email_address, address, invited_count, invite_code"
      )
      .eq("address", address)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
    }

    if (!userData) {
      return res.status(404).json({ error: "Profile not found" });
    }

    const profileData = {
      account_name: userData.account_name || "Not provided",
      email_address: userData.email_address || "Not provided",
      address: userData.address,
      invite_code: userData.invite_code,
      invited_count: userData.invited_count,
    };
    console.log("profileData returned: ", userData);
    return res.status(200).json(profileData);
  } catch (err) {
    console.error("Error decoding token or fetching profile:", err);
    return res.status(401).json({ error: "Invalid token or unauthorized" });
  }
};

export default getProfile;
