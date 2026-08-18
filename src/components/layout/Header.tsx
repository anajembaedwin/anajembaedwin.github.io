"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_ITEMS = [
  { href: "/", label: "home" },
  { href: "/projects", label: "works" },
  { href: "/about", label: "about-me" },
  { href: "/contacts", label: "contacts" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between px-[171px] py-8">
      <Logo />

      <nav className="hidden items-center gap-8 md:flex">
        <ul className="flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-body ${isActive ? "text-white" : "text-gray hover:text-white"}`}
                >
                  <span className="text-primary">#</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <LanguageSwitcher />
      </nav>

      <button
        type="button"
        className="flex flex-col gap-1.5 md:hidden"
        aria-label="Open menu"
      >
        <span className="h-px w-6 bg-white" />
        <span className="h-px w-6 bg-white" />
      </button>
    </header>
  );
}
