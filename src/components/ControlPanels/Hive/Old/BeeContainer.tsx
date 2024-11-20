import React from "react";

interface BeeContainerProps {
  imageUrl: string;
}

const BeeContainer: React.FC<BeeContainerProps> = ({ imageUrl }) => {
  return (
    <svg
      width="165"
      height="164"
      viewBox="0 0 165 164"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Bee Container">
        <g id="Frame">
          <image href={imageUrl} x="5" y="1" width="155" height="153" />
          <path
            d="M160 1.00488H5.00586V154.919H160V1.00488Z"
            stroke="url(#paint0_linear)"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M5 100.299L11.7947 107.046V148.173H53.2102L60.0048 154.921"
            stroke="url(#paint1_linear)"
            strokeMiterlimit="10"
          />
          <path
            d="M5 55.6217L11.7947 48.8743V7.74735H53.2102L60.0048 1"
            stroke="url(#paint2_linear)"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M104.995 154.921L111.79 148.173H153.205V107.046L160 100.299"
            stroke="url(#paint3_linear)"
            strokeMiterlimit="10"
          />
          <path
            d="M104.995 1L111.79 7.74735H153.205V48.8743L160 55.6217"
            stroke="url(#paint4_linear)"
            strokeMiterlimit="10"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="82.5027"
          y1="154.908"
          x2="82.5027"
          y2="1.00488"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.065" stopColor="#68341B" />
          <stop offset="0.77" stopColor="#E9B743" />
          <stop offset="0.98" stopColor="#E9B743" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="32.5024"
          y1="154.917"
          x2="32.5024"
          y2="100.299"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.065" stopColor="#68341B" />
          <stop offset="0.77" stopColor="#E9B743" />
          <stop offset="0.98" stopColor="#E9B743" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="32.5024"
          y1="55.6177"
          x2="32.5024"
          y2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.065" stopColor="#68341B" />
          <stop offset="0.77" stopColor="#E9B743" />
          <stop offset="0.98" stopColor="#E9B743" />
        </linearGradient>
        <linearGradient
          id="paint3_linear"
          x1="132.498"
          y1="154.917"
          x2="132.498"
          y2="100.299"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.065" stopColor="#68341B" />
          <stop offset="0.77" stopColor="#E9B743" />
          <stop offset="0.98" stopColor="#E9B743" />
        </linearGradient>
        <linearGradient
          id="paint4_linear"
          x1="132.498"
          y1="55.6177"
          x2="132.498"
          y2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.065" stopColor="#68341B" />
          <stop offset="0.77" stopColor="#E9B743" />
          <stop offset="0.98" stopColor="#E9B743" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BeeContainer;
