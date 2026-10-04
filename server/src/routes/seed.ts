import { Router, Request, Response } from "express";
import { seedDatabase } from "../seed.js";

export const seedRouter = Router();

// POST /api/seed - Trigger DB seed
seedRouter.post("/", async (_req: Request, res: Response) => {
  try {
    await seedDatabase();
    res.json({
      success: true,
      message: "Khởi tạo dữ liệu cơ sở dữ liệu thành công (35 chi nhánh, khung ảnh, bookings mẫu)",
    });
  } catch (error) {
    console.error("Error running seed API:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi seed database" });
  }
});
