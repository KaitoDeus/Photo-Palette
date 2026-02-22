import React from "react";
import { Columns, Grid, Layout, RectangleVertical } from "lucide-react";
import { PhotoLayout } from "./types";

export const LAYOUTS: PhotoLayout[] = [
  {
    id: "STRIP_1X4",
    name: "Nhỏ (1x4)",
    count: 4,
    icon: React.createElement(Columns, { size: 24 }),
    description: "4 ảnh dọc",
  },
  {
    id: "PORTRAIT_2X2",
    name: "Lớn (2x2)",
    count: 4,
    icon: React.createElement(Grid, { size: 24 }),
    description: "4 ảnh lưới",
  },
  {
    id: "PORTRAIT_1X1",
    name: "Portrait (1x1)",
    count: 1,
    icon: React.createElement(RectangleVertical, { size: 24 }),
    description: "1 ảnh lớn",
  },
];
