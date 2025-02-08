// pages/api/user/claimYield.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { getSupabaseClientWithAuth } from "@/app/libs/supabaseClient";
import { logger } from "@/utils/logger";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RateLimiterMemory } from "rate-limiter-flexible";

// Rate limit: allow one claim call per 15 seconds per address
const rateLimiter = new RateLimiterMemory({
  points: 1,
  duration: 1,
});

// Ensure your subgraph endpoint is defined (for example, in NEXT_PUBLIC_SUBQUERY_DOMAIN)
const SUBGRAPH_URL = process.env.NEXT_PUBLIC_SUBQUERY_DOMAIN;
if (!SUBGRAPH_URL) {
  throw new Error("NEXT_PUBLIC_SUBQUERY_DOMAIN is not defined");
}

// Combined GraphQL query: get the user's external flag and their staked NFTs
const GET_USER_DATA = `
  query getUserData($userId: String!) {
    users(filter: { id: { equalTo: $userId } }) {
      edges {
        node {
          id
          hasExternalNFTFlag
        }
      }
    }
    stakedNFTs(filter: { ownerId: { id: { equalTo: $userId } } }) {
      edges {
        node {
          tokenIdNum
          lastClaimedAt
          tokenId {
            rarity
          }
        }
      }
    }
  }
`;

export default async function claimYield(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Ensure SUBGRAPH_URL is defined inside the function
  const SUBGRAPH_URL = process.env.NEXT_PUBLIC_SUBQUERY_DOMAIN;
  if (!SUBGRAPH_URL) {
    logger.error("NEXT_PUBLIC_SUBQUERY_DOMAIN is not defined");
    return res.status(500).json({ error: "Internal server error" });
  }

  // Extract session token from cookies
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
    throw new Error("NEXTAUTH_SECRET is not defined");
  }

  // Verify the token and extract the user's address
  let address: string | undefined;
  try {
    const decoded = jwt.verify(
      sessionToken,
      process.env.NEXTAUTH_SECRET
    ) as JwtPayload;
    address = decoded.sub;
    if (!address) {
      return res.status(401).json({ error: "No address found in token" });
    }
  } catch (err) {
    logger.error("Token verification failed:", err);
    return res.status(401).json({ error: "Invalid token" });
  }

  // Enforce rate limiting
  try {
    await rateLimiter.consume(address);
  } catch (err) {
    return res
      .status(429)
      .json({ error: "Too many requests. Please try again later." });
  }

  // Query the subgraph for trusted data (user external flag and staked NFTs)
  let subgraphData;
  try {
    const response = await fetch(SUBGRAPH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GET_USER_DATA,
        variables: { userId: address.toLowerCase() },
      }),
    });
    const json = await response.json();
    subgraphData = json.data;
    console.log("subgraphData", subgraphData);
  } catch (err) {
    logger.error("Error fetching subgraph data:", err);
    return res.status(500).json({ error: "Error fetching on-chain data" });
  }

  if (
    !subgraphData ||
    !subgraphData.users ||
    subgraphData.users.edges.length === 0 ||
    !subgraphData.stakedNFTs
  ) {
    return res.status(404).json({ error: "User data not found" });
  }

  // Extract user data and staked NFTs from the subgraph
  const userData = subgraphData.users.edges[0].node;
  const stakedNFTEdges = subgraphData.stakedNFTs.edges;
  console.log("userDAta", userData);
  console.log("stakedNFTEdges", stakedNFTEdges);

  // Recalculate the unclaimed yield exactly as in your frontend
  const currentTime = Date.now() / 1000;
  let totalUnclaimed = 0;
  stakedNFTEdges.forEach((edge: any) => {
    const nft = edge.node;
    const lastClaimedAt = parseInt(nft.lastClaimedAt, 10);
    console.log("lastClaimedAt", lastClaimedAt);
    const secondsElapsed = currentTime - lastClaimedAt;
    const daysElapsed = secondsElapsed / 86400;
    let rarityMultiplier = 1;
    if (nft.tokenId.rarity === "Rare") {
      rarityMultiplier = 1.2;
    } else if (nft.tokenId.rarity === "Ultra-Rare") {
      rarityMultiplier = 1.5;
    }
    totalUnclaimed += daysElapsed * 1000 * rarityMultiplier;
    console.log("totalUnclaimed", totalUnclaimed);
  });

  // Apply the external NFT flag multiplier if enabled
  if (userData.hasExternalNFTFlag) {
    totalUnclaimed *= 1.5;
  }

  // If no yield is available to claim, return an error
  if (totalUnclaimed <= 0) {
    console.log("No yield available to claim");
    return res.status(400).json({ error: "No yield available to claim" });
  }

  // Now update the user's profile in Supabase using a trusted yield value.
  // (For example, here we update the total_yield field.)
  const supabaseAuth = getSupabaseClientWithAuth(sessionToken);

  const { data: user, error: fetchError } = await supabaseAuth
    .from("users")
    .select("total_yield, total_rewards")
    .eq("address", address)
    .single();

  if (fetchError || !user) {
    logger.error("Error fetching current yield:", fetchError);
    return res.status(500).json({ error: "Error fetching current yield" });
  }

  // Add new yield to existing values
  const newTotalYield = Math.floor(user.total_yield + totalUnclaimed);
  const newTotalRewards = Math.floor(user.total_rewards + totalUnclaimed); // Assuming rewards are cumulative
  console.log(newTotalYield, "newTotalYield");
  console.log(newTotalRewards, "newTotalRewards");
  // Update the new values
  const { data: updateData, error: updateError } = await supabaseAuth
    .from("users")
    .update({
      total_yield: newTotalYield,
      total_rewards: newTotalRewards,
    })
    .eq("address", address)
    .select("*") // Fetch updated row
    .single();

  if (updateError || !updateData) {
    logger.error("Error updating yield in user profile:", updateError);
    return res.status(500).json({ error: "Error updating user yield" });
  }

  logger.log("Yield claimed for user", { address, totalUnclaimed });
  return res.status(200).json({
    success: true,
    totalYield: totalUnclaimed,
  });
}
