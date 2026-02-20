import React from "react";
import { Check } from "lucide-react";

import Reveal from "../common/Reveal";

const Pricing: React.FC = () => {
  const packages = [
    {
      name: "Cơ Bản",
      price: "150k",
      unit: "VND",
      desc: "Phù hợp cho chụp đơn hoặc đôi nhanh gọn.",
      features: [
        "15 Phút Chụp",
        "2 Ảnh In (Photo Strip)",
        "Bao Gồm File Ảnh Gốc",
        "Phụ Kiện Cơ Bản",
      ],
      highlight: false,
    },
    {
      name: "Cao Cấp",
      price: "250k",
      unit: "VND",
      desc: "Lựa chọn phổ biến nhất cho nhóm bạn.",
      features: [
        "30 Phút Chụp",
        "4 Ảnh In Lớn",
        "File Gốc Chất Lượng Cao",
        "Tất Cả Phụ Kiện",
        "Video Timelapse",
      ],
      highlight: true,
    },
    {
      name: "Sự Kiện",
      price: "Liên Hệ",
      unit: "",
      desc: "Dành cho sinh nhật, tiệc công ty.",
      features: [
        "In Ảnh Không Giới Hạn",
        "Thiết Kế Frame Riêng",
        "Hỗ Trợ Tại Chỗ",
        "Thuê Nguyên Studio",
      ],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Bảng Giá Dịch Vụ
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {packages.map((pkg, index) => (
            <Reveal
              key={pkg.name}
              delay={index * 0.1}
              className={`relative p-8 rounded-3xl border ${
                pkg.highlight
                  ? "bg-rose-50 border-brand-200 shadow-xl scale-105 z-10"
                  : "bg-white border-brand-100 shadow-md hover:shadow-xl transition-all duration-300"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                  Khuyên Dùng
                </div>
              )}

              <h3 className="text-xl font-bold text-slate-800">{pkg.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-slate-900">
                  {pkg.price}
                </span>
                <span className="ml-1 text-slate-500">{pkg.unit}</span>
              </div>
              <p className="mt-4 text-sm text-slate-500">{pkg.desc}</p>

              <ul className="mt-8 space-y-4 mb-8">
                {pkg.features.map((feat) => (
                  <li key={feat} className="flex items-center text-slate-600">
                    <Check className="w-5 h-5 text-brand-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">{feat}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
