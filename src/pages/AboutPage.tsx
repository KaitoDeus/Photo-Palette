import React, { useMemo, useEffect, useState } from "react";

import { useAdmin } from "../features/admin/context/AdminContext";
import {
  MapPin,
  Store,
  Flag,
  Calendar,
  Star,
  ChevronDown,
  Navigation,
  Layers,
  Sparkles,
  ExternalLink,
  Compass,
} from "lucide-react";
import storyImage from "../assets/about/story_1.webp";
import { StudioInteractiveMap } from "../components/studio/StudioInteractiveMap";
import { CustomerBookingModal } from "../features/photobooth/components/CustomerBookingModal";
import { Branch } from "../data/branches";

interface CustomDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  options,
  onChange,
  placeholder,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (disabled) {
    return (
      <div className="relative w-full opacity-50 cursor-not-allowed">
        <button
          disabled
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-400 bg-slate-50 flex justify-between items-center text-sm"
        >
          <span>{placeholder}</span>
          <ChevronDown size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium bg-white hover:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 flex justify-between items-center transition-all duration-200 text-sm shadow-sm"
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          size={18}
          className={`text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-brand-500" : ""
          }`}
        />
      </button>

      <div
        className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-200 origin-top z-50 ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="max-h-60 overflow-y-auto custom-scrollbar">
          <div
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className={`px-4 py-2.5 cursor-pointer text-sm font-medium transition-colors ${
              !value
                ? "bg-brand-50 text-brand-600 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-brand-500"
            }`}
          >
            {placeholder}
          </div>
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-4 py-2.5 cursor-pointer text-sm font-medium transition-colors ${
                value === option
                  ? "bg-brand-50 text-brand-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-brand-500"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Haversine formula to compute distance in km
function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface BranchWithDistance extends Branch {
  distanceKm?: number;
}

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { branches } = useAdmin();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredBranches, setFilteredBranches] = useState<BranchWithDistance[]>(branches);
  const [selectedBranch, setSelectedBranch] = useState<BranchWithDistance>(branches[0]);
  const [mapMode, setMapMode] = useState<"INTERACTIVE" | "GOOGLE">("INTERACTIVE");
  const [isMapLoading, setIsMapLoading] = useState(true);

  // Geolocation states
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Booking Modal
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingBranchId, setBookingBranchId] = useState<number | undefined>(undefined);

  useEffect(() => {
    setFilteredBranches(branches);
    if (branches.length > 0) {
      setSelectedBranch(branches[0]);
    }
  }, [branches]);

  // Extract unique cities
  const cities = useMemo(() => {
    return Array.from(new Set(branches.map((b) => b.city))).sort();
  }, [branches]);

  // Extract districts based on selected city
  const districts = useMemo(() => {
    if (!selectedCity) return [];
    return Array.from(
      new Set(
        branches.filter((b) => b.city === selectedCity).map((b) => b.area),
      ),
    ).sort();
  }, [selectedCity, branches]);

  // Handle Search
  const handleSearch = () => {
    let results: BranchWithDistance[] = branches;
    if (selectedCity) {
      results = results.filter((b) => b.city === selectedCity);
    }
    if (selectedDistrict) {
      results = results.filter((b) => b.area === selectedDistrict);
    }

    // Preserve distances if user location exists
    if (userCoords) {
      results = results.map((b) => {
        if (!b.lat || !b.lng) return b;
        return {
          ...b,
          distanceKm: calculateDistanceKm(userCoords.lat, userCoords.lng, b.lat, b.lng),
        };
      });
      results.sort((a, b) => (a.distanceKm || 9999) - (b.distanceKm || 9999));
    }

    setFilteredBranches(results);
    if (results.length > 0) {
      setSelectedBranch(results[0]);
      setIsMapLoading(true);
    }
  };

  // Find Nearest Branch Geolocation Trigger
  const handleFindNearest = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt của bạn không hỗ trợ định vị vị trí.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const uLat = pos.coords.latitude;
        const uLng = pos.coords.longitude;
        setUserCoords({ lat: uLat, lng: uLng });

        // Calculate distances for all branches
        const withDistances: BranchWithDistance[] = branches.map((b) => {
          if (!b.lat || !b.lng) return { ...b, distanceKm: 99999 };
          const dist = calculateDistanceKm(uLat, uLng, b.lat, b.lng);
          return { ...b, distanceKm: dist };
        });

        withDistances.sort((a, b) => (a.distanceKm || 99999) - (b.distanceKm || 99999));

        setFilteredBranches(withDistances);
        if (withDistances.length > 0) {
          const nearest = withDistances[0];
          setSelectedBranch(nearest);
          setSelectedCity(nearest.city);
          setSelectedDistrict("");
        }
        setMapMode("INTERACTIVE");
        setIsLocating(false);
      },
      (err) => {
        console.warn("Geolocation error:", err);
        alert(
          "Không thể định vị vị trí của bạn. Vui lòng bật GPS hoặc cho phép quyền vị trí trên trình duyệt!",
        );
        setIsLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true },
    );
  };

  const handleOpenBooking = (branch: Branch) => {
    setBookingBranchId(branch.id);
    setIsBookingOpen(true);
  };

  const formatDistance = (dist?: number) => {
    if (dist === undefined) return null;
    if (dist < 1) return `Cách ${Math.round(dist * 1000)}m`;
    return `Cách ${dist.toFixed(1)} km`;
  };

  return (
    <div className="pt-20 min-h-screen bg-brand-50/30">
      {/* Brand Story */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <div className="relative">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square bg-slate-100 relative group">
                <img
                  src={storyImage}
                  alt="Palette Studio Story"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Decorative blob */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-200 rounded-full blur-3xl opacity-50 -z-10"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-50 -z-10"></div>
            </div>

            {/* Right Side - Content */}
            <div>
              <div>
                <span className="inline-block px-3 py-1 bg-brand-100 text-brand-600 rounded-full text-[10px] font-bold tracking-wider mb-4 uppercase">
                  Câu Chuyện Thương Hiệu
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-brand-500 mb-6 leading-tight">
                  Photo Palette
                </h1>

                <div className="space-y-6 text-slate-600 text-lg leading-relaxed mb-10">
                  <p>
                    Được thành lập với niềm đam mê văn hóa Photobooth Hàn Quốc
                  </p>
                  <p>
                    Từ một cửa hàng nhỏ, chúng tôi đã phát triển thành hệ thống
                    Photobooth hàng đầu Việt Nam với 35 chi nhánh trải dài từ
                    Bắc vào Nam, mang đến trải nghiệm chụp ảnh lấy ngay hiện
                    đại, trẻ trung và đầy màu sắc.
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
                <div>
                  <Store className="w-6 h-6 text-brand-400 mb-2" />
                  <div className="text-2xl font-bold text-slate-900">35</div>
                  <div className="text-xs text-slate-500 font-medium">
                    Chi Nhánh
                  </div>
                </div>
                <div>
                  <Flag className="w-6 h-6 text-brand-400 mb-2" />
                  <div className="text-2xl font-bold text-slate-900">7+</div>
                  <div className="text-xs text-slate-500 font-medium">
                    Tỉnh Thành
                  </div>
                </div>
                <div>
                  <Calendar className="w-6 h-6 text-brand-400 mb-2" />
                  <div className="text-2xl font-bold text-slate-900">3</div>
                  <div className="text-xs text-slate-500 font-medium">
                    Năm Hoạt Động
                  </div>
                </div>
                <div>
                  <Star className="w-6 h-6 text-brand-400 mb-2" />
                  <div className="text-2xl font-bold text-slate-900">4.9/5</div>
                  <div className="text-xs text-slate-500 font-medium">
                    Đánh Giá
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branches Locator Section */}
      <section className="py-20" id="locator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Compass size={14} className="animate-spin" /> Bản đồ Studio Toàn Quốc
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Khám Phá Hệ Thống 35 Studio
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
              Tìm kiếm studio Photo Palette gần nhất, xem bản đồ tương tác đa điểm và nhận chỉ đường nhanh chóng.
            </p>
          </div>

          {/* Quick City Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <button
              onClick={() => {
                setSelectedCity("");
                setSelectedDistrict("");
                setFilteredBranches(branches);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                selectedCity === ""
                  ? "bg-rose-500 text-white shadow-rose-200"
                  : "bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-600 border border-slate-200"
              }`}
            >
              Tất cả ({branches.length})
            </button>
            {cities.map((city) => {
              const count = branches.filter((b) => b.city === city).length;
              return (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setSelectedDistrict("");
                    const res = branches.filter((b) => b.city === city);
                    setFilteredBranches(res);
                    if (res.length > 0) setSelectedBranch(res[0]);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
                    selectedCity === city
                      ? "bg-rose-500 text-white shadow-rose-200"
                      : "bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-600 border border-slate-200"
                  }`}
                >
                  {city} ({count})
                </button>
              );
            })}
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:h-[720px]">
            {/* Left Col: Search & List */}
            <div className="w-full lg:w-1/3 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-[600px] lg:h-full">
              {/* Geolocation Button */}
              <div className="p-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                <button
                  onClick={handleFindNearest}
                  disabled={isLocating}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-white text-rose-600 font-extrabold text-sm shadow-md hover:bg-rose-50 hover:shadow-lg active:scale-95 transition-all"
                >
                  <Navigation
                    size={18}
                    className={`${isLocating ? "animate-spin text-rose-600" : "text-rose-600"}`}
                  />
                  <span>
                    {isLocating
                      ? "Đang định vị vị trí của bạn..."
                      : "Tìm Studio Gần Tôi Nhất (GPS)"}
                  </span>
                </button>
                {userCoords && (
                  <p className="text-[11px] text-rose-100 text-center mt-2 font-medium">
                    📍 Đã xác định vị trí của bạn & sắp xếp theo khoảng cách!
                  </p>
                )}
              </div>

              {/* Search Form */}
              <div className="bg-slate-50/70 p-4 border-b border-slate-100 text-left space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                    Tỉnh / Thành Phố
                  </label>
                  <CustomDropdown
                    value={selectedCity}
                    options={cities}
                    onChange={(val) => {
                      setSelectedCity(val);
                      setSelectedDistrict("");
                    }}
                    placeholder="Tất cả thành phố"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                    Quận / Huyện
                  </label>
                  <CustomDropdown
                    value={selectedDistrict}
                    options={districts}
                    onChange={setSelectedDistrict}
                    placeholder="Tất cả khu vực"
                    disabled={!selectedCity}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl hover:bg-rose-600 transition-all text-xs uppercase tracking-wider shadow-sm active:scale-95"
                >
                  Lọc Kết Quả
                </button>
              </div>

              {/* Results List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-slate-50/30 text-left">
                {filteredBranches.map((branch) => {
                  const isSelected = selectedBranch?.id === branch.id;
                  const distText = formatDistance(branch.distanceKm);

                  return (
                    <div
                      key={branch.id}
                      onClick={() => {
                        setSelectedBranch(branch);
                        setIsMapLoading(true);
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 relative ${
                        isSelected
                          ? "bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-200 ring-2 ring-rose-200"
                          : "bg-white border-slate-100 hover:border-rose-200 hover:shadow-md text-slate-800"
                      }`}
                    >
                      {/* Distance Badge */}
                      {distText && (
                        <div
                          className={`absolute top-3 right-3 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          }`}
                        >
                          <Navigation size={10} />
                          <span>{distText}</span>
                        </div>
                      )}

                      <h4
                        className={`font-black text-sm mb-1.5 pr-20 ${
                          isSelected ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {branch.name}
                      </h4>
                      <div className="flex items-start gap-2 mb-3">
                        <MapPin
                          size={14}
                          className={`mt-0.5 flex-shrink-0 ${
                            isSelected ? "text-rose-100" : "text-rose-500"
                          }`}
                        />
                        <p
                          className={`text-xs leading-relaxed ${
                            isSelected ? "text-rose-50" : "text-slate-500"
                          }`}
                        >
                          {branch.address || "Đang cập nhật địa chỉ"}
                        </p>
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100/30">
                        {branch.lat && branch.lng && (
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`flex-1 py-1.5 px-3 rounded-xl text-[11px] font-bold text-center flex items-center justify-center gap-1.5 transition-all ${
                              isSelected
                                ? "bg-white text-rose-600 hover:bg-rose-50"
                                : "bg-sky-50 text-sky-600 hover:bg-sky-100"
                            }`}
                          >
                            <ExternalLink size={12} /> Chỉ đường
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenBooking(branch);
                          }}
                          className={`flex-1 py-1.5 px-3 rounded-xl text-[11px] font-bold text-center flex items-center justify-center gap-1.5 transition-all ${
                            isSelected
                              ? "bg-rose-700 text-white hover:bg-rose-800"
                              : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                          }`}
                        >
                          <Sparkles size={12} /> Đặt lịch
                        </button>
                      </div>
                    </div>
                  );
                })}
                {filteredBranches.length === 0 && (
                  <div className="text-center py-12 text-slate-500 text-sm">
                    <MapPin size={32} className="mx-auto mb-3 opacity-20 text-rose-500" />
                    Không tìm thấy chi nhánh nào phù hợp.
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Map with Mode Toggle */}
            <div className="w-full lg:w-2/3 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden h-[550px] lg:h-full relative flex flex-col">
              {/* Map Mode Switcher Header */}
              <div className="absolute top-4 right-4 z-[450] bg-white/95 backdrop-blur-md rounded-2xl p-1.5 shadow-lg border border-slate-100 flex items-center gap-1 text-xs">
                <button
                  onClick={() => setMapMode("INTERACTIVE")}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                    mapMode === "INTERACTIVE"
                      ? "bg-rose-500 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Layers size={14} /> Bản đồ 35 Studio
                </button>
                <button
                  onClick={() => setMapMode("GOOGLE")}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                    mapMode === "GOOGLE"
                      ? "bg-rose-500 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <MapPin size={14} /> Google Maps Chi Tiết
                </button>
              </div>

              {/* View 1: Leaflet Multi-marker Map */}
              {mapMode === "INTERACTIVE" ? (
                <div className="w-full h-full relative">
                  <StudioInteractiveMap
                    branches={filteredBranches}
                    selectedBranch={selectedBranch}
                    onSelectBranch={(b) => setSelectedBranch(b)}
                    userCoords={userCoords}
                    onBooking={(b) => handleOpenBooking(b)}
                  />
                </div>
              ) : (
                /* View 2: Google Maps Street Level */
                <div className="w-full h-full relative">
                  {selectedBranch ? (
                    <>
                      {isMapLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10">
                          <div className="relative">
                            <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
                            <MapPin
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-500"
                              size={20}
                            />
                          </div>
                          <p className="mt-4 text-slate-500 font-medium animate-pulse text-sm">
                            Đang tải Google Maps...
                          </p>
                        </div>
                      )}
                      <iframe
                        width="100%"
                        height="100%"
                        id="gmap_canvas"
                        src={`https://maps.google.com/maps?q=${
                          selectedBranch.lat && selectedBranch.lng
                            ? `${selectedBranch.lat},${selectedBranch.lng}`
                            : encodeURIComponent(
                                selectedBranch.address
                                  ? selectedBranch.name + " " + selectedBranch.address
                                  : selectedBranch.city,
                              )
                        }&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        className={`w-full h-full transition-opacity duration-500 ${
                          isMapLoading ? "opacity-0" : "opacity-100"
                        }`}
                        title="Branch Map"
                        loading="lazy"
                        onLoad={() => setIsMapLoading(false)}
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-50">
                      <div className="text-center">
                        <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Chọn một chi nhánh để xem bản đồ</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <CustomerBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultBranchId={bookingBranchId}
      />

      <style>{`
         .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
         }
         .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 4px;
         }
         .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
         }
         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
         }
      `}</style>
    </div>
  );
};

export default AboutPage;
