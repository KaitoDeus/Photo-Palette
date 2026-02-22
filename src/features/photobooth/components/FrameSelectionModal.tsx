import React, { useState, useMemo } from "react";
import { X, Search, Filter } from "lucide-react";
import { Frame } from "../types";
import { FRAMES } from "../data/frames";
import { FrameStrip } from "./FrameStrip";

interface FrameSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (frame: Frame) => void;
  selectedFrameId: string;
  selectedLayoutId: string;
}

const CATEGORIES = [
  { id: "All", label: "Tất cả" },
  { id: "VALENTINE", label: "VALENTINE" },
  { id: "TET HOLIDAY", label: "TET HOLIDAY" },
];

interface CustomDropdownProps {
  value: string;
  options: { id: string; label: string }[];
  onChange: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.id === value)?.label || "Tất cả";

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-10 pr-4 py-2 bg-white/50 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-white hover:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 flex justify-between items-center transition-all duration-300 hover:shadow-sm"
      >
        <span className="truncate mr-3">{selectedLabel}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-slate-400 transition-transform duration-500 ${isOpen ? "rotate-180 text-brand-500" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden transition-all duration-300 origin-top z-50 ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
      >
        <div className="max-h-60 overflow-y-auto custom-scrollbar flex flex-col py-1">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
              className={`px-4 py-3 cursor-pointer transition-colors duration-200 text-sm font-semibold ${value === option.id ? "bg-brand-50 text-brand-600" : "text-slate-600 hover:bg-slate-50 hover:text-brand-500"}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
      if (selectedLayoutId === "GRID_2X3" && frame.layout === "2x3")
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
        <div className="p-6 pb-2 grid gap-4 md:grid-cols-3">
          {/* Search */}
          <div className="relative md:col-span-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm kiếm khung..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium text-slate-700"
            />
          </div>

          {/* Categories Dropdown */}
          <div className="md:col-span-2">
            <div className="relative z-10 w-full mb-2">
              <Filter
                className="absolute left-3 top-[20px] -translate-y-1/2 text-slate-400 z-10 pointer-events-none"
                size={18}
              />
              <CustomDropdown
                value={selectedCategory}
                options={CATEGORIES}
                onChange={setSelectedCategory}
              />
            </div>
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
                if (frame.layout === "2x3") contentAspect = "aspect-[2/3]";

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
