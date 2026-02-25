import React from "react";
import { ArrowLeft, RefreshCcw, Camera, Aperture } from "lucide-react";
import Button from "../../../../components/common/Button";
import CustomDropdown from "../CustomDropdown";
import { LAYOUTS } from "../../constants";
import { LayoutType, CountdownDuration } from "../../types";
import { LayoutSelectionStepProps } from "./ViewProps";

const DesktopView: React.FC<LayoutSelectionStepProps> = ({
  selectedLayout,
  countDownDuration,
  permissionDenied,
  videoRef,
  isMirrored,
  isRecapEnabled,
  onSelectLayout,
  onSelectCountDown,
  onToggleMirror,
  onToggleRecap,
  onRetryPermission,
  onStartCapture,
  onManualCapture,
  onAbortCapture,
  onBack,
  countDown,
  photos,
  lastPhoto,
  isCapturing,
  setIsFrameModalOpen,
}) => {
  return (
    <div className="p-2 md:p-8 w-full max-w-5xl mx-auto flex flex-col items-center overflow-x-hidden">
      {/* Header */}
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

      <div className="flex flex-col w-full max-w-4xl mx-auto">
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
            {/* Horizontal Settings Row - Matching Image 2 compact style */}
            <div className="flex items-center gap-2 mb-4 px-1">
              <div className="flex flex-col gap-1 w-[160px]">
                <span className="text-[11px] font-bold text-pink-400">
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
                  minWidth="100%"
                />
              </div>

              <div className="flex flex-col gap-1 w-[100px]">
                <span className="text-[11px] font-bold text-purple-500">
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
                  minWidth="100%"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-blue-500">
                  Hỗ Trợ Chụp
                </span>
                <button
                  onClick={() => setIsFrameModalOpen(true)}
                  disabled={isCapturing}
                  className="bg-pink-100 text-pink-500 px-4 py-2 rounded-lg hover:bg-pink-200 transition-all font-bold cursor-pointer text-[13px] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap h-[38px] flex items-center justify-center"
                >
                  Chọn Khung
                </button>
              </div>
            </div>

            {/* Camera Area with Countdown Overlay inside */}
            <div
              className={`w-full relative bg-slate-800 rounded-2xl mb-6 shadow-xl mx-auto overflow-hidden transition-all duration-500 ${
                selectedLayout === "STRIP_1X4" ? "aspect-[4/3] max-w-3xl" :
                "aspect-[3/4] max-w-xl"
              }`}
            >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${isMirrored ? "transform -scale-x-100" : ""}`}
                  style={{ filter: "none" }}
                />

                {/* Countdown Overlay (Compact Circle at Top Center - Image 2 Style) */}
                {countDown && (
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 animate-in zoom-in-95 duration-200">
                    <div className="w-14 h-14 bg-pink-100/90 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                      <span className="text-3xl font-black text-pink-500 font-mono">
                        {countDown}
                      </span>
                    </div>
                  </div>
                )}


              {!isCapturing && (
                <>
                  <button
                    onClick={onToggleMirror}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-sm z-20"
                  >
                    <RefreshCcw size={18} />
                  </button>
                </>
              )}

              {lastPhoto && (
                <div className={`absolute right-6 bottom-16 bg-white p-2 shadow-2xl rounded-xl -rotate-3 z-30 animate-in fade-in slide-in-from-bottom-8 duration-500 w-32 aspect-[3/4]`}>
                  <img src={lastPhoto} className="w-full h-full object-cover rounded-lg" alt="Preview" />
                  <div className="absolute -top-3 -left-3 bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white text-xs">
                    {photos.length}
                  </div>
                </div>
              )}

            </div>

            {/* Status Indicator outside capture area */}
            <div className="flex justify-center -mt-3 mb-6 relative z-40">
              <div className="bg-pink-100/90 backdrop-blur-sm text-pink-600 font-extrabold py-2 px-8 rounded-full shadow-md text-sm whitespace-nowrap border-[4px] border-white transition-all duration-300">
                Đã Chụp {photos.length}/
                {LAYOUTS.find((l) => l.id === selectedLayout)?.count || 4}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-col items-center gap-8 w-full">
              <div className="flex justify-center items-center gap-8 md:gap-12 w-full">
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={onManualCapture}
                    disabled={isCapturing}
                    className={`w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center text-pink-500 shadow-md transition-all ${isCapturing ? "opacity-40 cursor-not-allowed" : "hover:scale-110 active:scale-95"}`}
                  >
                    <Camera size={28} />
                  </button>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Chụp tay</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={onStartCapture}
                    disabled={isCapturing}
                    className={`w-24 h-24 rounded-full flex flex-col items-center justify-center text-white transition-all shadow-xl border-[6px] border-pink-100 ${isCapturing ? "bg-pink-300 scale-95" : "bg-pink-400 hover:bg-pink-500 hover:scale-110 active:scale-90"}`}
                  >
                    <Aperture size={40} className={isCapturing ? "animate-spin-slow" : ""} />
                    <span className="font-black text-sm mt-1 tracking-wider uppercase">
                      {isCapturing ? "..." : "AUTO"}
                    </span>
                  </button>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={onAbortCapture}
                    disabled={!isCapturing && photos.length === 0}
                    className={`w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center text-green-500 shadow-md transition-all ${!isCapturing && photos.length === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-110 active:scale-95"}`}
                  >
                    <RefreshCcw size={28} />
                  </button>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Chụp Lại</span>
                </div>
              </div>

              <button
                className={`flex items-center gap-3 bg-white border border-slate-200/60 rounded-full px-8 py-3 transition-all shadow-sm outline-none focus:ring-2 focus:ring-pink-200 ${isCapturing ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-slate-50 hover:shadow-md active:scale-95"}`}
                onClick={() => !isCapturing && onToggleRecap()}
                disabled={isCapturing}
              >
                <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${isRecapEnabled ? "bg-pink-400" : "bg-slate-200"}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${isRecapEnabled ? "translate-x-4" : "translate-x-1"}`} />
                </div>
                <span className="text-sm font-bold text-slate-700">Video Recap</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DesktopView;
