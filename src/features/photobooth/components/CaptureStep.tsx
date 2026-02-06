import React from 'react';
import { LAYOUTS } from '../constants';
import { LayoutType } from '../types';

interface CaptureStepProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  flash: boolean;
  countDown: number | null;
  selectedLayout: LayoutType;
  photos: string[];
  lastPhoto: string | null;
  isMirrored: boolean;
}

const CaptureStep: React.FC<CaptureStepProps> = ({
  videoRef,
  flash,
  countDown,
  selectedLayout,
  photos,
  lastPhoto,
  isMirrored,
}) => {
  return (
    <div className="relative w-full h-full min-h-[500px] bg-black rounded-3xl overflow-hidden flex flex-col items-center justify-center">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${isMirrored ? 'transform -scale-x-100' : ''}`} 
      />
      
      <div className={`absolute inset-0 bg-white transition-opacity duration-150 pointer-events-none ${flash ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Preview Overlay */}
      {lastPhoto && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1/3 aspect-[3/4] bg-white p-1 shadow-2xl rounded-lg rotate-3 z-20 animate-in fade-in zoom-in duration-300">
           <img src={lastPhoto} className="w-full h-full object-cover rounded-md" alt="Preview" />
        </div>
      )}

      {countDown && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20">
          <span className="text-9xl font-bold text-white drop-shadow-lg animate-ping">{countDown}</span>
        </div>
      )}

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {Array.from({ length: LAYOUTS.find(l => l.id === selectedLayout)?.count || 4 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-3 h-3 rounded-full transition-colors ${i < photos.length ? 'bg-brand-500' : 'bg-white/30'}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default CaptureStep;
