import React from "react";
import { BeeInfo } from "@/types/BeeInfo";
import { Skeleton } from "@mui/material";

type BeeCardBackgroundProps = {
  bee: BeeInfo;
  isLoading: boolean;
};

const BeeCardBackground: React.FC<BeeCardBackgroundProps> = ({
  bee,
  isLoading,
}) => {
  return (
    <svg
      width="100%"
      height="auto"
      viewBox="0 0 285 462"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="BeeFrameBackground">
        <g id="bee_details_panel">
          <g id="background_frame_decorator">
            <g filter="url(#filter0_ii_822401_1657)">
              <path
                d="M283 61.2278V2H153.407L146.471 2.00045L139.539 2H53.268L2 2.00045V99.0928L3.14118 321.926V460H53.2424L139.539 458.969H146.471H153.402H283V399.741V61.2278Z"
                fill="url(#paint0_linear_822401_1657)"
                fillOpacity="0.85"
              />
            </g>
            <path
              d="M283 61.2278V2H153.407L146.471 2.00045L139.539 2H53.268L2 2.00045V99.0928L3.14118 321.926V460H53.2424L139.539 458.969H146.471H153.402H283V399.741V61.2278Z"
              stroke="url(#paint1_linear_822401_1657)"
              strokeWidth="3"
              strokeMiterlimit="10"
            />
          </g>
          <g id="frame_decorator">
            {/* Dynamically replace the background path with the actual bee image */}
            {/* Use skeleton if loading */}
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                width={281}
                height={330}
                sx={{ borderRadius: "4px" }}
              />
            ) : (
              <image
                href={bee.beeURL}
                x="2"
                y="2"
                width="281"
                height="330"
                preserveAspectRatio="xMidYMid slice"
              />
            )}

            {/* Keeping the stroke path */}
            <path
              d="M283 44.5457V2H153.407L146.471 2.00032L139.539 2H53.268L2 2.00032V71.7457L3.14118 231.816V331H53.2424L139.539 330.259H146.471H153.402H283V287.713V44.5457Z"
              stroke="url(#paint2_linear_822401_1657)"
              strokeWidth="3"
              strokeMiterlimit="10"
            />

            <path
              id="Vector"
              d="M210.022 328.817L222.409 319.248H273.383V228.193L281.685 213.989"
              stroke="url(#paint3_linear_822401_1657)"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
            <path
              id="Vector_2"
              d="M74.9805 330.533L62.5393 320.87H11.3383V228.922L2.99989 214.579"
              stroke="url(#paint4_linear_822401_1657)"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
            <path
              id="Vector_3"
              d="M210.022 3.00293L223.835 11.9779H249.248H274.661V99.4036L282.999 113.747"
              stroke="url(#paint5_linear_822401_1657)"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
            <path
              id="Vector_4"
              d="M77.4434 3.00293L63.6308 11.3895H38.2183H12.8059V93.0836L4.46747 106.486"
              stroke="url(#paint6_linear_822401_1657)"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </g>
        </g>
      </g>
      {/* Defining filters and gradients */}
      <defs>
        <filter
          id="filter0_ii_822401_1657"
          x="-1.5"
          y="-1.5"
          width="288"
          height="465"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-2" dy="-2" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_822401_1657"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_822401_1657"
            result="effect2_innerShadow_822401_1657"
          />
        </filter>
        <filter
          id="filter1_ii_822401_1657"
          x="-1.5"
          y="-1.5"
          width="288"
          height="336"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-2" dy="-2" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_822401_1657"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_822401_1657"
            result="effect2_innerShadow_822401_1657"
          />
        </filter>
        <linearGradient
          id="paint0_linear_822401_1657"
          x1="299.755"
          y1="-42.0408"
          x2="299.755"
          y2="468.479"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.142606" stopColor="#242E4E" />
          <stop offset="0.499178" stopColor="#121727" />
          <stop offset="0.926392" stopColor="#202946" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_822401_1657"
          x1="142.5"
          y1="459.967"
          x2="142.5"
          y2="2"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.272426" stopColor="#E9B743" />
          <stop offset="0.694476" stopColor="#68341B" />
          <stop offset="0.98" stopColor="#E9B743" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_822401_1657"
          x1="142.5"
          y1="330.976"
          x2="142.5"
          y2="2"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E9B743" />
          <stop offset="0.485" stopColor="#68341B" />
          <stop offset="0.98" stopColor="#E9B743" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_822401_1657"
          x1="270.936"
          y1="213.998"
          x2="215.156"
          y2="325.961"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#936029" />
          <stop offset="0.33" stopColor="#E9B743" />
          <stop offset="0.7" stopColor="#68341B" />
          <stop offset="1" stopColor="#E9B743" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_822401_1657"
          x1="11.7674"
          y1="214.587"
          x2="68.2745"
          y2="327.409"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#936029" />
          <stop offset="0.33" stopColor="#E9B743" />
          <stop offset="0.7" stopColor="#68341B" />
          <stop offset="1" stopColor="#E9B743" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_822401_1657"
          x1="246.511"
          y1="113.739"
          x2="246.511"
          y2="3.00293"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#936029" />
          <stop offset="0.33" stopColor="#E9B743" />
          <stop offset="0.7" stopColor="#68341B" />
          <stop offset="1" stopColor="#E9B743" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_822401_1657"
          x1="40.9554"
          y1="106.479"
          x2="40.9554"
          y2="3.00293"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#936029" />
          <stop offset="0.33" stopColor="#E9B743" />
          <stop offset="0.7" stopColor="#68341B" />
          <stop offset="1" stopColor="#E9B743" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BeeCardBackground;