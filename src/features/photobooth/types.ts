import React from "react";

export type BoothStep =
  | "INTRO"
  | "SELECT_FRAME"
  | "CAPTURE"
  | "PROCESSING"
  | "RESULT";
export type LayoutType = "STRIP_1X4" | "PORTRAIT_2X2" | "PORTRAIT_1X1";
export type CountdownDuration = 3 | 5 | 10;

export interface Frame {
  id: string;
  name: string;
  layout: string;
  category: string;
  color: string;
  borderColor: string;
  textColor: string;
  overlayImage?: string;
  customMetrics?: {
    w: number;
    h: number;
    pt: number;
    pb: number;
    pl: number;
    pr: number;
    rowGap: number;
    colGap?: number;
    imageSlots?: { x: number; y: number; w: number; h: number }[];
  };
}

export interface PhotoLayout {
  id: LayoutType;
  name: string;
  count: number;
  icon: React.ReactNode;
  description: string;
}
