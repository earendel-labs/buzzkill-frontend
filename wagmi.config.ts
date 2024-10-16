// wagmi.config.ts
import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { Abi } from "abitype";

// Import the ABI JSON file directly
import BuzzkillHatchlingsNFTABIJson from "./src/app/libs/abi/BuzzkillHatchlingsNFT.json";
const BuzzkillHatchlingsNFTABI = BuzzkillHatchlingsNFTABIJson as Abi;

export default defineConfig({
  out: "./lib/hooks",
  contracts: [
    {
      name: "BuzzkillHatchlingsNFT",
      abi: BuzzkillHatchlingsNFTABI, // Directly use the imported ABI
      address: {
        89: "0x4837AbB3E0A9Ec8957448f80E2332F82676D4C80",
      },
    },
  ],
  plugins: [react()],
});
