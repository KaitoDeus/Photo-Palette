import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Download,
  Video,
  Sparkles,
  Share2,
  Check,
  Camera,
  MapPin,
  Heart,
  Info,
  Clock,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { api } from "../services/api";

interface ShareData {
  id: string;
  photoData: string;
  videoData?: string | null;
  frameName?: string;
  layout?: string;
  createdAt: string;
}

const SharePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ShareData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Detect iOS
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIOS(isIOSDevice);

    if (!id) {
      setError("Không tìm thấy mã chia sẻ.");
      setIsLoading(false);
      return;
    }

    const loadShareData = async () => {
      try {
        // Try backend API first
        const res = await api.shares.get(id);
        if (res.success && res.data) {
          setData(res.data);
          setIsLoading(false);
          return;
        }

        // Try local storage fallback
        const local = localStorage.getItem(`pp_share_${id}`);
        if (local) {
          setData(JSON.parse(local));
          setIsLoading(false);
          return;
        }

        setError(res.message || "Ảnh hoặc video đã hết hạn sau 24h.");
      } catch (err) {
        // Try local storage
        const local = localStorage.getItem(`pp_share_${id}`);
        if (local) {
          setData(JSON.parse(local));
        } else {
          setError("Không thể tải ảnh. Vui lòng kiểm tra kết nối mạng.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadShareData();
  }, [id]);

  const handleDownloadImage = () => {
    if (!data?.photoData) return;
    const link = document.createElement("a");
    link.href = data.photoData;
    link.download = `photo-palette-${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadVideo = () => {
    if (!data?.videoData) return;
    const link = document.createElement("a");
    link.href = data.videoData;
    link.download = `photo-palette-recap-${id}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-rose-50/40 flex flex-col items-center justify-center p-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-500" size={24} />
        </div>
        <p className="mt-4 text-slate-600 font-bold text-sm animate-pulse">
          Đang tải kỷ niệm của bạn...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-rose-50/40 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-4 shadow-inner">
          <Clock size={36} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Ảnh Đã Hết Hạn</h2>
        <p className="text-slate-600 max-w-sm mb-6 text-sm">
          {error || "Liên kết này đã quá hạn 24 giờ để đảm bảo quyền riêng tư người dùng."}
        </p>
        <Link
          to="/"
          className="py-3 px-6 rounded-full bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all"
        >
          Về Trang Chủ Photo Palette
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/60 via-white to-pink-50/40 py-8 px-4 flex flex-col items-center">
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Brand Header */}
        <div className="mb-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles size={14} className="text-rose-500" /> Photo Palette Studio
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Kỷ Niệm Của Bạn Đã Sẵn Sàng!
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Khung ảnh: <span className="font-bold text-rose-500">{data.frameName}</span>
          </p>
        </div>

        {/* iOS Save Instruction Banner */}
        {isIOS && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs text-left w-full mb-4 shadow-sm">
            <Info size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Mẹo iPhone / iPad:</strong> Nhấn giữ vào ảnh bên dưới rồi chọn <strong>"Lưu vào Ảnh"</strong> (Save to Photos) để lưu trực tiếp vào Camera Roll nhé!
            </p>
          </div>
        )}

        {/* Photostrip Image Card */}
        <div className="w-full bg-white p-3 sm:p-4 rounded-[32px] shadow-[0_20px_50px_rgba(244,63,94,0.12)] border border-rose-100 mb-6 flex flex-col items-center">
          <div className="relative overflow-hidden rounded-2xl w-full max-w-[340px] shadow-sm">
            <img
              src={data.photoData}
              alt="Photo Palette Strip"
              className="w-full h-auto object-contain mx-auto select-none"
            />
          </div>

          {/* Quick Action Button for Image */}
          <div className="w-full mt-4 flex gap-2">
            <button
              onClick={handleDownloadImage}
              className="flex-1 py-3 px-4 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-rose-200 flex items-center justify-center gap-2 transition-all"
            >
              <Download size={18} /> Lưu Ảnh Về Máy
            </button>
            <button
              onClick={handleCopyLink}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl flex items-center justify-center gap-1.5 transition-all"
              title="Sao chép link"
            >
              {copied ? <Check size={18} className="text-emerald-600" /> : <Share2 size={18} />}
            </button>
          </div>
        </div>

        {/* Video Recap / Timelapse Section (if available) */}
        {data.videoData && (
          <div className="w-full bg-white p-4 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 mb-6 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-full bg-purple-100 text-purple-600">
                <Video size={16} />
              </span>
              <h3 className="font-extrabold text-base text-slate-900">
                Video Recap / Boomerang Hậu Trường
              </h3>
            </div>

            <div className="relative rounded-2xl overflow-hidden w-full max-w-[320px] aspect-[3/4] bg-black shadow-inner">
              <video
                src={data.videoData}
                controls
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            <button
              onClick={handleDownloadVideo}
              className="w-full mt-3 py-3 px-4 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-purple-200 flex items-center justify-center gap-2 transition-all"
            >
              <Download size={18} /> Lưu Video Kỷ Niệm
            </button>
          </div>
        )}

        {/* Next Steps CTA */}
        <div className="w-full space-y-3 mt-2">
          <Link
            to="/photobooth"
            className="w-full py-3.5 px-4 rounded-2xl bg-white border border-rose-200 hover:border-rose-300 text-rose-600 font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all"
          >
            <Camera size={18} /> Chụp Thêm Khung Khác
          </Link>

          <Link
            to="/about#locator"
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all"
          >
            <MapPin size={18} /> Ghé Thăm 35 Studio Toàn Quốc <ArrowRight size={16} />
          </Link>
        </div>

        {/* Footer info */}
        <p className="text-[11px] text-slate-400 mt-8">
          Photo Palette Photobooth Studio Vietnam &bull; Tự động xóa sau 24h
        </p>
      </div>
    </div>
  );
};

export default SharePage;
