import React, { useState, useEffect } from "react";
import { Home, Info, Image, Grid, Phone, Camera } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../common/Button";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down & past 50px
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Trang chủ", path: "/", type: "page", icon: <Home size={24} /> },
    {
      name: "Giới thiệu",
      path: "/about",
      type: "page",
      icon: <Info size={24} />,
    },
    {
      name: "Bộ sưu tập",
      path: "/gallery",
      type: "page",
      icon: <Image size={24} />,
    },
    {
      name: "Kho Frame",
      path: "/frames",
      type: "page",
      icon: <Grid size={24} />,
    },
    {
      name: "Liên hệ",
      path: "/contact",
      type: "page",
      icon: <Phone size={24} />,
    },
  ];

  const handleNavigation = (link: {
    name: string;
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

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleBooking = () => {
    if (location.pathname === "/") {
      const element = document.getElementById("photobooth");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#photobooth");
    }
  };

  return (
    <>
      {/* Desktop Left Sidebar Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 h-screen bg-brand-50 z-50 border-r border-brand-100 flex-col group/nav overflow-x-hidden w-20 hover:w-72 transition-all duration-300">
        {/* Logo Header */}
        <div className="p-6 md:px-5 group-hover/nav:p-6 flex items-center justify-between border-b border-slate-50 shrink-0">
          <div
            className="flex items-center gap-3 cursor-pointer shrink-0"
            onClick={handleLogoClick}
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md shrink-0 border border-slate-100">
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight whitespace-nowrap overflow-hidden w-0 opacity-0 group-hover/nav:w-auto group-hover/nav:opacity-100 group-hover/nav:ml-1 transition-all duration-300">
              Palette
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col gap-2 p-4 md:px-3 group-hover/nav:p-4 overflow-y-auto overflow-x-hidden">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigation(link)}
              className={`flex items-center p-3 rounded-xl transition-colors duration-200 group text-left ${
                location.pathname === link.path
                  ? "bg-brand-50 text-brand-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-brand-500"
              }`}
              title={link.name}
            >
              <div
                className={`shrink-0 transition-colors duration-200 mx-auto group-hover/nav:mx-0 ${
                  location.pathname === link.path
                    ? "text-brand-600"
                    : "text-slate-400 group-hover:text-brand-500"
                }`}
              >
                {link.icon}
              </div>

              <span className="font-medium text-lg whitespace-nowrap overflow-hidden w-0 opacity-0 group-hover/nav:w-auto group-hover/nav:opacity-100 group-hover/nav:ml-4 transition-all duration-300">
                {link.name}
              </span>

              {location.pathname === link.path && (
                <div className="ml-auto w-2 h-2 rounded-full bg-brand-500 shrink-0 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* Booking Button */}
        <div className="p-4 md:px-3 group-hover/nav:p-4 border-t border-slate-100 mt-auto shrink-0">
          <Button
            onClick={handleBooking}
            fullWidth={true}
            className="flex items-center justify-center px-0 group-hover/nav:px-6 transition-all duration-300 rounded-xl shadow-md border-b-2 border-brand-600 active:border-b-0 active:translate-y-[2px]"
          >
            <div className="shrink-0">
              <Camera size={20} />
            </div>
            <span className="whitespace-nowrap overflow-hidden w-0 opacity-0 group-hover/nav:w-auto group-hover/nav:opacity-100 group-hover/nav:ml-2 transition-all duration-300">
              Chụp Thử Ngay
            </span>
          </Button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav 
        className={`md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 flex justify-around items-center h-16 px-2 pb-[env(safe-area-inset-bottom)] transition-transform duration-300 shadow-[0_-5px_15px_-10px_rgba(0,0,0,0.1)] ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <button
              key={link.name}
              onClick={() => handleNavigation(link)}
              className={`flex flex-col items-center justify-center w-16 h-full ${
                isActive ? "text-brand-600" : "text-slate-400"
              }`}
            >
              <div className="mb-0.5">
                {React.cloneElement(link.icon as React.ReactElement, {
                  size: 24,
                })}
              </div>
              <span className="text-[9px] sm:text-[10px] font-medium tracking-wide whitespace-nowrap truncate w-full text-center px-1">
                {link.name}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Navbar;
