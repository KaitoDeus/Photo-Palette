import React, { useState } from "react";
import { Sparkles, RefreshCw, Layout, QrCode } from "lucide-react";
import Button from "../../../components/common/Button";
import { LayoutType, Frame } from "../types";
import { FrameStrip } from "./FrameStrip";
import FrameSelectionModal from "./FrameSelectionModal";
import { QRCodeModal } from "./QRCodeModal";

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
  const [isQROpen, setIsQROpen] = useState(false);
  const [isFrameModalOpen, setIsFrameModalOpen] = useState(false);

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
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Xinh quá trời ơi! 😍
          </h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Ghé studio để được chụp với ánh sáng chuyên nghiệp và nhận ảnh in xịn
            xò nhé!
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          {/* Primary High-Impact QR Code Button */}
          <button
            type="button"
            onClick={() => setIsQROpen(true)}
            className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 active:scale-95 text-white font-extrabold text-base py-4 px-5 rounded-2xl shadow-xl shadow-rose-200 hover:shadow-2xl transition-all flex items-center justify-center gap-2.5"
          >
            <QrCode size={22} className="animate-pulse flex-shrink-0" />
            <span>Quét Mã QR Nhận Ảnh & Video</span>
          </button>

          <Button
            variant="outline"
            onClick={() => setIsFrameModalOpen(true)}
            className="border-brand-200 text-brand-600 hover:bg-brand-50 h-12 text-sm font-bold"
          >
            <Layout size={18} className="mr-2" />
            Đổi Khung Ảnh
          </Button>

          <Button 
            onClick={onBooking}
            className="h-12 text-sm font-bold"
          >
            <Sparkles size={18} className="mr-2" />
            Đặt Lịch Chụp
          </Button>

          <Button 
            variant="secondary" 
            onClick={onRetake}
            className="h-12 text-sm font-bold"
          >
            <RefreshCw size={18} className="mr-2" />
            Chụp Lại
          </Button>
        </div>

        <p className="text-[11px] sm:text-xs text-brand-400 mt-2 italic opacity-80">
          *Ảnh được bảo vệ quyền riêng tư và tự động xóa sau 24h.
        </p>
      </div>

      {/* QR Code Modal for Phone Delivery */}
      <QRCodeModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        frame={selectedFrame}
        photos={photos}
        recapVideoUrl={recapVideoUrl}
      />

      {/* Frame Selection Modal */}
      <FrameSelectionModal
        isOpen={isFrameModalOpen}
        onClose={() => setIsFrameModalOpen(false)}
        onSelect={onSelectFrame}
        selectedFrameId={selectedFrame.id}
        selectedLayoutId={selectedLayout}
      />
    </div>
  );
};

export default ResultStep;
