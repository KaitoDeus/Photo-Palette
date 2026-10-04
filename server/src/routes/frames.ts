import { Router, Request, Response } from "express";
import { prisma } from "../prisma.js";

export const frameRouter = Router();

// GET /api/frames - List all frames with filter
frameRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { category, layout, search } = req.query;

    const whereClause: Record<string, unknown> = {
      isActive: true,
    };

    if (category && typeof category === "string" && category !== "ALL") {
      whereClause.category = category;
    }

    if (layout && typeof layout === "string" && layout !== "ALL") {
      whereClause.layout = layout;
    }

    if (search && typeof search === "string") {
      whereClause.OR = [
        { name: { contains: search } },
        { category: { contains: search } },
      ];
    }

    const frames = await prisma.frame.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    // Parse customMetrics JSON text back to object
    const formatted = frames.map((f) => ({
      ...f,
      customMetrics: f.customMetrics ? JSON.parse(f.customMetrics) : undefined,
    }));

    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    console.error("Error fetching frames:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi lấy danh sách khung ảnh" });
  }
});

// GET /api/frames/:id - Get frame detail
frameRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const frame = await prisma.frame.findUnique({
      where: { id: String(req.params.id) },
    });

    if (!frame) {
      return res.status(404).json({ success: false, message: "Không tìm thấy khung ảnh" });
    }

    res.json({
      success: true,
      data: {
        ...frame,
        customMetrics: frame.customMetrics ? JSON.parse(frame.customMetrics) : undefined,
      },
    });
  } catch (error) {
    console.error("Error fetching frame:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi lấy thông tin khung ảnh" });
  }
});

// POST /api/frames - Create new frame
frameRouter.post("/", async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      layout,
      category,
      color,
      borderColor,
      textColor,
      overlayImage,
      customMetrics,
    } = req.body;

    if (!name || !layout || !category) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập tên khung, loại bố cục và danh mục",
      });
    }

    const frameId =
      id ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-") +
        "-" +
        Date.now();

    const created = await prisma.frame.create({
      data: {
        id: frameId,
        name: name.trim(),
        layout: layout.trim(),
        category: category.trim(),
        color: color || "#FFFFFF",
        borderColor: borderColor || "#F1F5F9",
        textColor: textColor || "#0F172A",
        overlayImage: overlayImage || null,
        customMetrics: customMetrics ? JSON.stringify(customMetrics) : null,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        ...created,
        customMetrics: created.customMetrics ? JSON.parse(created.customMetrics) : undefined,
      },
    });
  } catch (error) {
    console.error("Error creating frame:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi tạo khung ảnh" });
  }
});

// PUT /api/frames/:id - Update frame
frameRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const {
      name,
      layout,
      category,
      color,
      borderColor,
      textColor,
      overlayImage,
      customMetrics,
      isActive,
    } = req.body;

    const updated = await prisma.frame.update({
      where: { id: String(req.params.id) },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(layout !== undefined && { layout: layout.trim() }),
        ...(category !== undefined && { category: category.trim() }),
        ...(color !== undefined && { color }),
        ...(borderColor !== undefined && { borderColor }),
        ...(textColor !== undefined && { textColor }),
        ...(overlayImage !== undefined && { overlayImage }),
        ...(customMetrics !== undefined && {
          customMetrics: customMetrics ? JSON.stringify(customMetrics) : null,
        }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    res.json({
      success: true,
      data: {
        ...updated,
        customMetrics: updated.customMetrics ? JSON.parse(updated.customMetrics) : undefined,
      },
    });
  } catch (error) {
    console.error("Error updating frame:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi cập nhật khung ảnh" });
  }
});

// DELETE /api/frames/:id - Delete frame
frameRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    await prisma.frame.delete({
      where: { id: String(req.params.id) },
    });

    res.json({ success: true, message: "Đã xóa khung ảnh thành công" });
  } catch (error) {
    console.error("Error deleting frame:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi xóa khung ảnh" });
  }
});
