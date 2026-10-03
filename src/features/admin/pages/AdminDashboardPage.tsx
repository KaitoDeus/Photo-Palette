import React from "react";
import { Link } from "react-router-dom";
import {
  Image,
  MapPin,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Sparkles,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export const AdminDashboardPage: React.FC = () => {
  const { frames, branches, bookings, stats, updateBookingStatus } = useAdmin();

  // Category distribution
  const categoryStats = React.useMemo(() => {
    const counts: Record<string, number> = {};
    frames.forEach((f) => {
      counts[f.category] = (counts[f.category] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [frames]);

  // Layout distribution
  const layoutStats = React.useMemo(() => {
    let count1x4 = 0;
    let count2x2 = 0;
    let count1x1 = 0;
    frames.forEach((f) => {
      if (f.layout === "1x4") count1x4++;
      else if (f.layout === "2x2") count2x2++;
      else if (f.layout === "1x1") count1x1++;
    });
    return { count1x4, count2x2, count1x1 };
  }, [frames]);

  const recentBookings = bookings.slice(0, 5);
  const recentFrames = frames.slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-brand-500 via-rose-500 to-pink-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-brand-500/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs mb-3">
            <Sparkles size={14} /> Hệ Thống Vận Hành Photobooth
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Chào mừng trở lại, Quản Trị Viên! 👋
          </h2>
          <p className="text-white/80 text-sm mt-1 max-w-xl">
            Toàn bộ {stats.totalFrames} khung ảnh, {stats.totalBranches} chi nhánh phòng chụp và các lượt đặt lịch đều được cập nhật theo thời gian thực.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/frames"
            className="px-4 py-2.5 bg-white text-brand-600 hover:bg-brand-50 text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Plus size={16} /> Thêm Khung Mới
          </Link>
          <Link
            to="/admin/bookings"
            className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white text-xs font-black rounded-xl transition-all border border-white/30 flex items-center gap-1.5"
          >
            <Calendar size={16} /> Xem Lịch Đặt
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tổng Khung Ảnh
            </span>
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center">
              <Image size={20} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.totalFrames}</div>
          <div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>{layoutStats.count1x4} dải 1x4 • {layoutStats.count2x2} dải 2x2</span>
            <Link to="/admin/frames" className="text-brand-500 hover:underline flex items-center">
              Quản lý <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Chi Nhánh Studio
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <MapPin size={20} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.totalBranches}</div>
          <div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Toàn quốc (Hà Nội, TP.HCM...)</span>
            <Link to="/admin/branches" className="text-blue-500 hover:underline flex items-center">
              Quản lý <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Lịch Đặt Chụp
            </span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center">
              <Calendar size={20} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{stats.totalBookings}</div>
          <div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className="text-purple-600 font-bold">{stats.todayBookings} lịch hôm nay</span>
            <Link to="/admin/bookings" className="text-purple-500 hover:underline flex items-center">
              Chi tiết <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Doanh Thu Đặt Lịch
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {stats.estimatedRevenue.toLocaleString("vi-VN")} đ
          </div>
          <div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className="text-emerald-600 font-bold">Thanh toán tự động</span>
            <span className="text-slate-400">Tỷ lệ hoàn thành cao</span>
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Distribution Charts & Quick Frame Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Phân bố danh mục khung */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900">Phân Loại Khung Ảnh</h3>
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-bold">
                {categoryStats.length} Chủ đề
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Số lượng khung thiết kế đang hoạt động trên hệ thống
            </p>

            <div className="space-y-3.5">
              {categoryStats.map((cat) => {
                const percentage = Math.round((cat.count / frames.length) * 100);
                return (
                  <div key={cat.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>{cat.name}</span>
                      <span className="text-slate-500">
                        {cat.count} mẫu ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-400 to-brand-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Chủ đề hot nhất:</span>
            <span className="font-black text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
              {stats.popularCategory}
            </span>
          </div>
        </div>

        {/* Lịch đặt chụp gần đây */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Lịch Đặt Chụp Mới Nhất</h3>
                <p className="text-xs text-slate-500 mt-0.5">Khách hàng đặt lịch tại các chi nhánh</p>
              </div>
              <Link
                to="/admin/bookings"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                Tất cả lịch <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase font-bold tracking-wider">
                    <th className="pb-3">Mã Đặt</th>
                    <th className="pb-3">Khách Hàng</th>
                    <th className="pb-3">Chi Nhánh</th>
                    <th className="pb-3">Thời Gian</th>
                    <th className="pb-3">Trạng Thái</th>
                    <th className="pb-3 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 font-bold text-slate-800 font-mono">{b.code}</td>
                      <td className="py-3.5">
                        <div className="font-bold text-slate-900">{b.customerName}</div>
                        <div className="text-[11px] text-slate-400">{b.customerPhone}</div>
                      </td>
                      <td className="py-3.5 text-slate-600 font-medium truncate max-w-[150px]">
                        {b.branchName.replace("Photo Palette - ", "")}
                      </td>
                      <td className="py-3.5">
                        <div className="font-semibold text-slate-800">{b.bookingDate}</div>
                        <div className="text-[11px] text-slate-400">{b.timeSlot}</div>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            b.status === "CONFIRMED"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                              : b.status === "PENDING"
                                ? "bg-amber-50 text-amber-600 border border-amber-200"
                                : b.status === "COMPLETED"
                                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                                  : "bg-slate-100 text-slate-500 border border-slate-200"
                          }`}
                        >
                          {b.status === "CONFIRMED" && <CheckCircle2 size={10} />}
                          {b.status === "PENDING" && <Clock size={10} />}
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        {b.status === "PENDING" ? (
                          <button
                            onClick={() => updateBookingStatus(b.id, "CONFIRMED")}
                            className="text-[11px] font-bold bg-brand-50 hover:bg-brand-100 text-brand-600 px-2.5 py-1 rounded-lg transition-all"
                          >
                            Xác nhận
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[11px]">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Khung ảnh mới nhất preview */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-base text-slate-900">Mẫu Khung Đang Nổi Bật</h3>
            <p className="text-xs text-slate-500 mt-0.5">Khung ảnh đang được người dùng chọn chụp nhiều nhất</p>
          </div>
          <Link
            to="/admin/frames"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            Xem tất cả {frames.length} khung &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {recentFrames.map((frame) => (
            <div
              key={frame.id}
              className="group border border-slate-100 rounded-2xl p-3 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col items-center text-center"
            >
              <div className="h-40 w-full flex items-center justify-center p-2 rounded-xl bg-white mb-2 shadow-xs overflow-hidden">
                {frame.overlayImage ? (
                  <img
                    src={frame.overlayImage}
                    alt={frame.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-16 h-28 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-[10px] text-slate-400">
                    Basic
                  </div>
                )}
              </div>
              <div className="font-bold text-xs text-slate-900 truncate w-full">{frame.name}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                {frame.layout} • {frame.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
