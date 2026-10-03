import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  RotateCcw,
  Eye,
  Check,
  X,
  Upload,
  Sparkles,
  Sliders,
  Layers,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { Frame } from "../../photobooth/types";
import { FrameStrip } from "../../photobooth/components/FrameStrip";

export const AdminFramesPage: React.FC = () => {
  const { frames, addFrame, updateFrame, deleteFrame, resetFrames } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedLayout, setSelectedLayout] = useState("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFrame, setEditingFrame] = useState<Frame | null>(null);

  // Form Fields State
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("LOVE");
  const [formLayout, setFormLayout] = useState<"1x4" | "2x2" | "1x1">("1x4");
  const [formColor, setFormColor] = useState("bg-white");
  const [formBorderColor, setFormBorderColor] = useState("border-slate-200");
  const [formTextColor, setFormTextColor] = useState("text-slate-800");
  const [formOverlayImage, setFormOverlayImage] = useState("");

  // Metrics State
  const [metricsW, setMetricsW] = useState(600);
  const [metricsH, setMetricsH] = useState(1800);
  const [metricsPt, setMetricsPt] = useState(60);
  const [metricsPb, setMetricsPb] = useState(100);
  const [metricsPl, setMetricsPl] = useState(20);
  const [metricsPr, setMetricsPr] = useState(20);
  const [metricsRowGap, setMetricsRowGap] = useState(15);
  const [metricsColGap, setMetricsColGap] = useState(15);

  const categories = useMemo(() => {
    const set = new Set<string>();
    frames.forEach((f) => set.add(f.category));
    return ["ALL", ...Array.from(set)];
  }, [frames]);

  // Filtered frames
  const filteredFrames = useMemo(() => {
    return frames.filter((frame) => {
      const matchSearch =
        frame.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        frame.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory =
        selectedCategory === "ALL" || frame.category === selectedCategory;
      const matchLayout =
        selectedLayout === "ALL" || frame.layout === selectedLayout;
      return matchSearch && matchCategory && matchLayout;
    });
  }, [frames, searchTerm, selectedCategory, selectedLayout]);

  const handleOpenCreateModal = () => {
    setEditingFrame(null);
    setFormName("");
    setFormCategory("LOVE");
    setFormLayout("1x4");
    setFormColor("bg-white");
    setFormBorderColor("border-slate-200");
    setFormTextColor("text-slate-800");
    setFormOverlayImage("");
    // Defaults for 1x4
    setMetricsW(600);
    setMetricsH(1800);
    setMetricsPt(60);
    setMetricsPb(100);
    setMetricsPl(20);
    setMetricsPr(20);
    setMetricsRowGap(15);
    setMetricsColGap(15);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (frame: Frame) => {
    setEditingFrame(frame);
    setFormName(frame.name);
    setFormCategory(frame.category);
    setFormLayout(frame.layout as "1x4" | "2x2" | "1x1");
    setFormColor(frame.color || "bg-white");
    setFormBorderColor(frame.borderColor || "border-slate-200");
    setFormTextColor(frame.textColor || "text-slate-800");
    setFormOverlayImage(frame.overlayImage || "");

    const m = frame.customMetrics || {
      w: 600,
      h: frame.layout === "1x4" ? 1800 : 900,
      pt: 60,
      pb: 100,
      pl: 20,
      pr: 20,
      rowGap: 15,
      colGap: 15,
    };
    setMetricsW(m.w);
    setMetricsH(m.h);
    setMetricsPt(m.pt);
    setMetricsPb(m.pb);
    setMetricsPl(m.pl);
    setMetricsPr(m.pr);
    setMetricsRowGap(m.rowGap);
    setMetricsColGap(m.colGap || 15);

    setIsModalOpen(true);
  };

  const handleApplyPreset = (layout: "1x4" | "2x2") => {
    setFormLayout(layout);
    if (layout === "1x4") {
      setMetricsW(600);
      setMetricsH(1800);
      setMetricsPt(60);
      setMetricsPb(100);
      setMetricsPl(20);
      setMetricsPr(20);
      setMetricsRowGap(15);
      setMetricsColGap(15);
    } else {
      setMetricsW(600);
      setMetricsH(900);
      setMetricsPt(60);
      setMetricsPb(100);
      setMetricsPl(20);
      setMetricsPr(20);
      setMetricsRowGap(15);
      setMetricsColGap(15);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setFormOverlayImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert("Vui lòng nhập tên khung ảnh!");
      return;
    }

    const customMetrics = {
      w: Number(metricsW),
      h: Number(metricsH),
      pt: Number(metricsPt),
      pb: Number(metricsPb),
      pl: Number(metricsPl),
      pr: Number(metricsPr),
      rowGap: Number(metricsRowGap),
      colGap: Number(metricsColGap),
    };

    if (editingFrame) {
      updateFrame(editingFrame.id, {
        name: formName,
        category: formCategory,
        layout: formLayout,
        color: formColor,
        borderColor: formBorderColor,
        textColor: formTextColor,
        overlayImage: formOverlayImage || undefined,
        customMetrics,
      });
    } else {
      const slug =
        formName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") + `-${Date.now().toString().slice(-4)}`;
      const newFrame: Frame = {
        id: slug,
        name: formName,
        category: formCategory,
        layout: formLayout,
        color: formColor,
        borderColor: formBorderColor,
        textColor: formTextColor,
        overlayImage: formOverlayImage || undefined,
        customMetrics,
      };
      addFrame(newFrame);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (frame: Frame) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa khung "${frame.name}"? Thao tác này sẽ cập nhật ngay trên trang người dùng.`
      )
    ) {
      deleteFrame(frame.id);
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Bạn có chắc muốn khôi phục toàn bộ danh sách khung ảnh về dữ liệu gốc mặc định?"
      )
    ) {
      resetFrames();
    }
  };

  // Live preview frame object
  const previewFrame: Frame = {
    id: editingFrame?.id || "preview-frame",
    name: formName || "Khung Mẫu Xem Trước",
    category: formCategory,
    layout: formLayout,
    color: formColor,
    borderColor: formBorderColor,
    textColor: formTextColor,
    overlayImage: formOverlayImage || undefined,
    customMetrics: {
      w: metricsW,
      h: metricsH,
      pt: metricsPt,
      pb: metricsPb,
      pl: metricsPl,
      pr: metricsPr,
      rowGap: metricsRowGap,
      colGap: metricsColGap,
    },
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Quản Lý Kho Khung Ảnh ({frames.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Thêm mới, sửa toạ độ slots và cập nhật trực tiếp cho người dùng tại Photobooth & Kho Frame
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleReset}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            title="Khôi phục 30+ khung mặc định"
          >
            <RotateCcw size={14} /> Khôi Phục Gốc
          </button>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={16} /> Thêm Khung Mới
          </button>
        </div>
      </div>

      {/* 2. Filter & Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc mã khung..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
          />
        </div>

        {/* Filter Category */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase hidden sm:inline">
            Chủ đề:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "ALL" ? "Tất cả chủ đề" : c}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Layout */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase hidden sm:inline">
            Layout:
          </span>
          <select
            value={selectedLayout}
            onChange={(e) => setSelectedLayout(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="ALL">Tất cả layout</option>
            <option value="1x4">Dải 1x4 (Strip)</option>
            <option value="2x2">Lưới 2x2 (Grid)</option>
            <option value="1x1">Chân dung 1x1</option>
          </select>
        </div>
      </div>

      {/* 3. Frames Table / Grid */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
                <th className="py-4 px-6 w-20">Ảnh Mẫu</th>
                <th className="py-4 px-6">Tên Khung</th>
                <th className="py-4 px-4">Layout</th>
                <th className="py-4 px-4">Chủ Đề</th>
                <th className="py-4 px-4">Màu Nền</th>
                <th className="py-4 px-4">Kích Thước</th>
                <th className="py-4 px-6 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFrames.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Không tìm thấy khung ảnh nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredFrames.map((frame) => (
                  <tr
                    key={frame.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Thumbnail */}
                    <td className="py-3 px-6">
                      <div className="w-14 h-20 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center p-1 shadow-2xs group-hover:scale-105 transition-transform">
                        {frame.overlayImage ? (
                          <img
                            src={frame.overlayImage}
                            alt={frame.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-[9px] text-slate-400 font-bold">
                            No Image
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Name & ID */}
                    <td className="py-3 px-6">
                      <div className="font-bold text-slate-900 text-sm">
                        {frame.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                        {frame.id}
                      </div>
                    </td>

                    {/* Layout */}
                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-50 text-purple-600 border border-purple-200">
                        {frame.layout}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200">
                        {frame.category || "BASIC"}
                      </span>
                    </td>

                    {/* Color */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 font-medium text-slate-600">
                        <span
                          className={`w-4 h-4 rounded-full border border-slate-300 shadow-2xs ${frame.color || "bg-white"}`}
                        />
                        <span className="text-[11px]">{frame.color || "bg-white"}</span>
                      </div>
                    </td>

                    {/* Metrics */}
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                      {frame.customMetrics?.w || 600}x
                      {frame.customMetrics?.h || (frame.layout === "1x4" ? 1800 : 900)}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(frame)}
                          className="p-2 text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
                          title="Chỉnh sửa khung"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(frame)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="Xóa khung"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. MODAL: CREATE / EDIT FRAME */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
                  {editingFrame ? <Edit2 size={16} /> : <Plus size={16} />}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    {editingFrame ? "Chỉnh Sửa Khung Ảnh" : "Thêm Khung Ảnh Mới"}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {editingFrame ? `Mã: ${editingFrame.id}` : "Tạo mẫu khung mới cho Photobooth"}
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

            {/* Modal Body: Split into Form (Left) and Live Preview (Right) */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8 custom-scrollbar">
              {/* Left Column: Form Controls (7 cols) */}
              <form onSubmit={handleSave} className="md:col-span-7 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tên Khung Ảnh *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Sweet Valentine 2026"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Category & Layout */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Chủ Đề (Category)
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    >
                      <option value="LOVE">LOVE</option>
                      <option value="VALENTINE">VALENTINE</option>
                      <option value="TET HOLIDAY">TET HOLIDAY</option>
                      <option value="BIRTHDAY">BIRTHDAY</option>
                      <option value="8/3">8/3</option>
                      <option value="BASIC">BASIC</option>
                      <option value="CUSTOM">CUSTOM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Bố Cục (Layout)
                    </label>
                    <select
                      value={formLayout}
                      onChange={(e) =>
                        handleApplyPreset(e.target.value as "1x4" | "2x2")
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    >
                      <option value="1x4">Dải Dọc 1x4 (4 ảnh)</option>
                      <option value="2x2">Lưới Vuông 2x2 (4 ảnh)</option>
                      <option value="1x1">Chân Dung 1x1 (1 ảnh)</option>
                    </select>
                  </div>
                </div>

                {/* Overlay Image (Upload or URL) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Hình Ảnh Khung (Overlay WebP / PNG)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Dán link ảnh hoặc upload file bên dưới..."
                      value={formOverlayImage}
                      onChange={(e) => setFormOverlayImage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />

                    <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-200 hover:border-brand-400 rounded-xl cursor-pointer text-xs font-bold text-slate-600 hover:text-brand-600 transition-all bg-slate-50/50">
                      <Upload size={16} />
                      <span>Chọn file từ máy tính (.webp, .png)</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                </div>

                {/* Color Schemes */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                      Màu Nền
                    </label>
                    <select
                      value={formColor}
                      onChange={(e) => setFormColor(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                    >
                      <option value="bg-white">Trắng (White)</option>
                      <option value="bg-pink-50">Hồng pastel</option>
                      <option value="bg-blue-50">Xanh pastel</option>
                      <option value="bg-purple-50">Tím pastel</option>
                      <option value="bg-yellow-50">Vàng pastel</option>
                      <option value="bg-slate-50">Xám nhạt</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                      Màu Viền
                    </label>
                    <select
                      value={formBorderColor}
                      onChange={(e) => setFormBorderColor(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                    >
                      <option value="border-slate-200">Slate 200</option>
                      <option value="border-pink-300">Pink 300</option>
                      <option value="border-blue-300">Blue 300</option>
                      <option value="border-purple-300">Purple 300</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                      Màu Chữ
                    </label>
                    <select
                      value={formTextColor}
                      onChange={(e) => setFormTextColor(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                    >
                      <option value="text-slate-800">Slate 800</option>
                      <option value="text-pink-500">Pink 500</option>
                      <option value="text-blue-500">Blue 500</option>
                    </select>
                  </div>
                </div>

                {/* Custom Metrics (Calibration) */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Sliders size={14} /> Toạ Độ & Căn Lề Slots (Metrics)
                    </span>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleApplyPreset("1x4")}
                        className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded font-bold"
                      >
                        Preset 1x4
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyPreset("2x2")}
                        className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded font-bold"
                      >
                        Preset 2x2
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400">Rộng (w)</span>
                      <input
                        type="number"
                        value={metricsW}
                        onChange={(e) => setMetricsW(Number(e.target.value))}
                        className="w-full p-1.5 border rounded-lg text-center font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400">Cao (h)</span>
                      <input
                        type="number"
                        value={metricsH}
                        onChange={(e) => setMetricsH(Number(e.target.value))}
                        className="w-full p-1.5 border rounded-lg text-center font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400">Lề Trên (pt)</span>
                      <input
                        type="number"
                        value={metricsPt}
                        onChange={(e) => setMetricsPt(Number(e.target.value))}
                        className="w-full p-1.5 border rounded-lg text-center font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400">Lề Dưới (pb)</span>
                      <input
                        type="number"
                        value={metricsPb}
                        onChange={(e) => setMetricsPb(Number(e.target.value))}
                        className="w-full p-1.5 border rounded-lg text-center font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400">Lề Trái (pl)</span>
                      <input
                        type="number"
                        value={metricsPl}
                        onChange={(e) => setMetricsPl(Number(e.target.value))}
                        className="w-full p-1.5 border rounded-lg text-center font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400">Lề Phải (pr)</span>
                      <input
                        type="number"
                        value={metricsPr}
                        onChange={(e) => setMetricsPr(Number(e.target.value))}
                        className="w-full p-1.5 border rounded-lg text-center font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400">Khoảng Hàng</span>
                      <input
                        type="number"
                        value={metricsRowGap}
                        onChange={(e) => setMetricsRowGap(Number(e.target.value))}
                        className="w-full p-1.5 border rounded-lg text-center font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400">Khoảng Cột</span>
                      <input
                        type="number"
                        value={metricsColGap}
                        onChange={(e) => setMetricsColGap(Number(e.target.value))}
                        className="w-full p-1.5 border rounded-lg text-center font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit buttons */}
                <div className="pt-4 flex items-center justify-end gap-2.5">
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
                    {editingFrame ? "Lưu Thay Đổi" : "Tạo Khung Ngay"}
                  </button>
                </div>
              </form>

              {/* Right Column: Live Frame Preview (5 cols) */}
              <div className="md:col-span-5 bg-slate-100/70 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center min-h-[350px]">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Eye size={14} /> Xem Trước Thời Gian Thực
                </div>

                <div className="flex justify-center items-center py-2 transition-all">
                  <FrameStrip
                    frame={previewFrame}
                    filled={true}
                    size="md"
                    aspectMode="original"
                    disableHover={true}
                  />
                </div>

                <p className="text-[11px] text-slate-400 mt-4 text-center">
                  Ảnh xem trước mô phỏng đúng vị trí ảnh mẫu ghép vào khung trên trang người dùng.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
