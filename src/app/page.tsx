import Hero from "@/components/sections/Hero";
import QuoteBlock from "@/components/sections/QuoteBlock";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <QuoteBlock
        quote="With great power comes great electricity bill"
        author="Dr. Who"
      />
    </main>
  );
}
