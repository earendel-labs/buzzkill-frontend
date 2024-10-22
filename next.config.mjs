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
        ],
      },
    ];
  },
  // Add this section to allow images from 'gateway.pinata.cloud'
  images: {
    domains: ["gateway.pinata.cloud"], // Allows loading images from this domain
  },
};

export default nextConfig;
