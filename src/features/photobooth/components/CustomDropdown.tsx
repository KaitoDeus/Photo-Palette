import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface DropdownOption {
  value: string | number;
  label: string;
}

export interface CustomDropdownProps {
  value: string | number;
  options: DropdownOption[];
  onChange: (value: any) => void;
  disabled?: boolean;
  activeColorClass?: string;
  minWidth?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  options,
  onChange,
  disabled = false,
  activeColorClass = "text-pink-500 bg-pink-50",
  minWidth = "140px",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    <div
      className={`relative w-full`}
      style={{ minWidth: disabled ? undefined : minWidth }}
      ref={dropdownRef}
    >
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center justify-between bg-white border text-slate-700 rounded-xl px-4 py-2.5 transition-all font-semibold text-sm shadow-sm
          ${disabled ? "opacity-50 cursor-not-allowed border-slate-200" : "cursor-pointer hover:border-slate-300"}
          ${isOpen ? "ring-2 ring-pink-100 border-pink-300" : "border-slate-200"}
        `}
      >
        <span className="truncate mr-3 pointer-events-none">
          {selectedOption?.label}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-200 pointer-events-none ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 min-w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200 origin-top">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-4 py-2.5 text-sm font-semibold cursor-pointer transition-colors
                ${option.value === value ? activeColorClass : "text-slate-600 hover:bg-slate-50"}
              `}
            >
              <div className="whitespace-nowrap">{option.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
