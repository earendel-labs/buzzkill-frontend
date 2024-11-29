import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { Abi } from "abitype";
import * as dotenv from "dotenv";

dotenv.config();

import BuzzkillHatchlingsNFTABIJson from "./src/app/libs/abi/BuzzkillHatchlingsNFT.json";

const BuzzkillHatchlingsNFTABI = BuzzkillHatchlingsNFTABIJson as Abi;

const hatchlingsAddress = process.env
  .NEXT_PUBLIC_HATCHLINGS_ADDRESS as `0x${string}`;

if (!/^0x[a-fA-F0-9]{40}$/.test(hatchlingsAddress)) {
  throw new Error(
    "Invalid Buzzkill Hatchlings contract address format in .env"
  );
}

export default defineConfig({
  out: "./src/hooks/BuzzkillHatchlingsNFT.ts", // Separate file for this contract
  contracts: [
    {
      name: "BuzzkillHatchlingsNFT",
      abi: BuzzkillHatchlingsNFTABI,
      address: {
        88: hatchlingsAddress,
      },
    },
  ],
  plugins: [react()],
});
