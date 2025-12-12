"use client";

import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CptDropDown {
  value: string;
  onChange: (newValue: string) => void;
  options: Option[];
  closeOptions?: boolean; // optional
  labelText?: string; // RENAMED
}

export default function CustomSelect({
  value,
  onChange,
  options,
  closeOptions,
  labelText,
}: CptDropDown) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="flex flex-col gap-1 w-full mt-4">
      {labelText && (
        <label className="text-sm font-semibold text-gray-700">{labelText}</label>
      )}

      <div ref={ref} className="relative w-full">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className="
            w-full
            bg-white
            border border-gray-200
            rounded-xl
            px-4 py-3
            text-gray-800
            font-medium
            shadow-md
            flex justify-between items-center
            focus:outline-none
            focus:ring-2 focus:ring-indigo-300
            cursor-pointer
            transition
            duration-200
          "
        >
          {selectedOption?.label || "..."}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <ul className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto animate-fadeIn">
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  if (closeOptions) {
                    setOpen(false);
                  }
                }}
                className="px-4 py-3 cursor-pointer hover:bg-indigo-50 hover:text-indigo-700 transition flex items-center gap-2"
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
