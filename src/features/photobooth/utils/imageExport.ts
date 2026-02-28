import { Frame } from "../types";

export const exportFinalImage = async (
  frame: Frame,
  photos: string[],
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const is1x4 = frame.layout === "1x4";
      const baseMetrics = frame.customMetrics || {
        w: 600,
        h: is1x4 ? 1800 : 900,
        pt: 60,
        pb: 100,
        pl: 20,
        pr: 20,
        rowGap: 15,
        colGap: 15,
      };

      // Quality scale factor (e.g., 3x for high res)
      const scale = Math.max(1, 2400 / Math.max(baseMetrics.w, baseMetrics.h));
      const metrics = {
        w: baseMetrics.w * scale,
        h: baseMetrics.h * scale,
        pt: baseMetrics.pt * scale,
        pb: baseMetrics.pb * scale,
        pl: baseMetrics.pl * scale,
        pr: baseMetrics.pr * scale,
        rowGap: baseMetrics.rowGap * scale,
        colGap: (baseMetrics.colGap || 15) * scale,
        imageSlots: baseMetrics.imageSlots?.map(s => ({
            x: s.x * scale,
            y: s.y * scale,
            w: s.w * scale,
            h: s.h * scale,
        }))
      };

      const canvas = document.createElement("canvas");
      canvas.width = metrics.w;
      canvas.height = metrics.h;
      const ctx = canvas.getContext("2d", { alpha: false });

      if (!ctx) {
        reject("Could not get canvas context");
        return;
      }

      // 1. Draw Background
      const colorMap: Record<string, string> = {
        "bg-pink-50": "#fdf2f8",
        "bg-blue-50": "#eff6ff",
        "bg-red-50": "#fef2f2",
        "bg-purple-50": "#faf5ff",
        "bg-white": "#ffffff",
      };
      
      const bgColor = frame.color ? (colorMap[frame.color] || "#ffffff") : "#ffffff";
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Helper to load image
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((res, rej) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => res(img);
          img.onerror = rej;
          img.src = src;
        });
      };

      // 3. Draw Photos
      const slotCount = frame.layout === "1x1" ? 1 : 4;
      const slots = metrics.imageSlots && metrics.imageSlots.length > 0 
        ? metrics.imageSlots 
        : [];

      // If no explicit slots, calculate them (fallback logic similar to FrameStrip)
      if (slots.length === 0) {
        const pl = metrics.pl;
        const pr = metrics.pr;
        const pt = metrics.pt;
        const pb = metrics.pb;
        const rowGap = metrics.rowGap;
        const colGap = metrics.colGap || 15;

        const availableW = metrics.w - pl - pr;
        const availableH = metrics.h - pt - pb;

        if (is1x4) {
          const slotH = (availableH - (slotCount - 1) * rowGap) / slotCount;
          for (let i = 0; i < slotCount; i++) {
            slots.push({
              x: pl,
              y: pt + i * (slotH + rowGap),
              w: availableW,
              h: slotH,
            });
          }
        } else if (frame.layout === "2x2") {
          const slotW = (availableW - colGap) / 2;
          const slotH = (availableH - rowGap) / 2;
          slots.push({ x: pl, y: pt, w: slotW, h: slotH });
          slots.push({ x: pl + slotW + colGap, y: pt, w: slotW, h: slotH });
          slots.push({ x: pl, y: pt + slotH + rowGap, w: slotW, h: slotH });
          slots.push({ x: pl + slotW + colGap, y: pt + slotH + rowGap, w: slotW, h: slotH });
        } else if (frame.layout === "1x1") {
          slots.push({ x: pl, y: pt, w: availableW, h: availableH });
        }
      }

      // Draw each photo in its slot
      for (let i = 0; i < Math.min(slots.length, photos.length); i++) {
        const slot = slots[i];
        const photoSrc = photos[i];
        try {
          const img = await loadImage(photoSrc);
          
          // Draw with object-fit: cover logic
          const targetRatio = slot.w / slot.h;
          const imgRatio = img.width / img.height;
          
          let sw, sh, sx, sy;
          if (imgRatio > targetRatio) {
            sh = img.height;
            sw = sh * targetRatio;
            sx = (img.width - sw) / 2;
            sy = 0;
          } else {
            sw = img.width;
            sh = sw / targetRatio;
            sx = 0;
            sy = (img.height - sh) / 2;
          }

          ctx.drawImage(img, sx, sy, sw, sh, slot.x, slot.y, slot.w, slot.h);
        } catch (e) {
          console.error("Failed to load photo", i, e);
        }
      }

      // 4. Draw Overlay Frame
      if (frame.overlayImage) {
        try {
          const frameImg = await loadImage(frame.overlayImage);
          ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
        } catch (e) {
          console.error("Failed to load frame overlay", e);
        }
      } else {
        // Fallback Branded Footer logic
        ctx.fillStyle = "#334155"; // text-slate-700
        ctx.font = `bold ${Math.round(metrics.w * 0.04)}px sans-serif`;
        ctx.textAlign = "left";
        ctx.fillText("Photo Palette", metrics.pl, metrics.h - metrics.pb / 2);
        
        const dateStr = new Date().toLocaleDateString("vi-VN");
        ctx.textAlign = "right";
        ctx.fillText(dateStr, metrics.w - metrics.pr, metrics.h - metrics.pb / 2);
      }

      const result = canvas.toDataURL("image/jpeg", 0.95);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};
