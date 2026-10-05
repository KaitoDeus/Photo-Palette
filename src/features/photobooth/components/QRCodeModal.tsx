import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import {
  X,
  QrCode,
  Copy,
  Check,
  Download,
  Video,
  Sparkles,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import Button from "../../../components/common/Button";
import { Frame } from "../types";
import { exportFinalImage } from "../utils/imageExport";
import { api } from "../../../services/api";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  frame: Frame;
  photos: string[];
  recapVideoUrl?: string | null;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  frame,
  photos,
  recapVideoUrl,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [shareUrl, setShareUrl] = useState<string>("");
  const [shareId, setShareId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [exportedImage, setExportedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsLoading(true);

    const generateShareSession = async () => {
      try {
        // 1. Export the final photostrip high-resolution image
        const photoData = await exportFinalImage(frame, photos);
        if (!isMounted) return;
        setExportedImage(photoData);

        // 2. Prepare video data (if available as blob url, convert to base64 or pass)
        let videoData: string | null = null;
        if (recapVideoUrl) {
          try {
            const blobRes = await fetch(recapVideoUrl);
            const blob = await blobRes.blob();
            // Read as data URL if under 20MB
            if (blob.size < 20 * 1024 * 1024) {
              videoData = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(blob);
              });
            }
          } catch (e) {
            console.warn("Could not convert recap video to base64:", e);
          }
        }

        // 3. Send to backend share API
        let sid = "pp_" + Date.now().toString(36);
        try {
          const res = await api.shares.create({
            photoData,
            videoData,
            frameName: frame.name,
            layout: frame.layout,
          });
          if (res.success && res.data?.shareId) {
            sid = res.data.shareId;
          }
        } catch (e) {
          console.warn("Backend share API offline, using local session ID:", e);
        }

        // Save in localStorage as fallback
        try {
          localStorage.setItem(
            `pp_share_${sid}`,
            JSON.stringify({
              id: sid,
              photoData,
              videoData,
              frameName: frame.name,
              layout: frame.layout,
              createdAt: new Date().toISOString(),
            }),
          );
        } catch {
          // Ignore quota error
        }

        if (!isMounted) return;
        setShareId(sid);

        // 4. Build absolute shareable URL (detect LAN IP or hostname for phone access)
        const host = window.location.host;
        const protocol = window.location.protocol;
        const fullShareUrl = `${protocol}//${host}/share/${sid}`;
        setShareUrl(fullShareUrl);

        // 5. Render sharp QR code as Data URL
        const dataUrl = await QRCode.toDataURL(fullShareUrl, {
          width: 280,
          margin: 2,
          color: {
            dark: "#E11D48", // Brand Rose 600
            light: "#FFFFFF",
          },
          errorCorrectionLevel: "H",
        });

        if (!isMounted) return;
        setQrDataUrl(dataUrl);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to generate share QR code:", err);
        setIsLoading(false);
      }
    };

    generateShareSession();

    return () => {
      isMounted = false;
    };
  }, [isOpen, frame, photos, recapVideoUrl]);

  const handleCopyLink = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadImage = () => {
    if (!exportedImage) return;
    const link = document.createElement("a");
    link.href = exportedImage;
    link.download = `photo-palette-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadVideo = () => {
    if (!recapVideoUrl) return;
    const link = document.createElement("a");
    link.href = recapVideoUrl;
    link.download = `photo-palette-recap-${Date.now()}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-rose-100 flex flex-col items-center text-center animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Background decorative glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-rose-200 rounded-full blur-3xl opacity-50 -z-0 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-pink-200 rounded-full blur-3xl opacity-50 -z-0 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-all duration-200"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-[11px] font-black uppercase tracking-wider mb-2">
            <Sparkles size={13} className="text-rose-500 animate-spin" /> Quét QR Nhận Ảnh & Video
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Lưu Kỷ Niệm Về Điện Thoại
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Mở Camera điện thoại quét mã bên dưới để tải cả ảnh in và video recap nhé!
          </p>
        </div>

        {/* QR Code Container */}
        <div className="relative bg-gradient-to-b from-rose-50 to-pink-50 p-4 rounded-3xl border border-rose-100 shadow-inner flex flex-col items-center justify-center my-2 min-h-[290px] w-full">
          {isLoading || !qrDataUrl ? (
            <div className="w-[240px] h-[240px] flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
              <p className="text-xs font-bold text-slate-600 animate-pulse">
                Đang tạo mã QR bảo mật...
              </p>
            </div>
          ) : (
            <>
              <div className="bg-white p-3 rounded-2xl shadow-md border border-slate-100 flex items-center justify-center">
                <img
                  src={qrDataUrl}
                  alt="Mã QR tải ảnh Photo Palette"
                  className="w-[210px] h-[210px] block rounded-lg select-none"
                />
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold mt-3">
                <Smartphone size={14} className="text-rose-500" />
                <span>Hỗ trợ mọi dòng iPhone & Android</span>
              </div>
            </>
          )}
        </div>

        {/* Security / Expiration note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 my-2">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Mã bảo mật riêng tư, tự động xóa sau 24 giờ</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 w-full mt-2">
          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            disabled={isLoading || !shareUrl}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-rose-300 bg-slate-50 hover:bg-rose-50/50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check size={16} className="text-emerald-600" />
                <span className="text-emerald-600">Đã sao chép liên kết!</span>
              </>
            ) : (
              <>
                <Copy size={16} className="text-slate-500" />
                <span>Sao chép link tải ảnh</span>
              </>
            )}
          </button>

          {/* Open Link Directly */}
          {shareUrl && (
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all hover:bg-slate-800 shadow-sm active:scale-95"
            >
              <ExternalLink size={15} />
              <span>Mở trang tải ảnh trên trình duyệt</span>
            </a>
          )}

          {/* Direct Downloads (for Desktop) */}
          <div className="grid grid-cols-2 gap-2 mt-1 pt-2 border-t border-slate-100">
            <button
              onClick={handleDownloadImage}
              disabled={!exportedImage}
              className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <Download size={14} /> Tải Ảnh (JPG)
            </button>
            <button
              onClick={handleDownloadVideo}
              disabled={!recapVideoUrl}
              className={`py-2 px-3 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                recapVideoUrl
                  ? "bg-purple-50 hover:bg-purple-100 text-purple-600"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Video size={14} /> Tải Video (WebM)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
