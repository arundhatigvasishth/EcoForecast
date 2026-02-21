import React, { useEffect, useState } from "react";

export default function Navbar({ onOpenLogin }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* Wix preview bar vibe */}
      <div className="bg-white border-b border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <div className="text-xl font-black tracking-tight">WIX</div>

          <div className="hidden sm:flex items-center gap-3 text-sm text-black/70">
            <span>Click edit and create your own amazing website</span>
            <button className="rounded-full bg-black px-4 py-2 text-white text-sm">
              Edit this site
            </button>
          </div>

          <button className="sm:hidden rounded-full bg-black px-3 py-2 text-white text-sm">
            Edit
          </button>
        </div>
      </div>

      <div className={["bg-[#f4f1ea] transition-all", scrolled ? "border-b border-black/10" : ""].join(" ")}>
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <div className="font-medium tracking-wide text-black/80">TRADEMARK®</div>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#home" className="hover:underline underline-offset-8">Home</a>
            <a href="#works" className="hover:underline underline-offset-8">Works</a>
            <a href="#about" className="hover:underline underline-offset-8">About</a>
            <a href="#contact" className="hover:underline underline-offset-8">Contact</a>
          </nav>

          <button
            onClick={onOpenLogin}
            className="inline-flex items-center gap-2 text-sm text-black/80 hover:text-black"
          >
            <span className="inline-block h-9 w-9 rounded-full border border-black/20 bg-white/40 grid place-items-center">
              <span className="text-base">👤</span>
            </span>
            <span className="hidden sm:inline">Log In</span>
          </button>
        </div>
      </div>
    </header>
  );
}