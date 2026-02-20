import React from "react";
import { Camera } from "lucide-react";
import Button from "../../../components/common/Button";

interface IntroStepProps {
  onStart: () => void;
}

const IntroStep: React.FC<IntroStepProps> = ({ onStart }) => {
  return (
    <div className="text-center py-12 px-6">
      <div className="w-20 h-20 bg-brand-100 text-brand-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
        <Camera size={40} />
      </div>
      <h3 className="text-3xl font-bold text-slate-900 mb-4">
        Trải Nghiệm Photobooth Online
      </h3>
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        Thử ngay quy trình chụp ảnh "chuẩn Hàn" ngay trên trình duyệt của bạn.
        Hoàn toàn miễn phí, không cần đăng ký!
      </p>
      <Button onClick={onStart} withIcon>
        Chụp Hình Ngay
      </Button>
      <p className="mt-4 text-xs text-slate-400">
        Yêu cầu quyền truy cập Camera
      </p>
    </div>
  );
};

export default IntroStep;
