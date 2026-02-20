import React from "react";
import { RefreshCcw, Video } from "lucide-react";
import Button from "../../../components/common/Button";
import { CountdownDuration, LayoutType } from "../types";

interface InstructionStepProps {
  permissionDenied: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  countDownDuration: CountdownDuration;
  selectedLayout: LayoutType;
  isMirrored: boolean;
  isRecapEnabled: boolean;
  onRetryPermission: () => void;
  onStartCapture: () => void;
  onBack: () => void;
  onToggleMirror: () => void;
  onToggleRecap: () => void;
}

const InstructionStep: React.FC<InstructionStepProps> = ({
  permissionDenied,
  videoRef,
  countDownDuration,
  selectedLayout,
  isMirrored,
  isRecapEnabled,
  onRetryPermission,
  onStartCapture,
  onBack,
  onToggleMirror,
  onToggleRecap,
}) => {
  const getPreviewStyle = () => {
    switch (selectedLayout) {
      case "PORTRAIT_2X2":
      case "PORTRAIT_1X1":
        return "aspect-[3/4] max-w-sm"; // Vertical rectangle
      case "STRIP_1X4":
      case "GRID_2X3":
      default:
        // Square or wider for others, with larger max-width for "wider capture" feel
        return "aspect-square max-w-lg";
    }
  };

  return (
    <div className="p-8 text-center h-full flex flex-col justify-center items-center">
      {permissionDenied ? (
        <div className="text-red-500">
          <p className="mb-4">
            Không thể truy cập camera. Vui lòng cấp quyền để tiếp tục.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={onRetryPermission} variant="secondary">
              Thử lại
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="border-red-200 text-red-500 hover:bg-red-50"
            >
              Quay về
            </Button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            Sẵn Sàng Chưa?
          </h3>
          <div
            className={`bg-slate-900 rounded-2xl overflow-hidden shadow-xl mb-6 w-full relative mx-auto transition-all duration-500 ${getPreviewStyle()}`}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transition-transform duration-500 ${isMirrored ? "transform -scale-x-100" : ""}`}
            />

            {/* Controls Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              {/* Recap Toggle */}
              <button
                onClick={onToggleRecap}
                className={`p-3 rounded-full backdrop-blur-sm transition-all shadow-lg border flex items-center gap-2 ${
                  isRecapEnabled
                    ? "bg-brand-500/80 text-white border-brand-400"
                    : "bg-black/50 hover:bg-black/70 text-white border-white/20"
                }`}
                title="Quay video hậu trường"
              >
                <Video
                  size={20}
                  className={isRecapEnabled ? "animate-pulse" : ""}
                />
                <span className="text-xs font-bold hidden sm:block">Recap</span>
              </button>

              {/* Mirror Toggle */}
              <button
                onClick={onToggleMirror}
                className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all shadow-lg border border-white/20"
                title="Lật camera"
              >
                <RefreshCcw size={20} />
              </button>
            </div>
          </div>

          <ul className="text-slate-600 text-sm mb-8 space-y-2">
            <li>Chỉnh lại tóc tai và trang phục</li>
            <li>Camera sẽ chụp mỗi {countDownDuration} giây</li>
            <li>Đổi dáng liên tục sau mỗi lần nháy đèn</li>
          </ul>

          <div className="flex gap-3">
            <Button onClick={onBack} variant="secondary">
              Chọn lại
            </Button>
            <Button onClick={onStartCapture} className="animate-pulse">
              Bắt Đầu Chụp!
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default InstructionStep;
