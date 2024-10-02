import { AvatarComponent } from "@rainbow-me/rainbowkit";

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  const defaultAvatar = "/NFTs/Avatar.svg";
  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
      alt="ENS Avatar"
    />
  ) : (
    <img
      src={defaultAvatar}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
      alt="Default Avatar"
    />
  );
};

export default CustomAvatar;
