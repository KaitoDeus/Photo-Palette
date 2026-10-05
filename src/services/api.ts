import { Branch } from "../data/branches";
import { Frame } from "../features/photobooth/types";
import { Booking, BookingStatus, AdminStats } from "../features/admin/types";

const API_BASE_URL = "/api";

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<{ success: boolean; data?: T; count?: number; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return {
        success: false,
        message: err.message || `HTTP error ${res.status}`,
      };
    }

    return await res.json();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Network error";
    return { success: false, message };
  }
}

export const api = {
  // --- BRANCHES ---
  branches: {
    getAll: async (params?: { city?: string; area?: string; search?: string }) => {
      const query = new URLSearchParams();
      if (params?.city && params.city !== "ALL") query.append("city", params.city);
      if (params?.area && params.area !== "ALL") query.append("area", params.area);
      if (params?.search) query.append("search", params.search);
      const q = query.toString() ? `?${query.toString()}` : "";
      return request<Branch[]>(`/branches${q}`);
    },

    getById: async (id: number) => {
      return request<Branch>(`/branches/${id}`);
    },

    create: async (branch: Omit<Branch, "id">) => {
      return request<Branch>("/branches", {
        method: "POST",
        body: JSON.stringify(branch),
      });
    },

    update: async (id: number, branch: Partial<Branch>) => {
      return request<Branch>(`/branches/${id}`, {
        method: "PUT",
        body: JSON.stringify(branch),
      });
    },

    delete: async (id: number) => {
      return request<{ message: string }>(`/branches/${id}`, {
        method: "DELETE",
      });
    },
  },

  // --- FRAMES ---
  frames: {
    getAll: async (params?: { category?: string; layout?: string; search?: string }) => {
      const query = new URLSearchParams();
      if (params?.category && params.category !== "ALL")
        query.append("category", params.category);
      if (params?.layout && params.layout !== "ALL")
        query.append("layout", params.layout);
      if (params?.search) query.append("search", params.search);
      const q = query.toString() ? `?${query.toString()}` : "";
      return request<Frame[]>(`/frames${q}`);
    },

    getById: async (id: string) => {
      return request<Frame>(`/frames/${id}`);
    },

    create: async (frame: Frame) => {
      return request<Frame>("/frames", {
        method: "POST",
        body: JSON.stringify(frame),
      });
    },

    update: async (id: string, frame: Partial<Frame>) => {
      return request<Frame>(`/frames/${id}`, {
        method: "PUT",
        body: JSON.stringify(frame),
      });
    },

    delete: async (id: string) => {
      return request<{ message: string }>(`/frames/${id}`, {
        method: "DELETE",
      });
    },
  },

  // --- BOOKINGS ---
  bookings: {
    getAll: async (params?: {
      branchId?: number | string;
      status?: string;
      date?: string;
      search?: string;
    }) => {
      const query = new URLSearchParams();
      if (params?.branchId && params.branchId !== "ALL")
        query.append("branchId", String(params.branchId));
      if (params?.status && params.status !== "ALL")
        query.append("status", params.status);
      if (params?.date) query.append("date", params.date);
      if (params?.search) query.append("search", params.search);
      const q = query.toString() ? `?${query.toString()}` : "";
      return request<Booking[]>(`/bookings${q}`);
    },

    getById: async (id: string) => {
      return request<Booking>(`/bookings/${id}`);
    },

    create: async (booking: Omit<Booking, "id" | "code" | "createdAt">) => {
      return request<Booking>("/bookings", {
        method: "POST",
        body: JSON.stringify(booking),
      });
    },

    updateStatus: async (id: string, status: BookingStatus) => {
      return request<Booking>(`/bookings/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },

    delete: async (id: string) => {
      return request<{ message: string }>(`/bookings/${id}`, {
        method: "DELETE",
      });
    },
  },

  // --- STATS ---
  stats: {
    get: async () => {
      return request<AdminStats>("/stats");
    },
  },

  // --- HEALTH & SEED ---
  system: {
    checkHealth: async () => {
      return request<{ status: string; service: string }>("/health");
    },
    seed: async () => {
      return request<{ message: string }>("/seed", { method: "POST" });
    },
  },

  // --- SHARES ---
  shares: {
    create: async (data: {
      photoData: string;
      videoData?: string | null;
      frameName?: string;
      layout?: string;
    }) => {
      return request<{ shareId: string }>("/share", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    get: async (id: string) => {
      return request<{
        id: string;
        photoData: string;
        videoData?: string | null;
        frameName?: string;
        layout?: string;
        createdAt: string;
      }>(`/share/${id}`);
    },
  },
};
