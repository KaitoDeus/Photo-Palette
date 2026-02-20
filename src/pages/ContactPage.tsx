import React, { useEffect } from "react";
import Reveal from "../components/common/Reveal";
import { Mail, Facebook, Instagram, Code } from "lucide-react";
import avatar from "../assets/about/avatar.jpg";

const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-brand-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-center">
          {/* Left Card - Developer Profile & Store Info */}
          <Reveal
            delay={0.1}
            className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-white/50 relative overflow-hidden w-full max-w-lg"
          >
            {/* 1. Developer Section */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <span className="inline-block px-6 py-2 bg-brand-100 text-brand-600 rounded-full text-xl font-bold tracking-wider uppercase">
                  Liên Hệ
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-slate-400 uppercase mb-6">
                <Code className="w-4 h-4" />
                Developer Profile
              </div>

              {/* Avatar */}
              <div className="relative w-28 h-28 mx-auto mb-6">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg ring-4 ring-brand-50">
                  <img
                    src={avatar}
                    alt="Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
              </div>

              {/* Developer Contact Info */}
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-4 bg-brand-50/50 p-3 rounded-2xl border border-brand-100">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-brand-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Email
                    </div>
                    <div className="text-sm font-bold text-slate-900 truncate">
                      khaivo300605@gmail.com
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://www.facebook.com/kaitovo8952/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 bg-blue-50 hover:bg-blue-100 p-3 rounded-2xl border border-blue-100 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      <Facebook className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">
                      Facebook
                    </span>
                  </a>
                  <a
                    href="https://www.instagram.com/_kai.desu/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 bg-pink-50 hover:bg-pink-100 p-3 rounded-2xl border border-pink-100 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">
                      Instagram
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 my-8 relative">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs font-bold text-slate-300 uppercase tracking-widest">
                Photo Palette Official
              </span>
            </div>

            {/* 2. Store Info Section */}
            <div className="space-y-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/photopalettevn"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between bg-white hover:bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      Photo Palette VN
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Facebook Page
                    </div>
                  </div>
                </div>
                <div className="text-slate-300 group-hover:text-blue-600 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/photopalette_vn/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between bg-white hover:bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      @photopalette_vn
                    </div>
                    <div className="text-[10px] text-slate-500">Instagram</div>
                  </div>
                </div>
                <div className="text-slate-300 group-hover:text-brand-400 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@photopalette_vn"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between bg-white hover:bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      @photopalette_vn
                    </div>
                    <div className="text-[10px] text-slate-500">
                      TikTok Channel
                    </div>
                  </div>
                </div>
                <div className="text-slate-300 group-hover:text-black transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
