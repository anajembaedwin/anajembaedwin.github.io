type DecorativeDotsProps = {
  rows?: number;
  cols?: number;
  className?: string;
};

export default function DecorativeDots({
  rows = 5,
  cols = 5,
  className = "",
}: DecorativeDotsProps) {
  return (
    <div
      className={`grid gap-4 ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 4px)` }}
      aria-hidden="true"
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span key={i} className="size-1 rounded-full bg-gray" />
      ))}
    </div>
  );
}
