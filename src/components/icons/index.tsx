import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function GithubIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.6 2.8 5.5 3.1 5.5 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.1 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

export function DribbbleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9c4.8 1.5 10 1.6 15.8.2M4.5 16.5C8 12 13 8.5 20 7.5M9 3.2c3 4.2 4.5 9.3 4.5 14.8" />
    </svg>
  );
}

export function FigmaIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 2h4a3 3 0 0 1 0 6H9zM9 8h4a3 3 0 0 1 0 6H9zM9 14h4a3 3 0 1 1-4 3v-3z" />
      <path d="M9 2a3 3 0 0 0 0 6 3 3 0 0 0 0-6z" />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M22 5.9c-.7.3-1.5.6-2.3.7a4 4 0 0 0 1.7-2.2c-.8.5-1.6.8-2.6 1a4 4 0 0 0-6.9 3.6A11.4 11.4 0 0 1 3.5 4.6a4 4 0 0 0 1.2 5.3c-.7 0-1.3-.2-1.9-.5v.1a4 4 0 0 0 3.2 3.9c-.6.2-1.2.2-1.8.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.5a11.3 11.3 0 0 0 6.1 1.8c7.3 0 11.3-6.1 11.3-11.3v-.5c.8-.6 1.4-1.3 1.9-2.1z" />
    </svg>
  );
}

export function DiscordIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8.5 4.5A15.4 15.4 0 0 1 12 4c1.2 0 2.4.2 3.5.5.8.6 1.6 1.4 2.2 2.3.9 1.7 1.4 3.7 1.5 6.8a10.6 10.6 0 0 1-3.2 1.6l-.7-1.2c.4-.2.8-.3 1.1-.5-.3-.2-.6-.4-.8-.6a11.5 11.5 0 0 1-8.2 0c-.2.2-.5.4-.8.6.3.2.7.3 1.1.5l-.7 1.2a10.6 10.6 0 0 1-3.2-1.6c.1-3.1.6-5.1 1.5-6.8.6-.9 1.4-1.7 2.2-2.3z" />
      <circle cx="9" cy="12.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function EmailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m4 6.5 8 6 8-6" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M7 10v6M7 7v.01M11 16v-4c0-1.1.9-2 2-2s2 .9 2 2v4M11 12v4" />
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m21 4-3 16-6.5-4.5L9 18l-.5-5L20 5z" />
      <path d="m9 13 3-4" />
    </svg>
  );
}

export function LandmarkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 21h16M5 21V9M9 21V9M15 21V9M19 21V9M2 9l10-6 10 6" />
    </svg>
  );
}

export function CardIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

export function BitcoinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 5h6a3 3 0 0 1 0 6H7zM7 11h7a3 3 0 0 1 0 6H7zM9 3v18M13 3v2M13 19v2" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M7 4.5v15l13-7.5z" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4.5" width="18" height="16" rx="1.5" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
    </svg>
  );
}

const icons = {
  github: GithubIcon,
  dribbble: DribbbleIcon,
  figma: FigmaIcon,
  twitter: TwitterIcon,
  discord: DiscordIcon,
  email: EmailIcon,
  linkedin: LinkedinIcon,
  telegram: TelegramIcon,
  landmark: LandmarkIcon,
  card: CardIcon,
  bitcoin: BitcoinIcon,
  play: PlayIcon,
  calendar: CalendarIcon,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: IconName } & IconProps) {
  const Component = icons[name];
  return <Component {...props} />;
}
