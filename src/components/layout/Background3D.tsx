import React, { useEffect, useState } from "react";

const Background3D: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-brand-50/30">
      {/* Container for Parallax effect */}
      <div
        className="absolute inset-[-10%] transition-transform duration-1000 ease-out flex items-center justify-center"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          perspective: "1200px",
        }}
      >
        {/* Floating 3D Blobs with clear colors and movements */}
        <div
          className="absolute top-[15%] left-[10%] w-[350px] h-[350px] bg-brand-400/25 rounded-full blur-[80px] animate-float-slow ring-1 ring-brand-300/20"
          style={{ transform: "translateZ(100px)" }}
        />

        <div
          className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] bg-blue-400/20 rounded-full blur-[100px] animate-float-reverse ring-1 ring-blue-300/20 shadow-[0_0_120px_rgba(147,197,253,0.3)]"
          style={{ transform: "translateZ(-50px)" }}
        />

        <div
          className="absolute top-[60%] left-[40%] w-[300px] h-[300px] bg-purple-400/20 rounded-full blur-[90px] animate-pulse-slow"
          style={{ transform: "translateZ(150px)" }}
        />

        {/* Dynamic Glass Mesh - Floating lines to add grid depth */}
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>

      {/* Surface Noise for that premium feel */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-soft-light pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default Background3D;
