import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-start gap-8 px-6 sm:px-10 xl:px-[171px] py-16 md:flex-row md:items-start md:justify-between">
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

      <Image
        src="/hero-portrait.png"
        alt="Elias"
        width={485}
        height={423}
        className="w-full max-w-[485px]"
        priority
      />
    </section>
  );
}
