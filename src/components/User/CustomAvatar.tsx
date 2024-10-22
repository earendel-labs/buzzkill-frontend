import { useState, useEffect } from "react";
import { AvatarComponent } from "@rainbow-me/rainbowkit";
import Skeleton from "@mui/material/Skeleton";

const CACHE_KEY = "avatar_cache"; // Key for localStorage
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // Cache expiry set to 24 hours

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  const defaultAvatar = "/NFTs/Avatar.svg";
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Safely access localStorage
  const isLocalStorageAvailable = () => {
    try {
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Function to cache the image in localStorage
  const cacheImage = (address: string, imgSrc: string) => {
    if (isLocalStorageAvailable()) {
      const cachedData = {
        timestamp: Date.now(),
        imageSrc: imgSrc,
      };
      try {
        localStorage.setItem(
          `${CACHE_KEY}_${address}`,
          JSON.stringify(cachedData)
        );
      } catch (error) {
        console.error("Error saving image to localStorage:", error);
      }
    }
  };

  // Function to retrieve the cached image, checking expiration
  const getCachedImage = (address: string): string | null => {
    if (!isLocalStorageAvailable()) return null;

    const cachedData = localStorage.getItem(`${CACHE_KEY}_${address}`);
    if (cachedData) {
      const { imageSrc, timestamp } = JSON.parse(cachedData);
      const isExpired = Date.now() - timestamp > CACHE_EXPIRY;
      if (!isExpired) {
        return imageSrc;
      } else {
        localStorage.removeItem(`${CACHE_KEY}_${address}`); // Clean up expired cache
      }
    }
    return null;
  };

  // Load the image (either from cache or fetch a new one)
  const loadImage = () => {
    const cachedImage = getCachedImage(address);
    if (cachedImage) {
      setImageSrc(cachedImage);
      setLoading(false);
    } else {
      const img = new Image();
      img.src = ensImage ? ensImage : defaultAvatar;
      img.onload = () => {
        setImageSrc(img.src);
        cacheImage(address, img.src); // Cache the image
        setLoading(false);
      };
      img.onerror = () => {
        setImageSrc(defaultAvatar); // Fallback to default if loading fails
        setLoading(false);
      };
    }
  };

  // Use effect to load the image when component mounts
  useEffect(() => {
    loadImage();

    // Set up interval to periodically check for a new ensImage (e.g., every 10 minutes)
    const interval = setInterval(() => {
      if (ensImage && ensImage !== imageSrc) {
        loadImage(); // Re-fetch the image if ensImage has changed
      }
    }, 10 * 60 * 1000); // Check every 10 minutes

    return () => clearInterval(interval); // Clear interval on unmount
  }, [ensImage, address]);

  return loading ? (
    <Skeleton variant="circular" width={size} height={size} />
  ) : (
    <img
      src={imageSrc || defaultAvatar}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
      alt={ensImage ? "ENS Avatar" : "Default Avatar"}
    />
  );
};

export default CustomAvatar;
