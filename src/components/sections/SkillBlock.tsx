import type { SkillCategory } from "@/lib/data";

export default function SkillBlock({ category, items }: SkillCategory) {
  return (
    <div className="border border-gray/40 p-4">
      <h3 className="text-body font-semibold text-white">{category}</h3>
      <div className="my-3 h-px bg-gray/40" />
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-body text-gray">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
