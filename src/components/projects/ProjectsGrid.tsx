import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid({ limit }: { limit?: number }) {
  const items = limit
    ? projects.filter((p) => p.featured).slice(0, limit)
    : projects;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
