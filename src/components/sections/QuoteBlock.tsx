import OutlineSquares from "@/components/decorative/OutlineSquares";

type QuoteBlockProps = {
  quote: string;
  author: string;
};

export default function QuoteBlock({ quote, author }: QuoteBlockProps) {
  return (
    <section className="relative px-6 sm:px-10 xl:px-[171px] py-16">
      <div className="relative max-w-2xl border border-gray/40 px-10 py-8">
        <span className="absolute -top-5 left-6 bg-bg px-2 text-heading text-gray">“</span>

        <p className="text-quote text-white">{quote}</p>

        <div className="relative mt-6 ml-auto w-fit border border-gray/40 py-2 pr-8 pl-4">
          <span className="absolute top-1/2 right-2 -translate-y-1/2 text-heading text-gray">”</span>
          <span className="text-body text-gray">- {author}</span>
        </div>
      </div>

      <OutlineSquares className="absolute top-1/2 right-6 hidden h-16 w-16 -translate-y-1/2 sm:right-10 xl:right-20 lg:block" />
    </section>
  );
}
