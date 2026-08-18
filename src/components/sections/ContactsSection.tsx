import { contact } from "@/lib/data";
import { Icon } from "@/components/icons";
import SupportCard from "./SupportCard";

export default function ContactsSection() {
  return (
    <div className="flex flex-col items-start gap-8 md:flex-row md:justify-between">
      <p className="max-w-md text-body text-gray">
        I&apos;m interested in freelance opportunities. However, if you have
        other request or question, don&apos;t hesitate to contact me
      </p>

      <div className="flex flex-col gap-6 sm:flex-row">
        <SupportCard />

        <div className="border border-gray/40 p-4">
          <h3 className="text-body font-semibold text-white">Message me here</h3>
          <div className="my-3 h-px bg-gray/40" />
          <div className="space-y-2 text-body text-gray">
            <div className="flex items-center gap-2">
              <Icon name="discord" className="shrink-0" />
              {contact.discord}
            </div>
            <div className="flex items-center gap-2">
              <Icon name="email" className="shrink-0" />
              {contact.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
