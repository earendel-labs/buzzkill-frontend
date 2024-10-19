import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation"; // Updated hook
import {
  useReadBuzzkillHatchlingsNftBalanceOf,
  useReadBuzzkillHatchlingsNftUri,
} from "@/hooks/BuzzkillHatchlingsNFT";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";

// Define the type for hatchlings
interface Hatchling {
  id: number;
  imageAddress: string;
  status: string;
  environment: string | null;
}

// Styled component for hover effect and layout
const BeeCard = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: "4px",
  height: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 0px 10px 5px rgba(255, 255, 255, 0.8)",
  },
}));

// Styled chip components
const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => ({
  backgroundColor: status === "Free" ? "green" : theme.palette.Blue.main,
  color: "white",
  borderRadius: "2px",
}));

const EnvironmentChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.DarkBlue.main,
  color: "white",
  borderRadius: "2px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.DarkBlue.light,
  },
  "&:active": {
    backgroundColor: theme.palette.DarkBlue.main,
  },
}));

const MyBeesTab = () => {
  const { address } = useAccount(); // Get connected user's address
  const [myBees, setMyBees] = useState<Hatchling[]>([]); // Initialize as typed array
  const [loading, setLoading] = useState(true); // Keep track of loading state
  const [loadedBeesCount, setLoadedBeesCount] = useState(0); // Track number of loaded bees
  const itemsPerLoad = 8; // Number of items to load per "page"
  const observerRef = useRef<IntersectionObserver | null>(null); // Reference to the Intersection Observer
  const [imageUrl, setImageUrl] = useState<string | null>(null); // To store the URI once fetched
  const [fetchError, setFetchError] = useState(false); // Track if there's an error during fetching
  const router = useRouter(); // Updated router hook

  // Hook to fetch balance
  const { data: balanceOf } = useReadBuzzkillHatchlingsNftBalanceOf({
    args: [address || "0x0000000000000000000000000000000000000000", BigInt(1)], // Get the balance of hatchlings
  });

  const { data: uri } = useReadBuzzkillHatchlingsNftUri({
    args: [BigInt(1)], // Fetch URI once for all hatchlings
  });

  // Convert IPFS URI to an HTTP URL
  const ipfsToHttp = (ipfsUri: string) => {
    if (ipfsUri.startsWith("ipfs://")) {
      return ipfsUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
    }
    return ipfsUri;
  };

  // Fetch metadata and extract image URLs
  const fetchMetadata = async (metadataUri: string) => {
    try {
      const response = await fetch(ipfsToHttp(metadataUri));
      const metadata = await response.json();
      return ipfsToHttp(metadata.image); // Convert the image IPFS URL to HTTP
    } catch (err) {
      console.error("Failed to fetch metadata:", err);
      setFetchError(true);
      return "/default-image.png"; // Fallback to a default image
    }
  };

  // Fetch Hatchlings
  const fetchHatchlings = async () => {
    const balanceAsNumber = Number(balanceOf?.valueOf() || 0); // Convert balanceOf to number
    if (!balanceOf || !address || !imageUrl || balanceAsNumber === 0) {
      setLoading(false); // Stop loading if user has no bees
      return;
    }

    const hatchlings: Hatchling[] = []; // Explicitly type hatchlings array
    const totalBeesToLoad = Math.min(
      loadedBeesCount + itemsPerLoad,
      balanceAsNumber
    ); // Calculate how many bees to load

    for (let i = loadedBeesCount; i < totalBeesToLoad; i++) {
      hatchlings.push({
        id: i + 1,
        imageAddress: imageUrl || "/default-image.png",
        status: "Free", // Default status, update if you have staking data
        environment: null, // Add if needed
      });
    }

    setMyBees((prev) => {
      // Prevent duplicate IDs by filtering out already loaded hatchlings
      const existingIds = new Set(prev.map((bee) => bee.id));
      const newHatchlings = hatchlings.filter(
        (bee) => !existingIds.has(bee.id)
      );
      return [...prev, ...newHatchlings];
    });

    setLoadedBeesCount(totalBeesToLoad); // Update the loaded count
    setLoading(false); // Stop loading once data is fetched
  };

  useEffect(() => {
    // Fetch the URI only once and store the image URL
    const getUriOnce = async () => {
      const balanceAsNumber = Number(balanceOf?.valueOf() || 0); // Convert balanceOf to number
      if (uri && !imageUrl && balanceAsNumber > 0) {
        const image = await fetchMetadata(uri);
        setImageUrl(image); // Set the image URL
      }
    };
    getUriOnce();
  }, [uri, balanceOf]); // Only fetch once when the URI and balance are available

  useEffect(() => {
    const balanceAsNumber = Number(balanceOf?.valueOf() || 0); // Convert balanceOf to number
    if (balanceOf && address && imageUrl && balanceAsNumber > 0) {
      setLoading(true); // Start loading
      fetchHatchlings(); // Fetch the data
    } else if (balanceAsNumber === 0) {
      setLoading(false); // Stop loading if no bees
    }
  }, [balanceOf, address, imageUrl]); // Trigger when balance, address, or imageUrl changes

  // Create Intersection Observer to load more bees when the sentinel is visible
  useEffect(() => {
    const sentinel = document.querySelector("#sentinel");
    const balanceAsNumber = Number(balanceOf?.valueOf() || 0); // Convert balanceOf to number

    if (sentinel && balanceOf && balanceAsNumber > 0 && !fetchError) {
      const options = {
        root: null, // use the viewport as root
        rootMargin: "100px", // load more content when 100px away from bottom
        threshold: 0.1, // trigger when 10% of the sentinel is visible
      };

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && loadedBeesCount < balanceAsNumber) {
          setLoading(true); // Start loading
          fetchHatchlings(); // Fetch more data when the sentinel becomes visible
        }
      }, options);

      observerRef.current.observe(sentinel);
    }

    return () => {
      // Clean up the observer on unmount
      if (observerRef.current && sentinel) {
        observerRef.current.unobserve(sentinel);
      }
    };
  }, [balanceOf, loadedBeesCount, fetchError]); // Only re-run when balance, loadedBeesCount, or error state changes

  // Handle button click and manually set loading state
  const handleMintClick = () => {
    setLoading(true); // Set loading before navigating
    router.push("/Mint"); // Navigate to the Mint page
  };

  return (
    <Box>
      <Typography variant="h5" color="white" sx={{ mb: 4 }}>
        My Bees
      </Typography>
      <Grid container spacing={3}>
        {!loading && myBees.length === 0 && !fetchError ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            flexGrow={1} // Ensure it grows to fill the remaining space
            height="65vh" // Set height to ensure vertical centering
          >
            <Typography marginTop="24px">
              No Bees Found. Mint yours here
            </Typography>
            <Button
              className="blueButton"
              sx={{ mt: 2, minWidth: 200 }} // Adjust button width and spacing
              onClick={handleMintClick} // Use the updated handler
            >
              Mint
            </Button>
          </Box>
        ) : (
          myBees.map((bee) => (
            <Grid item xs={6} sm={4} md={3} key={`bee-${bee.id}`}>
              {" "}
              {/* Unique key */}
              <BeeCard>
                {/* Overlay the Hatchling ID on the top-left of the image */}
                <Typography
                  variant="body2"
                  color="white"
                  sx={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  Hatchling ID: {bee.id}
                </Typography>
                <Box
                  component="img"
                  src={bee.imageAddress} // Use `imageAddress` instead of `bee.uri`
                  alt={`Hatchling ${bee.id}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <StatusChip
                    label={bee.status || "Free"}
                    status={bee.status || "Free"}
                  />

                  {bee.status === "Staked" && bee.environment && (
                    <EnvironmentChip
                      label={bee.environment}
                      onClick={() =>
                        console.log(`Navigate to ${bee.environment}`)
                      }
                    />
                  )}
                </Box>
              </BeeCard>
            </Grid>
          ))
        )}
      </Grid>

      {/* Sentinel element to trigger loading more items */}
      <Box id="sentinel" sx={{ height: "20px", visibility: "hidden" }} />

      {loading && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="vh" // Make sure it takes up most of the page for proper centering
          flexGrow={1}
        >
          <HexagonSpinner />
          <Typography marginTop="24px">Fetching data...</Typography>
        </Box>
      )}

      {fetchError && (
        <Typography variant="h6" color="error">
          Failed to load hatchlings, please try again later.
        </Typography>
      )}
    </Box>
  );
};

export default MyBeesTab;
