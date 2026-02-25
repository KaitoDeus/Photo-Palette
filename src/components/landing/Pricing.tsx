import React from "react";
import { Check } from "lucide-react";



const Pricing: React.FC = () => {
  const packages = [
    {
      name: "Size Nhỏ",
      price: "70.000",
      unit: "VND",
      desc: "Bao gồm 2 kiểu khung cho bạn lựa chọn",
      features: [
        "2 ảnh in giống nhau",
      ],
      highlight: false,
    },
    {
      name: "Size Lớn",
      price: "100.000",
      unit: "VND",
      desc: "Bao gồm 5 kiểu khung cho bạn lựa chọn",
      features: [
        "2 ảnh in giống nhau",
      ],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Bảng Giá Dịch Vụ
          </h2>
          <p className="text-lg text-brand-600 font-bold max-w-2xl mx-auto">
            Tất cả đều được sử dụng miễn phí các phụ kiện và máy làm tóc, sticker
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
