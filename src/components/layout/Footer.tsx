import Logo from "./Logo";
import { Icon } from "@/components/icons";
import { socials } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-auto px-6 sm:px-10 xl:px-[171px] py-8">
      <div className="h-px w-full bg-gray/40" />

      <div className="flex flex-col justify-between gap-8 py-8 md:flex-row">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="text-body text-gray">elias@elias.me</span>
          </div>
          <p className="text-body text-gray">Web designer and front-end developer</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-body font-semibold text-white">Media</h3>
          <div className="flex gap-4 text-gray">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="hover:text-white"
              >
                <Icon name={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-body text-gray">
        © Copyright {new Date().getFullYear()}. Made by Elias.
      </p>
    </footer>
  );
}
