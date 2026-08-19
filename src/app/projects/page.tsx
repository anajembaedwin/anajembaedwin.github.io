import type { Metadata } from "next";
import SectionHeading from "@/components/common/SectionHeading";
import ProjectsGrid from "@/components/projects/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects | Elias",
  description: "List of my projects",
};

export default function ProjectsPage() {
  return (
    <main className="flex-1 space-y-8 px-6 sm:px-10 xl:px-[171px] py-16">
      <div>
        <h1 className="text-heading font-semibold text-white">
          <span className="text-primary">/</span>projects
        </h1>
        <p className="text-body text-gray">List of my projects</p>
      </div>

      <section className="space-y-8">
        <SectionHeading label="complete-apps" />
        <ProjectsGrid category="complete-apps" />
      </section>

      <section className="space-y-8">
        <SectionHeading label="small-projects" />
        <ProjectsGrid category="small-projects" />
      </section>
    </main>
  );
}
