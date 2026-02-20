import React, { useState } from "react";
import { Menu, X, Home, Info, Image, Grid, Phone, Camera } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../common/Button";

const Navbar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
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
    if (window.innerWidth < 768) setSidebarOpen(false);
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
      <nav
        className={`fixed top-0 left-0 h-screen bg-brand-50 shadow-2xl z-50 transition-all duration-300 ease-in-out border-r border-brand-100 flex flex-col group/nav overflow-x-hidden ${
          isSidebarOpen
            ? "translate-x-0 w-80 shadow-2xl"
            : "-translate-x-full md:translate-x-0 md:w-20 md:shadow-none hover:md:w-72 hover:md:shadow-2xl"
        }`}
      >
        {/* Logo Header */}
        <div className="p-6 md:px-5 md:group-hover/nav:p-6 flex items-center justify-between border-b border-slate-50 transition-all duration-300 shrink-0">
          <div
            className="flex items-center gap-3 cursor-pointer shrink-0"
            onClick={handleLogoClick}
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md shrink-0">
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={`font-bold text-xl text-slate-800 tracking-tight transition-all duration-300 whitespace-nowrap overflow-hidden ${
                isSidebarOpen
                  ? "w-auto opacity-100"
                  : "w-0 opacity-0 md:group-hover/nav:w-auto md:group-hover/nav:opacity-100 md:group-hover/nav:ml-1"
              }`}
            >
              Palette
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className={`p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-red-500 transition-colors ${
              !isSidebarOpen ? "md:hidden" : ""
            }`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col gap-2 p-4 md:px-3 md:group-hover/nav:p-4 overflow-y-auto overflow-x-hidden transition-all duration-300">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigation(link)}
              className={`flex items-center p-3 rounded-xl transition-all duration-200 group text-left ${
                location.pathname === link.path
                  ? "bg-brand-50 text-brand-600 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-brand-500"
              }`}
              title={!isSidebarOpen ? link.name : undefined}
            >
              <div
                className={`shrink-0 transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-brand-600"
                    : "text-slate-400 group-hover:text-brand-500"
                } ${!isSidebarOpen ? "md:mx-auto md:group-hover/nav:mx-0" : ""}`}
              >
                {link.icon}
              </div>

              <span
                className={`font-medium text-lg transition-all duration-300 whitespace-nowrap overflow-hidden ${
                  isSidebarOpen
                    ? "w-auto opacity-100 ml-4"
                    : "w-0 opacity-0 md:group-hover/nav:w-auto md:group-hover/nav:opacity-100 md:group-hover/nav:ml-4"
                }`}
              >
                {link.name}
              </span>

              {location.pathname === link.path && (
                <div
                  className={`ml-auto w-2 h-2 rounded-full bg-brand-500 shrink-0 transition-all duration-300 ${
                    isSidebarOpen
                      ? "opacity-100"
                      : "opacity-0 md:group-hover/nav:opacity-100"
                  }`}
                />
              )}
            </button>
          ))}
        </div>

        {/* Booking Button */}
        <div className="p-4 md:px-3 md:group-hover/nav:p-4 border-t border-slate-100 mt-auto transition-all duration-300 shrink-0">
          <Button
            onClick={handleBooking}
            fullWidth={true}
            className={`flex items-center justify-center transition-all duration-300 ${
              !isSidebarOpen ? "md:px-0 md:group-hover/nav:px-6" : ""
            }`}
          >
            <div className="shrink-0">
              <Camera size={20} />
            </div>
            <span
              className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${
                isSidebarOpen
                  ? "w-auto opacity-100 ml-2"
                  : "w-0 opacity-0 md:group-hover/nav:w-auto md:group-hover/nav:opacity-100 md:group-hover/nav:ml-2"
              }`}
            >
              Chụp Thử Ngay
            </span>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setSidebarOpen(true)}
        className={`fixed top-6 left-6 z-40 p-3 bg-white shadow-lg rounded-full text-slate-700 hover:text-brand-600 hover:scale-110 transition-all duration-300 border border-slate-100 md:hidden ${
          isSidebarOpen
            ? "opacity-0 scale-0 pointer-events-none"
            : "opacity-100 scale-100"
        }`}
        title="Mở Menu"
      >
        <Menu size={28} />
      </button>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
    </>
  );
};

export default Navbar;
