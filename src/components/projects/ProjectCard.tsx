import Image from "next/image";
import type { Project } from "@/lib/data";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col border border-gray/40">
      <div className="relative h-[201px] border-b border-gray/40 bg-gray/10">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-wrap gap-2 p-2 text-body text-gray">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-4 border-t border-gray/40 p-4">
        <h3 className="text-quote font-semibold text-white">{project.title}</h3>
        <p className="text-body text-gray">{project.description}</p>

        <div className="mt-auto flex gap-4">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={
                link.variant === "primary"
                  ? "border border-primary px-4 py-2 text-body text-white transition-colors hover:bg-primary/20"
                  : "border border-gray/40 px-4 py-2 text-body text-gray transition-colors hover:border-white hover:text-white"
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
