import React from "react";
import { Instagram, MapPin, Facebook, ArrowUp } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (link: {
    path: string;
    type: string;
    id?: string;
  }) => {
    if (link.type === "page") {
      navigate(link.path);
      window.scrollTo(0, 0);
    } else if (link.type === "scroll" && link.id) {
      if (location.pathname === "/") {
        const element = document.getElementById(link.id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(`/#${link.id}`);
      }
    }
  };

  const footerLinks = [
    { name: "Giới thiệu", path: "/about", type: "page" },
    { name: "Bộ sưu tập", path: "/gallery", type: "page" },
    { name: "Kho Frame", path: "/frames", type: "page" },
    { name: "Liên hệ", path: "/contact", type: "page" },
  ];

  return (
    <footer className="bg-brand-50 pt-12 pb-6 border-t border-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="col-span-1 md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
                <img
                  src="/logo.jpeg"
                  alt="Palette Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-bold text-slate-900">
                Photo Palette
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Lưu giữ những khoảnh khắc đẹp nhất của thanh xuân
              <br />
              theo cách riêng của bạn.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wide">
              Khám Phá
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavigation(link)}
                    className="hover:text-brand-500 transition-colors cursor-pointer block bg-transparent border-none p-0 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wide">
              Liên Hệ
            </h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-400 shadow-sm border border-brand-50 mt-1">
                  <MapPin size={14} />
                </div>
                <div>
                  <span className="block mb-1 font-medium">
                    Hệ thống 24 chi nhánh
                  </span>
                  <button
                    onClick={() => {
                      navigate("/about");
                      window.scrollTo(0, 0);
                    }}
                    className="text-brand-500 hover:text-brand-600 font-bold text-xs flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 transition-all hover:translate-x-1"
                  >
                    Tìm chi nhánh gần bạn &rarr;
                  </button>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wide">
              Theo Dõi
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/photopalette_vn/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-brand-50 flex items-center justify-center text-slate-400 hover:text-brand-500 hover:border-brand-200 hover:shadow-sm transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@photopalette_vn"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-brand-50 flex items-center justify-center text-slate-400 hover:text-brand-500 hover:border-brand-200 hover:shadow-sm transition-all"
              >
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
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/photopalettevn"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-brand-50 flex items-center justify-center text-slate-400 hover:text-brand-500 hover:border-brand-200 hover:shadow-sm transition-all"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-100/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <p className="text-slate-400 font-medium">© 2026 Photo Palette.</p>
            <span className="hidden md:block text-slate-300">•</span>
            <button
              onClick={() => {
                navigate("/privacy");
                window.scrollTo(0, 0);
              }}
              className="text-slate-400 hover:text-brand-500 font-medium transition-colors text-xs md:text-sm"
            >
              Chính Sách & Pháp Lý
            </button>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-slate-500 hover:text-brand-500 transition-colors font-semibold group px-4 py-2 hover:bg-white rounded-full"
          >
            Back to Top
            <ArrowUp
              size={16}
              className="group-hover:-translate-y-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
