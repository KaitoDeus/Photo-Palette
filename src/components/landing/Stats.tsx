import React from "react";
import Reveal from "../common/Reveal";
import { Users, Camera, MapPin, Sparkles } from "lucide-react";

const Stats: React.FC = () => {
  const stats = [
    {
      icon: <Users className="w-6 h-6 text-brand-500" />,
      value: "50,000+",
      suffix: "CUSTOMERS",
    },
    {
      icon: <Camera className="w-6 h-6 text-brand-500" />,
      value: "100,000+",
      suffix: "MOMENTS",
    },
    {
      icon: <MapPin className="w-6 h-6 text-brand-500" />,
      value: "15+",
      suffix: "STUDIOS",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-brand-500" />,
      value: "200+",
      suffix: "PROPS",
    },
  ];

  return (
    <section className="py-16 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-brand-100 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-50 transition-all duration-500">
                  {stat.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-bold text-brand-500 uppercase tracking-widest opacity-80 pt-1">
                    {stat.suffix}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
};

export default Stats;
