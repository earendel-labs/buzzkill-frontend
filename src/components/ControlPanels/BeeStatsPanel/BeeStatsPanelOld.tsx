import React from "react";
import { Typography, Box } from "@mui/material";
import { SvgIcon } from "@mui/material";

interface BeeStatsPanelProps {
  healthValue: string;
  productivityValue: string;
  energyValue: string;
  attackValue: string;
  defenceValue: string;
  forageValue: string;
}
const BeeStatsPanel: React.FC<BeeStatsPanelProps> = ({
  healthValue,
  productivityValue,
  energyValue,
  attackValue,
  defenceValue,
  forageValue,
}) => {
  return (
    <Box position="relative">
      <SvgIcon
        component="svg"
        viewBox="0 0 348 161"
        sx={{ width: "100%", height: "auto" }}
      >
        <rect width="348" height="161" fill="#E5E5E5" />
        <g id="Group 343">
          <g id="bee_stats_panel">
            <g id="rectangle_frame">
              <g id="Polygon 8" filter="url(#filter0_ii_821229_207)">
                <path
                  d="M345 80.4746L314 124V37L345 80.4746Z"
                  fill="url(#paint0_linear_821229_207)"
                  fillOpacity="0.85"
                />
              </g>
              <g id="Group 235">
                <g id="b">
                  <g id="Vector">
                    <g filter="url(#filter1_ii_821229_207)">
                      <path
                        d="M304.865 21.8107V1.28613H183.649L177.161 1.28629L170.678 1.28613H89.9832L77.4861 11.8435L61.8831 21.8107L42.0293 34.9324L43.0967 112.152L60.9202 132.884L89.9593 160L170.678 159.643H177.161H183.645H304.865V139.118H313.578V21.8107H304.865Z"
                        fill="url(#paint1_linear_821229_207)"
                        fillOpacity="0.85"
                      />
                    </g>
                    <path
                      d="M304.865 21.8107V1.28613H183.649L177.161 1.28629L170.678 1.28613H89.9832L77.4861 11.8435L61.8831 21.8107L42.0293 34.9324L43.0967 112.152L60.9202 132.884L89.9593 160L170.678 159.643H177.161H183.645H304.865V139.118H313.578V21.8107H304.865Z"
                      stroke="url(#paint2_linear_821229_207)"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                  </g>
                  <path
                    id="Vector_2"
                    d="M280.029 160V142.907L293.77 123.733H315.047L346.029 80.5L315.047 37.2669H293.77L280.029 18.0929V1"
                    stroke="url(#paint3_linear_821229_207)"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                </g>
              </g>
            </g>
            <g id="bee_background_frame">
              <ellipse
                id="Ellipse 12"
                cx="79.7781"
                cy="80.2439"
                rx="73.7781"
                ry="73.283"
                fill="#242E4E"
                fillOpacity="0.9"
              />
              <g id="Group 242">
                <g id="b_2">
                  <path
                    id="Vector_3"
                    d="M135.33 129.191C146.01 117.211 152.819 101.7 153.792 84.6289"
                    stroke="url(#paint4_linear_821229_207)"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    id="Vector_4"
                    d="M31.7295 135.193C43.7146 145.874 59.2156 152.682 76.287 153.655"
                    stroke="url(#paint5_linear_821229_207)"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    id="Vector_5"
                    d="M7.26562 76.1503C8.23829 59.0788 15.0469 43.5732 25.7273 31.5928"
                    stroke="url(#paint6_linear_821229_207)"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    id="Vector_6"
                    d="M84.7695 7.12891C101.841 8.10157 117.342 14.9102 129.327 25.5906"
                    stroke="url(#paint7_linear_821229_207)"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    id="Vector_7"
                    d="M76.2872 7.13379C59.2157 8.10171 43.7195 14.9104 31.7344 25.5907"
                    stroke="url(#paint8_linear_821229_207)"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    id="Vector_8"
                    d="M7.26562 84.6328C8.23829 101.704 15.0469 117.21 25.7273 129.19"
                    stroke="url(#paint9_linear_821229_207)"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    id="Vector_9"
                    d="M84.7695 153.655C101.841 152.682 117.342 145.874 129.327 135.193"
                    stroke="url(#paint10_linear_821229_207)"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    id="Vector_10"
                    d="M135.33 31.5928C146.01 43.5732 152.819 59.0836 153.792 76.155"
                    stroke="url(#paint11_linear_821229_207)"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    id="Vector_11"
                    d="M17.0703 73.3115L9.96104 80.4208L17.0703 87.5301"
                    stroke="url(#paint12_linear_821229_207)"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    id="Vector_12"
                    d="M143.829 87.5302L150.938 80.4209L143.829 73.3116"
                    stroke="url(#paint13_linear_821229_207)"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    id="Vector_13"
                    d="M87.5596 17.041L80.4503 9.93174L73.341 17.041"
                    stroke="url(#paint14_linear_821229_207)"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    id="Vector_14"
                    d="M73.3409 143.8L80.4502 150.909L87.5595 143.8"
                    stroke="url(#paint15_linear_821229_207)"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                </g>
              </g>
            </g>
            <g id="bee_stats">
              <g id="health">
                <text
                  id="health_value"
                  fill="white"
                  stroke="#9A321A"
                  strokeWidth="0.5"
                  xmlSpace="preserve"
                  style={{ whiteSpace: "pre" }}
                  fontFamily="Vera Humana 95"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="0em"
                >
                  <tspan x="243.094" y="46.4316">
                    {healthValue}
                  </tspan>
                </text>
                <text
                  id="health_label"
                  fill="#E9B743"
                  xmlSpace="preserve"
                  style={{ whiteSpace: "pre" }}
                  fontFamily="Vera Humana 95"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="0em"
                >
                  <tspan x="162.029" y="46.4316">
                    Health
                  </tspan>
                </text>
              </g>
              <g id="productivity">
                <text
                  id="productivity_value"
                  fill="white"
                  stroke="#9A321A"
                  strokeWidth="0.5"
                  xmlSpace="preserve"
                  style={{ whiteSpace: "pre" }}
                  fontFamily="Vera Humana 95"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="0em"
                >
                  <tspan x="241.094" y="76.4316">
                    {productivityValue}
                  </tspan>
                </text>
                <text
                  id="productivity_label"
                  fill="#E9B743"
                  xmlSpace="preserve"
                  style={{ whiteSpace: "pre" }}
                  fontFamily="Vera Humana 95"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="0em"
                >
                  <tspan x="169.029" y="76.4316">
                    Productivity
                  </tspan>
                </text>
              </g>
              <g id="energy">
                <text
                  id="energy_value"
                  fill="white"
                  stroke="#9A321A"
                  strokeWidth="0.5"
                  xmlSpace="preserve"
                  style={{ whiteSpace: "pre" }}
                  fontFamily="Vera Humana 95"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="0em"
                >
                  <tspan x="243.337" y="16.4316">
                    {energyValue}
                  </tspan>
                </text>
                <text
                  id="energy_label"
                  fill="#E9B743"
                  xmlSpace="preserve"
                  style={{ whiteSpace: "pre" }}
                  fontFamily="Vera Humana 95"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="0em"
                >
                  <tspan x="144.029" y="16.4316">
                    Energy
                  </tspan>
                </text>
              </g>
              <g id="attack">
                <text
                  id="attack_value"
                  fill="white"
                  stroke="#9A321A"
                  strokeWidth="0.5"
                  xmlSpace="preserve"
                  style={{ whiteSpace: "pre" }}
                  fontFamily="Vera Humana 95"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="0em"
                >
                  <tspan x="254.907" y="113.432">
                    {attackValue}
                  </tspan>
                </text>
                <text
                  id="attack_label"
                  fill="#E9B743"
                  xmlSpace="preserve"
                  style={{ whiteSpace: "pre" }}
                  fontFamily="Vera Humana 95"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="0em"
                >
                  <tspan x="170.43" y="113.432">
                    Attack
                  </tspan>
                </text>
              </g>
              <g id="defence">
                <text
                  id="defence_value"
                  fill="white"
                  stroke="#9A321A"
                  strokeWidth="0.5"
                  xmlSpace="preserve"
                  style={{ whiteSpace: "pre" }}
                  fontFamily="Vera Humana 95"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="0em"
                >
                  <tspan x="255.008" y="125.432">
                    {defenceValue}
                  </tspan>
                </text>
                <text
                  id="defence_label"
                  fill="#E9B743"
                  xmlSpace="preserve"
                  style={{ whiteSpace: "pre" }}
                  fontFamily="Vera Humana 95"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="0em"
                >
                  <tspan x="170.328" y="125.432">
                    Defence
                  </tspan>
                </text>
              </g>
              <g id="forage">
                <text
                  id="forage_value"
                  fill="white"
                  stroke="#9A321A"
                  strokeWidth="0.5"
                  xmlSpace="preserve"
                  style={{ whiteSpace: "pre" }}
                  fontFamily="Vera Humana 95"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="0em"
                >
                  <tspan x="254.934" y="137.432">
                    {forageValue}
                  </tspan>
                </text>
                <text
                  id="forage_label"
                  fill="#E9B743"
                  xmlSpace="preserve"
                  style={{ whiteSpace: "pre" }}
                  fontFamily="Vera Humana 95"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="0em"
                >
                  <tspan x="170.402" y="137.432">
                    Forage
                  </tspan>
                </text>
              </g>
            </g>
          </g>
        </g>
      </SvgIcon>
    </Box>
  );
};

export default BeeStatsPanel;
