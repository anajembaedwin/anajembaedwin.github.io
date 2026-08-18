import { contact } from "@/lib/data";
import { Icon } from "@/components/icons";

export default function SupportCard() {
  return (
    <div className="border border-gray/40 p-4">
      <h3 className="text-body font-semibold text-white">{contact.support.label}</h3>
      <div className="my-3 h-px bg-gray/40" />
      <div className="flex items-center gap-2 text-body text-gray">
        <Icon name="bitcoin" className="shrink-0" />
        {contact.support.address}
      </div>
    </div>
  );
}
