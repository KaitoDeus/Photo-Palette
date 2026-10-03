import React, { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  MapPin,
  Calendar,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export const AdminLayout: React.FC = () => {
  const { user, logout, stats } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Tổng Quan",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
      badge: null,
    },
    {
      name: "Kho Khung Ảnh",
      path: "/admin/frames",
      icon: <Image size={20} />,
      badge: stats.totalFrames,
    },
    {
      name: "Chi Nhánh Studio",
      path: "/admin/branches",
      icon: <MapPin size={20} />,
      badge: stats.totalBranches,
    },
    {
      name: "Lịch Đặt Chụp",
      path: "/admin/bookings",
      icon: <Calendar size={20} />,
      badge: stats.totalBookings,
    },
    {
      name: "Cài Đặt & Dữ Liệu",
      path: "/admin/settings",
      icon: <Settings size={20} />,
      badge: null,
    },
  ];

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất khỏi trang quản trị?")) {
      logout();
      navigate("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 font-sans flex text-slate-800">
      {/* 1. Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 2. Admin Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Logo & Title */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-brand-400/50 shadow-md">
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                Photo Palette
                <span className="text-[10px] bg-brand-500/20 text-brand-300 font-extrabold px-1.5 py-0.5 rounded-full border border-brand-500/30">
                  CMS
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Hệ Thống Quản Trị</p>
            </div>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Quản Lý Hệ Thống
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                  isActive
                    ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25 font-bold"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={
                      isActive ? "text-white" : "text-slate-400 group-hover:text-brand-400"
                    }
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                {item.badge !== null && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-800 text-slate-300 group-hover:bg-slate-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-6 px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Truy Cập Nhanh
          </div>
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
          >
            <div className="flex items-center gap-3">
              <ExternalLink size={18} className="text-slate-400" />
              <span>Xem Website</span>
            </div>
            <ChevronRight size={14} className="text-slate-500" />
          </Link>
        </div>

        {/* User Info & Logout Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-brand-500/20 border border-brand-400/40 flex items-center justify-center text-brand-300 flex-shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">
                  {user?.name || "Admin"}
                </div>
                <div className="text-[10px] text-brand-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  Super Admin
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Đăng xuất"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* 3. Main Content Container */}
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                {navItems.find((i) => i.path === location.pathname)?.name || "Bảng Điều Khiển"}
              </h1>
              <div className="text-xs text-slate-500 font-medium hidden sm:flex items-center gap-1.5">
                <span>Photo Palette</span>
                <span>/</span>
                <span className="text-brand-600 font-semibold">
                  {navItems.find((i) => i.path === location.pathname)?.name || "Admin"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-200/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Hệ thống trực tuyến
            </div>
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-brand-600 bg-slate-100 hover:bg-brand-50 px-3 py-2 rounded-xl border border-slate-200 transition-all"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Vào Web Chụp Ảnh</span>
            </Link>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
