import crypto from "crypto"; // ES module import for crypto

const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  webpack(config) {
    // Add SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Add GraphQL file handling
    config.module.rules.push({
      test: /\.(graphql|gql)$/, // Match .graphql and .gql files
      exclude: /node_modules/, // Exclude node_modules
      use: [
        {
          loader: "graphql-tag/loader", // Use graphql-tag loader
        },
      ],
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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gateway.pinata.cloud", // Allows loading images from this domain
        port: "", // No port
        pathname: "/**", // Allow loading all paths
      },
    ],
  },
};

export default nextConfig;
