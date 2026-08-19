import { Icon } from "@/components/icons";
import { socials } from "@/lib/data";

export default function SocialRail() {
  return (
    <div className="absolute top-24 left-6 hidden flex-col items-center gap-4 sm:left-10 xl:left-[42px] xl:flex">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={social.name}
          className="text-gray hover:text-white"
        >
          <Icon name={social.icon} />
        </a>
      ))}
      <div className="h-24 w-px bg-gray/40" />
    </div>
  );
}
