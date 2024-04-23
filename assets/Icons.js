import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const AdjustmentIcon = ({ color = "white" }) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M21 5H18M13.75 3V7M13 5H3M7 12H3M10.75 10V14M21 12H11M21 19H18M13.75 17V21M13 19H3"
      // stroke="white"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      sstrokeLinejoinejoin="round"
    />
  </Svg>
);

export const DoorIcon = ({ color = "white" }) => (
  <Svg
    width="40"
    height="45"
    viewBox="0 0 40 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M25.8743 4.03931H12.1243C11.4339 4.03931 10.8743 4.7855 10.8743 5.70597V35.706C10.8743 36.6264 11.4339 37.3726 12.1243 37.3726H25.8743C26.5646 37.3726 27.1243 36.6264 27.1243 35.706V5.70597C27.1243 4.7855 26.5646 4.03931 25.8743 4.03931Z"
      fill={color == "white" ? "#3579F9" : "white"}
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      sstrokeLinejoinejoin="round"
    />
    <Path
      d="M15.8743 29.0393H22.1243"
      fill={color}
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      sstrokeLinejoinejoin="round"
    />
    <Path
      d="M33.3743 17.3727V12.3727H21.4993C21.1057 11.6731 20.5571 11.1563 19.931 10.8956C19.305 10.6348 18.6333 10.6433 18.0111 10.9199C17.3888 11.1964 16.8476 11.727 16.4641 12.4364C16.0806 13.1459 15.8743 13.9982 15.8743 14.8727C15.8743 15.7472 16.0806 16.5996 16.4641 17.309C16.8476 18.0185 17.3888 18.549 18.0111 18.8256C18.6333 19.1021 19.305 19.1106 19.931 18.8499C20.5571 18.5891 21.1057 18.0723 21.4993 17.3727H33.3743Z"
      fill={color == "white" ? "#3579F9" : "white"}
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      sstrokeLinejoinejoin="round"
    />
  </Svg>
);

export const FanIcon = ({ color = "white" }) => (
  <Svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M25.0001 5.00155C16.7183 5.00155 10.0001 11.8074 10.0001 20.2063C10.0001 28.6005 16.7198 35.4095 25.0001 35.4126C33.2789 35.4095 40.0001 28.6005 40.0001 20.2063C40.0001 11.8059 33.2759 5.00155 25.0001 5.00155ZM25.0001 6.74486C32.3282 6.74486 38.2805 12.7728 38.2805 20.2063C38.2805 27.6382 32.3312 33.6662 25.0001 33.6693C21.4782 33.6693 18.1004 32.2509 15.61 29.7263C13.1196 27.2016 11.7205 23.7775 11.7205 20.2071C11.7205 16.6367 13.1196 13.2125 15.61 10.6878C18.1004 8.16319 21.4782 6.74486 25.0001 6.74486ZM21.226 9.31101C19.4284 9.48921 17.6354 11.8369 18.7421 13.9598C19.7815 15.9495 21.946 15.7574 22.6109 18.0275C23.23 17.166 24.4544 16.1928 26.5287 17.2047C27.8708 12.1654 25.0383 8.9422 21.226 9.31101ZM33.5021 17.8338C31.2857 17.7486 30.3272 19.7383 28.0573 19.1897C28.4807 20.1614 28.7176 21.7466 26.8146 23.0638C30.448 26.7596 34.5874 25.8686 36.1787 22.337C36.9261 20.6712 35.8699 17.9206 33.5021 17.8338ZM24.618 18.2212C23.7161 18.4072 23.042 19.2362 23.042 20.2063C23.042 21.3158 23.9057 22.1913 25.0001 22.1913C26.0946 22.1913 26.9582 21.3158 26.9582 20.2063C26.9582 19.0968 26.0946 18.2212 25.0001 18.2212C24.8625 18.2212 24.7464 18.1934 24.618 18.2212ZM21.6556 20.352C16.6816 21.6924 15.3731 25.8081 17.5957 28.9709C18.6443 30.46 21.5425 30.8614 22.802 28.8252C23.9836 26.9223 22.7256 25.1216 24.3306 23.4016C23.2896 23.2885 21.8283 22.6795 21.6556 20.352ZM21.943 37.252C21.943 40.3527 15.8286 40.8842 15.8286 43.4504V45H34.1716V43.4504C34.1716 40.8842 28.0573 40.3527 28.0573 37.252C28.0573 37.252 27.478 37.737 25.0001 37.737C22.5223 37.737 21.943 37.252 21.943 37.252Z"
      fill={color}
    />
  </Svg>
);

export const RightArrow = (props) => (
  <Svg
    width="10"
    height="15"
    viewBox="0 0 10 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M0.3824 0.330173C0.137549 0.541646 -3.62117e-08 0.828427 -4.92825e-08 1.12745C-6.23532e-08 1.42647 0.137549 1.71326 0.382399 1.92473L6.84743 7.50681L0.382399 13.0889C0.144488 13.3016 0.0128435 13.5864 0.0158199 13.8821C0.0187953 14.1778 0.156153 14.4606 0.398308 14.6697C0.640464 14.8788 0.968042 14.9974 1.31049 15C1.65294 15.0025 1.98285 14.8889 2.22918 14.6834L9.6176 8.30409C9.86245 8.09261 10 7.80583 10 7.50681C10 7.20778 9.86245 6.921 9.6176 6.70953L2.22918 0.330173C1.98425 0.118763 1.65211 -3.64898e-07 1.30579 -3.80036e-07C0.959466 -3.95174e-07 0.627323 0.118763 0.3824 0.330173Z"
      fill="#6F7EA8"
    />
  </Svg>
);

export const CloseIcon = (props) => (
  <Svg
    width="26"
    height="24"
    viewBox="0 0 26 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M19.0341 6L6.81348 18M6.81348 6L19.0341 18"
      stroke="#2666DE"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const LeftArrowIcon = (props) => (
  <Svg
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M13.1576 2.36714C13.0656 2.27499 12.9564 2.20187 12.8362 2.15198C12.716 2.1021 12.5871 2.07642 12.4569 2.07642C12.3268 2.07642 12.1979 2.1021 12.0777 2.15198C11.9574 2.20187 11.8482 2.27499 11.7563 2.36714L5.17756 8.94589C5.10417 9.01913 5.04595 9.10613 5.00622 9.2019C4.96649 9.29767 4.94604 9.40033 4.94604 9.50402C4.94604 9.6077 4.96649 9.71037 5.00622 9.80614C5.04595 9.90191 5.10417 9.9889 5.17756 10.0621L11.7563 16.6409C12.1442 17.0288 12.7696 17.0288 13.1576 16.6409C13.5455 16.253 13.5455 15.6276 13.1576 15.2396L7.4259 9.50006L13.1655 3.76048C13.5455 3.38048 13.5455 2.74714 13.1576 2.36714Z"
      fill="#1E232C"
      stroke="#1E232C"
      stroke-width="0.2"
    />
  </Svg>
);
