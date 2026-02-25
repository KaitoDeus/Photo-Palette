import React, { useState } from "react";
import { Sparkles, RefreshCw, Video, X } from "lucide-react";
import Button from "../../../components/common/Button";
import { LayoutType, Frame } from "../types";
import { FrameStrip } from "./FrameStrip";

interface ResultStepProps {
  photos: string[];
  selectedLayout: LayoutType;
  selectedFrame: Frame;
  recapVideoUrl?: string | null;
  onRetake: () => void;
  onBooking: () => void;
}

const ResultStep: React.FC<ResultStepProps> = ({
  photos,
  selectedLayout,
  selectedFrame,
  recapVideoUrl,
  onRetake,
  onBooking,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);



  return (
    <div className="p-4 md:p-8 flex flex-col md:flex-row gap-8 items-center justify-center">
      <div className="flex justify-center w-full max-w-md">
        <FrameStrip
          frame={selectedFrame}
          filled={true}
          photos={photos}
          size="lg"
          disableHover={true}
        />
      </div>

      <div className="flex flex-col gap-4 max-w-xs text-center md:text-left">
        <h3 className="text-2xl font-bold text-slate-900">
          Xinh quá trời ơi! 😍
        </h3>
        <p className="text-slate-600 text-sm">
          Ghé studio để được chụp với ánh sáng chuyên nghiệp và nhận ảnh in xịn
          xò nhé!
        </p>

        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={onBooking}>
            <Sparkles size={18} className="mr-2" />
            Đặt Lịch Chụp
          </Button>

          {recapVideoUrl && (
            <Button
              variant="outline"
              onClick={() => setIsVideoOpen(true)}
              className="border-pink-200 text-pink-500 hover:bg-pink-50"
            >
              <Video size={18} className="mr-2" />
              Video Recap
            </Button>
          )}

          <Button variant="secondary" onClick={onRetake}>
            <RefreshCw size={18} className="mr-2" />
            Chụp Lại
          </Button>
        </div>

        <p className="text-xs text-brand-400 mt-2 italic">
          *Ảnh sẽ không được lưu trên hệ thống để bảo vệ quyền riêng tư.
        </p>
      </div>

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
