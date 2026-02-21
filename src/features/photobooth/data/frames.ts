import { Frame } from "../types";

// Frame Images
import loveFrame from "../../../assets/frames/20.svg";
import loveFrameGrid from "../../../assets/frames/21.svg";

export const FRAMES: Frame[] = [
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
