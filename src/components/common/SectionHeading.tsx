import Link from "next/link";

type SectionHeadingProps = {
  label: string;
  viewAllHref?: string;
};

export default function SectionHeading({ label, viewAllHref }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-heading font-semibold whitespace-nowrap">
        <span className="text-primary">#</span>
        <span className="text-white">{label}</span>
      </h2>
      <div className="h-px grow bg-primary" />
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="whitespace-nowrap text-body text-white hover:text-primary"
        >
          View all ⟶
        </Link>
      )}
    </div>
  );
}
