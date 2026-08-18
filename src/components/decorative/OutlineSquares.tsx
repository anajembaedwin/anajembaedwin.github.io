type OutlineSquaresProps = {
  className?: string;
};

export default function OutlineSquares({ className = "" }: OutlineSquaresProps) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className="absolute top-0 left-0 size-20 border border-primary" />
      <div className="absolute top-8 left-8 size-14 border border-white bg-bg" />
    </div>
  );
}
