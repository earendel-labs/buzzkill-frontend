import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers"; // Make sure you're importing ethers correctly
import {
  buzzkillHatchlingsNftAbi,
  buzzkillHatchlingsNftAddress,
} from "@/hooks/BuzzkillHatchlingsNFT";

const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL); // Use ethers.JsonRpcProvider correctly

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { address } = req.query;

    if (!address || typeof address !== "string") {
      return res
        .status(400)
        .json({ error: "Invalid or missing Ethereum address." });
    }

    // Create the contract instance
    const contract = new ethers.Contract(
      buzzkillHatchlingsNftAddress[89], // Assuming 89 is the network ID for your contract
      buzzkillHatchlingsNftAbi,
      provider
    );

    // Fetch the balance of NFTs for the address
    const balanceOf = await contract.balanceOf(address, 1); // Assuming 1 is the ID for the hatchlings
    const balanceCount = balanceOf.toNumber(); // Convert balance to a number

    const hatchlings = [];

    // Fetch the URI for each NFT
    for (let i = 0; i < balanceCount; i++) {
      const uri = await contract.uri(i + 1); // Fetch the URI for each hatchling
      hatchlings.push({
        id: i + 1,
        uri,
        status: "Free", // Default status, you can update this with real data
        environment: null, // Add environment data if needed
      });
    }

    return res.status(200).json({ hatchlings });
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return res.status(500).json({ error: "Failed to fetch NFTs" });
  }
}
