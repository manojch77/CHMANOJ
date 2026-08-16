import { createFileRoute } from "@tanstack/react-router";
import { Atmosphere } from "@/components/Atmosphere";
import { AnimeElements } from "@/components/AnimeElements";
import { Intro } from "@/components/Intro";
import { KunaiCursor } from "@/components/KunaiCursor";
import { MusicToggle } from "@/components/MusicToggle";
import { Reveal, ScrollProgress } from "@/components/Reveal";
import { Nav } from "@/components/Nav";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const TITLE = "Chinthala Manoj — UI/UX Designer × Frontend Developer";
const DESC =
  "Design. Build. Secure. The archive of Chinthala Manoj — UI/UX case studies, product design and Linux systems work.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Intro />
      <Atmosphere />
      <AnimeElements />
      <KunaiCursor />
      <ScrollProgress />
      <Nav />
      <MusicToggle />
      <main>
        <Hero />
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Work />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Experience />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

