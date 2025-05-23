// src/pages/api/buzzkill-origins/initialiseBuzzkillOrigins.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";
import { logger } from "@/utils/logger";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ethers } from "ethers";
import NFT_ABI from "@/app/libs/abi/BuzzkillOriginsNFT.json";

const PRIMARY_RPC = process.env.BLOCKPI_RPC;
const FALLBACK_RPC = "https://rpc.viction.xyz";
const NFT_ADDRESS = process.env.NEXT_PUBLIC_BUZZKILL_ORIGINS_ADDRESS!;

export default async function initialiseBuzzkillOrigins(
  req: NextApiRequest,
  res: NextApiResponse
) {
  logger.log("⇢ initialiseBuzzkillOrigins invoked", {
    method: req.method,
    body: req.body,
  });

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const tokenId = Number(req.body?.tokenId);
  if (!tokenId || isNaN(tokenId)) {
    return res.status(400).json({ error: "Invalid tokenId" });
  }

  const cookie = req.headers.cookie ?? "";
  const sessionToken =
    cookie
      .split("; ")
      .find(
        (c) =>
          c.startsWith("next-auth.session-token=") ||
          c.startsWith("__Secure-next-auth.session-token=")
      )
      ?.split("=")[1] ?? "";

  if (!sessionToken) {
    return res.status(401).json({ error: "Unauthorised" });
  }

  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("Missing NEXTAUTH_SECRET");
  }

  let address: string;
  try {
    const payload = jwt.verify(
      sessionToken,
      process.env.NEXTAUTH_SECRET
    ) as JwtPayload;

    address = payload.sub!;
    if (!address) throw new Error("No sub in JWT");

    logger.log("• address from JWT", { address });
  } catch (err) {
    logger.error("JWT verification failed", err);
    return res.status(401).json({ error: "Invalid token" });
  }

  // Setup provider (try primary, fallback if needed)
  let provider: ethers.JsonRpcProvider;
  try {
    provider = new ethers.JsonRpcProvider(PRIMARY_RPC);
    await provider.getBlockNumber();
    logger.log("Connected to primary RPC");
  } catch (primaryErr) {
    logger.warn("Primary RPC failed, trying fallback", primaryErr);
    try {
      provider = new ethers.JsonRpcProvider(FALLBACK_RPC);
      await provider.getBlockNumber();
      logger.log("Connected to fallback RPC");
    } catch (fallbackErr) {
      logger.error("Both RPCs failed", fallbackErr);
      return res.status(500).json({ error: "RPCs unavailable" });
    }
  }

  // Create contract instance
  const nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, provider);

  // Validate ownership
  try {
    const owner = await nftContract.ownerOf(tokenId);
    logger.log("onchain owner", { owner });
    if (owner.toLowerCase() !== address.toLowerCase()) {
      return res.status(403).json({ error: "You do not own this token" });
    }
  } catch (err) {
    logger.error("Failed to verify token ownership", err);
    return res.status(404).json({ error: "Token not found onchain" });
  }

  // Load metadata & character
  let taskName = "Mint Buzzkill Origin Worker Bee";
  try {
    const uri = await nftContract.tokenURI(tokenId);
    const meta = await fetch(uri).then((r) => r.json());
    const char = meta.attributes?.find(
      (a: any) => a.trait_type === "Character"
    )?.value;
    logger.log("NFT character", { char });
    if (char === "Queen Bee") taskName = "Mint Buzzkill Origin Queen Bee ";
  } catch (err) {
    logger.warn("Metadata fetch failed", err);
  }

  // Supabase with auth
  const supabase = getSupabaseClientWithAuth(sessionToken);

  const { data: task, error: taskError } = await supabase
    .from("honey_drop_tasks")
    .select("points, phase")
    .eq("task", taskName)
    .maybeSingle();

  if (taskError || !task) {
    logger.error("Task lookup failed", taskError);
    return res.status(500).json({ error: "Task not found" });
  }

  logger.log("Task resolved", {
    taskName,
    points: task.points,
    phase: task.phase,
  });

  // Call RPC to initialise bee
  const { data: rpcData, error: rpcError } = await supabase.rpc(
    "initialise_bee",
    {
      p_token: tokenId,
      p_address: address,
      p_task: taskName,
      p_points: task.points,
      p_phase: task.phase,
    }
  );

  if (rpcError) {
    logger.error("RPC call failed", rpcError);
    return res.status(500).json({ error: "Initialisation failed" });
  }

  logger.log("RPC success", { rpcData });

  return res.status(200).json({
    success: true,
    task: taskName,
    points: task.points,
    phase: task.phase,
    updatedRows: rpcData?.[0]?.updated_rows ?? 0,
  });
}
