import React, { useState, useMemo } from "react";
import { X, Search, Filter } from "lucide-react";
import { Frame } from "../types";
import { FRAMES } from "../data/frames";
import { FrameStrip } from "./FrameStrip";
import CustomDropdown from "./CustomDropdown";

interface FrameSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (frame: Frame) => void;
  selectedFrameId: string;
  selectedLayoutId: string;
}

const CATEGORIES = [
  { value: "All", label: "Tất cả" },
  { value: "VALENTINE", label: "VALENTINE" },
  { value: "TET HOLIDAY", label: "TET HOLIDAY" },
  { value: "BIRTHDAY", label: "BIRTHDAY" },
  { value: "8/3", label: "8/3" },
];

const FrameSelectionModal: React.FC<FrameSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedFrameId,
  selectedLayoutId,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFrames = useMemo(() => {
    return FRAMES.filter((frame) => {
      // Filter by Layout mapping
      let matchesLayout = false;
      if (selectedLayoutId === "STRIP_1X4" && frame.layout === "1x4")
        matchesLayout = true;
      if (selectedLayoutId === "PORTRAIT_2X2" && frame.layout === "2x2")
        matchesLayout = true;
      if (selectedLayoutId === "PORTRAIT_1X1" && frame.layout === "1x1")
        matchesLayout = true;

      const matchesSearch = frame.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        frame.category === selectedCategory ||
        (selectedCategory === "VINTAGE" &&
          frame.name.toLowerCase().includes("vintage"));
      return matchesLayout && matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, selectedLayoutId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/10 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl w-[900px] max-w-[95vw] h-[650px] max-h-[90vh] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/60 animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Chọn Khung Hình</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X size={24} className="text-slate-600" />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="p-6 pb-2 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm kiếm khung..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-semibold text-sm text-slate-700 shadow-sm"
            />
          </div>

          {/* Categories Dropdown */}
          <div className="relative z-10 w-full md:w-64">
            <CustomDropdown
              value={selectedCategory}
              options={CATEGORIES}
              onChange={setSelectedCategory}
              icon={<Filter size={18} />}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6 pt-4 custom-scrollbar">
          {filteredFrames.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredFrames.map((frame) => {
                // Determine aspect ratio for the preview content
                let contentAspect = "aspect-[1/3]"; // Default strip
                if (frame.layout === "2x2" || frame.layout === "1x1")
                  contentAspect = "aspect-[3/4]";

                // Unified card container aspect ratio to keep grid uniform
                const cardAspect = "aspect-[2/3]";

                return (
                  <button
                    key={frame.id}
                    onClick={() => {
                      onSelect(frame);
                      onClose();
                    }}
                    className={`
                      group relative flex flex-col items-center justify-between rounded-xl transition-all duration-300 border-2
                      ${
                        selectedFrameId === frame.id
                          ? "border-brand-500 bg-brand-50 ring-2 ring-brand-200 ring-offset-2"
                          : "border-slate-100 hover:border-brand-200 hover:shadow-lg bg-white"
                      }
                      p-3 gap-2 ${cardAspect}
                    `}
                  >
                    {/* Frame Preview Wrapper - Centers and scales the frame */}
                    <div className="flex-1 w-full flex items-center justify-center p-1 overflow-hidden scale-[0.6]">
                      <FrameStrip frame={frame} filled={false} size="sm" />
                    </div>

                    {/* Name Label */}
                    <div className="w-full text-center">
                      <span
                        className={`block text-xs font-bold truncate ${frame.textColor}`}
                      >
                        {frame.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium uppercase">
                        {frame.layout}
                      </span>
                    </div>

                    {/* Selection Checkmark */}
                    {selectedFrameId === frame.id && (
                      <div className="absolute top-2 right-2 bg-brand-500 text-white p-1 rounded-full shadow-md z-10">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <Filter size={48} className="mb-4 opacity-50" />
              <p>Không tìm thấy khung nào phù hợp.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FrameSelectionModal;
