import React, { useState } from "react";
import { ChevronRight, Palette } from "lucide-react";
import Button from "../../../components/common/Button";
import { LAYOUTS } from "../constants";
import { LayoutType, CountdownDuration, Frame } from "../types";
import FrameSelectionModal from "./FrameSelectionModal";
import { FrameStrip } from "./FrameStrip";

interface LayoutSelectionStepProps {
  selectedLayout: LayoutType;
  selectedFrame: Frame;
  countDownDuration: CountdownDuration;
  onSelectLayout: (layout: LayoutType) => void;
  onSelectFrame: (frame: Frame) => void;
  onSelectCountDown: (duration: CountdownDuration) => void;
  onConfirm: () => void;
}

const LayoutSelectionStep: React.FC<LayoutSelectionStepProps> = ({
  selectedLayout,
  selectedFrame,
  countDownDuration,
  onSelectLayout,
  onSelectFrame,
  onSelectCountDown,
  onConfirm,
}) => {
  const [isFrameModalOpen, setIsFrameModalOpen] = useState(false);

  return (
    <div className="p-6 md:p-10">
      {/* Layout Selection */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider text-center">
          Chọn Kiểu Layout
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {LAYOUTS.map((layout) => (
            <button
              key={layout.id}
              onClick={() => onSelectLayout(layout.id)}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                selectedLayout === layout.id
                  ? "border-brand-500 bg-brand-50 text-brand-600"
                  : "border-slate-200 hover:border-brand-200 text-slate-500"
              }`}
            >
              <div
                className={
                  selectedLayout === layout.id
                    ? "text-brand-500"
                    : "text-slate-400"
                }
              >
                {layout.icon}
              </div>
              <span className="font-semibold text-sm">{layout.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Countdown Selection */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider text-center">
          Thời Gian Đếm Ngược
        </h3>
        <div className="flex justify-center gap-4">
          {[3, 5, 10].map((num) => (
            <button
              key={num}
              onClick={() => onSelectCountDown(num as CountdownDuration)}
              className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-all ${
                countDownDuration === num
                  ? "border-brand-500 bg-brand-500 text-white shadow-lg scale-110"
                  : "border-slate-200 text-slate-500 hover:border-brand-200 bg-white"
              }`}
            >
              {num}s
            </button>
          ))}
        </div>
      </div>

      {/* Frame Selection Button */}
      <div className="mb-10 text-center">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">
          Chọn Khung Hình
        </h3>

        <div className="flex flex-col items-center gap-4">
          {/* Selected Frame Preview Card */}
          <div className={`shadow-xl transition-all`}>
            <FrameStrip frame={selectedFrame} filled={true} size="sm" />
          </div>

          <Button
            onClick={() => setIsFrameModalOpen(true)}
            variant="outline"
            className="flex items-center gap-2 mt-4"
          >
            <Palette size={18} />
            Đổi Khung Hình
          </Button>
        </div>
      </div>

      <div className="text-center">
        <Button onClick={onConfirm} fullWidth>
          Tiếp Tục <ChevronRight size={18} />
        </Button>
      </div>

      {/* Frame Selection Modal */}
      <FrameSelectionModal
        isOpen={isFrameModalOpen}
        onClose={() => setIsFrameModalOpen(false)}
        selectedFrameId={selectedFrame.id}
        onSelect={onSelectFrame}
      />
    </div>
  );
};

export default LayoutSelectionStep;
