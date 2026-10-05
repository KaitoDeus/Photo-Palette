import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Branch } from "../../data/branches";
import { Navigation, Calendar, ExternalLink } from "lucide-react";

interface StudioInteractiveMapProps {
  branches: Branch[];
  selectedBranch: Branch | null;
  onSelectBranch: (branch: Branch) => void;
  userCoords: { lat: number; lng: number } | null;
  onBooking?: (branch: Branch) => void;
}

export const StudioInteractiveMap: React.FC<StudioInteractiveMapProps> = ({
  branches,
  selectedBranch,
  onSelectBranch,
  userCoords,
  onBooking,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<number, L.Marker>>(new Map());
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Default center in Vietnam (between HN and HCMC)
    const defaultLat = selectedBranch?.lat || 21.0285;
    const defaultLng = selectedBranch?.lng || 105.8542;

    const map = L.map(mapContainerRef.current, {
      center: [defaultLat, defaultLng],
      zoom: selectedBranch ? 15 : 12,
      zoomControl: false,
    });

    // Add CartoDB Positron / OSM clean tiles
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      },
    ).addTo(map);

    // Zoom control at bottom right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing branch markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    // Custom Icon Creator
    const createMarkerIcon = (isSelected: boolean) => {
      return L.divIcon({
        className: "custom-studio-marker",
        html: `
          <div style="
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: ${isSelected ? "40px" : "32px"};
            height: ${isSelected ? "40px" : "32px"};
            background: ${isSelected ? "#F43F5E" : "#FFF"};
            border: 3px solid ${isSelected ? "#FFF" : "#F43F5E"};
            border-radius: 50%;
            box-shadow: 0 4px 14px rgba(244, 63, 94, ${isSelected ? "0.6" : "0.3"});
            transform: translate(-50%, -50%);
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            cursor: pointer;
          ">
            <span style="
              font-size: ${isSelected ? "18px" : "14px"};
              line-height: 1;
              color: ${isSelected ? "#FFF" : "#F43F5E"};
            ">🌸</span>
            ${
              isSelected
                ? `<div style="
                    position: absolute;
                    width: 52px;
                    height: 52px;
                    border: 2px solid #F43F5E;
                    border-radius: 50%;
                    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                    opacity: 0.6;
                  "></div>`
                : ""
            }
          </div>
        `,
        iconSize: [0, 0],
      });
    };

    // Add branch markers
    branches.forEach((b) => {
      if (!b.lat || !b.lng) return;

      const isSelected = selectedBranch?.id === b.id;
      const marker = L.marker([b.lat, b.lng], {
        icon: createMarkerIcon(isSelected),
        zIndexOffset: isSelected ? 1000 : 100,
      }).addTo(map);

      // Popup Content
      const popupHtml = document.createElement("div");
      popupHtml.className = "p-1 font-sans text-slate-800 text-left min-w-[220px]";
      popupHtml.innerHTML = `
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="font-size: 16px;">🌸</span>
          <h4 style="margin: 0; font-weight: 800; font-size: 14px; color: #E11D48; line-height: 1.2;">
            ${b.name}
          </h4>
        </div>
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #64748B; line-height: 1.3;">
          ${b.address}
        </p>
        <div style="font-size: 11px; font-weight: 600; color: #0EA5E9; margin-bottom: 8px;">
          📍 ${b.area}, ${b.city}
        </div>
        <div style="display: flex; gap: 6px;">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              flex: 1;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 4px;
              padding: 6px 10px;
              background: #0284C7;
              color: white;
              font-size: 11px;
              font-weight: 700;
              border-radius: 9999px;
              text-decoration: none;
            "
          >
            Chỉ đường ↗
          </a>
          <button
            id="book-btn-${b.id}"
            style="
              flex: 1;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 4px;
              padding: 6px 10px;
              background: #F43F5E;
              color: white;
              font-size: 11px;
              font-weight: 700;
              border-radius: 9999px;
              border: none;
              cursor: pointer;
            "
          >
            Đặt lịch ✨
          </button>
        </div>
      `;

      // Handle booking click from popup
      const bookBtn = popupHtml.querySelector(`#book-btn-${b.id}`);
      if (bookBtn) {
        bookBtn.addEventListener("click", () => {
          if (onBooking) onBooking(b);
        });
      }

      marker.bindPopup(popupHtml, {
        closeButton: true,
        className: "custom-leaflet-popup",
        offset: [0, -10],
      });

      marker.on("click", () => {
        onSelectBranch(b);
      });

      markersRef.current.set(b.id, marker);
    });

    // Fly to selected branch or fit bounds
    if (selectedBranch && selectedBranch.lat && selectedBranch.lng) {
      map.flyTo([selectedBranch.lat, selectedBranch.lng], 16, {
        duration: 1.2,
      });
      const selectedMarker = markersRef.current.get(selectedBranch.id);
      if (selectedMarker) {
        selectedMarker.openPopup();
      }
    } else if (branches.length > 0) {
      // Fit all markers
      const validCoords = branches
        .filter((b) => b.lat && b.lng)
        .map((b) => [b.lat!, b.lng!] as [number, number]);
      if (validCoords.length > 0) {
        const bounds = L.latLngBounds(validCoords);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      }
    }
  }, [branches, selectedBranch, onSelectBranch, onBooking]);

  // Update User Location Marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    if (userCoords) {
      const userIcon = L.divIcon({
        className: "custom-user-marker",
        html: `
          <div style="
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            background: #2563EB;
            border: 3px solid #FFF;
            border-radius: 50%;
            box-shadow: 0 0 16px rgba(37, 99, 235, 0.7);
            transform: translate(-50%, -50%);
          ">
            <div style="
              position: absolute;
              width: 48px;
              height: 48px;
              border: 2px solid #3B82F6;
              border-radius: 50%;
              animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
              opacity: 0.7;
            "></div>
          </div>
        `,
        iconSize: [0, 0],
      });

      const userMarker = L.marker([userCoords.lat, userCoords.lng], {
        icon: userIcon,
        zIndexOffset: 2000,
      }).addTo(map);

      userMarker.bindPopup(
        `<div style="font-weight: 700; color: #2563EB; font-size: 13px; text-align: center;">📍 Vị trí hiện tại của bạn</div>`,
      );

      userMarkerRef.current = userMarker;
    }
  }, [userCoords]);

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-inner">
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Info Pill on Bottom Left */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2.5 text-xs text-slate-700 pointer-events-none">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
        <span className="font-semibold text-rose-600">Photo Palette</span>
        <span className="text-slate-400">|</span>
        <span className="font-medium">{branches.length} Studio toàn quốc</span>
      </div>
    </div>
  );
};
