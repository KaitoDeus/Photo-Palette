import React from "react";

import { Users, Camera, MapPin, Sparkles } from "lucide-react";

const Stats: React.FC = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-brand-500" />,
      value: "50,000+",
      suffix: "Khách Hàng",
    },
    {
      icon: <Camera className="w-8 h-8 text-brand-500" />,
      value: "100,000+",
      suffix: "Khoảnh Khắc",
    },
    {
      icon: <MapPin className="w-8 h-8 text-brand-500" />,
      value: "15+",
      suffix: "Phòng Chụp",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-brand-500" />,
      value: "200+",
      suffix: "Phụ kiện",
    },
  ];

  return (
    <section className="py-20 relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-brand-200 blur-[120px] rounded-full opacity-20 -z-10 animate-pulse"></div>

        <div className="bg-white/70 backdrop-blur-2xl border-2 border-white rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-8 md:p-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center group cursor-default">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-brand-200 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-full" />
                  <div className="relative w-20 h-20 rounded-3xl bg-white border border-brand-100 shadow-md shadow-brand-100/50 flex items-center justify-center group-hover:-translate-y-2 group-hover:rotate-6 transition-all duration-500">
                    <div className="group-hover:scale-110 transition-transform duration-500">
                      {stat.icon}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 tracking-tight group-hover:scale-105 transition-transform duration-500">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-bold text-brand-500 uppercase tracking-widest opacity-80 pt-1">
                    {stat.suffix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
