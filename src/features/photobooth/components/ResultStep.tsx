import React, { useState } from 'react';
import { Sparkles, RefreshCw, Video, X } from 'lucide-react';
import Button from '../../../components/common/Button';
import { LayoutType, Frame } from '../types';

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

  // Define grid class based on LayoutType
  const getGridClass = () => {
    switch (selectedLayout) {
      case 'STRIP_1X4':
        return 'grid-cols-1 grid-rows-4 aspect-[1/3]'; // 1 column, 4 rows (Classic Strip 1:3)
      case 'PORTRAIT_2X2':
        return 'grid-cols-2 grid-rows-2 aspect-[3/4]'; // Standard 2x2 grid
      case 'GRID_2X3':
        return 'grid-cols-2 grid-rows-3 aspect-[2/3]'; // 6 photos grid
      case 'PORTRAIT_1X1':
        return 'grid-cols-1 grid-rows-1 aspect-[3/4]'; // Single portrait
      default:
        return 'grid-cols-2';
    }
  };

  const gridClass = getGridClass();
  const containerClass = selectedLayout === 'STRIP_1X4' ? 'max-w-[280px]' : 'max-w-sm';

  return (
    <div className="p-4 md:p-8 flex flex-col md:flex-row gap-8 items-center justify-center">
      <div 
        className={`
          relative p-4 shadow-2xl rotate-1 transition-transform hover:rotate-0 duration-500 
          bg-white border-4 ${containerClass} w-full rounded-sm
          ${selectedFrame.borderColor} ${selectedFrame.color}
        `}
      >
        <div className={`grid ${gridClass} gap-2`}>
          {photos.map((photo, idx) => (
            <div key={idx} className="overflow-hidden bg-white">
                <img 
                src={photo} 
                className="w-full h-full object-cover block" 
                alt={`Capture ${idx}`} 
                />
            </div>
          ))}
        </div>

        <div className={`mt-4 text-center font-bold tracking-widest uppercase text-xs opacity-70 ${selectedFrame.textColor}`}>
          {selectedFrame.name} • {new Date().toLocaleDateString('vi-VN')}
        </div>
        
      </div>

      <div className="flex flex-col gap-4 max-w-xs text-center md:text-left">
        <h3 className="text-2xl font-bold text-slate-900">Xinh quá trời ơi! 😍</h3>
        <p className="text-slate-600 text-sm">
          Ghé studio để được chụp với ánh sáng chuyên nghiệp và nhận ảnh in xịn xò nhé!
        </p>
        
        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={onBooking}>
            <Sparkles size={18} className="mr-2" />
            Đặt Lịch Chụp
          </Button>

          {recapVideoUrl && (
            <Button variant="outline" onClick={() => setIsVideoOpen(true)} className="border-pink-200 text-pink-500 hover:bg-pink-50">
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
           <div className="relative bg-black rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl aspect-[3/4] md:aspect-video">
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
