import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { Abi } from "abitype";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Import the ABI JSON file directly
import BuzzkillHatchlingsNFTABIJson from "./src/app/libs/abi/BuzzkillHatchlingsNFT.json";
const BuzzkillHatchlingsNFTABI = BuzzkillHatchlingsNFTABIJson as Abi;

// Ensure the contract address is formatted as `0x${string}`
const hatchlingsAddress = process.env
  .NEXT_PUBLIC_HATCHLINGS_ADDRESS as `0x${string}`;

// Validate the address format
if (!/^0x[a-fA-F0-9]{40}$/.test(hatchlingsAddress)) {
  throw new Error("Invalid contract address format in .env");
}

export default defineConfig({
  out: "./src/hooks/BuzzkillHatchlingsNFT.ts",
  contracts: [
    {
      name: "BuzzkillHatchlingsNFT",
      abi: BuzzkillHatchlingsNFTABI, // Directly use the imported ABI
      address: {
        89: hatchlingsAddress, // Use the address from the .env file
      },
    },
  ],
  plugins: [react()],
});
