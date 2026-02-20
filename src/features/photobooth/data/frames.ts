import { Frame } from "../types";

// Frame Images
import frame1 from "../../../assets/frames/1.svg";
import frame2 from "../../../assets/frames/2.svg";
import frame3 from "../../../assets/frames/3.svg";
import frame4 from "../../../assets/frames/4.svg";
import frame5 from "../../../assets/frames/5.svg";
import frame6 from "../../../assets/frames/6.svg";
import frame7 from "../../../assets/frames/7.svg";
import frame9 from "../../../assets/frames/9.svg";
import frame10 from "../../../assets/frames/10.svg";
import frame11 from "../../../assets/frames/11.svg";
import frame12 from "../../../assets/frames/12.svg";
import frame17 from "../../../assets/frames/17.svg";
import frame18 from "../../../assets/frames/18.svg";
import frame19 from "../../../assets/frames/19.svg";
import loveFrame from "../../../assets/frames/20.svg";
import loveFrameGrid from "../../../assets/frames/21.svg";

export const FRAMES: Frame[] = [
  {
    id: "1",
    name: "XinhAirlines",
    layout: "1x4",
    category: "COOL",
    color: "bg-blue-50",
    borderColor: "border-blue-400",
    textColor: "text-blue-500",
    overlayImage: frame1,
  },
  {
    id: "2",
    name: "Quốc Khánh 2/9",
    layout: "1x4",
    category: "EVENT",
    color: "bg-red-50",
    borderColor: "border-red-500",
    textColor: "text-red-500",
    overlayImage: frame2,
  },
  {
    id: "3",
    name: "Seonghyeon",
    layout: "1x4",
    category: "CUTE",
    color: "bg-pink-50",
    borderColor: "border-pink-300",
    textColor: "text-pink-400",
    overlayImage: frame3,
  },
  {
    id: "4",
    name: "Basic-11",
    layout: "1x4",
    category: "BASIC",
    color: "bg-purple-50",
    borderColor: "border-purple-300",
    textColor: "text-purple-400",
    overlayImage: frame4,
  },
  {
    id: "5",
    name: "Vintage Film",
    layout: "1x4",
    category: "COOL",
    color: "bg-amber-50",
    borderColor: "border-amber-700",
    textColor: "text-amber-700",
    overlayImage: frame5,
  },
  {
    id: "6",
    name: "Summer Vibe",
    layout: "1x4",
    category: "CUTE",
    color: "bg-green-50",
    borderColor: "border-green-400",
    textColor: "text-green-500",
    overlayImage: frame6,
  },
  {
    id: "9",
    name: "Basic-6",
    layout: "2x2",
    category: "BASIC",
    color: "bg-slate-50",
    borderColor: "border-slate-800",
    textColor: "text-slate-800",
    overlayImage: frame9,
  },
  {
    id: "10",
    name: "Magazine",
    layout: "2x2",
    category: "COOL",
    color: "bg-white",
    borderColor: "border-black",
    textColor: "text-black",
    overlayImage: frame10,
  },
  {
    id: "11",
    name: "Valentine's Day",
    layout: "2x2",
    category: "CUTE",
    color: "bg-pink-50",
    borderColor: "border-pink-400",
    textColor: "text-pink-500",
    overlayImage: frame11,
  },
  {
    id: "12",
    name: "Basic-4",
    layout: "2x2",
    category: "BASIC",
    color: "bg-orange-50",
    borderColor: "border-orange-600",
    textColor: "text-orange-600",
    overlayImage: frame12,
  },
  {
    id: "17",
    name: "Loopy",
    layout: "2x3",
    category: "CUTE",
    color: "bg-pink-50",
    borderColor: "border-pink-300",
    textColor: "text-pink-400",
    overlayImage: frame17,
  },
  {
    id: "18",
    name: "Basic-5",
    layout: "2x3",
    category: "BASIC",
    color: "bg-yellow-50",
    borderColor: "border-yellow-600",
    textColor: "text-yellow-700",
    overlayImage: frame18,
  },
  {
    id: "7",
    name: "Cyberpunk",
    layout: "1x4",
    category: "COOL",
    color: "bg-slate-900",
    borderColor: "border-cyan-400",
    textColor: "text-cyan-400",
    overlayImage: frame7,
  },
  {
    id: "19",
    name: "Netflix",
    layout: "2x3",
    category: "COOL",
    color: "bg-black",
    borderColor: "border-red-600",
    textColor: "text-red-600",
    overlayImage: frame19,
  },
  {
    id: "love-certificate",
    name: "Love Certificate",
    layout: "1x4",
    category: "EVENT",
    color: "bg-pink-50",
    borderColor: "border-pink-400",
    textColor: "text-pink-500",
    overlayImage: loveFrame,
    customMetrics: {
      w: 344,
      h: 1040,
      pt: 40,
      pb: 112,
      pl: 26,
      pr: 26,
      rowGap: 19
    }
  },
  {
    id: "love-certificate-grid",
    name: "Love Certificate",
    layout: "2x2",
    category: "EVENT",
    color: "bg-pink-50",
    borderColor: "border-pink-400",
    textColor: "text-pink-500",
    overlayImage: loveFrameGrid,
    customMetrics: {
      w: 1364,
      h: 2048,
      pt: 183,
      pb: 80,
      pl: 56,
      pr: 61,
      rowGap: 46,
      colGap: 50
    }
  },
];
