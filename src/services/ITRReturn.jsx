import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL;

const heroImages = [
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
  "https://cdn-icons-png.flaticon.com/512/3208/3208751.png",
];

// Each item is a section with a title and content
const ITRSections = [
  {
    title: "Introduction to ITR Filing",
    content: `Filing an Income Tax Return (ITR) is an essential part of financial responsibility in India. It ensures that you are compliant with the Income Tax Department and helps in building a credible financial profile. Understanding which ITR form suits your profile is the first step toward hassle-free filing.`
  },
  {
    title: "Document Preparation",
    content: `Collect all necessary documents including Form 16, bank statements, investment proofs, and Form 26AS. Having these ready ensures no income or deduction is missed and avoids future notices.`
  },
  {
    title: "Portal Registration",
    content: `Register on the Income Tax e-filing portal using your PAN. Keep contact details and bank info updated. This enables pre-filled forms and ensures proper communication from the IT Department.`
  },
  {
    title: "Income & Deduction Details",
    content: `Fill in salary, other sources of income, and deductions accurately. Ensure numbers match documents. Mistakes can delay processing or trigger notices.`
  },
  {
    title: "Validation & Submission",
    content: `Validate the form before submission. Use pre-filled forms if applicable. Double-check figures, PAN numbers, and deductions. Submit return and verify using Aadhaar OTP, net banking, or ITR-V.`
  },
  {
    title: "Tax Payment & Verification",
    content: `Pay any remaining tax using challans. Keep proof of payment. Verify the return electronically or via ITR-V. E-verification is instant and preferred.`
  },
  {
    title: "Processing & Refunds",
    content: `The IT Department processes the return and communicates via email/SMS. Refunds, if any, are credited to the bank account. Maintain records for future compliance and reference.`
  },
  {
    title: "Importance of Timely Filing",
    content: `Timely filing avoids penalties. Late filing can attract fines. Understanding deadlines and professional consultation for complex cases is advisable.`
  },
  {
    title: "Technology & Tools",
    content: `The e-filing portal, apps, and online consultants simplify filing. Stay updated with tax laws and deductions for accurate filing.`
  },
  {
    title: "Conclusion",
    content: `Filing ITR responsibly involves document preparation, accurate reporting, and timely submission. With a systematic approach, individuals and businesses can simplify ITR filing and maintain a healthy financial record.`
  }
];

const ITRReturnPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [generalComment, setGeneralComment] = useState({ name: "", text: "" });
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleGeneralComment = async (e) => {
    e.preventDefault();
    if (!generalComment.name || !generalComment.text) return;

    try {
      await axios.post(CONTACT_API_URL, {
        blog: null,
        name: generalComment.name,
        text: generalComment.text,
      });
      setGeneralComment({ name: "", text: "" });
      alert("✅ Comment submitted successfully!");
    } catch (err) {
      console.error("❌ Error posting comment:", err.response || err);
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
          className="relative grid md:grid-cols-2 gap-8 items-center py-20 px-6 bg-gradient-to-r from-green-600/40 to-blue-700/40 backdrop-blur-sm"
        >
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              Simplify Your ITR Filing
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/90">
              Step-by-step guidance to file your Income Tax Return correctly and efficiently.
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
              alt="ITR Illustration"
              className="w-72 md:w-96 drop-shadow-xl"
            />
          </motion.div>
        </motion.section>

        {/* Collapsible ITR Sections */}
        <section className="max-w-5xl mx-auto py-10 px-6 space-y-4">
          {ITRSections.map((section, idx) => (
            <div key={idx} className="backdrop-blur-lg border border-purple-400 shadow-lg rounded-2xl bg-white/5">
              <button
                onClick={() => toggleSection(idx)}
                className="w-full flex justify-between items-center p-4 text-left text-xl font-semibold text-blue-400 focus:outline-none"
              >
                {section.title}
                {expandedSections[idx] ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedSections[idx] && (
                <div className="p-4 text-white/90 leading-relaxed border-t border-blue-400/20">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* General Comment Section */}
        <section className="bg-white/5 backdrop-blur-lg border border-emerald-400 shadow-lg rounded-2xl p-8 mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-emerald-400">💬 Leave a Comment</h2>
          <form onSubmit={handleGeneralComment}>
            <input
              type="text"
              placeholder="Your Name"
              value={generalComment.name}
              onChange={(e) => setGeneralComment({ ...generalComment, name: e.target.value })}
              className="border p-2 rounded w-full mb-2"
              required
            />
            <textarea
              placeholder="Write your comment..."
              value={generalComment.text}
              onChange={(e) => setGeneralComment({ ...generalComment, text: e.target.value })}
              className="border p-2 rounded w-full mb-2"
              required
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Submit Comment
            </button>
          </form>
        </section>

        {/* Back to Top Button */}
        {showTopButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-500 text-white p-3 rounded-full shadow-lg transition"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

      </div>
      <Footer />
    </>
  );
};

export default ITRReturnPage;
