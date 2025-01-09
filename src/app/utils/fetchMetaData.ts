// List of IPFS gateways for fallback
const ipfsGateways = [
  "https://ipfs.io/ipfs/",
  "https://gateway.pinata.cloud/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
  "https://dweb.link/ipfs/",
];

/**
 * Convert IPFS URI to an HTTP URL with gateway fallback.
 */
const ipfsToHttp = (ipfsUri: string, gatewayIndex: number = 0): string => {
  if (ipfsUri.startsWith("ipfs://")) {
    const cidAndPath = ipfsUri.replace("ipfs://", "");
    return ipfsGateways[gatewayIndex] + cidAndPath;
  }
  return ipfsUri;
};

/**
 * Fetch metadata for NFTs with gateway fallback.
 */
export async function fetchMetadata(metadataUri: string) {
  for (let i = 0; i < ipfsGateways.length; i++) {
    try {
      // Attempt to fetch metadata from the current gateway
      const response = await fetch(ipfsToHttp(metadataUri, i));
      if (response.ok) {
        const metadata = await response.json();
        return ipfsToHttp(metadata.image, i); // Resolve image URL
      } else {
        console.warn(
          `Gateway failed: ${ipfsToHttp(metadataUri, i)} (status: ${
            response.status
          })`
        );
      }
    } catch (err) {
      console.error(
        `Error fetching metadata from ${ipfsToHttp(metadataUri, i)}:`,
        err
      );
    }
  }

  // If all gateways fail, return a fallback image
  console.error("All IPFS gateways failed. Returning default image.");
  return "/default-image.png";
}
