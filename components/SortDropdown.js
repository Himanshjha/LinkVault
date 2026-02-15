"use client";

import { useEffect, useRef, useState } from "react";

export default function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { key: "latest", label: "Latest First" },
    { key: "oldest", label: "Oldest First" },
    { key: "az", label: "A-Z (Title)" },
  ];

  const active = options.find((o) => o.key === value) || options[0];

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-[220px]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:border-white/20 transition"
      >
        <span className="text-sm font-semibold">{active.label}</span>

        <span className={`transition ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>

      {open && (
        <div className="absolute mt-2 w-full glass border border-white/10 rounded-xl overflow-hidden shadow-xl z-50">
          {options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                onChange(opt.key);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition 
                ${
                  value === opt.key
                    ? "bg-blue-500/20 text-blue-200"
                    : "hover:bg-white/5 text-white/80"
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
