import React from "react";
import { Frame } from "../types";
import model1 from "../../../assets/photobooth/model-1.webp";
import model2 from "../../../assets/photobooth/model-2.webp";
import model3 from "../../../assets/photobooth/model-3.webp";
import model4 from "../../../assets/photobooth/model-4.webp";

import model1x4_1 from "../../../assets/photobooth/model-1x4-1.webp";
import model1x4_2 from "../../../assets/photobooth/model-1x4-2.webp";
import model1x4_3 from "../../../assets/photobooth/model-1x4-3.webp";
import model1x4_4 from "../../../assets/photobooth/model-1x4-4.webp";

const MODELS = [model1, model2, model3, model4];
const MODELS_1X4 = [model1x4_1, model1x4_2, model1x4_3, model1x4_4];

interface FrameStripProps {
  frame: Frame;
  filled: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  photos?: string[];
  disableHover?: boolean;
  aspectMode?: "capture" | "original";
  imageFit?: "cover" | "fill";
}

export const FrameStrip: React.FC<FrameStripProps> = ({
  frame,
  filled,
  size = "md",
  photos = [],
  disableHover = false,
  aspectMode = "capture",
  imageFit = "cover",
}) => {
  const isStrip = frame.layout === "1x4";
  const isOriginal = aspectMode === "original";
  const slotCount = frame.layout === "1x1" ? 1 : 4;
  const slots = Array.from({ length: slotCount }, (_, i) => i + 1);

  const sizeClasses = {
    sm: {
      "1x4": "w-[60px] aspect-[1/3]", 
      portrait: "w-[120px] aspect-[3/4]",
      square: "w-[120px] aspect-square",
    },
    md: {
      port: "w-[80px] sm:w-[100px] aspect-[1/3]", // for 1x4 in mobile
      "1x4": "w-[80px] sm:w-[100px] aspect-[1/3]",
      portrait: "w-[160px] sm:w-[200px] aspect-[3/4]",
      square: "w-[180px] sm:w-[220px] aspect-square",
    },
    lg: {
      "1x4": "w-[240px] max-w-[40vw] aspect-[1/3]",
      portrait: "w-[400px] max-w-[80vw] aspect-[3/4]",
      square: "w-[450px] max-w-[80vw] aspect-square",
    },
    xl: {
      "1x4": "w-[280px] max-w-[50vw] sm:max-w-xs aspect-[1/3]",
      portrait: "w-[480px] max-w-[90vw] sm:max-w-md aspect-[3/4]",
      square: "w-[600px] max-w-[90vw] sm:max-w-xl aspect-square",
    },
  };

  const dimensions =
    frame.layout === "1x4"
      ? sizeClasses[size]["1x4"]
      : frame.layout === "2x2" || frame.layout === "1x1"
        ? isOriginal
          ? sizeClasses[size]["portrait"]
          : sizeClasses[size]["square"]
        : sizeClasses[size]["portrait"];

  let wrapperClasses = `relative shadow-sm transition-transform ${disableHover ? "" : "hover:scale-105 hover:translate-y-1"} duration-500 ${dimensions}`;

  if (frame.overlayImage) {
    const is1x4 = frame.layout === "1x4";

    // CALIBRATION (Based on SVG: W=600, H=1800 for 1x4, H=900 for grid)
    // CSS Padding is relative to WIDTH
    const metrics = frame.customMetrics || {
      w: 600,
      h: is1x4 ? 1800 : 900,
      pt: 60,
      pb: 100,
      pl: 20,
      pr: 20,
      rowGap: 15,
      colGap: 15,
    };

    if (metrics.imageSlots && metrics.imageSlots.length > 0) {
      return (
        <div
          className={`${wrapperClasses} overflow-hidden bg-white`}
          style={{ position: "relative" }}
        >
          {metrics.imageSlots.map((slot, i) => {
            const top = `calc(${(slot.y / metrics.h) * 100}% - 1px)`;
            const left = `calc(${(slot.x / metrics.w) * 100}% - 1px)`;
            const width = `calc(${(slot.w / metrics.w) * 100}% + 2px)`;
            const height = `calc(${(slot.h / metrics.h) * 100}% + 2px)`;
            return (
              <div
                key={i}
                className={`bg-slate-200 overflow-hidden absolute z-0`}
                style={{ top, left, width, height }}
              >
                {filled && (
                  <img
                    src={
                      photos.length > 0
                        ? photos[i] || photos[0]
                        : is1x4
                          ? MODELS_1X4[i % 4]
                          : MODELS[i % 4]
                    }
                    alt={`pose ${i + 1}`}
                    className={`w-full h-full object-center ${imageFit === "fill" ? "object-fill" : "object-cover"}`}
                    loading="eager"
                    decoding="async"
                  />
                )}
              </div>
            );
          })}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <img
              src={frame.overlayImage}
              alt="Frame Overlay"
              className="w-full h-full object-fill"
              loading="eager"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      );
    }

    const pl = (metrics.pl / metrics.w) * 100 + "%";
    const pr = (metrics.pr / metrics.w) * 100 + "%";
    const pt = (metrics.pt / metrics.w) * 100 + "%";
    const pb = (metrics.pb / metrics.w) * 100 + "%";

    // Gaps in Flex/Grid:
    const rowGap = (metrics.rowGap / metrics.h) * 100 + "%";
    const colGap = ((metrics.colGap || 15) / metrics.w) * 100 + "%";

    return (
      <div
        className={`${wrapperClasses} overflow-hidden bg-white ${
          is1x4 ? "flex flex-col" : frame.layout === "1x1" ? "flex" : "grid grid-cols-2"
        }`}
        style={{
          paddingTop: pt,
          paddingBottom: pb,
          paddingLeft: pl,
          paddingRight: pr,
          rowGap: rowGap,
          columnGap: colGap,
        }}
      >
        {slots.map((slotNum, i) => (
          <div
            key={slotNum}
            className={`w-full bg-slate-200 overflow-hidden relative z-0 ${is1x4 ? "flex-1" : ""}`}
            style={
              !is1x4
                ? {
                    aspectRatio:
                      frame.layout === "2x2" || frame.layout === "1x1"
                        ? isOriginal
                          ? "3/4"
                          : "1/1"
                        : frame.layout === "2x1"
                          ? "auto"
                          : "3/4",
                  }
                : { flex: 1 } // Ensure 1x4 slots flex equally
            }
          >
            {filled && (
              <img
                src={
                  photos.length > 0
                    ? photos[i] || photos[0]
                    : is1x4
                      ? MODELS_1X4[i % 4]
                      : MODELS[i % 4]
                }
                alt={`pose ${i + 1}`}
                className={`w-full h-full object-center ${imageFit === "fill" ? "object-fill" : "object-cover"}`}
                loading="eager"
                decoding="async"
              />
            )}
          </div>
        ))}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <img
            src={frame.overlayImage}
            alt="Frame Overlay"
            className="w-full h-full object-fill md:object-fill" // Use object-fill for frames to match metrics, but rely on container aspect ratio
            loading="eager"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>
    );
  }

  // Fallback for basic frames
  const is1x1 = frame.layout === "1x1";
  const is2x2 = frame.layout === "2x2";

  // Increase padding for 2x2 and 1x1 to create a clear border/Polaroid look
  const fallbackPadding = isStrip ? "p-1.5" : is2x2 || is1x1 ? "p-4" : "p-2";
  wrapperClasses += ` border-2 ${fallbackPadding} gap-2 ${frame.borderColor} ${frame.color}`;

  if (isStrip) {
    wrapperClasses += " flex flex-col items-center justify-between";
  } else {
    wrapperClasses += " grid gap-2";
    if (frame.layout === "2x2") wrapperClasses += " grid-cols-2 grid-rows-2";
    else if (frame.layout === "1x1")
      wrapperClasses += " grid-cols-1 grid-rows-1";
    else wrapperClasses += " grid-cols-2";
  }

  const currentDate = new Date().toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div
      className={`${wrapperClasses} flex flex-col`}
      style={{ backgroundColor: filled ? "white" : "transparent" }}
    >
      <div
        className={
          isStrip
            ? "flex flex-col flex-1 gap-1"
            : `grid gap-1 flex-1 ${
                frame.layout === "2x2"
                  ? "grid-cols-2 grid-rows-2"
                  : "grid-cols-1"
              }`
        }
      >
        {slots.map((slotNum, i) => (
          <div
            key={slotNum}
            className={`w-full border ${filled ? "bg-slate-200" : "bg-white"} border-slate-100/50 overflow-hidden relative ${
              frame.layout === "2x2" || frame.layout === "1x1"
                ? isOriginal
                  ? "aspect-[3/4]"
                  : "aspect-square"
                : "aspect-[3/4]"
            }`}
          >
            {filled && (
              <img
                src={
                  photos.length > 0
                    ? photos[i] || photos[0]
                    : isStrip
                      ? MODELS_1X4[i % 4]
                      : MODELS[i % 4]
                }
                alt={`pose ${i + 1}`}
                className={`w-full h-full ${imageFit === "fill" ? "object-fill" : "object-cover"}`}
                loading="eager"
                decoding="async"
              />
            )}
          </div>
        ))}
      </div>

      {/* Branded Footer for Fallback Frames */}
      <div className="pt-4 pb-1 flex items-center justify-between mt-auto px-1 border-t border-slate-100/30">
        <span
          className={`text-[9px] font-black tracking-tight ${frame.textColor || "text-slate-900"}`}
        >
          Photo Palette
        </span>
        <span className="text-[9px] font-bold text-slate-800 opacity-90">
          {currentDate}
        </span>
      </div>
    </div>
  );
};
