import React from 'react';

export type BoothStep = 'INTRO' | 'SELECT_FRAME' | 'INSTRUCTION' | 'CAPTURE' | 'PROCESSING' | 'RESULT';
export type LayoutType = 'STRIP_1X4' | 'PORTRAIT_2X2' | 'GRID_2X3' | 'PORTRAIT_1X1';
export type CountdownDuration = 3 | 5 | 10;

export interface Frame {
  id: string;
  name: string;
  layout: string;
  category: string;
  color: string;
  borderColor: string;
  textColor: string;
}

export interface PhotoLayout {
  id: LayoutType;
  name: string;
  count: number;
  icon: React.ReactNode;
  description: string;
}
