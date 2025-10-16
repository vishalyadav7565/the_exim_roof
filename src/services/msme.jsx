import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

// MSME hero icons
const heroImages = [
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Business icon
  "https://cdn-icons-png.flaticon.com/512/1006/1006549.png", // Growth icon
  "https://cdn-icons-png.flaticon.com/512/1046/1046857.png", // Government scheme icon
];

// MSME content sections
const MSMESections = [
  {
    id: "introduction",
    title: "Introduction to MSME Registration",
    content: `Micro, Small, and Medium Enterprises (MSMEs) are the backbone of the Indian economy...`
  },
  {
    id: "eligibility",
    title: "Eligibility Criteria",
    content: `MSME registration is open to businesses in manufacturing or service sectors...`
  },
  {
    id: "benefits",
    title: "Benefits of MSME Registration",
    content: `Registered MSMEs enjoy multiple benefits such as easier access to bank loans...`
  },
  {
    id: "documents",
    title: "Required Documents",
    content: `To register an MSME, businesses need a few key documents: PAN card, Aadhar card...`
  },
  {
    id: "process",
    title: "Step-by-Step Registration Process",
    content: `The MSME registration can be completed online through the official Udyam Registration portal...`
  },
  {
    id: "schemes",
    title: "Government Schemes for MSMEs",
    content: `Registered MSMEs can access several government schemes designed to promote growth...`
  },
  {
    id: "financial",
    title: "Financial and Tax Advantages",
    content: `MSME registration provides tax exemptions, input tax credit, and access to priority sector lending...`
  },
  {
    id: "market",
    title: "Market Opportunities",
    content: `Being a registered MSME increases visibility in government tenders and procurement opportunities...`
  },
  {
    id: "compliance",
    title: "Compliance and Reporting",
    content: `Registered MSMEs must maintain basic records and periodically report turnover, investments...`
  },
  {
    id: "conclusion",
    title: "Conclusion",
    content: `MSME registration is a strategic step for small and medium enterprises to grow efficiently...`
  }
];

const Msme = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [generalComment, setGeneralComment] = useState({ name: "", text: "" });
  const [expandedSections, setExpandedSections] = useState({});

  // Rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGeneralComment = async (e) => {
    e.preventDefault();
    if (!generalComment.name || !generalComment.text) return;

    try {
      await axios.post(import.meta.env.VITE_CONTACT_API_URL, {
        blog: null,
        name: generalComment.name,
        text: generalComment.text,
      });
      setGeneralComment({ name: "", text: "" });
      alert("✅ Comment submitted successfully!");
    } catch (err) {
      console.error("❌ Error posting general comment:", err.response || err);
    }
  };

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white">

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative grid md:grid-cols-2 gap-8 items-center py-20 px-6 bg-gradient-to-r from-cyan-600/40 to-fuchsia-700/40 backdrop-blur-sm rounded-2xl max-w-6xl mx-auto "
        >
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              MSME Registration Simplified
            </h1>
            <p className="mt-4 max-w-xl text-lg text-fuchsia-100">
              Get recognized, access government schemes, and grow your business efficiently.
            </p>
          </div>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <img
              src={heroImages[currentIndex]}
              alt="MSME Illustration"
              className="w-72 md:w-96 drop-shadow-xl"
            />
          </motion.div>
        </motion.section>

        {/* Table of Contents */}
        <section className="max-w-5xl mx-auto mt-10 p-6 bg-white/5 backdrop-blur-lg border border-purple-400 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">📌 Table of Contents</h2>
          <ul className="list-decimal list-inside space-y-2 text-white/90">
            {MSMESections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-cyan-300 hover:underline">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* MSME 1000-word Guide */}
        <section className="max-w-5xl mx-auto py-10 px-6 space-y-6">
          {MSMESections.map((section, idx) => (
            <div
              key={idx}
              id={section.id}
              className="backdrop-blur-lg border border-purple-400 shadow-lg rounded-2xl bg-white/5"
            >
              <button
                onClick={() => toggleSection(idx)}
                className="w-full flex justify-between items-center p-4 text-left text-xl font-semibold text-cyan-400 focus:outline-none"
              >
                {section.title}
                <span>{expandedSections[idx] ? "▲" : "▼"}</span>
              </button>
              {expandedSections[idx] && (
                <div className="p-4 text-white/90 leading-relaxed border-t border-purple-400/20">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* General Comment Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-emerald-400 shadow-lg rounded-2xl p-8 mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-emerald-300 mb-6">💬 Leave a General Comment</h2>
          <form onSubmit={handleGeneralComment} className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              value={generalComment.name}
              onChange={(e) => setGeneralComment({ ...generalComment, name: e.target.value })}
              className="border border-emerald-400 bg-black/30 p-2 rounded w-full focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
            <textarea
              placeholder="Write your comment..."
              value={generalComment.text}
              onChange={(e) => setGeneralComment({ ...generalComment, text: e.target.value })}
              className="border border-emerald-400 bg-black/30 p-2 rounded w-full focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-5 py-2 rounded-lg shadow hover:shadow-emerald-400/40 transition"
            >
              Submit Comment
            </button>
          </form>
        </motion.section>

        {/* Contact Form */}
        <motion.div
          id="contact"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="my-10 max-w-4xl mx-auto"
        >
          <ContactForm />
        </motion.div>

        <Footer />
      </div>
    </>
  );
};

export default Msme;
