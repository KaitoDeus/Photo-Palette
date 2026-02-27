import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

import { Star, Camera, Play } from "lucide-react";
import img1 from "../../assets/landing/hero_1.webp";
import img2 from "../../assets/landing/hero_2.webp";
import img3 from "../../assets/landing/hero_3.webp";
import img4 from "../../assets/landing/hero_4.webp";
import img5 from "../../assets/landing/hero_5.webp";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [activeLayer, setActiveLayer] = useState(0);
  const heroImages = [img1, img2, img3, img4, img5];

  // Auto-slide logic for simplicity
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className="relative pt-20 pb-24 lg:pt-36 lg:pb-48 overflow-hidden bg-transparent">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-100/20 via-transparent to-white/30 -z-10 pointer-events-none" />
      <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-brand-200/25 rounded-full blur-[140px] -z-10 animate-float-slow" />
      <div className="absolute bottom-[0%] left-[-5%] w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[120px] -z-10 animate-float-reverse shadow-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side: Content */}
          <div className="text-center lg:text-left space-y-12">
            <div>
              <div className="space-y-2">
                <h1 className="text-[5.5rem] sm:text-7xl lg:text-[8rem] xl:text-[9rem] font-bold text-slate-900 leading-[0.9] sm:leading-[1] font-script">
                  Photo <br />
                  <span className="text-brand-500 block -mt-4 sm:-mt-4">
                    Palette
                  </span>
                </h1>
                <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 sm:pt-6">
                  <p className="text-lg sm:text-xl font-black text-brand-500 tracking-[0.2em] sm:tracking-[0.3em] uppercase border-r-2 border-brand-200 pr-4">
                    PHOTO BOOTH
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest">
                    09:30 ~ 23:00
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
              <Button
                onClick={() =>
                  document
                    .getElementById("photobooth")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                withIcon
                size="lg"
                className="group shadow-xl shadow-brand-200/40 hover:scale-105 active:scale-95 transition-all py-4 sm:py-5 px-8"
              >
                Chụp Thử Online
              </Button>
              <button
                onClick={() => {
                  navigate("/gallery");
                  window.scrollTo(0, 0);
                }}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-full font-black text-slate-600 hover:text-brand-500 transition-all group text-sm sm:text-base"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-brand-500 group-hover:bg-brand-50 transition-all">
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                </div>
                Xem Ảnh Mẫu
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 pt-8 border-t border-slate-100">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-14 h-14 rounded-full border-4 border-white shadow-xl overflow-hidden ring-1 ring-slate-100"
                  >
                    <img
                      src={`https://picsum.photos/seed/${i + 70}/100/100`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-yellow-400 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-slate-500 font-bold text-sm">
                  Được yêu thích bởi các bạn{" "}
                  <span className="text-slate-900 text-base">Gen Z</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Simple Fade Slideshow */}
          <div className="relative h-[550px] lg:h-[700px] flex items-center justify-center lg:-mt-20">
            <div className="relative w-full h-full max-w-[500px]">
              {heroImages.map((src, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    activeLayer === index
                      ? "opacity-100 z-20"
                      : "opacity-0 z-10"
                  }`}
                >
                  <div className="w-full h-full bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
                    <img
                      src={src}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}

              <div className="absolute -bottom-4 -right-4 lg:-bottom-8 lg:-right-10 z-40 bg-brand-500 text-white w-20 h-20 lg:w-28 lg:h-28 rounded-full shadow-2xl animate-bounce flex flex-col items-center justify-center ring-8 ring-white transition-transform hover:scale-110">
                <Camera size={24} className="mb-1 lg:w-8 lg:h-8" />
                <span className="text-[8px] lg:text-[12px] font-black uppercase tracking-widest block text-center">
                  Live Studio
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
