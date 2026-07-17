import Hero from './Hero';
import AboutChapter from './chapters/AboutChapter';
import ProjectsChapter from './chapters/ProjectsChapter';
import SkillsChapter from './chapters/SkillsChapter';
import GalleryChapter from './chapters/GalleryChapter';
import ContactChapter from './chapters/ContactChapter';
import Footer from './Footer';
import ZigZagLine from './ZigZagLine';

export default function Home() {
  return (
    <main className="relative">
      <ZigZagLine />
      <Hero />
      <AboutChapter />
      <ProjectsChapter />
      <SkillsChapter />
      <GalleryChapter />
      <ContactChapter />
      <Footer />
    </main>
  );
}
