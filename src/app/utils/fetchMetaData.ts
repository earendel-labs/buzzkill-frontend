import { logger } from "@/app/utils/logger";

// List of IPFS gateways for fallback
const ipfsGateways = [
  "https://gateway.pinata.cloud/ipfs/",
  "https://ipfs.io/ipfs/",
  "https://dweb.link/ipfs/",
];

/**
 * Fetch metadata for NFTs with gateway fallback.
 */
export async function fetchMetadata(metadataUri: string) {
  for (let i = 0; i < ipfsGateways.length; i++) {
    const url = ipfsGateways[i] + metadataUri.replace("ipfs://", "");
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Gateway error: ${response.status}`);
      }

      const metadata = await response.json();
      // Use the successful gateway URL to resolve the image
      const imageUrl = ipfsGateways[i] + metadata.image.replace("ipfs://", "");
      logger.log(imageUrl);
      return imageUrl;
    } catch (err) {
      // Safely handle 'err' of type 'unknown'
      const errorMessage = err instanceof Error ? err.message : String(err);
      logger.warn(
        `Error fetching from gateway ${ipfsGateways[i]}:`,
        errorMessage
      );
    }
  }

  // If all gateways fail, return a fallback image
  logger.error("All IPFS gateways failed. Returning default image.");
  return "/default-image.png";
}
