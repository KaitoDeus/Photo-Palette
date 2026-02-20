import React from "react";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "glass";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  withIcon?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  withIcon = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-bold transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";

  const variants = {
    primary:
      "bg-brand-500 hover:bg-brand-600 text-white shadow-[0_10px_20px_-5px_rgba(244,114,120,0.3)] hover:shadow-[0_15px_25px_-5px_rgba(244,114,120,0.4)] hover:-translate-y-0.5 focus:ring-brand-400 border border-transparent",
    secondary:
      "bg-white hover:bg-slate-50 text-slate-800 shadow-md border border-slate-100 hover:border-brand-200 focus:ring-brand-200 hover:-translate-y-0.5",
    outline:
      "bg-transparent border-2 border-brand-500 text-brand-600 hover:bg-brand-50 focus:ring-brand-500",
    glass:
      "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 focus:ring-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3.5 text-sm",
    lg: "px-10 py-5 text-lg",
  };

  const widthStyles = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyles} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center">
        {children}
        {withIcon && (
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        )}
      </span>
    </button>
  );
};

export default Button;
