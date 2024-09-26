import { Chain } from "@rainbow-me/rainbowkit";

export const vicTestNet = {
  id: 89,
  name: "Viction Testnet",
  iconUrl:
    "https://s3.coinmarketcap.com/static-gravity/image/27a84e20e6274f779fc947f526476253.jpg",
  nativeCurrency: {
    decimals: 18,
    name: "Viction",
    symbol: "VIC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.viction.xyz"],
      webSocket: ["wss://ws-testnet.viction.xyz"],
    },
    public: {
      http: ["https://rpc-testnet.viction.xyz"],
      webSocket: ["wss://ws-testnet.viction.xyz"],
    },
  },
  blockExplorers: {
    default: { name: "VicScan", url: "https://testnet.vicscan.xyz" },
  },
} as const satisfies Chain;

export const vicMainnet = {
  id: 88,
  name: "Viction",
  iconUrl:
    "https://s3.coinmarketcap.com/static-gravity/image/27a84e20e6274f779fc947f526476253.jpg",
  nativeCurrency: {
    decimals: 18,
    name: "Viction",
    symbol: "VIC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.viction.xyz	"],
      webSocket: ["wss://ws.viction.xyz"],
    },
    public: {
      http: ["https://rpc.viction.xyz	"],
      webSocket: ["wss://ws.viction.xyz"],
    },
  },
  blockExplorers: {
    default: { name: "VicScan", url: "https://www.vicscan.xyz" },
  },
} as const satisfies Chain;
