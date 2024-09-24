import * as React from "react";
import { useEffect, useState } from "react";
import { useSound } from "@/context/SoundContext";
import MyBeesModal from "@/components/Modals/MyBees/MyBees"; // Adjust the import path accordingly

interface SvgBeeStatsPanelProps extends React.SVGProps<SVGSVGElement> {
  energyValue?: string;
  healthValue?: string;
  productivityValue?: string;
  attackValue?: string;
  defenceValue?: string;
  forageValue?: string;
  energyBarLength?: number;
  activityBarLength?: number;
  productivityBarLength?: number;
  healthBarLength?: number;
  beeFrameImage?: string;
}

const SvgBeeStatsPanel: React.FC<SvgBeeStatsPanelProps> = ({
  energyValue = "0/100",
  healthValue = "0/100",
  productivityValue = "0/100",
  attackValue = "0",
  defenceValue = "0",
  forageValue = "0",
  energyBarLength = 5,
  activityBarLength = 70,
  productivityBarLength = 70,
  healthBarLength = 5,
  beeFrameImage, //TODO: Set a default image when things are loading
}) => {
  const { isMuted } = useSound();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [pressedSound, setPressedSound] = useState<HTMLAudioElement | null>(
    null
  );
  // Modal State Management
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [scale, setScale] = useState(1); // Default scale is 1 (no scaling)

  const maxLengthEnergyBar = 140.56; // the maximum length of the energyBar
  const [newEnergyBarValue, setNewEnergyBarValue] = useState(
    (energyBarLength / 100) * maxLengthEnergyBar
  ); // initial calculation

  const maxLengthHealthBar = 124.966; // the maximum length of the healthBar
  const [newHealthBarValue, setNewHealthBarValue] = useState(
    (healthBarLength / 100) * maxLengthHealthBar
  ); // initial calculation

  const maxLengthActivityBar = 124.56; // the maximum length of the ActivityBar
  const [newActivityBarValue, setNewActivityBarValue] = useState(
    (activityBarLength / 100) * maxLengthActivityBar
  ); // initial calculation

  const maxLengthProductivityBar = 124.56; // the maximum length of the ProductivityBar
  const [newProductivityBarValue, setNewProductivityBarValue] = useState(
    (productivityBarLength / 100) * maxLengthProductivityBar
  ); // initial calculation

  useEffect(() => {
    setNewEnergyBarValue((energyBarLength / 100) * maxLengthEnergyBar);
  }, [energyBarLength]);

  useEffect(() => {
    setNewHealthBarValue((healthBarLength / 100) * maxLengthHealthBar);
  }, [healthBarLength]);

  useEffect(() => {
    setNewActivityBarValue((activityBarLength / 100) * maxLengthActivityBar);
  }, [activityBarLength]);

  useEffect(() => {
    setNewProductivityBarValue(
      (productivityBarLength / 100) * maxLengthProductivityBar
    );
  }, [productivityBarLength]);

  // Handle Mouse Event

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isMuted) {
      const hoverSound = new Audio(
        "/Audio/MapNavigation/MapNavigationHover.mp3"
      );
      hoverSound.currentTime = 0; // Reset audio to the start
      hoverSound.play().catch((error) => {
        console.log("Hover sound play error:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsClicked(false);
  };

  const handleClick = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
    if (!isMuted) {
      const pressedSound = new Audio(
        "/Audio/MapNavigation/MapNavigationPressed.mp3"
      );
      pressedSound.currentTime = 0;
      pressedSound.play().catch((error) => {
        console.log("Pressed sound play error:", error);
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      // Check screen width and height
      const width = window.innerWidth;
      const height = window.innerHeight;

      // If the screen resolution is below 1440x900, scale to 0.8, otherwise 1
      if (width < 1440 || height < 900) {
        setScale(0.85);
      } else {
        setScale(1.2);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check when component mounts
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={484}
        height={224}
        fill="none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleClick}
        onMouseUp={handleMouseUp}
        style={{ position: "relative", transform: `scale(${scale})` }}
      >
        <defs>
          {/* Current Bee Definition */}
          <pattern
            id="currentBee"
            patternUnits="userSpaceOnUse"
            width="250"
            height="250"
          >
            <image
              href={`${beeFrameImage}`}
              x="0"
              y="0"
              width="220"
              height="220"
            />
          </pattern>
          <linearGradient
            id="bee_stats_panel_svg__b"
            x1={459.212}
            x2={459.212}
            y1={228.867}
            y2={-2.587}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.143} stopColor="#242E4E" />
            <stop offset={0.499} stopColor="#121727" />
            <stop offset={0.926} stopColor="#202946" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__d"
            x1={245.363}
            x2={245.363}
            y1={-13.54}
            y2={235.697}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.143} stopColor="#242E4E" />
            <stop offset={0.499} stopColor="#121727" />
            <stop offset={0.926} stopColor="#202946" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__e"
            x1={246.265}
            x2={246.265}
            y1={223.984}
            y2={0.403}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.065} stopColor="#68341B" />
            <stop offset={0.77} stopColor="#E9B743" />
            <stop offset={0.98} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__f"
            x1={436.772}
            x2={436.772}
            y1={223.984}
            y2={0}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.065} stopColor="#68341B" />
            <stop offset={0.77} stopColor="#E9B743" />
            <stop offset={0.98} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__g"
            x1={199.431}
            x2={199.431}
            y1={180.592}
            y2={117.817}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.065} stopColor="#68341B" />
            <stop offset={0.77} stopColor="#E9B743" />
            <stop offset={0.98} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__h"
            x1={71.86}
            x2={71.86}
            y1={215.06}
            y2={189.053}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.065} stopColor="#68341B" />
            <stop offset={0.77} stopColor="#E9B743" />
            <stop offset={0.98} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__i"
            x1={19.013}
            x2={19.013}
            y1={105.868}
            y2={43.1}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.065} stopColor="#68341B" />
            <stop offset={0.77} stopColor="#E9B743" />
            <stop offset={0.98} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__j"
            x1={146.583}
            x2={146.583}
            y1={34.642}
            y2={8.635}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.065} stopColor="#68341B" />
            <stop offset={0.77} stopColor="#E9B743" />
            <stop offset={0.98} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__k"
            x1={71.864}
            x2={71.864}
            y1={34.642}
            y2={8.642}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.065} stopColor="#68341B" />
            <stop offset={0.77} stopColor="#E9B743" />
            <stop offset={0.98} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__l"
            x1={19.013}
            x2={19.013}
            y1={180.591}
            y2={117.822}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.065} stopColor="#68341B" />
            <stop offset={0.77} stopColor="#E9B743" />
            <stop offset={0.98} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__m"
            x1={146.583}
            x2={146.583}
            y1={215.06}
            y2={189.053}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.065} stopColor="#68341B" />
            <stop offset={0.77} stopColor="#E9B743" />
            <stop offset={0.98} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__n"
            x1={199.431}
            x2={199.431}
            y1={105.875}
            y2={43.1}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.065} stopColor="#68341B" />
            <stop offset={0.77} stopColor="#E9B743" />
            <stop offset={0.98} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__o"
            x1={14.814}
            x2={24.829}
            y1={116.896}
            y2={106.881}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.065} stopColor="#68341B" />
            <stop offset={0.77} stopColor="#E9B743" />
            <stop offset={0.98} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__p"
            x1={193.393}
            x2={203.408}
            y1={106.882}
            y2={116.896}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.065} stopColor="#68341B" />
            <stop offset={0.77} stopColor="#E9B743" />
            <stop offset={0.98} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__q"
            x1={104.104}
            x2={114.119}
            y1={17.592}
            y2={27.606}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.065} stopColor="#68341B" />
            <stop offset={0.77} stopColor="#E9B743" />
            <stop offset={0.98} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__r"
            x1={114.118}
            x2={104.104}
            y1={196.171}
            y2={206.186}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.065} stopColor="#68341B" />
            <stop offset={0.77} stopColor="#E9B743" />
            <stop offset={0.98} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__s"
            x1={230.557}
            x2={230.557}
            y1={85.046}
            y2={72.738}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__t"
            x1={300.117}
            x2={300.117}
            y1={85.937}
            y2={71.85}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__u"
            x1={369.678}
            x2={369.678}
            y1={85.045}
            y2={72.734}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__v"
            x1={233.742}
            x2={330.909}
            y1={78.893}
            y2={78.893}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#42681B" />
            <stop offset={1} stopColor="#82CE35" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__w"
            x1={282.326}
            x2={282.326}
            y1={83.119}
            y2={74.667}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__y"
            x1={234.716}
            x2={234.716}
            y1={127.31}
            y2={115.002}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__z"
            x1={302.23}
            x2={302.23}
            y1={128.2}
            y2={114.113}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__A"
            x1={369.745}
            x2={369.745}
            y1={127.309}
            y2={114.998}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__B"
            x1={238.188}
            x2={356.311}
            y1={121.157}
            y2={121.157}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#BE5F25" />
            <stop offset={1} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__C"
            x1={297.249}
            x2={297.249}
            y1={125.383}
            y2={116.931}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__E"
            x1={258.824}
            x2={258.824}
            y1={125.383}
            y2={116.931}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__G"
            x1={211.148}
            x2={211.148}
            y1={42.781}
            y2={30.474}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__H"
            x1={290.258}
            x2={290.258}
            y1={43.672}
            y2={29.585}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__I"
            x1={369.364}
            x2={369.364}
            y1={42.781}
            y2={30.47}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__J"
            x1={214.18}
            x2={366.331}
            y1={36.629}
            y2={36.629}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.07} stopColor="#5B1CAA" />
            <stop offset={0.98} stopColor="#5192F4" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__K"
            x1={290.255}
            x2={290.255}
            y1={40.855}
            y2={32.402}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__M"
            x1={302.934}
            x2={302.934}
            y1={145.244}
            y2={135.245}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__N"
            x1={302.935}
            x2={302.935}
            y1={145.243}
            y2={140.102}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__O"
            x1={302.935}
            x2={302.935}
            y1={207.246}
            y2={217.245}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__P"
            x1={302.935}
            x2={302.935}
            y1={207.247}
            y2={212.389}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E9B743" />
            <stop offset={0} stopColor="#68341B" />
            <stop offset={0.875} stopColor="#E9B743" />
          </linearGradient>
          <linearGradient
            id="bee_stats_panel_svg__Q"
            x1={108.478}
            x2={108.478}
            y1={219.758}
            y2={2.817}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.065} stopColor="#68341B" />
            <stop offset={0.77} stopColor="#E9B743" />
            <stop offset={0.98} stopColor="#E9B743" />
          </linearGradient>
          <filter
            id="bee_stats_panel_svg__a"
            width={47.673}
            height={126.566}
            x={436.139}
            y={48.717}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dx={-2} dy={-2} />
            <feGaussianBlur stdDeviation={10} />
            <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="shape" result="effect1_innerShadow_821964_1611" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dx={2} dy={2} />
            <feGaussianBlur stdDeviation={10} />
            <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend
              in2="effect1_innerShadow_821964_1611"
              result="effect2_innerShadow_821964_1611"
            />
          </filter>
          <filter
            id="bee_stats_panel_svg__c"
            width={388.567}
            height={229.599}
            x={51.977}
            y={-2.597}
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dx={-2} dy={-2} />
            <feGaussianBlur stdDeviation={10} />
            <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="shape" result="effect1_innerShadow_821964_1611" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dx={2} dy={2} />
            <feGaussianBlur stdDeviation={10} />
            <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend
              in2="effect1_innerShadow_821964_1611"
              result="effect2_innerShadow_821964_1611"
            />
          </filter>
        </defs>
        <g filter="url(#bee_stats_panel_svg__a)">
          <path
            fill="url(#bee_stats_panel_svg__b)"
            fillOpacity={0.85}
            d="m481.812 111.964-43.673 61.319V50.717z"
          />
        </g>
        <g filter="url(#bee_stats_panel_svg__c)">
          <path
            fill="url(#bee_stats_panel_svg__d)"
            fillOpacity={0.85}
            d="M425.269 29.319V.402H122.543l-17.606 14.874-21.981 14.042-27.97 18.485 1.503 108.788L81.6 185.8l40.91 38.2 113.717-.503h189.043v-28.916h12.276V29.319z"
          />
        </g>
        <path
          stroke="url(#bee_stats_panel_svg__e)"
          strokeMiterlimit={10}
          strokeWidth={2}
          d="M425.269 29.319V.402H122.543l-17.606 14.874-21.981 14.042-27.97 18.485 1.503 108.788L81.6 185.8l40.91 38.2 113.717-.503h189.043v-28.916h12.276V29.319z"
        />
        <path
          stroke="url(#bee_stats_panel_svg__f)"
          strokeMiterlimit={10}
          strokeWidth={2}
          d="M390.281 224v-24.081l19.358-27.012h29.975L483.262 112l-43.648-60.907h-29.975L390.281 24.08V0"
        />
        <ellipse
          cx={108.166}
          cy={111.64}
          fill="#242E4E"
          fillOpacity={0.9}
          rx={103.939}
          ry={103.241}
        />
        <g strokeMiterlimit={10} strokeWidth={2}>
          <path
            stroke="url(#bee_stats_panel_svg__g)"
            d="M186.427 180.597c15.046-16.878 24.638-38.729 26.009-62.78"
          />
          <path
            stroke="url(#bee_stats_panel_svg__h)"
            d="M40.474 189.053c16.884 15.046 38.722 24.638 62.772 26.009"
          />
          <path
            stroke="url(#bee_stats_panel_svg__i)"
            d="M6.009 105.872C7.379 81.822 16.97 59.978 32.018 43.1"
          />
          <path
            stroke="url(#bee_stats_panel_svg__j)"
            d="M115.196 8.635c24.051 1.37 45.888 10.962 62.773 26.009"
          />
          <path
            stroke="url(#bee_stats_panel_svg__k)"
            d="M103.247 8.642c-24.05 1.363-45.882 10.955-62.766 26.002"
          />
          <path
            stroke="url(#bee_stats_panel_svg__l)"
            d="M6.009 117.822c1.37 24.051 10.962 45.895 26.009 62.773"
          />
          <path
            stroke="url(#bee_stats_panel_svg__m)"
            d="M115.196 215.062c24.051-1.371 45.888-10.963 62.773-26.009"
          />
          <path
            stroke="url(#bee_stats_panel_svg__n)"
            d="M186.427 43.1c15.046 16.878 24.638 38.729 26.009 62.779"
          />
          <path
            stroke="url(#bee_stats_panel_svg__o)"
            d="M19.821 101.873 9.806 111.889l10.015 10.015"
          />
          <path
            stroke="url(#bee_stats_panel_svg__p)"
            d="m198.4 121.904 10.016-10.015-10.016-10.016"
          />
          <path
            stroke="url(#bee_stats_panel_svg__q)"
            d="m119.127 22.599-10.016-10.016L99.096 22.6"
          />
          <path
            stroke="url(#bee_stats_panel_svg__r)"
            d="m99.096 201.178 10.015 10.015 10.016-10.015"
          />
        </g>
        <g
          fontFamily="Vera Humana 95"
          fontSize={14}
          fontWeight="bold"
          letterSpacing="0em"
        >
          <text
            xmlSpace="preserve"
            fill="#fff"
            stroke="#9A321A"
            strokeWidth={0.2}
            style={{
              whiteSpace: "pre",
            }}
            textAnchor="end"
          >
            <tspan x={370} y={63.983}>
              {healthValue}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            fill="#E9B743"
            style={{
              whiteSpace: "pre",
            }}
          >
            <tspan x={224.042} y={63.983}>
              {"Health"}
            </tspan>
          </text>
        </g>
        <g
          fontFamily="Vera Humana 95"
          fontSize={14}
          fontWeight="bold"
          letterSpacing="0em"
        >
          <text
            xmlSpace="preserve"
            fill="#fff"
            stroke="#9A321A"
            strokeWidth={0.2}
            style={{
              whiteSpace: "pre",
            }}
            textAnchor="end"
          >
            <tspan x={370} y={106.247}>
              {productivityValue}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            fill="#E9B743"
            style={{
              whiteSpace: "pre",
            }}
          >
            <tspan x={233.902} y={106.247}>
              {"Productivity"}
            </tspan>
          </text>
        </g>
        <g
          fontFamily="Vera Humana 95"
          fontSize={14}
          fontWeight="bold"
          letterSpacing="0em"
        >
          <text
            xmlSpace="preserve"
            fill="#fff"
            stroke="#9A321A"
            strokeWidth={0.2}
            style={{
              whiteSpace: "pre",
            }}
            textAnchor="end"
          >
            <tspan x={370} y={21.719}>
              {energyValue}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            fill="#E9B743"
            style={{
              whiteSpace: "pre",
            }}
          >
            <tspan x={198.683} y={21.719}>
              {"Energy"}
            </tspan>
          </text>
        </g>
        <path
          stroke="url(#bee_stats_panel_svg__s)"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M232.846 85.047c-3.216 0-3.472-6.153-4.578-6.153 1.106 0 1.362-6.156 4.578-6.156"
        />
        <path
          stroke="url(#bee_stats_panel_svg__t)"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M240.016 85.934h127.372v-2.576c1.107 0 2.006-1.999 2.006-4.468s-.897-4.467-2.006-4.467V71.85H232.846v2.576c-1.107 0-2.006 1.998-2.006 4.468s.897 4.467 2.006 4.467v2.577h7.17z"
        />
        <path
          stroke="url(#bee_stats_panel_svg__u)"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M367.389 85.046c3.215 0 3.472-6.156 4.578-6.156-1.106 0-1.363-6.156-4.578-6.156"
        />
        {/* health Bar*/}
        <mask id="bee_stats_panel_svg__x" fill="#fff">
          <path d="M237.443 83.12c-2.6 0-2.882-3.454-3.7-4.227.762-.858 1.103-4.226 3.7-4.226h125.766c2.6 0 2.883 3.454 3.701 4.226-.762.858-1.103 4.227-3.701 4.227z" />
        </mask>
        <path
          fill="url(#bee_stats_panel_svg__v)"
          stroke="url(#bee_stats_panel_svg__w)"
          d={`M237.443 83.12c-2.6 0-2.882-3.454-3.7-4.227.762-.858 1.103-4.226 3.7-4.226h${newHealthBarValue}c2.6 0 2.883 3.454 3.701 4.226-.762.858-1.103 4.227-3.701 4.227z`}
          mask="url(#bee_stats_panel_svg__x)"
        />
        <path
          stroke="url(#bee_stats_panel_svg__y)"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M236.938 127.31c-3.121 0-3.37-6.152-4.444-6.152 1.074 0 1.323-6.156 4.444-6.156"
        />
        <path
          stroke="url(#bee_stats_panel_svg__z)"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M243.896 128.198h123.626v-2.577c1.075 0 1.948-1.998 1.948-4.467s-.871-4.467-1.948-4.467v-2.574H236.938v2.577c-1.075 0-1.948 1.998-1.948 4.467s.871 4.468 1.948 4.468v2.576h6.958z"
        />
        <path
          stroke="url(#bee_stats_panel_svg__A)"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M367.523 127.31c3.121 0 3.37-6.156 4.444-6.156-1.074 0-1.323-6.156-4.444-6.156"
        />
        <mask id="bee_stats_panel_svg__D" fill="#fff">
          <path d="M239.759 125.383 c-1.104 0-1.224-3.454-1.572-4.226.324-.858.469-4.226 1.572-4.226 h125.129 c1.104 0 1.224 3.454 1.571 4.226-.323.858-.468 4.226-1.571 4.226 z" />
        </mask>
        <path
          fill="url(#bee_stats_panel_svg__B)"
          stroke="url(#bee_stats_panel_svg__C)"
          d={`M239.759 125.383 c-1.104 0-1.224-3.454-1.572-4.226.324-.858.469-4.226 1.572-4.226 h${newActivityBarValue} c1.104 0 1.224 3.454 1.571 4.226-.323.858-.468 4.226-1.571 4.226 z`}
          mask="url(#bee_stats_panel_svg__D)"
        />
        <mask id="bee_stats_panel_svg__F" fill="#fff">
          <path d="M239.759 125.383 c-1.104 0-1.224-3.454-1.572-4.226.324-.858.469-4.226 1.572-4.226 h126.129 c1.104 0 1.224 3.454 1.571 4.226-.323.858-.468 4.226-1.571 4.226 z" />
        </mask>
        <path
          fill="#9A321A"
          stroke="url(#bee_stats_panel_svg__E)"
          d={`M239.759 125.383 c-1.104 0-1.224-3.454-1.572-4.226.324-.858.469-4.226 1.572-4.226 h${newProductivityBarValue} c1.104 0 1.224 3.454 1.571 4.226-.323.858-.468 4.226-1.571 4.226 z`}
          mask="url(#bee_stats_panel_svg__F)"
        />
        <path
          stroke="url(#bee_stats_panel_svg__G)"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M213.751 42.782c-3.656 0-3.948-6.152-5.206-6.152 1.258 0 1.55-6.156 5.206-6.156"
        />
        <path
          stroke="url(#bee_stats_panel_svg__H)"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M221.907 43.67h144.855v-2.577c1.259 0 2.282-1.998 2.282-4.467 0-2.47-1.021-4.468-2.282-4.468v-2.573H213.754v2.577c-1.26 0-2.282 1.998-2.282 4.467 0 2.47 1.02 4.467 2.282 4.467v2.577h8.153z"
        />
        <path
          stroke="url(#bee_stats_panel_svg__I)"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M366.761 42.782c3.656 0 3.948-6.156 5.206-6.156-1.258 0-1.55-6.156-5.206-6.156"
        />
        {/*energyBar*/}
        <mask id="bee_stats_panel_svg__L" fill="#fff">
          <path d="M360.535 40.855c4.073 0 4.515-3.454 5.796-4.226-1.194-.858-1.728-4.227-5.796-4.227h-140.56c-4.072 0-4.514 3.455-5.795 4.227 1.193.858 1.727 4.226 5.795 4.226z" />
        </mask>
        <path
          fill="url(#bee_stats_panel_svg__J)"
          stroke="url(#bee_stats_panel_svg__K)"
          d={`M220 40.855 c-4.073 0-4.515-3.454-5.796-4.226 1.194-.858 1.728-4.227 5.796-4.227 h${newEnergyBarValue} c4.072 0 4.514 3.455 5.795 4.227 -1.193.858-1.727 4.226-5.795 4.226 z`}
          mask="url(#bee_stats_panel_svg__L)"
        />
        <g strokeMiterlimit={10} strokeWidth={0.2}>
          <path
            stroke="url(#bee_stats_panel_svg__M)"
            d="m254.59 140.095 5.244 5.15h25.747c0-3.983 15.874-4.146 17.353-10 1.48 5.854 17.354 6.017 17.354 10h25.747l5.244-5.15"
          />
          <path
            stroke="url(#bee_stats_panel_svg__N)"
            d="M371.869 140.102h-33.698l-2.024 1.988h-30.001l-3.211 3.154-3.211-3.154h-30.002l-2.026-1.988H234"
          />
        </g>
        <g
          fontFamily="Vera Humana 95"
          fontSize={14}
          fontWeight="bold"
          letterSpacing="0em"
        >
          <text
            xmlSpace="preserve"
            fill="#fff"
            stroke="#9A321A"
            strokeWidth={0.2}
            style={{
              whiteSpace: "pre",
            }}
            textAnchor="end"
          >
            <tspan x={370} y={161.649}>
              {attackValue}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            fill="#E9B743"
            style={{
              whiteSpace: "pre",
            }}
          >
            <tspan x={233.903} y={161.649}>
              {"Attack"}
            </tspan>
          </text>
        </g>
        <g
          fontFamily="Vera Humana 95"
          fontSize={14}
          fontWeight="bold"
          letterSpacing="0em"
        >
          <text
            xmlSpace="preserve"
            fill="#fff"
            stroke="#9A321A"
            strokeWidth={0.2}
            style={{
              whiteSpace: "pre",
            }}
            textAnchor="end"
          >
            <tspan x={370} y={179.649}>
              {defenceValue}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            fill="#E9B743"
            style={{
              whiteSpace: "pre",
            }}
          >
            <tspan x={233.903} y={179.649}>
              {"Defence"}
            </tspan>
          </text>
        </g>
        <g
          fontFamily="Vera Humana 95"
          fontSize={14}
          fontWeight="bold"
          letterSpacing="0em"
        >
          <text
            xmlSpace="preserve"
            fill="#fff"
            stroke="#9A321A"
            strokeWidth={0.2}
            style={{
              whiteSpace: "pre",
            }}
            textAnchor="end"
          >
            <tspan x={370} y={197.649}>
              {forageValue}
            </tspan>
          </text>
          <text
            xmlSpace="preserve"
            fill="#E9B743"
            style={{
              whiteSpace: "pre",
            }}
          >
            <tspan x={233.903} y={197.649}>
              {"Forage"}
            </tspan>
          </text>
        </g>
        <g strokeMiterlimit={10} strokeWidth={0.2}>
          <path
            stroke="url(#bee_stats_panel_svg__O)"
            d="m351.279 212.395-5.243-5.15h-25.748c0 3.983-15.874 4.146-17.353 10-1.48-5.854-17.354-6.017-17.354-10h-25.747l-5.244 5.15"
          />
          <path
            stroke="url(#bee_stats_panel_svg__P)"
            d="M234 212.389h33.698l2.024-1.989h30.002l3.211-3.153 3.211 3.153h30.001l2.026 1.989h33.696"
          />
        </g>
        <path
          fill="url(#currentBee)"
          stroke="url(#bee_stats_panel_svg__Q)"
          strokeMiterlimit={10}
          strokeWidth={2}
          d="M185.184 188.002v-19.373a95.3 95.3 0 0 0 18.078-43.639l13.694-13.695-13.694-13.694a95.3 95.3 0 0 0-18.078-43.64V34.59h-19.372a95.3 95.3 0 0 0-43.64-18.077L108.478 2.817 94.784 16.512a95.3 95.3 0 0 0-43.64 18.077H31.772v19.373a95.3 95.3 0 0 0-18.078 43.64L0 111.294l13.694 13.695a95.3 95.3 0 0 0 18.078 43.639v19.373h19.372a95.3 95.3 0 0 0 43.64 18.077l13.694 13.694 13.694-13.694a95.3 95.3 0 0 0 43.64-18.077z"
        />
        {/* Hovered and pressed state */}
        {isHovered && !isClicked && (
          <>
            <image
              href="/Frames/BeeStatsPanel/BeeStatsHover.png"
              x="0"
              y="0"
              width="220"
              height="220"
            />
          </>
        )}
        {isClicked && (
          <>
            <image
              href="/Frames/BeeStatsPanel/BeeStatsPressed.png"
              x="0"
              y="0"
              width="220"
              height="220"
            />
          </>
        )}
      </svg>
      <MyBeesModal open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default SvgBeeStatsPanel;
