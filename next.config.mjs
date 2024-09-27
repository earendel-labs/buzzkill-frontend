import crypto from "crypto"; // ES module import for crypto

const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async headers() {
    const nonce = crypto.randomBytes(16).toString("base64");

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
        default-src 'self'; 
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://trusted-scripts.com https://cdn.walletconnect.com https://*.rainbow.me https://*.walletconnect.com https://va.vercel-scripts.com; 
      connect-src 'self' https://rpc-testnet.viction.xyz https://explorer-api.walletconnect.com https://*.walletconnect.com https://*.rainbow.me https://*.infura.io https://*.alchemyapi.io; 
      object-src 'none'; 
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.rainbow.me https://*.walletconnect.com; 
      font-src 'self' https://fonts.gstatic.com https://*.walletconnect.com https://*.rainbow.me; 
      img-src 'self' https://explorer-api.walletconnect.com https://*.walletconnect.com https://*.rainbow.me data:; 
      frame-ancestors 'self';
    `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
