import React, { useEffect, useState, useCallback } from "react";
import Reveal from "../components/common/Reveal";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Imports from assets/mẫu
// Imports from assets/example
import img1 from "../assets/examples/1.png";
import img2 from "../assets/examples/2.png";
import img3 from "../assets/examples/3.png";
import img4 from "../assets/examples/4.webp";
import img5 from "../assets/examples/5.png";
import img6 from "../assets/examples/6.png";
import img7 from "../assets/examples/7.png";
import img8 from "../assets/examples/8.png";
import img9 from "../assets/examples/9.png";
import img10 from "../assets/examples/10.png";
import img11 from "../assets/examples/11.png";
import img12 from "../assets/examples/12.webp";
import img13 from "../assets/examples/13.webp";
import img14 from "../assets/examples/14.png";
import img15 from "../assets/examples/15.png";
import img16 from "../assets/examples/16.png";
import img17 from "../assets/examples/17.png";
import img18 from "../assets/examples/18.png";
import img19 from "../assets/examples/19.png";
import img20 from "../assets/examples/20.png";
import img21 from "../assets/examples/21.png";
import img22 from "../assets/examples/22.png";
import img23 from "../assets/examples/23.png";
import img24 from "../assets/examples/24.png";

const MOMENTS = [
  { id: 1, url: img1, title: "Feedback 1" },
  { id: 2, url: img2, title: "Feedback 2" },
  { id: 3, url: img3, title: "Feedback 3" },
  { id: 4, url: img4, title: "Feedback 4" },
  { id: 5, url: img5, title: "Feedback 5" },
  { id: 6, url: img6, title: "Feedback 6" },
  { id: 7, url: img7, title: "Feedback 7" },
  { id: 8, url: img8, title: "Feedback 8" },
  { id: 9, url: img9, title: "Feedback 9" },
  { id: 10, url: img10, title: "Feedback 10" },
  { id: 11, url: img11, title: "Feedback 11" },
  { id: 12, url: img12, title: "Feedback 12" },
  { id: 13, url: img13, title: "Feedback 13" },
  { id: 14, url: img14, title: "Feedback 14" },
  { id: 15, url: img15, title: "Feedback 15" },
  { id: 16, url: img16, title: "Feedback 16" },
  { id: 17, url: img17, title: "Feedback 17" },
  { id: 18, url: img18, title: "Feedback 18" },
  { id: 19, url: img19, title: "Feedback 19" },
  { id: 20, url: img20, title: "Feedback 20" },
  { id: 21, url: img21, title: "Feedback 21" },
  { id: 22, url: img22, title: "Feedback 22" },
  { id: 23, url: img23, title: "Feedback 23" },
  { id: 24, url: img24, title: "Feedback 24" },
];

const GalleryPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % MOMENTS.length : null,
    );
  }, []);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + MOMENTS.length) % MOMENTS.length : null,
    );
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  return (
    <div className="pt-20 min-h-screen bg-brand-50/30">
      {/* Header */}
      <section className="py-16 text-center px-4">
        <Reveal>
          <span className="inline-block px-3 py-1 bg-brand-100 text-brand-600 rounded-full text-xs font-bold tracking-wider mb-4 uppercase">
            Showcase
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Bộ Sưu Tập <span className="text-brand-500">PosePalette</span>
          </h1>
        </Reveal>
      </section>

      {/* Masonry Grid */}
      <section className="pb-20 px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="columns-2 md:columns-4 lg:columns-6 gap-4 space-y-4">
          {MOMENTS.map((moment, index) => (
            <div
              key={moment.id}
              onClick={() => setSelectedIndex(index)}
              className="break-inside-avoid relative group overflow-hidden rounded-2xl shadow-md border border-slate-100 bg-white cursor-pointer"
            >
              <img
                src={moment.url}
                alt={`Feedback ${moment.id}`}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20 z-10"
          >
            <X size={24} />
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors bg-white/10 p-3 rounded-full hover:bg-white/20 z-10"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Image */}
          <div
            className="relative max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={MOMENTS[selectedIndex].url}
              alt="Gallery Preview"
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in duration-300 select-none"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors bg-white/10 p-3 rounded-full hover:bg-white/20 z-10"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
