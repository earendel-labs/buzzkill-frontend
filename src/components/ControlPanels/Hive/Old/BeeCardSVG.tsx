import { BeeInfo } from "@/types/BeeInfo";
import React from "react";

interface BeeCardProps {
  beeInfo: BeeInfo;
}

const BeeCard: React.FC<BeeCardProps> = ({ beeInfo }) => {
  const {
    beeName,
    attackValue,
    defenceValue,
    forageValue,
    ownerAddress,
    beeURL, // this will be used to fill the bee image space
  } = beeInfo;

  return (
    <div className="bee-card">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="390"
        height="240"
        fill="none"
        viewBox="0 0 390 240"
      >
        <g clipPath="url(#clip0_120_2)">
          <path
            fill="#fff"
            stroke="#000"
            strokeWidth="2"
            d="M2 118.059C2 54.053 54.054 2 118.059 2h153.883c64.006 0 116.06 52.053 116.06 116.059v0c0 64.005-52.054 116.059-116.06 116.059H118.06C54.054 234.118 2 182.064 2 118.059v0z"
          ></path>
          {/* Bee image as a fillable area */}
          <image
            href={beeURL} // Use beeURL to dynamically fill the bee image
            x="55"
            y="50"
            width="100"
            height="100"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#bee_image_clip)" // Ensure the image is clipped properly
          />
          <text x="200" y="80" fontFamily="Verdana" fontSize="20" fill="black">
            {beeName}
          </text>

          <text x="200" y="120" fontFamily="Verdana" fontSize="16" fill="black">
            Owner: {ownerAddress}
          </text>

          <text x="200" y="140" fontFamily="Verdana" fontSize="16" fill="black">
            Attack: {attackValue}
          </text>

          <text x="200" y="160" fontFamily="Verdana" fontSize="16" fill="black">
            Defence: {defenceValue}
          </text>

          <text x="200" y="180" fontFamily="Verdana" fontSize="16" fill="black">
            Forage: {forageValue}
          </text>
        </g>
        <defs>
          <clipPath id="clip0_120_2">
            <rect width="390" height="240" fill="#fff"></rect>
          </clipPath>

          {/* Define the clip path for the bee image */}
          <clipPath id="bee_image_clip">
            <circle cx="105" cy="100" r="50" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default BeeCard;
