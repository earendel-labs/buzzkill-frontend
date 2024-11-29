// Fetch metadata for NFTs
export async function fetchMetadata (metadataUri: string)
{
  try {
    const response = await fetch(ipfsToHttp(metadataUri));
    const metadata = await response.json();
    return ipfsToHttp(metadata.image);
  } catch (err) {
    console.error("Failed to fetch metadata:", err);
    return "/default-image.png"; // Fallback image
  }
};

const ipfsToHttp = (ipfsUri: string) => {
  if (ipfsUri.startsWith("ipfs://")) {
    return ipfsUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
  }
  return ipfsUri;
};
