import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Reveal from '../common/Reveal';
import { Star } from 'lucide-react';
import img1 from '../../assets/1.webp';
import img2 from '../../assets/2.webp';
import img3 from '../../assets/3.webp';
import img4 from '../../assets/4.webp';
import img5 from '../../assets/5.webp';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <Reveal className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-brand-100">
              <Star className="w-4 h-4 text-brand-400 fill-brand-400" />
              <span className="text-sm font-medium text-slate-600">
                #1 Photobooth Chuẩn Hàn tại Việt Nam
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              Photo <span></span>
              <span className="text-brand-400 relative inline-block">
                Palette
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl font-bold text-slate-800 tracking-wide uppercase py-4">
              PHOTO BOOTH | 09:30 ~ 23:00
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => document.getElementById('photobooth')?.scrollIntoView()}
                withIcon
              >
                Chụp Thử Online
              </Button>
              <Button 
                variant="secondary"
                onClick={() => {
                   navigate('/gallery');
                   window.scrollTo(0, 0);
                }}
              >
                Xem Ảnh Mẫu
              </Button>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/${i + 50}/100/100`} 
                    alt="User" 
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p>Được yêu thích bởi 5000+ khách hàng</p>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="relative lg:h-[700px] flex justify-center items-center">
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
              <img 
                src={img5} 
                alt="Atmosphere" 
                className="w-full h-full object-cover opacity-30 blur-[60px] animate-pulse" 
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-100 to-orange-50 rounded-full opacity-60 blur-3xl -z-10 animate-pulse" />
            
            <div className="grid grid-cols-2 gap-6 w-full max-w-xl mx-auto relative z-10">
              <img 
                src={img1} 
                alt="Couple having fun" 
                className="w-full h-80 object-cover rounded-3xl shadow-lg mt-12 hover:scale-105 transition-transform duration-500"
              />
              <img 
                src={img2} 
                alt="Friends laughing" 
                className="w-full h-80 object-cover rounded-3xl shadow-lg hover:scale-105 transition-transform duration-500"
              />
              <img 
                src={img3} 
                alt="Solo portrait" 
                className="w-full h-80 object-cover rounded-3xl shadow-lg hover:scale-105 transition-transform duration-500"
              />
              <img 
                src={img4} 
                alt="Pet photography" 
                className="w-full h-80 object-cover rounded-3xl shadow-lg -mt-12 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default Hero;