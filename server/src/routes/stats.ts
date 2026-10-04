import { Router, Request, Response } from "express";
import { prisma } from "../prisma.js";

export const statsRouter = Router();

// GET /api/stats - Dashboard analytics
statsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const [
      totalFrames,
      totalBranches,
      totalBookings,
      todayBookings,
      confirmedBookings,
      completedBookings,
    ] = await Promise.all([
      prisma.frame.count({ where: { isActive: true } }),
      prisma.branch.count({ where: { isActive: true } }),
      prisma.booking.count(),
      prisma.booking.count({ where: { bookingDate: today } }),
      prisma.booking.findMany({
        where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
        select: { totalAmount: true },
      }),
      prisma.booking.count({ where: { status: "COMPLETED" } }),
    ]);

    const estimatedRevenue = confirmedBookings.reduce(
      (sum, b) => sum + (b.totalAmount || 0),
      0
    );

    // Find most popular frame category
    const frames = await prisma.frame.groupBy({
      by: ["category"],
      _count: { category: true },
      orderBy: { _count: { category: "desc" } },
      take: 1,
    });

    const popularCategory =
      frames.length > 0 ? frames[0].category : "TRENDY_HOT";

    res.json({
      success: true,
      data: {
        totalFrames,
        totalBranches,
        totalBookings,
        todayBookings,
        completedBookings,
        estimatedRevenue,
        popularCategory,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi lấy thống kê" });
  }
});
