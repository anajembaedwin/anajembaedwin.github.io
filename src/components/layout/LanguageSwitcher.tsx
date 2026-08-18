"use client";

import { useState } from "react";

const LANGUAGES = ["RU", "UA"];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-body text-white"
        aria-expanded={open}
      >
        EN
        <span className={open ? "rotate-180" : ""}>⌄</span>
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 border border-gray bg-bg py-1">
          {LANGUAGES.map((lang) => (
            <li key={lang}>
              <button
                type="button"
                className="block w-full px-4 py-1 text-left text-body text-gray hover:text-white"
              >
                {lang}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
