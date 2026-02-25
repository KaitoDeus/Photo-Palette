import React from "react";
import { ArrowLeft, RefreshCcw, Camera, Aperture } from "lucide-react";
import Button from "../../../../components/common/Button";
import CustomDropdown from "../CustomDropdown";
import { LAYOUTS } from "../../constants";
import { LayoutType, CountdownDuration } from "../../types";
import { LayoutSelectionStepProps } from "./ViewProps";

const MobileView: React.FC<LayoutSelectionStepProps> = ({
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
    <div className="p-2 w-full flex flex-col items-center overflow-x-hidden">
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

      <div className="flex flex-col w-full">
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
            {/* Horizontal Settings Row */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 items-end mb-6 px-1">
              <div className="flex flex-col gap-1.5 min-w-0">
                <span className="text-[10px] sm:text-[11px] font-black text-pink-400 uppercase tracking-wider">
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

              <div className="grid grid-cols-2 gap-2 sm:contents">
                <div className="flex flex-col gap-1.5 min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-black text-purple-500 uppercase tracking-wider">
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

                <div className="flex flex-col gap-1.5 min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-black text-blue-500 uppercase tracking-wider">
                    Hỗ Trợ Chụp
                  </span>
                  <button
                    onClick={() => setIsFrameModalOpen(true)}
                    disabled={isCapturing}
                    className="bg-pink-100 text-pink-500 px-2 py-2.5 rounded-xl hover:bg-pink-200 transition-all font-bold cursor-pointer text-xs shadow-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap h-[42px] flex items-center justify-center border border-pink-200"
                  >
                    Chọn Khung
                  </button>
                </div>
              </div>
            </div>

            {/* Camera Area */}
            <div
              className={`w-full relative bg-slate-800 rounded-3xl mt-1 mb-6 shadow-2xl mx-auto overflow-hidden transition-all duration-500 ${
                selectedLayout === "STRIP_1X4" ? "aspect-[4/3]" : 
                selectedLayout === "PORTRAIT_2X2" ? "aspect-square" :
                "aspect-[3/4]"
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
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 animate-in zoom-in-90 duration-200">
                  <div className="w-10 h-10 bg-pink-100/90 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    <span className="text-xl font-black text-pink-500 font-mono">
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
                <div className={`absolute right-3 bottom-12 bg-white p-1 shadow-xl rounded-md -rotate-3 z-30 animate-in fade-in slide-in-from-bottom duration-300 w-20 aspect-[3/4]`}>
                  <img src={lastPhoto} className="w-full h-full object-cover rounded-sm" alt="Preview" />
                </div>
              )}

            </div>

            {/* Status Indicator outside capture area */}
            <div className="flex justify-center -mt-3 mb-4 relative z-40">
              <div className="bg-pink-100/90 backdrop-blur-sm text-pink-600 font-extrabold py-1.5 px-6 rounded-full shadow-md text-[11px] whitespace-nowrap border-2 border-white transition-all duration-300">
                Đã Chụp {photos.length}/
                {LAYOUTS.find((l) => l.id === selectedLayout)?.count || 4}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-col items-center gap-6 w-full mt-2">
              <div className="flex justify-center items-center gap-6 w-full">
                <button
                  onClick={onManualCapture}
                  disabled={isCapturing}
                  className={`w-16 h-16 rounded-full bg-pink-100 flex flex-col items-center justify-center text-pink-500 shadow-sm ${isCapturing ? "opacity-60" : "hover:bg-pink-200"}`}
                >
                  <Camera size={22} className="mb-0.5" />
                  <span className="font-bold text-[10px]">Chụp tay</span>
                </button>

                <button
                  onClick={onStartCapture}
                  disabled={isCapturing}
                  className={`w-20 h-20 rounded-full flex flex-col items-center justify-center text-white transition-all shadow-lg border-[4px] border-pink-100 ${isCapturing ? "bg-pink-300 scale-95" : "bg-pink-400 hover:bg-pink-500"}`}
                >
                  <Aperture size={32} className={isCapturing ? "animate-spin-slow" : ""} />
                  <span className="font-bold text-xs mt-0.5 tracking-wider uppercase">
                    {isCapturing ? "..." : "AUTO"}
                  </span>
                </button>

                <button
                  onClick={onAbortCapture}
                  disabled={!isCapturing && photos.length === 0}
                  className={`w-16 h-16 rounded-full bg-green-50 flex flex-col items-center justify-center text-green-500 shadow-sm ${!isCapturing && photos.length === 0 ? "opacity-60" : "hover:bg-green-100"}`}
                >
                  <RefreshCcw size={22} className="mb-0.5" />
                  <span className="font-bold text-[10px]">Chụp Lại</span>
                </button>
              </div>

              <button
                className={`flex items-center gap-3 bg-white border border-slate-200/60 rounded-full px-5 py-2 transition-colors shadow-sm outline-none focus:ring-2 focus:ring-pink-200 ${isCapturing ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:bg-slate-50"}`}
                onClick={() => !isCapturing && onToggleRecap()}
                disabled={isCapturing}
              >
                <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${isRecapEnabled ? "bg-pink-400" : "bg-slate-200"}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${isRecapEnabled ? "translate-x-4" : "translate-x-1"}`} />
                </div>
                <span className="text-xs font-semibold text-slate-700">Video Recap</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileView;
