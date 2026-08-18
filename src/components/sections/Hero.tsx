import Link from "next/link";
import DecorativeDots from "@/components/decorative/DecorativeDots";
import OutlineSquares from "@/components/decorative/OutlineSquares";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-start gap-8 px-[171px] py-16 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl space-y-6">
        <h1 className="text-heading font-semibold text-white">
          Elias is a <span className="text-primary">web designer</span> and{" "}
          <span className="text-primary">front-end developer</span>
        </h1>

        <p className="text-body text-gray">
          He crafts responsive websites where technologies meet creativity
        </p>

        <Link
          href="/contacts"
          className="inline-block border border-primary px-6 py-3 text-body text-white transition-colors hover:bg-primary/20"
        >
          Contact me !!
        </Link>
      </div>

      <div className="relative">
        <OutlineSquares className="absolute -top-8 -left-8 h-24 w-24" />
        <div className="relative h-[300px] w-[300px] border border-gray/40 bg-gray/10" />
        <DecorativeDots className="absolute -right-8 bottom-8" cols={5} rows={5} />

        <div className="absolute -bottom-6 left-0 flex items-center gap-2 border border-gray/40 bg-bg px-4 py-2">
          <span className="size-2 bg-primary" />
          <span className="text-body text-gray">
            Currently working on <span className="font-semibold text-white">Portfolio</span>
          </span>
        </div>
      </div>
    </section>
  );
}
