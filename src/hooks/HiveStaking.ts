import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HiveStaking
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const hiveStakingAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_buzzkillHatchlingsNFT",
        internalType: "address",
        type: "address",
      },
      { name: "initialOwner", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "newEnvironments",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "newHives",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "EnvironmentsAndHivesUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "hasExternalNFT",
        internalType: "bool",
        type: "bool",
        indexed: false,
      },
    ],
    name: "ExternalNFTFlagUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "environmentId",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "hiveId",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "totalProduction",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "averageProduction",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "HiveProductionQueried",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "oldMax",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "newMax",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "MaxBeesPerHiveUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "points",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "timestamp",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "PointsClaimed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "common",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "rare",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "ultraRare",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "RarityMultipliersUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "oldRate",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "newRate",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "RewardRateUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "environmentId",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "hiveId",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "timestamp",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Staked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "environmentId",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "hiveId",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "timestamp",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Unstaked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      {
        name: "totalProduction",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "timestamp",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "UserProductionUpdated",
  },
  {
    type: "function",
    inputs: [
      { name: "users", internalType: "address[]", type: "address[]" },
      { name: "flags", internalType: "bool[]", type: "bool[]" },
    ],
    name: "batchSetUserExternalNFTFlag",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "buzzkillHatchlings",
    outputs: [
      {
        name: "",
        internalType: "contract IBuzzkillHatchlings",
        type: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "buzzkillHatchlingsNFT",
    outputs: [{ name: "", internalType: "contract IERC721", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "claimPoints",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "commonMultiplier",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "externalFlagMultiplier",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "userAddress", internalType: "address", type: "address" }],
    name: "getAllStakedNFTsForUser",
    outputs: [
      {
        name: "",
        internalType: "struct HiveStaking.StakedNFT[]",
        type: "tuple[]",
        components: [
          { name: "tokenId", internalType: "uint256", type: "uint256" },
          { name: "stakedAt", internalType: "uint256", type: "uint256" },
          { name: "environmentId", internalType: "uint256", type: "uint256" },
          { name: "hiveId", internalType: "uint256", type: "uint256" },
          { name: "lastClaimedAt", internalType: "uint256", type: "uint256" },
          { name: "owner", internalType: "address", type: "address" },
          {
            name: "rarity",
            internalType: "enum IBuzzkillHatchlings.Rarity",
            type: "uint8",
          },
          { name: "userMultiplier", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "environmentId", internalType: "uint256", type: "uint256" },
      { name: "hiveId", internalType: "uint256", type: "uint256" },
    ],
    name: "getHiveProduction",
    outputs: [
      { name: "totalProduction", internalType: "uint256", type: "uint256" },
      { name: "averageProduction", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "environmentId", internalType: "uint256", type: "uint256" },
      { name: "hiveId", internalType: "uint256", type: "uint256" },
    ],
    name: "getStakedNFTsInHive",
    outputs: [
      {
        name: "",
        internalType: "struct HiveStaking.StakedNFT[]",
        type: "tuple[]",
        components: [
          { name: "tokenId", internalType: "uint256", type: "uint256" },
          { name: "stakedAt", internalType: "uint256", type: "uint256" },
          { name: "environmentId", internalType: "uint256", type: "uint256" },
          { name: "hiveId", internalType: "uint256", type: "uint256" },
          { name: "lastClaimedAt", internalType: "uint256", type: "uint256" },
          { name: "owner", internalType: "address", type: "address" },
          {
            name: "rarity",
            internalType: "enum IBuzzkillHatchlings.Rarity",
            type: "uint8",
          },
          { name: "userMultiplier", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "userAddress", internalType: "address", type: "address" }],
    name: "getUserPoints",
    outputs: [
      { name: "totalPoints", internalType: "uint256", type: "uint256" },
      { name: "claimedPoints", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "hasExternalNFTFlag",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "maxBeesPerHive",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "rareMultiplier",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "rewardRatePerDay",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "newEnvironments", internalType: "uint256", type: "uint256" },
      { name: "newHives", internalType: "uint256", type: "uint256" },
    ],
    name: "setEnvironmentsAndHives",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newMaxBees", internalType: "uint256", type: "uint256" }],
    name: "setMaxBeesPerHive",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_commonMultiplier", internalType: "uint256", type: "uint256" },
      { name: "_rareMultiplier", internalType: "uint256", type: "uint256" },
      {
        name: "_ultraRareMultiplier",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "setRarityMultipliers",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newRate", internalType: "uint256", type: "uint256" }],
    name: "setRewardRate",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "user", internalType: "address", type: "address" },
      { name: "hasNFT", internalType: "bool", type: "bool" },
    ],
    name: "setUserExternalNFTFlag",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "environmentId", internalType: "uint256", type: "uint256" },
      { name: "hiveId", internalType: "uint256", type: "uint256" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
    ],
    name: "stakedNFTsByUser",
    outputs: [
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "stakedAt", internalType: "uint256", type: "uint256" },
      { name: "environmentId", internalType: "uint256", type: "uint256" },
      { name: "hiveId", internalType: "uint256", type: "uint256" },
      { name: "lastClaimedAt", internalType: "uint256", type: "uint256" },
      { name: "owner", internalType: "address", type: "address" },
      {
        name: "rarity",
        internalType: "enum IBuzzkillHatchlings.Rarity",
        type: "uint8",
      },
      { name: "userMultiplier", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
    ],
    name: "stakedNFTsInHive",
    outputs: [
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "stakedAt", internalType: "uint256", type: "uint256" },
      { name: "environmentId", internalType: "uint256", type: "uint256" },
      { name: "hiveId", internalType: "uint256", type: "uint256" },
      { name: "lastClaimedAt", internalType: "uint256", type: "uint256" },
      { name: "owner", internalType: "address", type: "address" },
      {
        name: "rarity",
        internalType: "enum IBuzzkillHatchlings.Rarity",
        type: "uint8",
      },
      { name: "userMultiplier", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalBeesStaked",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalEnvironments",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalHivesPerEnvironment",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "ultraRareMultiplier",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "environmentId", internalType: "uint256", type: "uint256" },
      { name: "hiveId", internalType: "uint256", type: "uint256" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "userInfo",
    outputs: [
      { name: "totalPoints", internalType: "uint256", type: "uint256" },
      { name: "claimedPoints", internalType: "uint256", type: "uint256" },
      { name: "totalProduction", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "userRewardMultiplier",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
    name: "withdrawERC721",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "withdrawEther",
    outputs: [],
    stateMutability: "nonpayable",
  },
  { type: "receive", stateMutability: "payable" },
] as const;

/**
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const hiveStakingAddress = {
  88: "0x9A4CB855295157697958B130d5112E1d3C654A91",
} as const;

/**
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const hiveStakingConfig = {
  address: hiveStakingAddress,
  abi: hiveStakingAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStaking = /*#__PURE__*/ createUseReadContract({
  abi: hiveStakingAbi,
  address: hiveStakingAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"buzzkillHatchlings"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingBuzzkillHatchlings =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "buzzkillHatchlings",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"buzzkillHatchlingsNFT"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingBuzzkillHatchlingsNft =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "buzzkillHatchlingsNFT",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"commonMultiplier"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingCommonMultiplier =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "commonMultiplier",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"externalFlagMultiplier"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingExternalFlagMultiplier =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "externalFlagMultiplier",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"getAllStakedNFTsForUser"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingGetAllStakedNfTsForUser =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "getAllStakedNFTsForUser",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"getHiveProduction"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingGetHiveProduction =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "getHiveProduction",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"getStakedNFTsInHive"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingGetStakedNfTsInHive =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "getStakedNFTsInHive",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"getUserPoints"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingGetUserPoints =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "getUserPoints",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"hasExternalNFTFlag"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingHasExternalNftFlag =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "hasExternalNFTFlag",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"maxBeesPerHive"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingMaxBeesPerHive =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "maxBeesPerHive",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingOwner = /*#__PURE__*/ createUseReadContract({
  abi: hiveStakingAbi,
  address: hiveStakingAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"rareMultiplier"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingRareMultiplier =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "rareMultiplier",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"rewardRatePerDay"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingRewardRatePerDay =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "rewardRatePerDay",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"stakedNFTsByUser"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingStakedNfTsByUser =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "stakedNFTsByUser",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"stakedNFTsInHive"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingStakedNfTsInHive =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "stakedNFTsInHive",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"totalBeesStaked"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingTotalBeesStaked =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "totalBeesStaked",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"totalEnvironments"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingTotalEnvironments =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "totalEnvironments",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"totalHivesPerEnvironment"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingTotalHivesPerEnvironment =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "totalHivesPerEnvironment",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"ultraRareMultiplier"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingUltraRareMultiplier =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "ultraRareMultiplier",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"userInfo"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingUserInfo = /*#__PURE__*/ createUseReadContract({
  abi: hiveStakingAbi,
  address: hiveStakingAddress,
  functionName: "userInfo",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"userRewardMultiplier"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useReadHiveStakingUserRewardMultiplier =
  /*#__PURE__*/ createUseReadContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "userRewardMultiplier",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWriteHiveStaking = /*#__PURE__*/ createUseWriteContract({
  abi: hiveStakingAbi,
  address: hiveStakingAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"batchSetUserExternalNFTFlag"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWriteHiveStakingBatchSetUserExternalNftFlag =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "batchSetUserExternalNFTFlag",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"claimPoints"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWriteHiveStakingClaimPoints =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "claimPoints",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"onERC721Received"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWriteHiveStakingOnErc721Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "onERC721Received",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWriteHiveStakingRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"setEnvironmentsAndHives"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWriteHiveStakingSetEnvironmentsAndHives =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "setEnvironmentsAndHives",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"setMaxBeesPerHive"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWriteHiveStakingSetMaxBeesPerHive =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "setMaxBeesPerHive",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"setRarityMultipliers"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWriteHiveStakingSetRarityMultipliers =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "setRarityMultipliers",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"setRewardRate"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWriteHiveStakingSetRewardRate =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "setRewardRate",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"setUserExternalNFTFlag"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWriteHiveStakingSetUserExternalNftFlag =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "setUserExternalNFTFlag",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWriteHiveStakingStake = /*#__PURE__*/ createUseWriteContract({
  abi: hiveStakingAbi,
  address: hiveStakingAddress,
  functionName: "stake",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWriteHiveStakingTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"unstake"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWriteHiveStakingUnstake = /*#__PURE__*/ createUseWriteContract({
  abi: hiveStakingAbi,
  address: hiveStakingAddress,
  functionName: "unstake",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"withdrawERC721"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWriteHiveStakingWithdrawErc721 =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "withdrawERC721",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"withdrawEther"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWriteHiveStakingWithdrawEther =
  /*#__PURE__*/ createUseWriteContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "withdrawEther",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useSimulateHiveStaking = /*#__PURE__*/ createUseSimulateContract({
  abi: hiveStakingAbi,
  address: hiveStakingAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"batchSetUserExternalNFTFlag"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useSimulateHiveStakingBatchSetUserExternalNftFlag =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "batchSetUserExternalNFTFlag",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"claimPoints"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useSimulateHiveStakingClaimPoints =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "claimPoints",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"onERC721Received"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useSimulateHiveStakingOnErc721Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "onERC721Received",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useSimulateHiveStakingRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"setEnvironmentsAndHives"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useSimulateHiveStakingSetEnvironmentsAndHives =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "setEnvironmentsAndHives",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"setMaxBeesPerHive"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useSimulateHiveStakingSetMaxBeesPerHive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "setMaxBeesPerHive",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"setRarityMultipliers"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useSimulateHiveStakingSetRarityMultipliers =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "setRarityMultipliers",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"setRewardRate"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useSimulateHiveStakingSetRewardRate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "setRewardRate",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"setUserExternalNFTFlag"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useSimulateHiveStakingSetUserExternalNftFlag =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "setUserExternalNFTFlag",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useSimulateHiveStakingStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "stake",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useSimulateHiveStakingTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"unstake"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useSimulateHiveStakingUnstake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "unstake",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"withdrawERC721"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useSimulateHiveStakingWithdrawErc721 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "withdrawERC721",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link hiveStakingAbi}__ and `functionName` set to `"withdrawEther"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useSimulateHiveStakingWithdrawEther =
  /*#__PURE__*/ createUseSimulateContract({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    functionName: "withdrawEther",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWatchHiveStakingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__ and `eventName` set to `"EnvironmentsAndHivesUpdated"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWatchHiveStakingEnvironmentsAndHivesUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    eventName: "EnvironmentsAndHivesUpdated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__ and `eventName` set to `"ExternalNFTFlagUpdated"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWatchHiveStakingExternalNftFlagUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    eventName: "ExternalNFTFlagUpdated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__ and `eventName` set to `"HiveProductionQueried"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWatchHiveStakingHiveProductionQueriedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    eventName: "HiveProductionQueried",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__ and `eventName` set to `"MaxBeesPerHiveUpdated"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWatchHiveStakingMaxBeesPerHiveUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    eventName: "MaxBeesPerHiveUpdated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWatchHiveStakingOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__ and `eventName` set to `"PointsClaimed"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWatchHiveStakingPointsClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    eventName: "PointsClaimed",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__ and `eventName` set to `"RarityMultipliersUpdated"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWatchHiveStakingRarityMultipliersUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    eventName: "RarityMultipliersUpdated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__ and `eventName` set to `"RewardRateUpdated"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWatchHiveStakingRewardRateUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    eventName: "RewardRateUpdated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__ and `eventName` set to `"Staked"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWatchHiveStakingStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    eventName: "Staked",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__ and `eventName` set to `"Unstaked"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWatchHiveStakingUnstakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    eventName: "Unstaked",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link hiveStakingAbi}__ and `eventName` set to `"UserProductionUpdated"`
 *
 * [__View Contract on Viction Vic Scan__](https://vicscan.xyz/address/0x9A4CB855295157697958B130d5112E1d3C654A91)
 */
export const useWatchHiveStakingUserProductionUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: hiveStakingAbi,
    address: hiveStakingAddress,
    eventName: "UserProductionUpdated",
  });
