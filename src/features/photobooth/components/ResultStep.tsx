import React, { useState } from "react";
import { Sparkles, RefreshCw, Video, X, Download, Layout } from "lucide-react";
import Button from "../../../components/common/Button";
import { LayoutType, Frame } from "../types";
import { FrameStrip } from "./FrameStrip";
import { exportFinalImage } from "../utils/imageExport";
import FrameSelectionModal from "./FrameSelectionModal";

interface ResultStepProps {
  photos: string[];
  selectedLayout: LayoutType;
  selectedFrame: Frame;
  recapVideoUrl?: string | null;
  onRetake: () => void;
  onBooking: () => void;
  onSelectFrame: (frame: Frame) => void;
}

const ResultStep: React.FC<ResultStepProps> = ({
  photos,
  selectedLayout,
  selectedFrame,
  recapVideoUrl,
  onRetake,
  onBooking,
  onSelectFrame,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isFrameModalOpen, setIsFrameModalOpen] = useState(false);

  const handleDownload = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const dataUrl = await exportFinalImage(selectedFrame, photos);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `photo-palette-${new Date().getTime()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Có lỗi khi tải ảnh về, vui lòng thử lại!");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-4 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center min-h-[calc(100vh-120px)]">
      <div className="flex justify-center w-full transition-all duration-500">
        <FrameStrip
          frame={selectedFrame}
          filled={true}
          photos={photos}
          size="xl"
          disableHover={true}
          imageFit="cover"
        />
      </div>

      <div className="flex flex-col gap-5 w-full max-w-sm text-center lg:text-left animate-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Xinh quá trời ơi! 😍
          </h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Ghé studio để được chụp với ánh sáng chuyên nghiệp và nhận ảnh in xịn
            xò nhé!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-3.5 mt-2">
          <Button
            onClick={handleDownload}
            disabled={isExporting}
            className="bg-green-500 hover:bg-green-600 border-none shadow-lg shadow-green-100 h-12"
          >
            <Download size={18} className="mr-2" />
            {isExporting ? "Đang xử lý..." : "Tải Ảnh Về"}
          </Button>

          <Button
            variant="outline"
            onClick={() => setIsFrameModalOpen(true)}
            className="border-brand-200 text-brand-600 hover:bg-brand-50 h-12"
          >
            <Layout size={18} className="mr-2" />
            Đổi Khung Ảnh
          </Button>

          <Button 
            onClick={onBooking}
            className="h-12"
          >
            <Sparkles size={18} className="mr-2" />
            Đặt Lịch Chụp
          </Button>

          {recapVideoUrl && (
            <Button
              variant="outline"
              onClick={() => setIsVideoOpen(true)}
              className="border-pink-200 text-pink-500 hover:bg-pink-50 h-12"
            >
              <Video size={18} className="mr-2" />
              Video Recap
            </Button>
          )}

          <Button 
            variant="secondary" 
            onClick={onRetake}
            className="h-12"
          >
            <RefreshCw size={18} className="mr-2" />
            Chụp Lại
          </Button>
        </div>

        <p className="text-[11px] sm:text-xs text-brand-400 mt-2 italic opacity-80">
          *Ảnh sẽ không được lưu trên hệ thống để bảo vệ quyền riêng tư.
        </p>
      </div>

      {/* Frame Selection Modal */}
      <FrameSelectionModal
        isOpen={isFrameModalOpen}
        onClose={() => setIsFrameModalOpen(false)}
        onSelect={onSelectFrame}
        selectedFrameId={selectedFrame.id}
        selectedLayoutId={selectedLayout}
      />

      {/* Video Recap Modal */}
      {isVideoOpen && recapVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative bg-black rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl aspect-[3/4] md:aspect-video max-h-[90vh]">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/50 p-2 rounded-full z-10"
            >
              <X size={24} />
            </button>
            <video
              src={recapVideoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultStep;
