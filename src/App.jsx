/*import React, { useState } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Vision from "./components/Vision";
import Offer from "./components/Offer";
import Contact from "./components/Contact";
import LoginModal from "./components/LoginModal";

import InputsPage from "./Pages/Inputs/InputsPage";
<<<<<<< HEAD
import MyCompany from "./Pages/Inputs/MyCompany";
=======
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
>>>>>>> manya-graphs-backup

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleLoginSuccess() {
    setIsLoggedIn(true);
    setLoginOpen(false);
    navigate("/");
  }

  return (
    <>
      <Navbar
        onOpenLogin={() => setLoginOpen(true)}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

<<<<<<< HEAD
      <Routes>
        <Route
            path="/"
            element={
                <>
                    <Hero />
                    <Marquee />
                    <Services />
                    <Vision />
                </>
  }
/>
        <Route path="/inputs" element={<InputsPage />} />
        <Route path="/company" element={<MyCompany />} />
      </Routes>
    </>
  );
}
=======
                <Route path="/inputs" element={<InputsPage />} />
                <Route path="/outputs" element={<OutputsPage />} />
            </Routes>
        </>
    );
}
>>>>>>> manya-graphs-backup
*/

import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Vision from "./components/Vision";
import Offer from "./components/Offer";
import Contact from "./components/Contact";
import LoginModal from "./components/LoginModal";

import InputsPage from "./Pages/Inputs/InputsPage";
import MyCompany from "./Pages/Inputs/MyCompany";
import OutputsPage from "./Pages/Inputs/Outputs/OutputPage";

export default function App() {
    const [loginOpen, setLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    function handleLoginSuccess() {
        setIsLoggedIn(true);
        setLoginOpen(false);
        navigate("/");
    }

    return (
        <>
            <Navbar
                onOpenLogin={() => setLoginOpen(true)}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
            />

            <LoginModal
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />

            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Hero />
                            <Marquee />
                            <Services />
                            <Vision />
                        </>
                    }
                />
                <Route path="/inputs" element={<InputsPage />} />
                <Route path="/company" element={<MyCompany />} />
                <Route path="/outputs" element={<OutputsPage />} />
            </Routes>
        </>
    );
}
