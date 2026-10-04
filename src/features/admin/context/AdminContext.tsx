import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { Frame } from "../../photobooth/types";
import { FRAMES } from "../../photobooth/data/frames";
import { Branch, BRANCHES } from "../../../data/branches";
import { Booking, BookingStatus, AdminUser, AdminStats } from "../types";
import { DEFAULT_BOOKINGS } from "../data/defaultBookings";
import { api } from "../../../services/api";

interface AdminContextType {
  // Auth
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (pinOrPass: string, username?: string) => boolean;
  logout: () => void;

  // Backend Sync Status
  isServerConnected: boolean;
  refreshFromBackend: () => Promise<void>;

  // Frames
  frames: Frame[];
  addFrame: (frame: Frame) => Promise<void>;
  updateFrame: (id: string, frame: Partial<Frame>) => Promise<void>;
  deleteFrame: (id: string) => Promise<void>;
  resetFrames: () => void;

  // Branches
  branches: Branch[];
  addBranch: (branch: Omit<Branch, "id">) => Promise<void>;
  updateBranch: (id: number, branch: Partial<Branch>) => Promise<void>;
  deleteBranch: (id: number) => Promise<void>;
  resetBranches: () => void;

  // Bookings
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "code" | "createdAt">) => Promise<void>;
  updateBookingStatus: (id: string, status: BookingStatus) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
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

  // 2. Server Connection State
  const [isServerConnected, setIsServerConnected] = useState<boolean>(false);

  // 3. Frames State
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

  // 4. Branches State
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

  // 5. Bookings State
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

  // Sync data from Backend Server on initialization
  const refreshFromBackend = useCallback(async () => {
    try {
      const [branchRes, frameRes, bookingRes] = await Promise.all([
        api.branches.getAll(),
        api.frames.getAll(),
        api.bookings.getAll(),
      ]);

      let connected = false;

      if (branchRes.success && branchRes.data && branchRes.data.length > 0) {
        setBranches(branchRes.data);
        connected = true;
      }
      if (frameRes.success && frameRes.data && frameRes.data.length > 0) {
        setFrames(frameRes.data);
        connected = true;
      }
      if (bookingRes.success && bookingRes.data) {
        setBookings(bookingRes.data);
        connected = true;
      }

      setIsServerConnected(connected);
    } catch {
      setIsServerConnected(false);
    }
  }, []);

  useEffect(() => {
    refreshFromBackend();
  }, [refreshFromBackend]);

  // --- Frame Operations ---
  const addFrame = async (frame: Frame) => {
    setFrames((prev) => [frame, ...prev]);
    try {
      await api.frames.create(frame);
    } catch (err) {
      console.warn("Could not sync frame creation to server:", err);
    }
  };

  const updateFrame = async (id: string, updatedFields: Partial<Frame>) => {
    setFrames((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updatedFields } : f))
    );
    try {
      await api.frames.update(id, updatedFields);
    } catch (err) {
      console.warn("Could not sync frame update to server:", err);
    }
  };

  const deleteFrame = async (id: string) => {
    setFrames((prev) => prev.filter((f) => f.id !== id));
    try {
      await api.frames.delete(id);
    } catch (err) {
      console.warn("Could not sync frame deletion to server:", err);
    }
  };

  const resetFrames = () => {
    setFrames(FRAMES);
    localStorage.setItem(STORAGE_KEY_FRAMES, JSON.stringify(FRAMES));
  };

  // --- Branch Operations ---
  const addBranch = async (branchData: Omit<Branch, "id">) => {
    const maxId = branches.length > 0 ? Math.max(...branches.map((b) => b.id)) : 0;
    const tempBranch: Branch = { ...branchData, id: maxId + 1 };
    setBranches((prev) => [tempBranch, ...prev]);

    try {
      const res = await api.branches.create(branchData);
      if (res.success && res.data) {
        setBranches((prev) =>
          prev.map((b) => (b.id === tempBranch.id ? res.data! : b))
        );
      }
    } catch (err) {
      console.warn("Could not sync branch creation to server:", err);
    }
  };

  const updateBranch = async (id: number, updatedFields: Partial<Branch>) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
    try {
      await api.branches.update(id, updatedFields);
    } catch (err) {
      console.warn("Could not sync branch update to server:", err);
    }
  };

  const deleteBranch = async (id: number) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
    try {
      await api.branches.delete(id);
    } catch (err) {
      console.warn("Could not sync branch deletion to server:", err);
    }
  };

  const resetBranches = () => {
    setBranches(BRANCHES);
    localStorage.setItem(STORAGE_KEY_BRANCHES, JSON.stringify(BRANCHES));
  };

  // --- Booking Operations ---
  const addBooking = async (bookingData: Omit<Booking, "id" | "code" | "createdAt">) => {
    const timestamp = Date.now().toString().slice(-4);
    const tempBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      code: `BK-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${timestamp}`,
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [tempBooking, ...prev]);

    try {
      const res = await api.bookings.create(bookingData);
      if (res.success && res.data) {
        setBookings((prev) =>
          prev.map((b) => (b.id === tempBooking.id ? res.data! : b))
        );
      }
    } catch (err) {
      console.warn("Could not sync booking creation to server:", err);
    }
  };

  const updateBookingStatus = async (id: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    try {
      await api.bookings.updateStatus(id, status);
    } catch (err) {
      console.warn("Could not sync booking status to server:", err);
    }
  };

  const deleteBooking = async (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    try {
      await api.bookings.delete(id);
    } catch (err) {
      console.warn("Could not sync booking deletion to server:", err);
    }
  };

  const resetBookings = () => {
    setBookings(DEFAULT_BOOKINGS);
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(DEFAULT_BOOKINGS));
  };

  // 6. Statistics Calculation
  const stats: AdminStats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const todayCount = bookings.filter((b) => b.bookingDate === today).length;
    const revenue = bookings
      .filter((b) => b.status === "COMPLETED" || b.status === "CONFIRMED")
      .reduce((sum, b) => sum + b.totalAmount, 0);

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

  // 7. Backup & Import
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
        isServerConnected,
        refreshFromBackend,
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
