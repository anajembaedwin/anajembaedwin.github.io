import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-body font-bold text-white">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="0" y="0" width="7" height="7" fill="currentColor" />
        <rect x="9" y="0" width="7" height="7" stroke="currentColor" />
        <rect x="0" y="9" width="7" height="7" stroke="currentColor" />
        <rect x="9" y="9" width="7" height="7" fill="currentColor" />
      </svg>
      Elias
    </Link>
  );
}
