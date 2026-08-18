"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "home" },
  { href: "/projects", label: "works" },
  { href: "/about", label: "about-me" },
  { href: "/contacts", label: "contacts" },
];

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="relative z-50 flex h-6 w-6 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-px w-6 bg-white transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
        />
        <span
          className={`h-px w-6 bg-white transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <nav className="fixed inset-0 z-40 flex flex-col items-start gap-8 bg-bg px-8 pt-24">
          <ul className="flex flex-col gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-heading ${isActive ? "text-white" : "text-gray"}`}
                  >
                    <span className="text-primary">#</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
