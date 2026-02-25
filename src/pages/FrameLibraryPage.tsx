import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  ChevronDown,
  Cherry,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


import { FRAMES } from "../features/photobooth/data/frames";
import { Frame } from "../features/photobooth/types";

import { FrameStrip } from "../features/photobooth/components/FrameStrip";

interface CustomDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  options,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium bg-white hover:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 flex justify-between items-center transition-all duration-300 hover:shadow-md"
      >
        <span>{value === "All" ? placeholder : value}</span>
        <ChevronDown
          size={18}
          className={`text-slate-400 transition-transform duration-500 ${isOpen ? "rotate-180 text-brand-500" : ""}`}
        />
      </button>

      <div
        className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-brand-100 overflow-hidden transition-all duration-300 origin-top z-50 ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
      >
        <div className="max-h-60 overflow-y-auto custom-scrollbar">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-4 py-3 cursor-pointer transition-colors duration-200 text-sm font-medium ${value === option ? "bg-brand-50 text-brand-600" : "text-slate-600 hover:bg-slate-50 hover:text-brand-500"}`}
            >
              {option === "All" ? placeholder : option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FrameCard: React.FC<{
  frame: Frame;
  index: number;
  onClick: (filled: boolean) => void;
}> = ({ frame, index, onClick }) => {
  return (
    <div key={frame.id} className="group h-full">
      <div
        className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-brand-100 hover:border-brand-400 flex flex-col items-center h-full relative"
      >
        <div className="flex justify-center gap-2 sm:gap-4 w-full mb-4">
          {/* Left: Original */}
          <div 
            className="flex flex-col items-center gap-3 cursor-pointer group/left"
            onClick={() => onClick(false)}
          >
            <div className="bg-brand-50/30 p-2 rounded-xl group-hover/left:bg-brand-100/50 transition-colors">
              <FrameStrip frame={frame} filled={false} size="sm" />
            </div>
            <span className="px-3 py-1 bg-brand-300 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-sm group-hover/left:bg-brand-400 transition-colors">
              Khung Gốc
            </span>
          </div>

          {/* Right: Preview */}
          <div 
            className="flex flex-col items-center gap-3 cursor-pointer group/right"
            onClick={() => onClick(true)}
          >
            <div className="bg-blue-50/30 p-2 rounded-xl group-hover/right:bg-blue-100/50 transition-colors">
              <FrameStrip frame={frame} filled={true} size="sm" />
            </div>
            <span className="px-3 py-1 bg-blue-300 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-sm group-hover/right:bg-blue-400 transition-colors">
              Xem trước
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-auto text-center">
          <h3 className={`text-lg sm:text-xl font-bold text-brand-500 mb-1`}>
            {frame.name}
          </h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            {frame.layout} • {frame.category}
          </p>
        </div>
      </div>
    </div>
  );
};

const FrameLibraryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLayout, setActiveLayout] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [previewFilled, setPreviewFilled] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredFrames = FRAMES.filter((frame) => {
    const matchesCategory =
      activeCategory === "All" || frame.category === activeCategory;
    
    let matchesLayout = true;
    if (activeLayout === "Nhỏ") {
      matchesLayout = frame.layout === "1x4";
    } else if (activeLayout === "Lớn") {
      matchesLayout = frame.layout === "2x2";
    } else if (activeLayout !== "All") {
      matchesLayout = frame.layout === activeLayout;
    }

    const matchesSearch = frame.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesLayout && matchesSearch;
  });

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedIndex((prev) =>
        prev !== null && filteredFrames.length > 0
          ? (prev + 1) % filteredFrames.length
          : null,
      );
    },
    [filteredFrames.length],
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedIndex((prev) =>
        prev !== null && filteredFrames.length > 0
          ? (prev - 1 + filteredFrames.length) % filteredFrames.length
          : null,
      );
    },
    [filteredFrames.length],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  const categories = ["All", "VALENTINE", "TET HOLIDAY"];
  const layouts = ["All", "Nhỏ", "Lớn"];

  return (
    <div className="pt-20 min-h-screen bg-brand-50">
      <section id="features" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Cherry className="text-brand-500 animate-bounce" />
              <h2 className="text-3xl md:text-4xl font-bold text-brand-500">
                Kho Frame
              </h2>
              <Cherry className="text-brand-500 animate-bounce" />
            </div>
            <p className="text-green-500 font-medium">
              Xem trước ảnh lên khung nhé ✨
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white border border-slate-100 shadow-lg rounded-2xl p-4 mb-16 w-full mx-auto relative z-30">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-1/4 z-20">
                <CustomDropdown
                  value={activeLayout}
                  options={layouts}
                  onChange={setActiveLayout}
                  placeholder="Tất Cả Kích Thước"
                />
              </div>
              <div className="relative w-full md:w-1/4 z-10">
                <CustomDropdown
                  value={activeCategory}
                  options={categories}
                  onChange={setActiveCategory}
                  placeholder="Tất Cả Danh Mục"
                />
              </div>
              <div className="relative w-full md:w-2/4">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Tìm tên khung..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-brand-500 hover:border-brand-300 transition-all duration-300 hover:shadow-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredFrames.map((frame, index) => (
              <FrameCard
                key={frame.id}
                frame={frame}
                index={index}
                onClick={(filled) => {
                  setSelectedIndex(index);
                  setPreviewFilled(filled);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedIndex !== null && filteredFrames[selectedIndex] && (
        <div
          className="fixed inset-0 z-[100] backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-bg"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 bg-white/10 p-2 rounded-full hover:bg-white/20 z-10 animate-fade-in"
          >
            <X size={24} />
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 bg-white/10 p-3 rounded-full hover:bg-white/20 z-10 animate-fade-in"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Frame Content */}
          <div
            className="relative max-w-full max-h-full flex items-center justify-center p-4 sm:p-10 select-none animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-none mt-8 transition-transform duration-500">
              <FrameStrip frame={filteredFrames[selectedIndex]} filled={previewFilled} size="lg" />
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 bg-white/10 p-3 rounded-full hover:bg-white/20 z-10 animate-fade-in"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FrameLibraryPage;
