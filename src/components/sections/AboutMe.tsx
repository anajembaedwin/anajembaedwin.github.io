import Image from "next/image";
import Link from "next/link";

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

      <Image
        src="/about-portrait.png"
        alt="Elias"
        width={343}
        height={507}
        className="w-[343px] max-w-full"
      />
    </div>
  );
}
