// utils/fetchMetaData.ts
import { logger } from "@/utils/logger";

const ipfsGateways = [
  "https://gateway.pinata.cloud/ipfs/",
  "https://ipfs.io/ipfs/",
  "https://dweb.link/ipfs/",
];

/**
 * Fetch metadata from either:
 *  • a full HTTP(S) URL
 *  • an ipfs:// URI
 *  • a bare CID/path
 */
export async function fetchMetadata(metadataUri: string) {
  // 1) If it already looks like a web URL, just fetch it directly:
  if (/^https?:\/\//i.test(metadataUri)) {
    try {
      const res = await fetch(metadataUri);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const meta = await res.json();
      // resolve image field (might be ipfs:// or http://…)
      return normalizeImageUrl(meta.image);
    } catch (err) {
      logger.error("[fetchMetadata] direct fetch failed:", err);
      return "/default-image.png";
    }
  }

  // 2) Otherwise assume it's an IPFS path or ipfs://… and try gateways:
  const stripped = metadataUri.replace(/^ipfs:\/\//i, "");
  for (const gateway of ipfsGateways) {
    const url = gateway + stripped;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Gateway ${gateway} → ${res.status}`);
      const meta = await res.json();
      return normalizeImageUrl(meta.image);
    } catch (err) {
      logger.warn("[fetchMetadata] gateway failed:", gateway, err);
    }
  }

  logger.error("[fetchMetadata] all gateways failed");
  return "/default-image.png";
}

/** Turn the metadata.image field into a usable HTTP URL */
function normalizeImageUrl(imageField: string): string {
  if (/^https?:\/\//i.test(imageField)) {
    return imageField;
  }
  const stripped = imageField.replace(/^ipfs:\/\//i, "");
  // pick your preferred gateway, or cycle through again
  return `https://gateway.pinata.cloud/ipfs/${stripped}`;
}
