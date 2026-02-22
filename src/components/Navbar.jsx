import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import leaf from "../assets/leaf.png";

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
          "transition-all duration-300",
          "bg-[#D9E4D7]",
          scrolled ? "border-b border-black/10 shadow-sm" : "",
        ].join(" ")}
      >
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="grid grid-cols-3 items-center">
            
            {/* Left Navigation */}
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

            {/* Center Brand */}
            <div className="justify-self-center">
              <Link
                to="/"
                className="text-3xl font-black tracking-tight text-[#324D3E]"
              >
                EcoForecast
              </Link>
            </div>

            {/* Right Login Button */}
            <div className="justify-self-end">
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center gap-3 text-sm text-[#324D3E] hover:text-black transition"
              >
                <span className="hidden sm:inline">
                  Login / Sign up
                </span>

                <span className="inline-flex h-11 w-11 rounded-full bg-[#E8EFE6] border border-black/10 items-center justify-center overflow-hidden transition hover:scale-105 hover:shadow-md">
                  <img
                    src={leaf}
                    alt="Leaf"
                    className="h-16 w-16 object-contain"
                  />
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}