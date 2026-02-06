import React from 'react';
import { Columns, Grid, Layout, RectangleVertical } from 'lucide-react';
import { PhotoLayout } from './types';

export const LAYOUTS: PhotoLayout[] = [
  { id: 'STRIP_1X4', name: '1x4 Strips', count: 4, icon: React.createElement(Columns, { size: 24 }), description: '4 ảnh dọc' },
  { id: 'PORTRAIT_2X2', name: '2x2 Portrait', count: 4, icon: React.createElement(Grid, { size: 24 }), description: '4 ảnh lưới' },
  { id: 'GRID_2X3', name: '2x3 Grid', count: 6, icon: React.createElement(Layout, { size: 24 }), description: '6 ảnh lớn' },
  { id: 'PORTRAIT_1X1', name: '1x1 Portrait', count: 1, icon: React.createElement(RectangleVertical, { size: 24 }), description: '1 ảnh lớn' },
];
