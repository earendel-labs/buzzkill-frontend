import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { Abi } from "abitype";
import * as dotenv from "dotenv";

dotenv.config();

import HiveStakingABIJson from "./src/app/libs/abi/HiveStaking.json";

const HiveStakingABI = HiveStakingABIJson as Abi;

const hiveStakingAddress = process.env
  .NEXT_PUBLIC_HIVE_STAKING_ADDRESS as `0x${string}`;

if (!/^0x[a-fA-F0-9]{40}$/.test(hiveStakingAddress)) {
  throw new Error("Invalid Hive Staking contract address format in .env");
}

export default defineConfig({
  out: "./src/hooks/HiveStaking.ts", // Separate file for this contract
  contracts: [
    {
      name: "HiveStaking",
      abi: HiveStakingABI,
      address: {
        88: hiveStakingAddress,
      },
    },
  ],
  plugins: [react()],
});
