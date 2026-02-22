import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import InputsPage from "./Pages/Inputs/InputsPage";
import MyCompany from "./Pages/Inputs/MyCompany.jsx";
import OutputsPage from "./Pages/Inputs/Outputs/OutputPage";

import Navbar from "./Components/Navbar.jsx";
import Hero from "./Components/Hero.jsx";
import Marquee from "./Components/Marquee.jsx";
import Services from "./Components/Services.jsx";
import Vision from "./Components/Vision.jsx";
import LoginModal from "./Components/LoginModal.jsx";

// Optional Outputs placeholder
function Outputs() {
    return (
        <div className="min-h-screen bg-[#D9E4D7] text-[#0c120b] grid place-items-center p-6">
            <div className="max-w-lg w-full rounded-2xl border border-black/10 bg-white/40 p-6">
                <h2 className="text-2xl font-black">Outputs</h2>
                <p className="mt-2 text-[#324D3E]/80">Placeholder for now.</p>
            </div>
        </div>
    );
}

function Home({ onOpenLogin }) {
    return (
        <div className="min-h-screen bg-[#D9E4D7]">
            <Navbar onOpenLogin={onOpenLogin} />

            <main>
                <Hero />
                <Marquee />
                <Services />
                <Vision />
            </main>

            <footer className="border-t border-black/10 bg-[#D9E4D7]">
                <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-sm text-[#324D3E]/80">
                        ©️ {new Date().getFullYear()} EcoForecast — All rights
                        reserved.
                    </div>
                    <div className="text-sm text-[#324D3E]/80">
                        Built with React + Tailwind
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default function App() {
    const [loginOpen, setLoginOpen] = useState(false);

    return (
        <>
            <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

            <Routes>
                <Route
                    path="/"
                    element={<Home onOpenLogin={() => setLoginOpen(true)} />}
                />

                <Route
                    path="/company"
                    element={
                        <div className="min-h-screen bg-[#D9E4D7]">
                            <Navbar onOpenLogin={() => setLoginOpen(true)} />
                            <MyCompany />
                        </div>
                    }
                />

                <Route path="/inputs" element={<InputsPage />} />
                <Route path="/outputs" element={<OutputsPage />} />
            </Routes>
        </>
    );
}
