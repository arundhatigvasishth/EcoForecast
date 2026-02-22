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
      </Routes>
    </>
  );
}