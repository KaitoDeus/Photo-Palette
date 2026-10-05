import { Router, Request, Response } from "express";
import crypto from "crypto";

export const shareRouter = Router();

export interface ShareSession {
  id: string;
  photoData: string; // Base64 or URL
  videoData?: string | null; // Base64 or Blob URL or WebM data
  frameName?: string;
  layout?: string;
  createdAt: string;
}

// In-memory store for shared photobooth sessions with 24-hour expiration
const shareStore = new Map<string, ShareSession>();

// Cleanup sessions older than 24 hours every hour
setInterval(() => {
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  for (const [id, session] of shareStore.entries()) {
    if (new Date(session.createdAt).getTime() < oneDayAgo) {
      shareStore.delete(id);
    }
  }
}, 60 * 60 * 1000);

// POST /api/share - Create a new share session
shareRouter.post("/", (req: Request, res: Response) => {
  try {
    const { photoData, videoData, frameName, layout } = req.body;

    if (!photoData) {
      res.status(400).json({ success: false, message: "photoData is required" });
      return;
    }

    const id = "pp_" + crypto.randomBytes(4).toString("hex");
    const session: ShareSession = {
      id,
      photoData,
      videoData: videoData || null,
      frameName: frameName || "Photo Palette Strip",
      layout: layout || "1x4",
      createdAt: new Date().toISOString(),
    };

    shareStore.set(id, session);

    res.json({
      success: true,
      shareId: id,
      message: "Share session created successfully",
    });
  } catch (error) {
    console.error("Error creating share session:", error);
    res.status(500).json({ success: false, message: "Failed to create share session" });
  }
});

// GET /api/share/:id - Retrieve a share session
shareRouter.get("/:id", (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const session = shareStore.get(id);

    if (!session) {
      res.status(404).json({ success: false, message: "Ảnh hoặc video đã hết hạn hoặc không tồn tại." });
      return;
    }

    res.json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error("Error fetching share session:", error);
    res.status(500).json({ success: false, message: "Failed to fetch share session" });
  }
});
