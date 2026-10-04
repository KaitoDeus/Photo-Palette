import { Router, Request, Response } from "express";
import { prisma } from "../prisma.js";

export const branchRouter = Router();

// GET /api/branches - List all branches with search/filter
branchRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { city, area, search } = req.query;

    const whereClause: Record<string, unknown> = {
      isActive: true,
    };

    if (city && typeof city === "string" && city !== "ALL") {
      whereClause.city = city;
    }

    if (area && typeof area === "string" && area !== "ALL") {
      whereClause.area = area;
    }

    if (search && typeof search === "string") {
      whereClause.OR = [
        { name: { contains: search } },
        { address: { contains: search } },
        { area: { contains: search } },
      ];
    }

    const branches = await prisma.branch.findMany({
      where: whereClause,
      orderBy: { id: "asc" },
    });

    res.json({ success: true, count: branches.length, data: branches });
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi lấy danh sách chi nhánh" });
  }
});

// GET /api/branches/:id - Get branch details
branchRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "ID không hợp lệ" });
    }

    const branch = await prisma.branch.findUnique({
      where: { id },
      include: {
        bookings: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!branch) {
      return res.status(404).json({ success: false, message: "Không tìm thấy chi nhánh" });
    }

    res.json({ success: true, data: branch });
  } catch (error) {
    console.error("Error fetching branch:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi lấy thông tin chi nhánh" });
  }
});

// POST /api/branches - Create new branch
branchRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { name, area, city, address, lat, lng } = req.body;

    if (!name || !city || !address) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp đầy đủ tên, tỉnh thành và địa chỉ chi nhánh",
      });
    }

    const newBranch = await prisma.branch.create({
      data: {
        name: name.trim(),
        area: (area || city).trim(),
        city: city.trim(),
        address: address.trim(),
        lat: lat ? parseFloat(lat) : null,
        lng: lng ? parseFloat(lng) : null,
      },
    });

    res.status(201).json({ success: true, data: newBranch });
  } catch (error) {
    console.error("Error creating branch:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi tạo chi nhánh mới" });
  }
});

// PUT /api/branches/:id - Update existing branch
branchRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "ID không hợp lệ" });
    }

    const { name, area, city, address, lat, lng, isActive } = req.body;

    const updated = await prisma.branch.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(area !== undefined && { area: area.trim() }),
        ...(city !== undefined && { city: city.trim() }),
        ...(address !== undefined && { address: address.trim() }),
        ...(lat !== undefined && { lat: lat ? parseFloat(lat) : null }),
        ...(lng !== undefined && { lng: lng ? parseFloat(lng) : null }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating branch:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi cập nhật chi nhánh" });
  }
});

// DELETE /api/branches/:id - Delete branch
branchRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "ID không hợp lệ" });
    }

    await prisma.branch.delete({
      where: { id },
    });

    res.json({ success: true, message: "Đã xóa chi nhánh thành công" });
  } catch (error) {
    console.error("Error deleting branch:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ khi xóa chi nhánh" });
  }
});
