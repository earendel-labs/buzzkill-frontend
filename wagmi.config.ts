// wagmi.config.ts
import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { Abi } from "abitype";

// Import the ABI JSON file directly
import BuzzkillHatchlingsNFTABIJson from "./src/app/libs/abi/BuzzkillHatchlingsNFT.json";
const BuzzkillHatchlingsNFTABI = BuzzkillHatchlingsNFTABIJson as Abi;

export default defineConfig({
  out: "./src/hooks/BuzzkillHatchlingsNFT.ts",
  contracts: [
    {
      name: "BuzzkillHatchlingsNFT",
      abi: BuzzkillHatchlingsNFTABI, // Directly use the imported ABI
      address: {
        89: "0xA916b8758fAD4BFb2d91f37d2c77A90B84b10BC9",
      },
    },
  ],
  plugins: [react()],
});
