import { Router, Request, Response } from "express";
import { prisma } from "../prisma.js";

export const bookingRouter = Router();

// Helper to generate a unique readable booking code like PAL-7821
function generateBookingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "PAL-";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// GET /api/bookings - List bookings with filters
bookingRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { branchId, status, date, search } = req.query;

    const whereClause: Record<string, unknown> = {};

    if (branchId && branchId !== "ALL") {
      const bId = parseInt(branchId as string, 10);
      if (!isNaN(bId)) {
        whereClause.branchId = bId;
      }
    }

    if (status && status !== "ALL") {
      whereClause.status = status;
    }

    if (date && typeof date === "string") {
      whereClause.bookingDate = date;
    }

    if (search && typeof search === "string") {
      whereClause.OR = [
        { code: { contains: search } },
        { customerName: { contains: search } },
        { customerPhone: { contains: search } },
        { customerEmail: { contains: search } },
      ];
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi lấy danh sách đặt lịch" });
  }
});

// GET /api/bookings/:id - Get booking detail
bookingRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: String(req.params.id) },
      include: { branch: true },
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: "Không tìm thấy lịch đặt" });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi lấy chi tiết đặt lịch" });
  }
});

// POST /api/bookings - Create new booking
bookingRouter.post("/", async (req: Request, res: Response) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      branchId,
      branchName,
      packageType,
      bookingDate,
      timeSlot,
      notes,
    } = req.body;

    if (!customerName || !customerPhone || !branchId || !bookingDate || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ họ tên, số điện thoại, chi nhánh, ngày và giờ chụp",
      });
    }

    // Determine total amount based on packageType
    const amount = packageType === "LARGE_100K" ? 100000 : 70000;

    // Generate unique code
    let code = generateBookingCode();
    // ensure unique
    let existing = await prisma.booking.findUnique({ where: { code } });
    while (existing) {
      code = generateBookingCode();
      existing = await prisma.booking.findUnique({ where: { code } });
    }

    const newBooking = await prisma.booking.create({
      data: {
        code,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: (customerEmail || "").trim(),
        branchId: parseInt(branchId, 10),
        branchName: branchName || "Photo Palette Studio",
        packageType: packageType || "SMALL_70K",
        bookingDate,
        timeSlot,
        status: "PENDING",
        totalAmount: amount,
        notes: notes ? notes.trim() : null,
      },
    });

    res.status(201).json({
      success: true,
      message: "Đặt lịch chụp thành công",
      data: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi tạo lịch đặt" });
  }
});

// PATCH /api/bookings/:id/status - Update booking status
bookingRouter.patch("/:id/status", async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const validStatuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Trạng thái không hợp lệ (PENDING, CONFIRMED, COMPLETED, CANCELLED)",
      });
    }

    const updated = await prisma.booking.update({
      where: { id: String(req.params.id) },
      data: { status },
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi cập nhật trạng thái" });
  }
});

// DELETE /api/bookings/:id - Delete booking
bookingRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    await prisma.booking.delete({
      where: { id: String(req.params.id) },
    });

    res.json({ success: true, message: "Đã xóa lịch đặt thành công" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi xóa lịch đặt" });
  }
});
