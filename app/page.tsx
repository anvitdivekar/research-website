import Nav from "./components/Nav";
import ParticleBackground from "./components/ParticleBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Research from "./components/Research";
import Mentorship from "./components/Mentorship";
import Apply from "./components/Apply";
import Publications from "./components/Publications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* Fixed particle canvas — always visible behind everything */}
      <ParticleBackground />

      {/* Deep space base color */}
      <div className="fixed inset-0 bg-[#03030e]" style={{ zIndex: -1 }} />

      <Nav />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Research />
        <Mentorship />
        <Apply />
        <Publications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
