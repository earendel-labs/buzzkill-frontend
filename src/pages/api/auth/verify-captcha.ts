// /pages/api/verify-captcha.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { captchaToken } = req.body;
  if (!captchaToken) {
    return res.status(400).json({ message: "Captcha token is missing" });
  }

  try {
    const hcaptchaSecret = process.env.HCAPTCHA_SECRET;
    const verifyUrl = `https://hcaptcha.com/siteverify`;
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `response=${captchaToken}&secret=${hcaptchaSecret}`,
    });

    const data = await response.json();
    if (data.success) {
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(400)
        .json({ success: false, error: data["error-codes"] });
    }
  } catch (error) {
    console.error("Error verifying hCaptcha token:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
