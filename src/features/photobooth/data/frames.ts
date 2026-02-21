import { Frame } from "../types";

// Frame Images
import loveFrame from "../../../assets/frames/love-certificate_LoveCertificate_1x4.svg";
import loveFrameGrid from "../../../assets/frames/love-certificate-grid_LoveCertificate_2x2.svg";
import myOneAndOnlyFrame from "../../../assets/frames/my-one-and-only_MyOneAndOnly_1x4.svg";
import myOneAndOnlyFrameGrid from "../../../assets/frames/my-one-and-only-grid_MyOneAndOnly_2x2.svg";

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
  {
    id: "my-one-and-only",
    name: "My One & Only",
    layout: "1x4",
    category: "EVENT",
    color: "bg-blue-50",
    borderColor: "border-blue-400",
    textColor: "text-blue-600",
    overlayImage: myOneAndOnlyFrame,
    customMetrics: {
      w: 767,
      h: 2264,
      pt: 0,
      pb: 0,
      pl: 0,
      pr: 0,
      rowGap: 0,
      colGap: 0,
      imageSlots: [
        { x: 69, y: 88, w: 624, h: 432 },
        { x: 55, y: 564, w: 654, h: 481 },
        { x: 61, y: 1070, w: 642, h: 466 },
        { x: 54, y: 1565, w: 655, h: 480 }
      ]
    }
  },
  {
    id: "my-one-and-only-grid",
    name: "My One & Only",
    layout: "2x2",
    category: "EVENT",
    color: "bg-blue-50",
    borderColor: "border-blue-400",
    textColor: "text-blue-600",
    overlayImage: myOneAndOnlyFrameGrid,
    customMetrics: {
      w: 1518,
      h: 2264,
      pt: 0,
      pb: 0,
      pl: 0,
      pr: 0,
      rowGap: 0,
      colGap: 0,
      imageSlots: [
        { x: 65, y: 208, w: 667, h: 966 },
        { x: 777, y: 215, w: 661, h: 951 },
        { x: 778, y: 1216, w: 667, h: 965 },
        { x: 83, y: 1248, w: 643, h: 922 }
      ]
    }
  },
];
