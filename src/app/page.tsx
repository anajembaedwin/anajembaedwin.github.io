import Hero from "@/components/sections/Hero";
import QuoteBlock from "@/components/sections/QuoteBlock";
import SectionHeading from "@/components/common/SectionHeading";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import SkillBlock from "@/components/sections/SkillBlock";
import AboutMe from "@/components/sections/AboutMe";
import ContactsSection from "@/components/sections/ContactsSection";
import SocialRail from "@/components/sections/SocialRail";
import DecorativeDots from "@/components/decorative/DecorativeDots";
import OutlineSquares from "@/components/decorative/OutlineSquares";
import { skills } from "@/lib/data";

export default function Home() {
  return (
    <main className="relative flex-1">
      <SocialRail />
      <Hero />
      <QuoteBlock
        quote="With great power comes great electricity bill"
        author="Dr. Who"
      />

      <section className="space-y-8 px-6 sm:px-10 xl:px-[171px] py-16">
        <SectionHeading label="projects" viewAllHref="/projects" />
        <ProjectsGrid limit={3} />
      </section>

      <section className="relative space-y-8 px-6 sm:px-10 xl:px-[171px] py-16">
        <SectionHeading label="skills" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillBlock key={skill.category} {...skill} />
          ))}
        </div>

        <div className="absolute -bottom-4 left-6 hidden h-24 w-24 sm:left-10 xl:left-[60px] lg:block">
          <DecorativeDots className="absolute top-0 left-0" cols={5} rows={5} />
          <OutlineSquares className="absolute right-0 bottom-0 h-16 w-16" />
        </div>
      </section>

      <section className="space-y-8 px-6 sm:px-10 xl:px-[171px] py-16">
        <SectionHeading label="about-me" />
        <AboutMe />
      </section>

      <section className="space-y-8 px-6 sm:px-10 xl:px-[171px] py-16">
        <SectionHeading label="contacts" />
        <ContactsSection />
      </section>
    </main>
  );
}
