import React, { useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Services from "./components/Services.jsx";
import Offer from "./components/Offer.jsx";
import Contact from "./components/Contact.jsx";
import LoginModal from "./components/LoginModal.jsx";

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);

  const services = useMemo(
    () => [
      {
        title: "Comprehensive Digital Campaigns",
        desc: "Creating holistic digital strategies that convert attention into growth.",
        tone: "lavender",
      },
      {
        title: "SEO Mastery",
        desc: "Boosting your site on search engines with practical, measurable wins.",
        tone: "mint",
      },
      {
        title: "Targeted Advertisement",
        desc: "Maximizing ROI through precise targeting and clear creative direction.",
        tone: "cream",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen">
      <Navbar onOpenLogin={() => setLoginOpen(true)} />

      <main>
        <Hero />
        <Marquee text="Creative / Content Strategy / Branding /" />
        <Services items={services} />
        <Offer />
        <Contact />
      </main>

      <footer className="border-t border-black/10 bg-[#f4f1ea]">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-black/70">
            © {new Date().getFullYear()} TRADEMARK® — All rights reserved.
          </div>
          <div className="text-sm text-black/70">Built with React + Tailwind</div>
        </div>
      </footer>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}