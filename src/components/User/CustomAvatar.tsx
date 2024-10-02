import { useState, useEffect } from "react";
import { AvatarComponent } from "@rainbow-me/rainbowkit";
import Skeleton from "@mui/material/Skeleton";

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  const defaultAvatar = "/NFTs/Avatar.svg";
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = ensImage ? ensImage : defaultAvatar;
    img.onload = () => {
      setImageSrc(img.src);
      setLoading(false);
    };
  }, [ensImage]);

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
