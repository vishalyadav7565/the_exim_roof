import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lightbulb, Users } from "lucide-react";
import Navbar from "../components/Navbar";   // ✅ import Navbar
import Footer from "../components/Footer";   // ✅ import Footer

// Variants for stagger animation
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const testimonialVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const About = () => {
  return (
    <>
      {/* ✅ Navbar at top */}
      <Navbar />

      <section className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white py-20 px-6 md:px-16 lg:px-32">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-12 mt-10"
        >
          About Us
        </motion.h2>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl mx-auto text-center text-lg text-fuchsia-200 leading-relaxed"
        >
          At <span className="font-bold text-pink-400"><i>The_Exim_Roof</i></span>, we
          empower businesses with cutting-edge digital solutions. Our mission is
          to simplify complex processes, inspire innovation, and help you thrive
          in the digital era.
        </motion.p>

        {/* Core Values */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-fuchsia-200 mb-10">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Integrity",
                desc: "We uphold honesty, ethics, and transparency in every service we deliver.",
                Icon: ShieldCheck,
                border: "border-pink-400",
                color: "text-pink-200",
                glow: "0 0 20px rgba(236,72,153,0.4), inset 0 0 15px rgba(236,72,153,0.15)",
                iconColor: "text-pink-300",
              },
              {
                title: "Innovation",
                desc: "We embrace new ideas and technology to create smarter solutions for businesses.",
                Icon: Lightbulb,
                border: "border-indigo-400",
                color: "text-indigo-200",
                glow: "0 0 20px rgba(99,102,241,0.4), inset 0 0 15px rgba(99,102,241,0.15)",
                iconColor: "text-indigo-300",
              },
              {
                title: "Customer First",
                desc: "We put clients at the heart of everything we do, ensuring trust and satisfaction.",
                Icon: Users,
                border: "border-emerald-400",
                color: "text-emerald-200",
                glow: "0 0 20px rgba(16,185,129,0.4), inset 0 0 15px rgba(16,185,129,0.15)",
                iconColor: "text-emerald-300",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className={`p-6 rounded-2xl bg-white/5 backdrop-blur-lg border ${value.border} shadow-md cursor-pointer text-center`}
                style={{ boxShadow: value.glow }}
              >
                {/* Icon with glowing pulse */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    filter: [
                      "drop-shadow(0 0 5px rgba(255,255,255,0.4))",
                      "drop-shadow(0 0 15px rgba(255,255,255,0.8))",
                      "drop-shadow(0 0 5px rgba(255,255,255,0.4))",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <value.Icon
                    className={`w-10 h-10 mx-auto mb-4 ${value.iconColor}`}
                  />
                </motion.div>

                <h4 className={`text-xl font-semibold ${value.color} mb-3`}>
                  {value.title}
                </h4>
                <p className="text-fuchsia-200 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-fuchsia-200 mb-10">
            What Our Clients Say
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Aarav Sharma",
                role: "Startup Founder",
                feedback:
                  "DigitalCost transformed our online presence. Their solutions boosted our efficiency and brand visibility significantly.",
              },
              {
                name: "Priya Mehta",
                role: "Entrepreneur",
                feedback:
                  "The team truly understands client needs. Their dedication, creativity, and support have been outstanding.",
              },
            ].map((t, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={testimonialVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-purple-400 shadow-md"
                style={{
                  boxShadow:
                    "0 0 20px rgba(192,132,252,0.4), inset 0 0 15px rgba(192,132,252,0.15)",
                }}
              >
                <p className="text-fuchsia-100 italic mb-4">“{t.feedback}”</p>
                <h4 className="text-lg font-semibold text-purple-300">
                  {t.name}
                </h4>
                <p className="text-sm text-fuchsia-300">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Footer at bottom */}
      <Footer />
    </>
  );
};

export default About;
