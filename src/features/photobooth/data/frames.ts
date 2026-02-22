import { Frame } from "../types";

// Frame Images
import loveFrame from "../../../assets/frames/love-certificate_LoveCertificate_1x4.webp";
import loveFrameGrid from "../../../assets/frames/love-certificate-grid_LoveCertificate_2x2.webp";
import myOneAndOnlyFrame from "../../../assets/frames/my-one-and-only_MyOneAndOnly_1x4.webp";
import myOneAndOnlyFrameGrid from "../../../assets/frames/my-one-and-only-grid_MyOneAndOnly_2x2.webp";
import hoaxuanFrame from "../../../assets/frames/hoaxuan_1x4.webp";
import hoaxuanGridFrame from "../../../assets/frames/hoaxuan_2x2.webp";
import loveLetterFrame from "../../../assets/frames/love-letter_1x4.webp";
import loveLetterGridFrame from "../../../assets/frames/love-letter_2x2.webp";
import lunarNewYearFrame from "../../../assets/frames/lunar-new-year_1x4.webp";
import lunarNewYearGridFrame from "../../../assets/frames/lunar-new-year_2x2.webp";
import sacXuanFrame from "../../../assets/frames/sac-xuan_1x4.webp";
import sacXuanGridFrame from "../../../assets/frames/sac-xuan_2x2.webp";
import tanXuanFrame from "../../../assets/frames/tan-xuan_1x4.webp";
import tanXuanGridFrame from "../../../assets/frames/tan-xuan_2x2.webp";

export const FRAMES: Frame[] = [

  {
    id: "love-certificate",
    name: "Love Certificate",
    layout: "1x4",
    category: "VALENTINE",
    color: "bg-pink-50",
    borderColor: "border-pink-400",
    textColor: "text-pink-500",
    overlayImage: loveFrame,
    customMetrics: {
      w: 172,
      h: 520,
      pt: 20,
      pb: 56,
      pl: 13,
      pr: 13,
      rowGap: 9
    }
  },
  {
    id: "love-certificate-grid",
    name: "Love Certificate",
    layout: "2x2",
    category: "VALENTINE",
    color: "bg-pink-50",
    borderColor: "border-pink-400",
    textColor: "text-pink-500",
    overlayImage: loveFrameGrid,
    customMetrics: {
      w: 682,
      h: 1024,
      pt: 91,
      pb: 40,
      pl: 28,
      pr: 30,
      rowGap: 23,
      colGap: 25
    }
  },
  {
    id: "my-one-and-only",
    name: "My One & Only",
    layout: "1x4",
    category: "VALENTINE",
    color: "bg-blue-50",
    borderColor: "border-blue-400",
    textColor: "text-blue-600",
    overlayImage: myOneAndOnlyFrame,
    customMetrics: {
      w: 383,
      h: 1132,
      pt: 0,
      pb: 0,
      pl: 0,
      pr: 0,
      rowGap: 0,
      colGap: 0,
      imageSlots: [
        { x: 34, y: 44, w: 156, h: 108 },
        { x: 27, y: 282, w: 163, h: 120 },
        { x: 30, y: 535, w: 160, h: 116 },
        { x: 27, y: 782, w: 163, h: 120 }
      ]
    }
  },
  {
    id: "my-one-and-only-grid",
    name: "My One & Only",
    layout: "2x2",
    category: "VALENTINE",
    color: "bg-blue-50",
    borderColor: "border-blue-400",
    textColor: "text-blue-600",
    overlayImage: myOneAndOnlyFrameGrid,
    customMetrics: {
      w: 759,
      h: 1132,
      pt: 0,
      pb: 0,
      pl: 0,
      pr: 0,
      rowGap: 0,
      colGap: 0,
      imageSlots: [
        { x: 32, y: 104, w: 166, h: 241 },
        { x: 388, y: 107, w: 165, h: 237 },
        { x: 389, y: 608, w: 166, h: 241 },
        { x: 41, y: 624, w: 160, h: 230 }
      ]
    }
  },
    {
    id: "hoaxuan",
    name: "Hoa Xuân",
    layout: "1x4",
    category: "TET HOLIDAY",
    color: "bg-red-50",
    borderColor: "border-red-400",
    textColor: "text-red-500",
    overlayImage: hoaxuanFrame,
    customMetrics: {
      w: 824,
      h: 2468,
      pt: 0,
      pb: 0,
      pl: 0,
      pr: 0,
      rowGap: 0,
      colGap: 0,
      imageSlots: [
        { x: 60, y: 76, w: 709, h: 518 },
        { x: 60, y: 621, w: 709, h: 520 },
        { x: 59, y: 1167, w: 711, h: 520 },
        { x: 60, y: 1710, w: 710, h: 520 }
      ]
    }
  },
  {
    id: "hoaxuan-grid",
    name: "Hoa Xuân",
    layout: "2x2",
    category: "TET HOLIDAY",
    color: "bg-red-50",
    borderColor: "border-red-400",
    textColor: "text-red-500",
    overlayImage: hoaxuanGridFrame,
    customMetrics: {
      w: 1644,
      h: 2468,
      pt: 0,
      pb: 0,
      pl: 0,
      pr: 0,
      rowGap: 0,
      colGap: 0,
      imageSlots: [
        { x: 71, y: 222, w: 722, h: 1051 },
        { x: 846, y: 219, w: 725, h: 1055 },
        { x: 70, y: 1320, w: 724, h: 1049 },
        { x: 847, y: 1319, w: 724, h: 1049 }
      ]
    }
  },
  {
    id: "love-letter",
    name: "Love Letter",
    layout: "1x4",
    category: "VALENTINE",
    color: "bg-red-50",
    borderColor: "border-red-400",
    textColor: "text-red-500",
    overlayImage: loveLetterFrame,
    customMetrics: {
      w: 760,
      h: 2192,
      pt: 0,
      pb: 0,
      pl: 0,
      pr: 0,
      rowGap: 0,
      colGap: 0,
      imageSlots: [
        { x: 74, y: 79, w: 621, h: 434 },
        { x: 72, y: 560, w: 624, h: 455 },
        { x: 65, y: 1042, w: 631, h: 453 },
        { x: 72, y: 1520, w: 623, h: 447 }
      ]
    }
  },
  {
    id: "love-letter-grid",
    name: "Love Letter",
    layout: "2x2",
    category: "VALENTINE",
    color: "bg-red-50",
    borderColor: "border-red-400",
    textColor: "text-red-500",
    overlayImage: loveLetterGridFrame,
    customMetrics: {
      w: 1460,
      h: 2188,
      pt: 0,
      pb: 0,
      pl: 0,
      pr: 0,
      rowGap: 0,
      colGap: 0,
      imageSlots: [
        { x: 67, y: 201, w: 635, h: 920 },
        { x: 765, y: 216, w: 619, h: 886 },
        { x: 11, y: 1166, w: 692, h: 833 },
        { x: 754, y: 1166, w: 633, h: 830 }
      ]
    }
  },
  {
    id: "lunar-new-year",
    name: "Tết Nguyên Đán",
    layout: "1x4",
    category: "TET HOLIDAY",
    color: "bg-red-50",
    borderColor: "border-red-400",
    textColor: "text-red-500",
    overlayImage: lunarNewYearFrame,
    customMetrics: {
      w: 896,
      h: 2560,
      pt: 0,
      pb: 0,
      pl: 0,
      pr: 0,
      rowGap: 0,
      colGap: 0,
      imageSlots: [
        { x: 79, y: 104, w: 728, h: 526 },
        { x: 79, y: 664, w: 728, h: 525 },
        { x: 74, y: 1222, w: 733, h: 529 },
        { x: 80, y: 1782, w: 727, h: 515 }
      ]
    }
  },
  {
    id: "lunar-new-year-grid",
    name: "Tết Nguyên Đán",
    layout: "2x2",
    category: "TET HOLIDAY",
    color: "bg-red-50",
    borderColor: "border-red-400",
    textColor: "text-red-500",
    overlayImage: lunarNewYearGridFrame,
    customMetrics: {
      w: 1724,
      h: 2568,
      pt: 0,
      pb: 0,
      pl: 0,
      pr: 0,
      rowGap: 0,
      colGap: 0,
      imageSlots: [
        { x: 91, y: 244, w: 738, h: 1074 },
        { x: 885, y: 246, w: 739, h: 1072 },
        { x: 88, y: 1366, w: 739, h: 1073 },
        { x: 884, y: 1366, w: 741, h: 1073 }
      ]
    }
  },
  {
    id: "sac-xuan",
    name: "Sắc Xuân",
    layout: "1x4",
    category: "TET HOLIDAY",
    color: "bg-red-50",
    borderColor: "border-red-400",
    textColor: "text-red-500",
    overlayImage: sacXuanFrame,
    customMetrics: {
      w: 848,
      h: 2520,
      pt: 0,
      pb: 0,
      pl: 0,
      pr: 0,
      rowGap: 0,
      colGap: 0,
      imageSlots: [
        { x: 74, y: 98, w: 701, h: 495 },
        { x: 63, y: 643, w: 727, h: 514 },
        { x: 74, y: 1211, w: 701, h: 496 },
        { x: 63, y: 1752, w: 725, h: 519 }
      ]
    }
  },
  {
    id: "sac-xuan-grid",
    name: "Sắc Xuân",
    layout: "2x2",
    category: "TET HOLIDAY",
    color: "bg-red-50",
    borderColor: "border-red-400",
    textColor: "text-red-500",
    overlayImage: sacXuanGridFrame,
    customMetrics: {
      w: 1700,
      h: 2528,
      pt: 0,
      pb: 0,
      pl: 0,
      pr: 0,
      rowGap: 0,
      colGap: 0,
      imageSlots: [
        { x: 108, y: 252, w: 700, h: 1044 },
        { x: 885, y: 237, w: 738, h: 1073 },
        { x: 90, y: 1358, w: 738, h: 1070 },
        { x: 903, y: 1372, w: 701, h: 1044 }
      ]
    }
  },
  {
    id: "tan-xuan",
    name: "Tân Xuân",
    layout: "1x4",
    category: "TET HOLIDAY",
    color: "bg-red-50",
    borderColor: "border-red-400",
    textColor: "text-red-500",
    overlayImage: tanXuanFrame,
    customMetrics: {
      w: 756,
      h: 2228,
      pt: 0,
      pb: 0,
      pl: 0,
      pr: 0,
      rowGap: 0,
      colGap: 0,
      imageSlots: [
        { x: 65, y: 77, w: 628, h: 453 },
        { x: 65, y: 568, w: 624, h: 454 },
        { x: 65, y: 1059, w: 628, h: 453 },
        { x: 65, y: 1549, w: 624, h: 455 }
      ]
    }
  },
  {
    id: "tan-xuan-grid",
    name: "Tân Xuân",
    layout: "2x2",
    category: "TET HOLIDAY",
    color: "bg-red-50",
    borderColor: "border-red-400",
    textColor: "text-red-500",
    overlayImage: tanXuanGridFrame,
    customMetrics: {
      w: 1500,
      h: 2232,
      pt: 0,
      pb: 0,
      pl: 0,
      pr: 0,
      rowGap: 0,
      colGap: 0,
      imageSlots: [
        { x: 84, y: 219, w: 634, h: 927 },
        { x: 784, y: 218, w: 637, h: 930 },
        { x: 84, y: 1204, w: 634, h: 931 },
        { x: 784, y: 1205, w: 637, h: 928 }
      ]
    }
  }
];
