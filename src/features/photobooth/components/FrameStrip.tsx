import React from "react";
import { Frame } from "../types";
import modelImg from "../../../assets/photobooth/model.jpg";

interface FrameStripProps {
  frame: Frame;
  filled: boolean;
  size?: "sm" | "md";
}

export const FrameStrip: React.FC<FrameStripProps> = ({
  frame,
  filled,
  size = "md",
}) => {
  const isStrip = frame.layout === "1x4";
  const slotCount = frame.layout === "2x3" ? 6 : 4;
  const slots = Array.from({ length: slotCount }, (_, i) => i + 1);

  const sizeClasses = {
    sm: {
      "1x4": "w-12 h-36", // 48px x 144px
      other: "w-24 h-36", // 96px x 144px
    },
    md: {
      "1x4": "w-16 h-48", // 64px x 192px
      other: "w-32 h-48", // 128px x 192px
    },
  };

  const dimensions =
    frame.layout === "1x4"
      ? sizeClasses[size]["1x4"]
      : sizeClasses[size]["other"];

  let wrapperClasses = `relative shadow-sm transition-transform hover:scale-105 duration-300 ${filled ? "translate-y-2" : ""} ${dimensions}`;

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
      colGap: 15
    };

    if (metrics.imageSlots && metrics.imageSlots.length > 0) {
      return (
        <div className={`${wrapperClasses} overflow-hidden bg-white`} style={{ position: "relative" }}>
          {metrics.imageSlots.map((slot, i) => {
            const top = (slot.y / metrics.h) * 100 + "%";
            const left = (slot.x / metrics.w) * 100 + "%";
            const width = (slot.w / metrics.w) * 100 + "%";
            const height = (slot.h / metrics.h) * 100 + "%";
            return (
              <div
                key={i}
                className={`bg-slate-200 overflow-hidden absolute`}
                style={{ top, left, width, height }}
              >
                {filled && (
                  <img
                    src={modelImg}
                    alt="pose"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    decoding="async"
                  />
                )}
              </div>
            );
          })}
          <div className="absolute inset-0 z-10 pointer-events-none">
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
        className={`${wrapperClasses} overflow-hidden bg-white ${is1x4 ? "flex flex-col" : "grid grid-cols-2"}`}
        style={{
          paddingTop: pt,
          paddingBottom: pb,
          paddingLeft: pl,
          paddingRight: pr,
          rowGap: rowGap,
          columnGap: colGap,
        }}
      >
        {slots.map((i) => (
          <div
            key={i}
            className={`w-full h-full bg-slate-200 overflow-hidden relative ${is1x4 ? "flex-1" : ""}`}
            style={
              !is1x4
                ? { aspectRatio: frame.layout === "2x1" ? "auto" : "3/4" }
                : {}
            }
          >
            {filled && (
              <img
                src={modelImg}
                alt="pose"
                className="w-full h-full object-cover object-center"
                loading="eager"
                decoding="async"
              />
            )}
          </div>
        ))}
        <div className="absolute inset-0 z-10 pointer-events-none">
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

  // Fallback for basic frames
  wrapperClasses += ` border-2 py-1 px-1 gap-1 ${frame.borderColor} ${frame.color}`;
  if (isStrip) {
    wrapperClasses += " flex flex-col items-center justify-between";
  } else {
    wrapperClasses += " grid grid-cols-2";
    if (frame.layout === "2x2") wrapperClasses += " grid-rows-2";
    if (frame.layout === "2x3") wrapperClasses += " grid-rows-3";
    wrapperClasses += " gap-1";
  }

  return (
    <div
      className={wrapperClasses}
      style={{ backgroundColor: filled ? "white" : "transparent" }}
    >
      {slots.map((i) => (
        <div
          key={i}
          className={`w-full h-full border ${filled ? "bg-slate-200" : "bg-white"} border-slate-100/50 overflow-hidden relative`}
        >
          {filled && (
            <img
              src={modelImg}
              alt="pose"
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
          )}
        </div>
      ))}
    </div>
  );
};
