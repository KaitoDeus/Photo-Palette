import React from "react";
import { LAYOUTS } from "../constants";
import { LayoutType } from "../types";

interface CaptureStepProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  flash: boolean;
  countDown: number | null;
  selectedLayout: LayoutType;
  photos: string[];
  lastPhoto: string | null;
  isMirrored: boolean;
}

const CaptureStep: React.FC<CaptureStepProps> = ({
  videoRef,
  flash,
  countDown,
  selectedLayout,
  photos,
  lastPhoto,
  isMirrored,
}) => {
  const getPreviewStyle = () => {
    // Defines the aspect ratio and height constraints for the video preview
    // Using fixed heights ensures the UI doesn't jump vertically between different layouts
    switch (selectedLayout) {
      case "PORTRAIT_2X2":
      case "PORTRAIT_1X1":
        return "aspect-[3/4] h-[450px] md:h-[550px]";
      case "STRIP_1X4":
      case "GRID_2X3":
      default:
        return "aspect-square h-[450px] md:h-[550px]";
    }
  };

  return (
    <div className="relative w-full h-full min-h-[600px] flex flex-col items-center justify-center p-6">
      {/* Camera Preview Container with dynamic aspect ratio */}
      <div
        className={`relative overflow-hidden w-auto shadow-2xl rounded-2xl bg-black ${getPreviewStyle()}`}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transition-transform duration-500 ${isMirrored ? "transform -scale-x-100" : ""}`}
        />

        {/* Flash Overlay - Scoped to video */}
        <div
          className={`absolute inset-0 bg-white transition-opacity duration-150 pointer-events-none z-50 ${flash ? "opacity-100" : "opacity-0"}`}
        />

        {countDown && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-[2px]">
            <span className="text-9xl font-bold text-white drop-shadow-lg animate-ping font-mono">
              {countDown}
            </span>
          </div>
        )}
      </div>

      {/* Preview Overlay - Moved to bottom right to avoid blocking view */}
      {lastPhoto && (
        <div className="absolute right-6 bottom-20 w-24 aspect-[3/4] bg-white p-1 shadow-2xl rounded-lg -rotate-6 z-20 animate-in fade-in slide-in-from-bottom duration-300">
          <img
            src={lastPhoto}
            className="w-full h-full object-cover rounded-md"
            alt="Preview"
          />
        </div>
      )}

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {Array.from({
          length: LAYOUTS.find((l) => l.id === selectedLayout)?.count || 4,
        }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${i < photos.length ? "bg-brand-500" : "bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CaptureStep;
