import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL;

const heroImages = [
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  "https://cdn-icons-png.flaticon.com/512/3135/3135712.png",
  "https://cdn-icons-png.flaticon.com/512/3081/3081712.png",
  "https://cdn-icons-png.flaticon.com/512/3135/3135720.png",
];

const sections = [
  {
    title: "Introduction to GST",
    content: `Goods and Services Tax (GST) is a comprehensive indirect tax... (content continues)`,
  },
  {
    title: "Eligibility for GST Registration",
    content: `Businesses whose turnover exceeds the prescribed threshold...`,
  },
  {
    title: "Documents Required",
    content: `To register under GST, businesses must provide a set of valid documents...`,
  },
  {
    title: "Registration Process",
    content: `The GST registration process is fully online and can be completed via the official GST portal...`,
  },
  {
    title: "Benefits of GST Registration",
    content: `GST registration brings several benefits...`,
  },
  {
    title: "Compliance and Returns",
    content: `Registered businesses are required to file GST returns periodically...`,
  },
  {
    title: "Input Tax Credit (ITC)",
    content: `Input Tax Credit (ITC) is a mechanism under GST that allows businesses to reduce tax liability...`,
  },
  {
    title: "Invoicing under GST",
    content: `Invoices are a crucial compliance requirement under GST...`,
  },
  {
    title: "Technology and Automation",
    content: `Technology plays a significant role in GST compliance...`,
  },
  {
    title: "Professional Guidance",
    content: `Professional guidance is valuable for GST registration, compliance, and dispute resolution...`,
  },
];

const GSTRegistration = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [generalComment, setGeneralComment] = useState({ name: "", text: "" });
  const [submittedComments, setSubmittedComments] = useState([]);

  // Hero image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll handler for top button
  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Submit general comment
  const handleGeneralComment = async (e) => {
    e.preventDefault();
    if (!generalComment.name || !generalComment.text) return;

    try {
      const res = await axios.post(CONTACT_API_URL, {
        blog: null,
        name: generalComment.name,
        text: generalComment.text,
      });

      setSubmittedComments((prev) => [...prev, res.data]);
      setGeneralComment({ name: "", text: "" });
      alert("✅ Comment submitted successfully!");
    } catch (err) {
      console.error("❌ Error posting comment:", err.response || err);
    }
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
          className="relative grid md:grid-cols-2 gap-8 items-center py-20 px-6 bg-gradient-to-r from-cyan-600/40 to-fuchsia-700/40 backdrop-blur-sm"
        >
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              GST Registration Made Easy
            </h1>
            <p className="mt-4 max-w-xl text-lg text-fuchsia-100">
              Step-by-step guidance for GST registration and compliance.
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
              alt="GST Illustration"
              className="w-72 md:w-96 drop-shadow-xl"
            />
          </motion.div>
        </motion.section>

        {/* GST Process Section */}
        <motion.section
          id="process"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-purple-400 shadow-lg rounded-2xl p-8 mb-12 max-w-4xl mx-auto mt-20"
        >
          <h1 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
            GST Registration Process
          </h1>
          <ol className="space-y-4 text-fuchsia-100">
            {[
              "Determine eligibility for GST registration (turnover, business type).",
              "Collect documents: PAN, Aadhaar, bank details, proof of business.",
              "Apply online via GST portal (www.gst.gov.in).",
              "Fill Part-A of GST REG-01 with PAN, mobile, and email verification.",
              "Complete Part-B of GST REG-01 with business details and documents.",
              "Receive ARN (Application Reference Number) on submission.",
              "Verification by GST officer.",
              "Receive GSTIN (Goods and Services Tax Identification Number).",
            ].map((step, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* Collapsible GST Article */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-cyan-400 shadow-lg rounded-2xl p-8 mb-12 max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6 text-cyan-200 text-center">
            Comprehensive GST Guide
          </h2>
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={index} className="border border-cyan-500/40 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex justify-between items-center px-4 py-3 bg-cyan-600/30 hover:bg-cyan-600/50 transition font-semibold"
                >
                  <span>{section.title}</span>
                  {openSections[index] ? <ChevronUp /> : <ChevronDown />}
                </button>
                <AnimatePresence>
                  {openSections[index] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 text-fuchsia-100 prose prose-lg max-w-none"
                    >
                      {section.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Comment / Contact Section */}
        <motion.section
          id="general-comments"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-emerald-400 shadow-lg rounded-2xl p-8 mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-emerald-300 mb-6">💬 Leave a Comment / Contact Us</h2>
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
              placeholder="Write your comment or message..."
              value={generalComment.text}
              onChange={(e) => setGeneralComment({ ...generalComment, text: e.target.value })}
              className="border border-emerald-400 bg-black/30 p-2 rounded w-full focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-5 py-2 rounded-lg shadow hover:shadow-emerald-400/40 transition"
            >
              Submit
            </button>
          </form>

          {/* Display Submitted Comments */}
          {submittedComments.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-cyan-300 mb-3">Recent Comments</h3>
              {submittedComments.map((c, idx) => (
                <div key={idx} className="mt-2 p-3 rounded-lg bg-white/10 border border-emerald-400/30">
                  <p className="text-fuchsia-100">“{c.text}”</p>
                  <p className="text-sm text-gray-400 mt-1">– {c.name}</p>
                </div>
              ))}
            </div>
          )}
        </motion.section>

        <Footer />

        {/* Back to Top Button */}
        {showTopButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-cyan-600 hover:bg-cyan-500 text-white p-3 rounded-full shadow-lg transition"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </>
  );
};

export default GSTRegistration;
