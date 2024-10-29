import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { Abi } from "abitype";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Import the ABI JSON files directly
import BuzzkillHatchlingsNFTABIJson from "./src/app/libs/abi/BuzzkillHatchlingsNFT.json";
import HiveStakingABIJson from "./src/app/libs/abi/HiveStaking.json";

const BuzzkillHatchlingsNFTABI = BuzzkillHatchlingsNFTABIJson as Abi;
const HiveStakingABI = HiveStakingABIJson as Abi;

// Ensure the contract addresses are formatted as `0x${string}`
const hatchlingsAddress = process.env
  .NEXT_PUBLIC_HATCHLINGS_ADDRESS as `0x${string}`;
const hiveStakingAddress = process.env
  .NEXT_PUBLIC_HIVE_STAKING_ADDRESS as `0x${string}`;

// Validate the address formats
if (!/^0x[a-fA-F0-9]{40}$/.test(hatchlingsAddress)) {
  throw new Error("Invalid Buzzkill Hatchlings contract address format in .env");
}

if (!/^0x[a-fA-F0-9]{40}$/.test(hiveStakingAddress)) {
  throw new Error("Invalid Hive Staking contract address format in .env");
}

export default defineConfig({
  out: "./src/hooks/HiveStaking.ts",
  contracts: [
    {
      name: "BuzzkillHatchlingsNFT",
      abi: BuzzkillHatchlingsNFTABI, // Directly use the imported ABI
      address: {
        89: hatchlingsAddress, // Use the address from the .env file
      },
    },
    {
      name: "HiveStaking",
      abi: HiveStakingABI, // Directly use the imported ABI
      address: {
        89: hiveStakingAddress, // Use the address from the .env file
      },
    },
  ],
  plugins: [react()],
});
