// List of IPFS gateways for fallback
const ipfsGateways = [
  "https://ipfs.io/ipfs/",
  "https://gateway.pinata.cloud/ipfs/",
  "https://dweb.link/ipfs/",
];

/**
 * Convert IPFS URI to an HTTP URL with gateway fallback.
 */
const ipfsToHttp = (ipfsUri: string, gatewayIndex: number = 0) => {
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
    const url = ipfsToHttp(metadataUri, i);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Gateway error: ${response.status}`);
      }

      const metadata = await response.json();
      const imageUrl = ipfsToHttp(metadata.image, i); // Resolve image URL
      return imageUrl;
    } catch (err) {
      // Continue to the next gateway on error
      console.warn(
        `Error fetching from gateway ${ipfsGateways[i]}:`,
        err.message
      );
    }
  }

  // If all gateways fail, return a fallback image
  console.error("All IPFS gateways failed. Returning default image.");
  return "/default-image.png";
}
