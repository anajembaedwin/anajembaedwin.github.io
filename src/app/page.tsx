import Hero from "@/components/sections/Hero";
import QuoteBlock from "@/components/sections/QuoteBlock";
import SectionHeading from "@/components/common/SectionHeading";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import SkillBlock from "@/components/sections/SkillBlock";
import AboutMe from "@/components/sections/AboutMe";
import { skills } from "@/lib/data";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <QuoteBlock
        quote="With great power comes great electricity bill"
        author="Dr. Who"
      />

      <section className="space-y-8 px-[171px] py-16">
        <SectionHeading label="projects" viewAllHref="/projects" />
        <ProjectsGrid limit={3} />
      </section>

      <section className="space-y-8 px-[171px] py-16">
        <SectionHeading label="skills" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillBlock key={skill.category} {...skill} />
          ))}
        </div>
      </section>

      <section className="space-y-8 px-[171px] py-16">
        <SectionHeading label="about-me" />
        <AboutMe />
      </section>
    </main>
  );
}
