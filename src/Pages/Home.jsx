import React from "react"

import Hero from "../Components/Hero";
import Cards from "../Components/Cards";
import Features from "../Components/Features";
import EndSection from "../Components/EndSection";

const Home = () => {
  return (
    <>
      <Hero />
       <Cards />
      <Features />
      <EndSection />
    </>
  );
}

export default Home;