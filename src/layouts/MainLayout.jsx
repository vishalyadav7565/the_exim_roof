import React from "react";
import Navbar from "../components/Navbar"; // create this later
import Footer from "../components/Footer"; // create this later
import Hero from "../components/Hero";
import Contact from "../pages/Contact";
import WhatsappButton from "../components/WhatsappButton";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#010203] via-[#424343] to-[#091413]
">
      <Navbar />
      <Hero />
      <WhatsappButton />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
