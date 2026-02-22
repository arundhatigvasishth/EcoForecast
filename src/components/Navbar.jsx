import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ onOpenLogin }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-40">
      <div
        className={[
          "transition-all",
          "bg-[#D9E4D7]",
          scrolled ? "border-b border-black/10" : "",
        ].join(" ")}
      >
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="grid grid-cols-3 items-center">
            {/* Left nav */}
            <nav className="flex items-center gap-6 text-sm text-[#324D3E]">
              {isHome ? (
                <a href="#home" className="hover:underline underline-offset-8">
                  Home
                </a>
              ) : (
                <Link to="/" className="hover:underline underline-offset-8">
                  Home
                </Link>
              )}

              <Link
                to="/company"
                className="hover:underline underline-offset-8"
              >
                My Company
              </Link>
            </nav>

            {/* Center brand */}
            <div className="justify-self-center">
              <Link
                to="/"
                className="text-lg font-black tracking-tight text-[#324D3E]"
              >
                EcoForecast
              </Link>
            </div>

            {/* Right actions */}
            <div className="justify-self-end">
              <button
                onClick={onOpenLogin}
                className="text-sm text-[#324D3E] hover:text-black inline-flex items-center gap-2"
              >
                <span className="hidden sm:inline">Login / Sign up</span>
                <span className="inline-block h-9 w-9 rounded-full border border-black/15 bg-white/40 grid place-items-center">
                  {/* simple icon */}
                  <span className="h-2 w-2 rounded-full bg-[#324D3E]" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}