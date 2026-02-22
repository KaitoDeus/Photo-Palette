import React from "react";
import Reveal from "../common/Reveal";
import insta1 from "../../assets/landing/insta_1.webp";
import insta2 from "../../assets/landing/insta_2.webp";
import insta3 from "../../assets/landing/insta_3.webp";
import insta4 from "../../assets/landing/insta_4.webp";
import insta5 from "../../assets/landing/insta_5.webp";
import insta6 from "../../assets/landing/insta_6.webp";

const Gallery: React.FC = () => {
  const items = [
    {
      id: 1,
      src: insta1,
      link: "https://www.instagram.com/p/DUDUlhPkRg9/",
    },
    {
      id: 2,
      src: insta2,
      link: "https://www.instagram.com/p/DUNoVEyDwwR/",
    },
    {
      id: 3,
      src: insta3,
      link: "https://www.instagram.com/p/DULC3d8j8CN/",
    },
    {
      id: 4,
      src: insta4,
      link: "https://www.instagram.com/p/DUIeSlkD1bu/",
    },
    {
      id: 5,
      src: insta5,
      link: "https://www.instagram.com/p/DUAWyuUj7NR/",
    },
    {
      id: 6,
      src: insta6,
      link: "https://www.instagram.com/p/DT9Xl6TihOG/",
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-brand-500 font-semibold tracking-wide uppercase text-sm">
              Khung nổi bật
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              CẬP NHẬT THƯỜNG XUYÊN
            </h2>
          </div>
          <a
            href="https://www.instagram.com/photopalette_vn/"
            target="_blank"
            rel="noreferrer"
            className="text-brand-500 font-medium hover:text-brand-600 border-b-2 border-brand-200 pb-1 hover:border-brand-500 transition-all"
          >
            Theo dõi Instagram @photopalette_vn
          </a>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05} className="h-full">
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer h-full block"
              >
                <img
                  src={item.src}
                  alt={`Instagram Moment ${item.id}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    Xem trên Instagram
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
