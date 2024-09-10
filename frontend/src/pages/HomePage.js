import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Service from "../components/Service";
import Offer from "../components/Offer";
import { useLocation } from "react-router";
import Gallery from "../components/Gallery";
import About from "../components/About";

const HomePage = () => {
  return (
    <div className="scroll-smooth">
      <section id="hero" className="min-h-screen">
        <Hero />
      </section>
      <section id="service" className="min-h-screen">
        <Service />
      </section>
      <section id="offers" className="min-h-screen">
        <Offer />
      </section>
      <section id="gallery" className="min-h-screen">
        <Gallery />
      </section>
      <section id="about" className="min-h-screen">
        <About />
      </section>
      {/* Add more sections like Gallery and About Us here */}
    </div>
  );
};

export default HomePage;
