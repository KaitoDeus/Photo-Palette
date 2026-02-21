import React from "react";
import {
  Camera,
  Zap,
  Heart,
  Sparkles,
  ShieldCheck,
  Image as ImageIcon,
  Smile,
  Award,
} from "lucide-react";
import Reveal from "../common/Reveal";

const Features: React.FC = () => {
  const features = [
    {
      icon: <Camera className="w-8 h-8 text-brand-500" />,
      title: "Chuẩn Vibe Hàn Quốc",
      description: "Ánh sáng nịnh mặt, filter màu siêu xinh giúp bạn lúc nào cũng lung linh như đang ở studio Seoul vậy đó.",
    },
    {
      icon: <Zap className="w-8 h-8 text-brand-500" />,
      title: "Có Ảnh Liền Tay",
      description: "Chưa tới 30 giây là bạn đã cầm trên tay những tấm ảnh siêu nét, màu sắc cực bền rùi nha.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-brand-500" />,
      title: "Kho Phụ Kiện Cute",
      description: "Tụi mình có sẵn hàng trăm mẫu bờm, kính mát, gấu bông... để bạn tha hồ mix & match đổi style liên tục.",
    },
    {
      icon: <Heart className="w-8 h-8 text-brand-500" />,
      title: "Thoải Mái Biến Hóa",
      description:
        "Buồng chụp riêng tư tuyệt đối, cứ tự nhiên quậy tung nóc, pose mọi dáng khó mà không lo ngại ngùng!",
    },
  ];

  return (
    <section id="features" className="py-24 bg-transparent relative">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-[-5%] w-96 h-96 bg-brand-100/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-[-5%] w-96 h-96 bg-blue-100/20 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-brand-100 mb-6">
            <Award className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-black text-brand-600 uppercase tracking-widest">
              Bí mật của chúng mình
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Tại Sao Chọn <span className="text-brand-500">Palette?</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Mọi thứ đã được chuẩn bị sẵn sàng để bạn toả sáng rực rỡ nhất. Việc của bạn chỉ là ghé chơi và mang theo một nụ cười thật tươi thui nè!
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <Reveal
              key={index}
              delay={index * 0.1}
              className="p-8 lg:p-10 rounded-[2.5rem] bg-white border border-white/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-10px_rgba(244,114,120,0.15)] hover:-translate-y-3 transition-all duration-500 group h-full flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-brand-50 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {feature.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
