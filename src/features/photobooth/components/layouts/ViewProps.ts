import React from "react";
import { LayoutType, CountdownDuration, Frame } from "../../types";

export interface LayoutSelectionStepProps {
  selectedLayout: LayoutType;
  selectedFrame: Frame;
  countDownDuration: CountdownDuration;
  permissionDenied: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  isMirrored: boolean;
  isRecapEnabled: boolean;
  onSelectLayout: (layout: LayoutType) => void;
  onSelectFrame: (frame: Frame) => void;
  onSelectCountDown: (duration: CountdownDuration) => void;
  onToggleMirror: () => void;
  onToggleRecap: () => void;
  onRetryPermission: () => void;
  onStartCapture: () => void;
  onManualCapture?: () => void;
  onAbortCapture?: () => void;
  onBack: () => void;
  countDown: number | null;
  photos: string[];
  lastPhoto: string | null;
  isCapturing: boolean;
  setIsFrameModalOpen: (open: boolean) => void;
}
