"use client";

import React, { useState } from "react";

interface CptTextField {
  label: string;
  value: string;
  onChange: (value: string) => void;
  invalidMessage?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  type?: string; // NEW
}

export default function ValidatedInputWithLabel({
  label,
  value,
  onChange,
  invalidMessage = "Ce champ est obligatoire.",
  className = "input-custom",
  placeholder = "",
  required = false,
  type = "text", // NEW DEFAULT
}: CptTextField) {
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col gap-1 w-full mt-4">
      <label className="text-sm font-semibold text-gray-700">
        {label}
        <input
          type={type}
          value={value}
          required={required}
          placeholder={placeholder}
          className={`${className} ${error ? "border-red-500" : ""}`}
          onInvalid={(e) => {
            if (required) {
              (e.target as HTMLInputElement).setCustomValidity(invalidMessage);
              setError(invalidMessage);
            }
          }}
          onInput={(e) => {
            (e.target as HTMLInputElement).setCustomValidity("");
            setError("");
          }}
          onChange={(e) => {
            setError("");
            onChange(e.target.value);
          }}
        />
      </label>
    </div>
  );
}
