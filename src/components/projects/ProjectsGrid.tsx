import { projects, type Project } from "@/lib/data";
import ProjectCard from "./ProjectCard";

type ProjectsGridProps = {
  limit?: number;
  category?: Project["category"];
};

export default function ProjectsGrid({ limit, category }: ProjectsGridProps) {
  let items = category ? projects.filter((p) => p.category === category) : projects;
  if (limit) items = items.filter((p) => p.featured).slice(0, limit);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
