import React, { useState, useMemo } from "react";
import {
  Calendar,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Check,
  X,
  Trash2,
  RotateCcw,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  FileText,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { Booking, BookingStatus } from "../types";

export const AdminBookingsPage: React.FC = () => {
  const { bookings, branches, addBooking, updateBookingStatus, deleteBooking, resetBookings } =
    useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState<number>(branches[0]?.id || 1);
  const [packageType, setPackageType] = useState<"SMALL_70K" | "LARGE_100K">("LARGE_100K");
  const [bookingDate, setBookingDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [timeSlot, setTimeSlot] = useState("14:00 - 15:00");
  const [notes, setNotes] = useState("");

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch =
        b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.customerPhone.includes(searchTerm) ||
        b.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === "ALL" || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [bookings, searchTerm, statusFilter]);

  const handleOpenCreateModal = () => {
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setSelectedBranchId(branches[0]?.id || 1);
    setPackageType("LARGE_100K");
    setBookingDate(new Date().toISOString().split("T")[0]);
    setTimeSlot("14:00 - 15:00");
    setNotes("");
    setIsModalOpen(true);
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Vui lòng nhập tên và số điện thoại khách hàng!");
      return;
    }

    const branch = branches.find((b) => b.id === Number(selectedBranchId));
    const totalAmount = packageType === "LARGE_100K" ? 100000 : 70000;

    addBooking({
      customerName,
      customerPhone,
      customerEmail: customerEmail || `${customerPhone}@customer.palette.vn`,
      branchId: Number(selectedBranchId),
      branchName: branch ? branch.name : "Photo Palette Studio",
      packageType,
      bookingDate,
      timeSlot,
      status: "CONFIRMED",
      totalAmount,
      notes,
    });

    setIsModalOpen(false);
  };

  const handleDelete = (b: Booking) => {
    if (window.confirm(`Bạn có chắc muốn xóa lịch hẹn [${b.code}] của khách ${b.customerName}?`)) {
      deleteBooking(b.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Quản Lý Lịch Đặt Studio ({bookings.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Xác nhận lịch hẹn chụp, theo dõi trạng thái và đặt lịch nhanh tại quầy
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              if (window.confirm("Khôi phục danh sách lịch đặt về dữ liệu mẫu ban đầu?")) {
                resetBookings();
              }
            }}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw size={14} /> Khôi Phục Gốc
          </button>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={16} /> Đặt Lịch Tại Quầy
          </button>
        </div>
      </div>

      {/* 2. Status Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "ALL", label: "Tất Cả", count: bookings.length },
          {
            key: "PENDING",
            label: "Chờ Xác Nhận",
            count: bookings.filter((b) => b.status === "PENDING").length,
          },
          {
            key: "CONFIRMED",
            label: "Đã Xác Nhận",
            count: bookings.filter((b) => b.status === "CONFIRMED").length,
          },
          {
            key: "COMPLETED",
            label: "Hoàn Thành",
            count: bookings.filter((b) => b.status === "COMPLETED").length,
          },
          {
            key: "CANCELLED",
            label: "Đã Hủy",
            count: bookings.filter((b) => b.status === "CANCELLED").length,
          },
        ].map((tab) => {
          const isActive = statusFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Tìm theo tên khách hàng, số điện thoại hoặc mã đặt lịch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
          />
        </div>
      </div>

      {/* 4. Bookings Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
                <th className="py-4 px-6">Mã Đặt</th>
                <th className="py-4 px-6">Khách Hàng</th>
                <th className="py-4 px-4">Chi Nhánh</th>
                <th className="py-4 px-4">Ngày Chụp & Giờ</th>
                <th className="py-4 px-4">Gói Dịch Vụ</th>
                <th className="py-4 px-4">Trạng Thái</th>
                <th className="py-4 px-6 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Không tìm thấy lịch đặt nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Code */}
                    <td className="py-3.5 px-6 font-mono font-bold text-slate-900">
                      {b.code}
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-6">
                      <div className="font-bold text-slate-900 text-sm">{b.customerName}</div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1 font-mono">
                          <Phone size={12} className="text-slate-400" /> {b.customerPhone}
                        </span>
                      </div>
                    </td>

                    {/* Branch */}
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {b.branchName.replace("Photo Palette - ", "")}
                    </td>

                    {/* Date & Time */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{b.bookingDate}</div>
                      <div className="text-[11px] text-slate-500">{b.timeSlot}</div>
                    </td>

                    {/* Package */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">
                        {b.packageType === "LARGE_100K" ? "Size Lớn (5 Khung)" : "Size Nhỏ (2 Khung)"}
                      </div>
                      <div className="text-[11px] text-brand-600 font-extrabold">
                        {b.totalAmount.toLocaleString("vi-VN")} đ
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                        className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border focus:outline-none cursor-pointer ${
                          b.status === "CONFIRMED"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : b.status === "PENDING"
                              ? "bg-amber-50 text-amber-700 border-amber-300"
                              : b.status === "COMPLETED"
                                ? "bg-blue-50 text-blue-700 border-blue-300"
                                : "bg-slate-100 text-slate-500 border-slate-300"
                        }`}
                      >
                        <option value="PENDING">Chờ duyệt</option>
                        <option value="CONFIRMED">Đã xác nhận</option>
                        <option value="COMPLETED">Hoàn thành</option>
                        <option value="CANCELLED">Hủy lịch</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={() => handleDelete(b)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        title="Xóa lịch hẹn"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. MODAL: CREATE BOOKING AT COUNTER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
                  <Calendar size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Tạo Lịch Đặt Tại Quầy (Walk-in)
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Thêm lịch chụp trực tiếp cho khách đến phòng chụp
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200/50"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tên Khách Hàng *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Số Điện Thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0912345678"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Chi Nhánh Phòng Chụp
                </label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                >
                  {branches.map((br) => (
                    <option key={br.id} value={br.id}>
                      {br.name} ({br.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Ngày Chụp
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Khung Giờ
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="09:00 - 10:00">09:00 - 10:00</option>
                    <option value="10:30 - 11:30">10:30 - 11:30</option>
                    <option value="13:00 - 14:00">13:00 - 14:00</option>
                    <option value="14:00 - 15:00">14:00 - 15:00</option>
                    <option value="15:30 - 16:30">15:30 - 16:30</option>
                    <option value="17:00 - 18:00">17:00 - 18:00</option>
                    <option value="19:00 - 20:00">19:00 - 20:00</option>
                    <option value="20:30 - 21:30">20:30 - 21:30</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Gói Dịch Vụ
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPackageType("SMALL_70K")}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      packageType === "SMALL_70K"
                        ? "border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">Size Nhỏ (70k)</div>
                    <div className="text-[10px] text-slate-500">2 ảnh in, 2 kiểu khung</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPackageType("LARGE_100K")}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      packageType === "LARGE_100K"
                        ? "border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">Size Lớn (100k)</div>
                    <div className="text-[10px] text-slate-500">2 ảnh in, 5 kiểu khung</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Ghi Chú
                </label>
                <input
                  type="text"
                  placeholder="Yêu cầu riêng, phụ kiện, in thêm..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-md shadow-brand-500/25 transition-all cursor-pointer"
                >
                  Xác Nhận Đặt Lịch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
