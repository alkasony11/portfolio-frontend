import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Certificates from "../components/Certificates";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";



function Home() {
  return (
    <div>
    <Header />
    <Hero />
    <About />
    <Certificates />
    <Projects />
    <Contact />
    <Footer />
  </div>
  )
}

export default Home