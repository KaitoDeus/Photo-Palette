import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ShieldCheck, Lock, User, ArrowRight, ArrowLeft, KeyRound, Sparkles } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || "/admin/dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const success = login(password, username || "admin");
      setIsLoading(false);
      if (success) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError("Mật khẩu không chính xác! Hãy thử 'admin', 'admin123' hoặc bấm nút đăng nhập nhanh bên dưới.");
      }
    }, 400);
  };

  const handleQuickLogin = () => {
    setUsername("admin");
    setPassword("admin123");
    setIsLoading(true);
    setTimeout(() => {
      login("admin123", "admin");
      setIsLoading(false);
      navigate("/admin/dashboard", { replace: true });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-brand-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top back link */}
      <div className="w-full max-w-md mb-6 flex items-center z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Quay lại trang chủ
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 relative z-10 border border-slate-100 animate-in fade-in zoom-in-95 duration-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto overflow-hidden shadow-md mb-4 border-2 border-brand-200">
            <img
              src="/logo.jpeg"
              alt="Photo Palette Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Hệ Thống Quản Lý
          </h2>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-2xl animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Tài Khoản
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên tài khoản"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Mật Khẩu
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-slate-50/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <span className="inline-block animate-spin">⏳</span>
            ) : (
              <>
                <span>Đăng Nhập Quản Trị</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 mb-3">
            Tài khoản mẫu để trải nghiệm nhanh:
          </p>
          <button
            type="button"
            onClick={handleQuickLogin}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
          >
            <KeyRound size={16} className="text-brand-500" />
            <span>Bấm vào đây để Đăng Nhập 1-Click (admin / admin123)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
