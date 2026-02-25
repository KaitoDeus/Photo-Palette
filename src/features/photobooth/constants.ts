import React from "react";
import { Columns, Grid, Layout, RectangleVertical } from "lucide-react";
import { PhotoLayout } from "./types";

export const LAYOUTS: PhotoLayout[] = [
  {
    id: "STRIP_1X4",
    name: "1x4 (Nhỏ)",
    count: 4,
    icon: React.createElement(Columns, { size: 24 }),
    description: "4 ảnh dọc",
  },
  {
    id: "PORTRAIT_2X2",
    name: "2x2 (Lớn)",
    count: 4,
    icon: React.createElement(Grid, { size: 24 }),
    description: "4 ảnh lưới",
  },
  {
    id: "PORTRAIT_1X1",
    name: "1x1 Potrait",
    count: 1,
    icon: React.createElement(RectangleVertical, { size: 24 }),
    description: "1 ảnh lớn",
  },
];
