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
  const fetchPromises = ipfsGateways.map((gateway, index) => {
    const url = ipfsToHttp(metadataUri, index);
    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(`Gateway error: ${response.status}`);
      }
      return response.json();
    });
  });

  for (let i = 0; i < fetchPromises.length; i++) {
    try {
      const metadata = await fetchPromises[i];
      const imageUrl = ipfsToHttp(metadata.image, i); // Resolve image URL
      return imageUrl;
    } catch (err) {
      // Silently handle errors without logging warnings
    }
  }

  // If all gateways fail, return a fallback image
  console.error("All IPFS gateways failed. Returning default image.");
  return "/default-image.png";
}
