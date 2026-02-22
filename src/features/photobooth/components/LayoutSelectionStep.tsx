import React, { useState, useRef, useEffect } from "react";
import {
  ChevronRight,
  Palette,
  RefreshCcw,
  Video,
  ArrowLeft,
  Zap,
  Camera,
  Aperture,
  ChevronDown,
} from "lucide-react";
import Button from "../../../components/common/Button";
import { LAYOUTS } from "../constants";
import { LayoutType, CountdownDuration, Frame } from "../types";
import FrameSelectionModal from "./FrameSelectionModal";
import { FrameStrip } from "./FrameStrip";

interface DropdownOption {
  value: string | number;
  label: string;
}

interface CustomDropdownProps {
  value: string | number;
  options: DropdownOption[];
  onChange: (value: any) => void;
  disabled?: boolean;
  activeColorClass?: string;
  minWidth?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  options,
  onChange,
  disabled = false,
  activeColorClass = "text-pink-500 bg-pink-50",
  minWidth = "140px",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    <div
      className={`relative`}
      style={{ minWidth: disabled ? undefined : minWidth }}
      ref={dropdownRef}
    >
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center justify-between bg-white border text-slate-700 rounded-xl px-4 py-2.5 transition-all font-semibold text-sm shadow-sm
          ${disabled ? "opacity-50 cursor-not-allowed border-slate-200" : "cursor-pointer hover:border-slate-300"}
          ${isOpen ? "ring-2 ring-pink-100 border-pink-300" : "border-slate-200"}
        `}
      >
        <span className="truncate mr-3 pointer-events-none">
          {selectedOption?.label}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-200 pointer-events-none ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 min-w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200 origin-top">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-4 py-2.5 text-sm font-semibold cursor-pointer transition-colors
                ${option.value === value ? activeColorClass : "text-slate-600 hover:bg-slate-50"}
              `}
            >
              <div className="whitespace-nowrap">{option.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface LayoutSelectionStepProps {
  selectedLayout: LayoutType;
  selectedFrame: Frame;
  countDownDuration: CountdownDuration;
  permissionDenied: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  isMirrored: boolean;
  isRecapEnabled: boolean;
  isFlashEnabled: boolean;
  onSelectLayout: (layout: LayoutType) => void;
  onSelectFrame: (frame: Frame) => void;
  onSelectCountDown: (duration: CountdownDuration) => void;
  onToggleMirror: () => void;
  onToggleRecap: () => void;
  onToggleFlash: () => void;
  onRetryPermission: () => void;
  onStartCapture: () => void;
  onManualCapture?: () => void;
  onAbortCapture?: () => void;
  onBack: () => void;
  // new props needed for capture state
  flash: boolean;
  countDown: number | null;
  photos: string[];
  lastPhoto: string | null;
  isCapturing: boolean;
}

const LayoutSelectionStep: React.FC<LayoutSelectionStepProps> = ({
  selectedLayout,
  selectedFrame,
  countDownDuration,
  permissionDenied,
  videoRef,
  isMirrored,
  isRecapEnabled,
  isFlashEnabled,
  onSelectLayout,
  onSelectFrame,
  onSelectCountDown,
  onToggleMirror,
  onToggleRecap,
  onToggleFlash,
  onRetryPermission,
  onStartCapture,
  onManualCapture,
  onAbortCapture,
  onBack,
  flash,
  countDown,
  photos,
  lastPhoto,
  isCapturing,
}) => {
  const [isFrameModalOpen, setIsFrameModalOpen] = useState(false);

  return (
    <div className="p-4 md:p-8 w-full max-w-5xl mx-auto flex flex-col items-center">
      <div className="w-full flex items-center mb-6 px-2">
        {!isCapturing && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-semibold text-sm bg-white/50 px-4 py-2 rounded-full border border-slate-200/50"
          >
            <ArrowLeft size={16} /> Quay lại
          </button>
        )}
      </div>

      <div className="flex flex-col w-full h-full max-w-[900px] mx-auto">
        {permissionDenied ? (
          <div className="text-red-500 flex flex-col items-center justify-center p-8 bg-white/80 rounded-3xl border border-red-100 h-[60vh] min-h-[400px]">
            <p className="mb-4 text-center font-medium">
              Không thể truy cập camera. Vui lòng cấp quyền để tiếp tục.
            </p>
            <Button onClick={onRetryPermission} variant="primary">
              Thử lại Camera
            </Button>
          </div>
        ) : (
          <>
            {/* Top Settings Row */}
            <div className="w-full flex flex-wrap gap-4 md:gap-8 justify-between md:justify-start items-end mb-4 px-2">
              <div className="flex flex-col gap-2">
                <span className="text-[13px] md:text-sm font-bold text-pink-400">
                  Layout Ảnh
                </span>
                <CustomDropdown
                  value={selectedLayout}
                  options={LAYOUTS.map((layout) => ({
                    value: layout.id,
                    label: layout.name,
                  }))}
                  onChange={(val) => onSelectLayout(val as LayoutType)}
                  disabled={isCapturing}
                  activeColorClass="text-pink-600 bg-pink-50"
                  minWidth="140px"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[13px] md:text-sm font-bold text-purple-500">
                  Đếm Ngược
                </span>
                <CustomDropdown
                  value={countDownDuration}
                  options={[
                    { value: 3, label: "3s" },
                    { value: 5, label: "5s" },
                    { value: 10, label: "10s" },
                  ]}
                  onChange={(val) =>
                    onSelectCountDown(val as CountdownDuration)
                  }
                  disabled={isCapturing}
                  activeColorClass="text-purple-600 bg-purple-50"
                  minWidth="100px"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[13px] md:text-sm font-bold text-blue-500">
                  Hỗ Trợ Chụp
                </span>
                <button
                  onClick={() => setIsFrameModalOpen(true)}
                  disabled={isCapturing}
                  className="bg-pink-100 text-pink-500 px-5 py-2.5 rounded-xl hover:bg-pink-200 focus:outline-none transition-all font-bold cursor-pointer text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Chọn Khung
                </button>
              </div>
            </div>

            {/* Countdown Overlay (moved outside) */}
            {countDown && (
              <div className="w-full flex justify-center mt-2 mb-2 pointer-events-none h-12">
                <div className="bg-pink-100/90 backdrop-blur-md px-6 py-2 rounded-full shadow-sm flex items-center gap-3 border border-pink-200">
                  <span className="text-pink-600 font-black text-sm md:text-base uppercase tracking-wider pr-3 border-r border-pink-300">
                    Chuẩn Bị Chụp
                  </span>
                  <span className="text-3xl md:text-4xl font-black text-pink-500 animate-pulse font-mono w-8 text-center drop-shadow-sm">
                    {countDown}
                  </span>
                </div>
              </div>
            )}

            {/* Camera Area */}
            <div
              className="w-full relative bg-slate-800 rounded-3xl md:rounded-[2.5rem] mt-2 mb-10 shadow-lg"
              style={{ height: "65vh", maxHeight: "700px", minHeight: "400px" }}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover rounded-3xl md:rounded-[2.5rem] transition-transform duration-500 ${isMirrored ? "transform -scale-x-100" : ""}`}
              />

              {/* Flash Overlay - Scoped to video */}
              <div
                className={`absolute inset-0 bg-white rounded-3xl md:rounded-[2.5rem] transition-opacity duration-150 pointer-events-none z-50 ${flash ? "opacity-100" : "opacity-0"}`}
              />

              {/* Top Controls Overlay inside video container for better positioning */}
              {!isCapturing && (
                <>
                  <button
                    onClick={onToggleFlash}
                    className={`absolute top-4 left-4 md:top-6 md:left-6 w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-colors shadow-sm z-20 ${
                      isFlashEnabled
                        ? "bg-amber-100/90 text-amber-600"
                        : "bg-white/80 text-slate-700 hover:bg-white"
                    }`}
                    title="Bật/Tắt Đèn Flash"
                  >
                    <Zap
                      size={20}
                      className={isFlashEnabled ? "fill-current" : ""}
                    />
                  </button>

                  <button
                    onClick={onToggleMirror}
                    className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white backdrop-blur-md flex items-center justify-center text-slate-700 transition-colors shadow-sm z-20"
                    title="Lật camera"
                  >
                    <RefreshCcw size={20} />
                  </button>
                </>
              )}

              {/* Outside video container, Preview Overlay - Moved to bottom right to avoid blocking view */}
              {lastPhoto && (
                <div
                  className={`absolute right-4 bottom-10 md:right-8 md:bottom-12 bg-white p-1 md:p-1.5 shadow-2xl rounded-lg -rotate-6 z-30 animate-in fade-in slide-in-from-bottom duration-300 pointer-events-none
                  ${
                    selectedLayout === "STRIP_1X4"
                      ? "w-28 md:w-36 aspect-[4/3]"
                      : selectedLayout === "GRID_2X3"
                        ? "w-24 md:w-32 aspect-square"
                        : "w-20 md:w-28 aspect-[3/4]"
                  }`}
                >
                  <img
                    src={lastPhoto}
                    className="w-full h-full object-cover rounded-md"
                    alt="Preview"
                  />
                </div>
              )}

              <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-40">
                <div className="bg-pink-100/90 backdrop-blur-sm text-pink-600 font-extrabold py-1.5 px-6 md:px-8 md:py-2 rounded-full shadow-lg text-xs md:text-sm whitespace-nowrap border-[3px] md:border-[4px] border-white/70">
                  Đã Chụp {photos.length}/
                  {LAYOUTS.find((l) => l.id === selectedLayout)?.count || 4}
                </div>
              </div>
            </div>

            {/* Bottom Controls panel */}
            <div className="flex flex-col items-center gap-6 md:gap-8 w-full mt-4">
              <div className="flex justify-center items-center gap-6 md:gap-14 w-full">
                <button
                  onClick={onManualCapture}
                  disabled={isCapturing}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-pink-100 flex flex-col items-center justify-center text-pink-500 shadow-sm relative md:bottom-[-10px] ${isCapturing ? "opacity-60 cursor-not-allowed" : "hover:bg-pink-200 cursor-pointer"}`}
                  title="Chụp tay"
                >
                  <Camera size={26} className="mb-1 text-pink-600" />
                  <span className="font-bold text-[11px] md:text-[13px]">
                    Chụp tay
                  </span>
                </button>

                <button
                  onClick={onStartCapture}
                  disabled={isCapturing}
                  className={`w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full flex flex-col items-center justify-center text-white transition-all shadow-[0_10px_25px_rgba(244,114,182,0.5)] border-[6px] border-pink-100 relative z-10 ${isCapturing ? "bg-pink-300 scale-95 opacity-80 cursor-not-allowed shadow-none" : "bg-pink-400 hover:bg-pink-500 hover:scale-105"}`}
                >
                  <Aperture
                    size={40}
                    className={`md:w-12 md:h-12 ${isCapturing ? "animate-spin-slow" : ""}`}
                  />
                  <span className="font-bold text-sm md:text-lg mt-1 tracking-wider">
                    {isCapturing ? "..." : "AUTO"}
                  </span>
                </button>

                <button
                  onClick={onAbortCapture}
                  disabled={!isCapturing && photos.length === 0}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-50 flex flex-col items-center justify-center text-green-500 hover:bg-green-100 transition-colors shadow-sm relative md:bottom-[-10px] ${!isCapturing && photos.length === 0 ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:bg-green-100"}`}
                  title="Chụp Lại"
                >
                  <RefreshCcw size={26} className="mb-1 text-green-600" />
                  <span className="font-bold text-[11px] md:text-[13px]">
                    Chụp Lại
                  </span>
                </button>
              </div>

              <div
                className={`flex items-center gap-3 bg-white border border-slate-200/60 rounded-full px-5 py-2.5 transition-colors shadow-sm mt-4 md:mt-2 ${isCapturing ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-slate-50"}`}
                onClick={() => !isCapturing && onToggleRecap()}
              >
                <div
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${isRecapEnabled ? "bg-pink-400" : "bg-slate-200"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${isRecapEnabled ? "translate-x-6" : "translate-x-1"}`}
                  />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  Video Recap
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      <FrameSelectionModal
        isOpen={isFrameModalOpen}
        onClose={() => setIsFrameModalOpen(false)}
        selectedFrameId={selectedFrame.id}
        selectedLayoutId={selectedLayout}
        onSelect={onSelectFrame}
      />
    </div>
  );
};

export default LayoutSelectionStep;
