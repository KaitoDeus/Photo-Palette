import { Frame } from "../photobooth/types";
import { Branch } from "../../data/branches";

export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export interface Booking {
  id: string;
  code: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  branchId: number;
  branchName: string;
  packageType: "SMALL_70K" | "LARGE_100K";
  bookingDate: string;
  timeSlot: string;
  status: BookingStatus;
  totalAmount: number;
  notes?: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: "SUPER_ADMIN" | "MANAGER";
  avatar: string;
}

export interface AdminStats {
  totalFrames: number;
  totalBranches: number;
  totalBookings: number;
  todayBookings: number;
  estimatedRevenue: number;
  popularCategory: string;
}
