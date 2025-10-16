"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Truck, Users, Package, Settings } from "lucide-react"; // icons
import heroImg from "../../src/assets/the_exim_home.jpg";

const cards = [
  { 
    id: 1, 
    title: "Manpower Recruitment", 
    desc: "Hire skilled professionals with ease.", 
    icon: <Users size={32} />, 
    color: "from-blue-500 to-indigo-600" 
  },
  { 
    id: 2, 
    title: "Logistics Management", 
    desc: "Efficient transport & warehousing solutions.", 
    icon: <Truck size={32} />, 
    color: "from-green-500 to-emerald-600" 
  },
  { 
    id: 3, 
    title: "Customs Clearance", 
    desc: "Hassle-free import/export clearance.", 
    icon: <Package size={32} />, 
    color: "from-purple-500 to-pink-600" 
  },
  { 
    id: 4, 
    title: "Supply Chain Solutions", 
    desc: "End-to-end supply chain optimization.", 
    icon: <Settings size={32} />, 
    color: "from-orange-500 to-red-600" 
  },
];

const Hero = () => {
  const [currentCard, setCurrentCard] = useState(0);

  // Autoplay card slider every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden ">
      <div className="container mx-auto lg:max-w-screen-xl px-4 mt-6">
        <div className="grid grid-cols-12 items-center gap-8">
          {/* Left content */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-5 col-span-12 text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
               Business Compliance{" "}
              <span className="text-primary">With</span> The Exim Roof
            </h1>
            <p className="text-lg text-gray-200">
              Fast, secure, and reliable trading & logistics services at your fingertips.
            </p>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="lg:col-span-7 col-span-12 flex justify-center"
          >
            <div className="w-full flex items-center justify-center text-white text-2xl mt-7">
              <img
                src={heroImg}
                alt="Hero"
                className="w-3/4 sm:w-2/3 md:w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Card Slider */}
        <div className="mt-12 overflow-hidden w-full">
          <motion.div
            key={currentCard} // ensures re-animation on change
            initial={{ opacity: 0, y: 40, rotateY: -20 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            exit={{ opacity: 0, y: -40, rotateY: 15 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: 1 }}
              whileTap={{ scale: 0.97 }}
              className={`h-56 w-full md:w-1/2 lg:w-1/3 rounded-2xl p-6 flex flex-col items-center justify-center text-white shadow-2xl bg-gradient-to-r ${cards[currentCard].color}`}
            >
              <div className="mb-3 text-4xl">{cards[currentCard].icon}</div>
              <h3 className="text-2xl font-bold">{cards[currentCard].title}</h3>
              <p className="text-sm mt-2 text-gray-100 text-center">
                {cards[currentCard].desc}
              </p>
            </motion.div>
          </motion.div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 space-x-3">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCard(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentCard === index
                    ? "bg-primary scale-125"
                    : "bg-gray-400 hover:bg-primary/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
