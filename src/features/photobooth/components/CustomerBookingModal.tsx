import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  Phone,
  User,
  CreditCard,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import Button from "../../../components/common/Button";
import { useAdmin } from "../../admin/context/AdminContext";

interface CustomerBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBranchId?: number;
}

export const CustomerBookingModal: React.FC<CustomerBookingModalProps> = ({
  isOpen,
  onClose,
  defaultBranchId,
}) => {
  const { branches, addBooking } = useAdmin();

  const [step, setStep] = useState<"FORM" | "SUCCESS">("FORM");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState<number>(
    defaultBranchId || branches[0]?.id || 1
  );

  React.useEffect(() => {
    if (defaultBranchId) {
      setSelectedBranchId(defaultBranchId);
    }
  }, [defaultBranchId]);
  const [packageType, setPackageType] = useState<"SMALL_70K" | "LARGE_100K">(
    "LARGE_100K"
  );
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [timeSlot, setTimeSlot] = useState("14:00 - 15:00");
  const [notes, setNotes] = useState("");
  const [createdCode, setCreatedCode] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Vui lòng điền họ tên và số điện thoại!");
      return;
    }

    const branch = branches.find((b) => b.id === Number(selectedBranchId));
    const totalAmount = packageType === "LARGE_100K" ? 100000 : 70000;
    const code = `BK-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${Date.now().toString().slice(-4)}`;

    addBooking({
      customerName,
      customerPhone,
      customerEmail: `${customerPhone}@customer.palette.vn`,
      branchId: Number(selectedBranchId),
      branchName: branch ? branch.name : "Photo Palette Studio",
      packageType,
      bookingDate,
      timeSlot,
      status: "PENDING",
      totalAmount,
      notes,
    });

    setCreatedCode(code);
    setStep("SUCCESS");
  };

  const handleResetAndClose = () => {
    setStep("FORM");
    onClose();
  };

  const selectedBranch = branches.find((b) => b.id === Number(selectedBranchId));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-brand-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-brand-50 px-6 py-4 border-b border-brand-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-800">
                Đặt Lịch Chụp Studio
              </h3>
              <p className="text-[11px] text-brand-600 font-medium">
                Photo Palette K-Photobooth
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-white transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 custom-scrollbar">
          {step === "FORM" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Package selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Chọn Gói Dịch Vụ
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setPackageType("SMALL_70K")}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      packageType === "SMALL_70K"
                        ? "border-brand-500 bg-brand-50/50 shadow-sm"
                        : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">Size Nhỏ (1x4)</div>
                    <div className="text-sm font-black text-brand-600 mt-0.5">70.000 đ</div>
                    <div className="text-[10px] text-slate-500 mt-1">2 ảnh in giống nhau, 2 kiểu khung</div>
                  </div>

                  <div
                    onClick={() => setPackageType("LARGE_100K")}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      packageType === "LARGE_100K"
                        ? "border-brand-500 bg-brand-50/50 shadow-sm"
                        : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">Size Lớn (2x2)</div>
                    <div className="text-sm font-black text-brand-600 mt-0.5">100.000 đ</div>
                    <div className="text-[10px] text-slate-500 mt-1">2 ảnh in giống nhau, 5 kiểu khung</div>
                  </div>
                </div>
              </div>

              {/* Branch */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  2. Chi Nhánh Studio (24 Cơ Sở)
                </label>
                <div className="relative">
                  <select
                    value={selectedBranchId}
                    onChange={(e) => setSelectedBranchId(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.city} - {b.area})
                      </option>
                    ))}
                  </select>
                </div>
                {selectedBranch && (
                  <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin size={12} className="text-brand-500 flex-shrink-0" />
                    <span className="truncate">{selectedBranch.address}</span>
                  </p>
                )}
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    3. Ngày Chụp
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
                    4. Khung Giờ
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
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

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Họ và Tên *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Thị Mai"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Số Điện Thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0988123456"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Ghi chú cho phòng chụp
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Chụp đôi bạn thân, cần mượn bờm tai thỏ..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2">
                <Button fullWidth={true} type="submit" className="h-12 shadow-lg shadow-brand-500/25">
                  Xác Nhận Đặt Chỗ Ngay
                </Button>
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  *Thanh toán tại quầy khi đến chụp hoặc chuyển khoản mã VietQR
                </p>
              </div>
            </form>
          ) : (
            /* Success Screen */
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <h4 className="text-xl font-black text-slate-900 tracking-tight">
                  Đặt Lịch Chụp Thành Công! 🎉
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Mã đặt chỗ của bạn đã được ghi nhận vào hệ thống
                </p>
              </div>

              <div className="bg-brand-50/70 p-4 rounded-2xl border border-brand-100 text-left space-y-2 text-xs">
                <div className="flex justify-between font-mono">
                  <span className="text-slate-500">Mã Lịch Hẹn:</span>
                  <span className="font-black text-brand-600">{createdCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Khách hàng:</span>
                  <span className="font-bold text-slate-800">{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phòng chụp:</span>
                  <span className="font-bold text-slate-800 truncate max-w-[200px]">
                    {selectedBranch?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Thời gian:</span>
                  <span className="font-bold text-slate-800">{bookingDate} ({timeSlot})</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-slate-500 text-[11px]">
                📸 Hãy lưu lại mã hoặc chụp màn hình để nhân viên check-in nhanh tại studio nhé!
              </div>

              <Button fullWidth={true} onClick={handleResetAndClose}>
                Đã Hiểu & Đóng
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
