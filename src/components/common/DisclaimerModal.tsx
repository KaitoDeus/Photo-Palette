import React, { useState, useEffect } from "react";
import { Scale, ShieldCheck } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const DisclaimerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeen = localStorage.getItem("has_seen_disclaimer");
    const isReadingPolicy = location.pathname === "/privacy";
    const isAtHome = location.pathname === "/";

    if (!hasSeen) {
      if (isReadingPolicy) {
        // Allow viewing policy without modal
        setIsOpen(false);
      } else if (!isAtHome) {
        // If user tries to go anywhere else (About, Gallery, etc.) without agreeing,
        // force them back to the home page where the modal is active.
        navigate("/", { replace: true });
        setIsOpen(true);
      } else {
        // Show modal on home page
        setIsOpen(true);
      }
    } else {
      setIsOpen(false);
    }
  }, [location.pathname, navigate]);

  const handleClose = () => {
    localStorage.setItem("has_seen_disclaimer", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all duration-300 scale-100 animate-slide-up border border-brand-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="bg-brand-50 px-6 py-4 border-b border-brand-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-100 p-2 rounded-full">
              <Scale className="w-5 h-5 text-brand-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800" id="modal-title">
              Thông Báo Pháp Lý
            </h3>
          </div>
          {/* Close button removed to enforce agreement */}
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-1 space-y-3 text-slate-600">
              <p className="leading-relaxed">
                Chào mừng bạn đến với <strong>Photo Palette</strong>!
              </p>
              <p className="text-sm bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-100">
                <span className="font-semibold block mb-1">📢 Lưu ý:</span>
                Đây là dự án cá nhân được phát triển với mục đích{" "}
                <strong>học tập và nghiên cứu</strong>.
              </p>
              <p className="text-sm leading-relaxed">
                Website này hoạt động <strong>PHI LỢI NHUẬN</strong>. Chúng tôi
                không thu thập dữ liệu cá nhân hay sử dụng hình ảnh của bạn cho
                mục đích thương mại.
              </p>
              <p className="text-sm text-slate-500 italic">
                Mọi tài nguyên hình ảnh chỉ mang tính chất minh họa cho giao
                diện.
              </p>
            </div>
          </div>
        </div>

        {/* Checkbox Agreement */}
        <div className="px-6 pb-2">
          <label className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <div className="w-5 h-5 border-2 border-slate-300 rounded peer-checked:bg-brand-600 peer-checked:border-brand-600 transition-all"></div>
              <svg
                className="w-3.5 h-3.5 text-white absolute transform scale-0 peer-checked:scale-100 transition-transform duration-200 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-slate-700 group-hover:text-brand-700 transition-colors select-none">
              Tôi đã đọc và đồng ý với nội dung trên
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-end items-center">
          <Link
            to="/privacy?mode=read"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-600 font-medium hover:underline hover:text-brand-700 px-2"
          >
            Xem chi tiết Chính sách
          </Link>
          <button
            onClick={handleClose}
            disabled={!isChecked}
            className={`w-full sm:w-auto px-6 py-2.5 font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2
                    ${
                      isChecked
                        ? "bg-brand-600 hover:bg-brand-700 text-white shadow-brand-200 transform active:scale-95"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                    }
                `}
          >
            <ShieldCheck className="w-4 h-4" />
            Đồng ý & Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
