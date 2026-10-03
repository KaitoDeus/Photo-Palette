import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Frame } from "../../photobooth/types";
import { FRAMES } from "../../photobooth/data/frames";
import { Branch, BRANCHES } from "../../../data/branches";
import { Booking, BookingStatus, AdminUser, AdminStats } from "../types";
import { DEFAULT_BOOKINGS } from "../data/defaultBookings";

interface AdminContextType {
  // Auth
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (pinOrPass: string, username?: string) => boolean;
  logout: () => void;

  // Frames
  frames: Frame[];
  addFrame: (frame: Frame) => void;
  updateFrame: (id: string, frame: Partial<Frame>) => void;
  deleteFrame: (id: string) => void;
  resetFrames: () => void;

  // Branches
  branches: Branch[];
  addBranch: (branch: Omit<Branch, "id">) => void;
  updateBranch: (id: number, branch: Partial<Branch>) => void;
  deleteBranch: (id: number) => void;
  resetBranches: () => void;

  // Bookings
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "code" | "createdAt">) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  deleteBooking: (id: string) => void;
  resetBookings: () => void;

  // System Stats & Backup
  stats: AdminStats;
  exportAllData: () => string;
  importAllData: (jsonData: string) => boolean;
  resetAllData: () => void;
}

const STORAGE_KEY_AUTH = "photo_palette_admin_auth";
const STORAGE_KEY_FRAMES = "photo_palette_admin_frames";
const STORAGE_KEY_BRANCHES = "photo_palette_admin_branches";
const STORAGE_KEY_BOOKINGS = "photo_palette_admin_bookings";

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Auth State
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = useMemo(() => user !== null, [user]);

  const login = (pinOrPass: string, username = "admin"): boolean => {
    // Cho phép mật khẩu "admin", "admin123", hoặc "123456"
    if (["admin", "admin123", "123456", "palette"].includes(pinOrPass.trim())) {
      const adminUser: AdminUser = {
        id: "admin-1",
        username,
        name: "Quản Trị Viên",
        role: "SUPER_ADMIN",
        avatar: "/logo.jpeg",
      };
      setUser(adminUser);
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_AUTH);
  };

  // 2. Frames State
  const [frames, setFrames] = useState<Frame[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FRAMES);
      return saved ? JSON.parse(saved) : FRAMES;
    } catch {
      return FRAMES;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FRAMES, JSON.stringify(frames));
  }, [frames]);

  const addFrame = (frame: Frame) => {
    setFrames((prev) => [frame, ...prev]);
  };

  const updateFrame = (id: string, updatedFields: Partial<Frame>) => {
    setFrames((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updatedFields } : f))
    );
  };

  const deleteFrame = (id: string) => {
    setFrames((prev) => prev.filter((f) => f.id !== id));
  };

  const resetFrames = () => {
    setFrames(FRAMES);
    localStorage.setItem(STORAGE_KEY_FRAMES, JSON.stringify(FRAMES));
  };

  // 3. Branches State
  const [branches, setBranches] = useState<Branch[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BRANCHES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= BRANCHES.length) {
          return parsed;
        }
      }
      return BRANCHES;
    } catch {
      return BRANCHES;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BRANCHES, JSON.stringify(branches));
  }, [branches]);

  const addBranch = (branchData: Omit<Branch, "id">) => {
    setBranches((prev) => {
      const maxId = prev.length > 0 ? Math.max(...prev.map((b) => b.id)) : 0;
      const newBranch: Branch = { ...branchData, id: maxId + 1 };
      return [newBranch, ...prev];
    });
  };

  const updateBranch = (id: number, updatedFields: Partial<Branch>) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
  };

  const deleteBranch = (id: number) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  const resetBranches = () => {
    setBranches(BRANCHES);
    localStorage.setItem(STORAGE_KEY_BRANCHES, JSON.stringify(BRANCHES));
  };

  // 4. Bookings State
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      return saved ? JSON.parse(saved) : DEFAULT_BOOKINGS;
    } catch {
      return DEFAULT_BOOKINGS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (bookingData: Omit<Booking, "id" | "code" | "createdAt">) => {
    const timestamp = Date.now().toString().slice(-4);
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      code: `BK-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${timestamp}`,
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const resetBookings = () => {
    setBookings(DEFAULT_BOOKINGS);
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(DEFAULT_BOOKINGS));
  };

  // 5. Statistics Calculation
  const stats: AdminStats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const todayCount = bookings.filter((b) => b.bookingDate === today).length;
    const revenue = bookings
      .filter((b) => b.status === "COMPLETED" || b.status === "CONFIRMED")
      .reduce((sum, b) => sum + b.totalAmount, 0);

    // Tìm category phổ biến nhất
    const categoryCount: Record<string, number> = {};
    frames.forEach((f) => {
      categoryCount[f.category] = (categoryCount[f.category] || 0) + 1;
    });
    let topCat = "LOVE";
    let max = 0;
    Object.entries(categoryCount).forEach(([cat, count]) => {
      if (count > max) {
        max = count;
        topCat = cat;
      }
    });

    return {
      totalFrames: frames.length,
      totalBranches: branches.length,
      totalBookings: bookings.length,
      todayBookings: todayCount,
      estimatedRevenue: revenue,
      popularCategory: topCat,
    };
  }, [frames, branches, bookings]);

  // 6. Backup & Import
  const exportAllData = () => {
    const payload = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      frames,
      branches,
      bookings,
    };
    return JSON.stringify(payload, null, 2);
  };

  const importAllData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (Array.isArray(parsed.frames)) setFrames(parsed.frames);
      if (Array.isArray(parsed.branches)) setBranches(parsed.branches);
      if (Array.isArray(parsed.bookings)) setBookings(parsed.bookings);
      return true;
    } catch (e) {
      console.error("Failed to import data:", e);
      return false;
    }
  };

  const resetAllData = () => {
    resetFrames();
    resetBranches();
    resetBookings();
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        frames,
        addFrame,
        updateFrame,
        deleteFrame,
        resetFrames,
        branches,
        addBranch,
        updateBranch,
        deleteBranch,
        resetBranches,
        bookings,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        resetBookings,
        stats,
        exportAllData,
        importAllData,
        resetAllData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
