import React from "react";
import Reveal from "../common/Reveal";
import {
  Calendar,
  Camera,
  Image as ImageIcon,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: <Calendar className="w-8 h-8" />,
      title: "Đặt Lịch",
      text: "Chọn ngày, giờ và gói chụp phù hợp chỉ với vài cú click trực tuyến.",
      color: "bg-blue-50 text-blue-500",
    },
    {
      num: "02",
      icon: <Camera className="w-8 h-8" />,
      title: "Chụp Ảnh",
      text: "Đến studio, chọn phụ kiện và tự do tạo dáng với điều khiển từ xa trong không gian riêng tư.",
      color: "bg-brand-50 text-brand-500",
    },
    {
      num: "03",
      icon: <ImageIcon className="w-8 h-8" />,
      title: "Nhận Ảnh",
      text: "Chọn những tấm đẹp nhất. Ảnh sẽ được in ra chất lượng cao ngay lập tức để bạn mang về.",
      color: "bg-orange-50 text-orange-500",
    },
  ];

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-0">
        <div className="absolute top-[10%] left-[-5%] w-72 h-72 bg-brand-200/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float-reverse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-brand-100 mb-4">
            <Sparkles className="w-4 h-4 text-brand-400 fill-brand-400" />
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
              Trải nghiệm dễ dàng
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Quy Trình <span className="text-brand-500">Đơn Giản</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            Chỉ với 3 bước đơn giản để sở hữu những bộ ảnh chuẩn phong cách Hàn
            Quốc ngay tại Việt Nam.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-stretch relative">
          {steps.map((step, idx) => (
            <Reveal key={idx} delay={idx * 0.2} className="relative h-full">
              <div className="group h-full bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-8 lg:p-10 border border-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-10px_rgba(244,114,120,0.15)] transition-all duration-500 flex flex-col items-center text-center hover:-translate-y-3">
                {/* Step Number Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  STEP {step.num}
                </div>

                {/* Icon Container */}
                <div
                  className={`w-24 h-24 ${step.color} rounded-[2rem] flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  {step.icon}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight flex items-center gap-2">
                  <span className="text-brand-200 text-3xl font-black leading-none opacity-50">
                    {step.num}
                  </span>
                  {step.title}
                </h3>

                <p className="text-slate-500 leading-relaxed font-medium">
                  {step.text}
                </p>

                {/* Connector for mobile/arrow indicators */}
                {idx < steps.length - 1 && (
                  <div className="md:hidden mt-8 text-brand-200">
                    <ChevronRight size={32} className="rotate-90 mx-auto" />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
