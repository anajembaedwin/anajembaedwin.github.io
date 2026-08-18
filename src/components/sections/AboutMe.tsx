import Link from "next/link";
import DecorativeDots from "@/components/decorative/DecorativeDots";

export default function AboutMe() {
  return (
    <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl space-y-4">
        <p className="text-body text-gray">Hello, i&apos;m Elias!</p>

        <p className="text-body text-gray">
          I&apos;m a self-taught front-end developer based in Kyiv, Ukraine. I
          can develop responsive websites from scratch and raise them into
          modern user-friendly web experiences.
        </p>

        <p className="text-body text-gray">
          Transforming my creativity and knowledge into a websites has been my
          passion for over a year. I have been helping various clients to
          establish their presence online. I always strive to learn about the
          newest technologies and frameworks.
        </p>

        <Link
          href="/about"
          className="inline-flex items-center gap-2 border border-white px-6 py-3 text-body text-white transition-colors hover:bg-white/10"
        >
          Read more <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="relative">
        <div className="relative h-[507px] w-[339px] max-w-full border border-gray/40 bg-gray/10" />
        <DecorativeDots className="absolute -top-8 -right-10" cols={5} rows={5} />
        <DecorativeDots className="absolute -bottom-8 -left-10" cols={5} rows={5} />
      </div>
    </div>
  );
}
