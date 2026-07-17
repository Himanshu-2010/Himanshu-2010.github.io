import Hero from './Hero';
import AboutChapter from './chapters/AboutChapter';
import ProjectsChapter from './chapters/ProjectsChapter';
import SkillsChapter from './chapters/SkillsChapter';
import GalleryChapter from './chapters/GalleryChapter';
import ContactChapter from './chapters/ContactChapter';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <AboutChapter />
      <ProjectsChapter />
      <SkillsChapter />
      <GalleryChapter />
      <ContactChapter />
    </main>
  );
}
