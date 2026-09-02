import BackgroundShapes from "@/components/BackgroundShapes";
import Hero from "@/components/Hero";
import About from "@/components/About";
import StatsCarousel from "@/components/StatsCarousel";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <BackgroundShapes />
      <Hero />
      <About />
      <StatsCarousel />
      <Services />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
