import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import About from "../Components/About";
import Certificates from "../Components/Certificates";
import Projects from "../Components/Projects";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";



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