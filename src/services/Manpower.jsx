import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import axios from "axios";

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL;

const heroImages = [
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", 
  "https://cdn-icons-png.flaticon.com/512/1077/1077012.png", 
  "https://cdn-icons-png.flaticon.com/512/2922/2922506.png", 
];

// 10-section detailed manpower recruitment guide (~1000 words)
const ManpowerSections = [
  {
    title: "Introduction",
    content: `Recruitment is the backbone of any organization. Hiring the right talent efficiently saves costs, improves productivity, and builds a strong workforce. This guide outlines a systematic approach to manpower recruitment, covering every step from requirement analysis to onboarding.`
  },
  {
    title: "Understanding Client Requirements",
    content: `The first step in recruitment is understanding the client's needs. This involves meetings with HR managers or business owners to define job roles, required skills, experience, and expected outcomes. A clear requirement prevents mismatches and ensures candidate suitability.`
  },
  {
    title: "Job Description Preparation",
    content: `Prepare detailed job descriptions specifying role responsibilities, qualifications, experience, and soft skills required. Highlight company culture and benefits to attract quality candidates. A well-structured job description reduces irrelevant applications and improves candidate engagement.`
  },
  {
    title: "Sourcing Candidates",
    content: `Utilize multiple sourcing channels including job portals, social media, professional networks, and employee referrals. Screening resumes based on qualifications, experience, and skill relevance helps in shortlisting potential candidates efficiently.`
  },
  {
    title: "Screening and Shortlisting",
    content: `Initial screening involves reviewing resumes, checking skill alignment, and conducting telephonic interviews. Shortlist candidates who meet the criteria to proceed for assessments and face-to-face interviews. Effective screening reduces hiring time and improves quality of hires.`
  },
  {
    title: "Interview and Assessment",
    content: `Conduct structured interviews and assessments to evaluate technical skills, problem-solving ability, and cultural fit. Use competency-based questions and practical exercises. Involving multiple interviewers ensures unbiased evaluation and better decision-making.`
  },
  {
    title: "Background and Reference Verification",
    content: `Verify educational qualifications, previous employment, and conduct reference checks. Background verification ensures authenticity and reduces hiring risks. It also enhances client trust and protects organizational reputation.`
  },
  {
    title: "Shortlist Presentation to Client",
    content: `Prepare a report of shortlisted candidates with resumes, assessment results, and recommendations. Present this to the client for approval. Transparent communication builds confidence and speeds up the hiring process.`
  },
  {
    title: "Offer and Onboarding",
    content: `Once the client finalizes candidates, extend offers including compensation, joining date, and terms. Coordinate with HR for onboarding formalities. Proper onboarding helps new hires integrate smoothly and increases retention rates.`
  },
  {
    title: "Conclusion",
    content: `Efficient manpower recruitment combines clear planning, structured evaluation, and effective communication. Following this process reduces hiring mistakes, saves time, and ensures high-quality talent acquisition. A professional approach benefits both clients and candidates, fostering long-term success.`
  }
];

const ManpowerPage = () => {
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
          className="relative grid md:grid-cols-2 gap-8 items-center py-20 px-6 bg-gradient-to-r from-blue-600/40 to-indigo-700/40 backdrop-blur-sm"
        >
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Streamline Your Recruitment
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/90">
              Hire skilled professionals efficiently with our step-by-step manpower recruitment process.
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
              alt="Manpower Illustration"
              className="w-72 md:w-96 drop-shadow-xl"
            />
          </motion.div>
        </motion.section>

        {/* Recruitment Guide Sections */}
        <section className="max-w-5xl mx-auto py-10 px-6 space-y-4">
          {ManpowerSections.map((section, idx) => (
            <div key={idx} className="backdrop-blur-lg border border-cyan-400 shadow-lg rounded-2xl bg-white/5">
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

        {/* Back Link */}
        <div className="text-center mt-10">
          <Link to="/" className="text-blue-600 underline">← Back to Home</Link>
        </div>

        {/* Back to Top Button */}
        {showTopButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg transition"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

      </div>
      <Footer />
    </>
  );
};

export default ManpowerPage;
