import React, { useState } from "react";
import {
  Download,
  Upload,
  RotateCcw,
  ShieldAlert,
  Save,
  CheckCircle2,
  FileJson,
  Layers,
  Database,
  Info,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export const AdminSettingsPage: React.FC = () => {
  const { exportAllData, importAllData, resetAllData, frames, branches, bookings } =
    useAdmin();

  const [importJsonText, setImportJsonText] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleExport = () => {
    const dataString = exportAllData();
    const blob = new Blob([dataString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `photo-palette-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSuccessMessage("Đã xuất file sao lưu JSON thành công!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!importJsonText.trim()) {
      setErrorMessage("Vui lòng dán chuỗi JSON sao lưu!");
      return;
    }

    const ok = importAllData(importJsonText);
    if (ok) {
      setSuccessMessage("Đã nhập dữ liệu thành công! Toàn bộ hệ thống đã được đồng bộ.");
      setImportJsonText("");
    } else {
      setErrorMessage("Cú pháp JSON không hợp lệ. Vui lòng kiểm tra lại file backup!");
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === "string") {
          setImportJsonText(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleResetFactory = () => {
    if (
      window.confirm(
        "CẢNH BÁO: Thao tác này sẽ đặt lại TOÀN BỘ khung ảnh, 24 chi nhánh và lịch đặt về trạng thái ban đầu của hệ thống. Bạn có chắc chắn không?"
      )
    ) {
      resetAllData();
      setSuccessMessage("Đã khôi phục toàn bộ hệ thống về dữ liệu gốc thành công!");
      setTimeout(() => setSuccessMessage(""), 4000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* 1. Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Cài Đặt & Đồng Bộ Dữ Liệu Hệ Thống
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Xuất file sao lưu (JSON), phục hồi dữ liệu hoặc quản lý bộ nhớ của Photo Palette CMS
        </p>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <ShieldAlert size={18} className="text-rose-500 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 2. Backup & Export Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
            <Download size={20} />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Xuất Sao Lưu Dữ Liệu (Export JSON)
            </h3>
            <p className="text-xs text-slate-500">
              Tải về trọn bộ dữ liệu ({frames.length} khung ảnh, {branches.length} chi nhánh, {bookings.length} lịch đặt) để lưu trữ an toàn
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            <span className="font-bold block text-slate-800 mb-0.5">
              Định dạng file: Standard Photo Palette JSON Backup v1.0
            </span>
            Dữ liệu có thể được nạp vào bất kỳ môi trường nào hoặc chuyển tiếp lên Database Server.
          </div>
          <button
            onClick={handleExport}
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-500/25 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Download size={16} /> Tải File Backup (.json)
          </button>
        </div>
      </div>

      {/* 3. Restore & Import Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Upload size={20} />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Khôi Phục Dữ Liệu Từ File Sao Lưu (Import JSON)
            </h3>
            <p className="text-xs text-slate-500">
              Tải lên file hoặc dán nội dung JSON đã sao lưu để nạp lại vào hệ thống
            </p>
          </div>
        </div>

        <form onSubmit={handleImport} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Nội dung JSON sao lưu
              </label>
              <label className="text-xs font-bold text-brand-600 hover:underline cursor-pointer flex items-center gap-1">
                <FileJson size={14} />
                <span>Chọn file .json từ máy tính</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={handleFileImport}
                />
              </label>
            </div>
            <textarea
              rows={4}
              placeholder='Dán chuỗi JSON đã sao lưu vào đây (ví dụ: { "version": "1.0", "frames": [...] })...'
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!importJsonText.trim()}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Upload size={16} /> Đồng Bộ Dữ Liệu Ngay
            </button>
          </div>
        </form>
      </div>

      {/* 4. Factory Reset (Danger Zone) */}
      <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Vùng Nguy Hiểm (Danger Zone)
            </h3>
            <p className="text-xs text-slate-500">
              Khôi phục toàn bộ hệ thống về cài đặt ban đầu (Reset to Default)
            </p>
          </div>
        </div>

        <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-rose-800">
            <span className="font-bold block mb-0.5">Đặt lại về 30+ khung gốc & 24 chi nhánh mặc định</span>
            Mọi khung tự tạo hoặc lịch hẹn mới sẽ bị xóa và thay thế bằng dữ liệu nguyên bản của dự án.
          </div>
          <button
            onClick={handleResetFactory}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md shadow-rose-600/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <RotateCcw size={14} /> Khôi Phục Toàn Bộ
          </button>
        </div>
      </div>

      {/* 5. System Info */}
      <div className="p-6 bg-slate-100/70 rounded-3xl border border-slate-200/80 text-xs text-slate-600 flex items-start gap-3">
        <Info size={18} className="text-slate-400 mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-bold text-slate-800 block mb-1">
            Kiến trúc hệ thống Photo Palette CMS
          </span>
          <p className="leading-relaxed">
            Hệ thống CMS hiện sử dụng cơ chế lưu trữ phản ứng (*Reactive LocalStorage Data Store*) kết hợp cùng React 19 Context. Mọi thay đổi bạn thực hiện đối với khung ảnh và chi nhánh sẽ phản ánh tức thời sang các trang phía người dùng mà không cần reload trang. Dữ liệu đã sẵn sàng để xuất hoặc kết nối sang Backend REST API.
          </p>
        </div>
      </div>
    </div>
  );
};
