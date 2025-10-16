import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL;

const heroImages = [
  "https://cdn-icons-png.flaticon.com/512/1170/1170678.png", // Online Store
  "https://cdn-icons-png.flaticon.com/512/891/891462.png",   // Shopping Cart
  "https://cdn-icons-png.flaticon.com/512/679/679922.png",   // Payment
  "https://cdn-icons-png.flaticon.com/512/3104/3104799.png", // Delivery Truck
];

const ECommerce = () => {
  const [generalComment, setGeneralComment] = useState({ name: "", text: "" });
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔄 Auto change hero image every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGeneralComment = async (e) => {
    e.preventDefault();
    if (!generalComment.name || !generalComment.text) return;

    try {
      await axios.post(CONTACT_API_URL, {
        name: generalComment.name,
        text: generalComment.text,
      });
      setGeneralComment({ name: "", text: "" });
      alert("✅ Comment submitted successfully!");
    } catch (err) {
      console.error("❌ Error posting general comment:", err.response || err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white">

        {/* 🌟 Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative grid md:grid-cols-2 gap-8 items-center py-20 px-6 bg-gradient-to-r from-cyan-600/40 to-fuchsia-700/40 backdrop-blur-sm"
        >
          {/* Left Text */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              Start Your E-commerce Journey
            </h1>
            <p className="mt-4 max-w-xl text-lg text-fuchsia-100">
              From business registration to online sales, we guide you every step of the way.
            </p>
            <div className="mt-6 flex gap-4 justify-center md:justify-start">
              <a
                href="#about"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold shadow hover:shadow-cyan-400/40 transition"
              >
                Learn More
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl border border-white/20 bg-black/30 text-white font-semibold hover:bg-white/10 transition"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right Rotating Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <img
              src={heroImages[currentIndex]}
              alt="E-commerce Illustration"
              className="w-72 md:w-96 drop-shadow-xl"
            />
          </motion.div>
        </motion.section>

        {/* 📝 About E-commerce Services */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-cyan-400 shadow-lg rounded-2xl p-8 mb-12 max-w-5xl mx-auto mt-16"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            About Our E-commerce Services
          </h2>
          <div className="text-fuchsia-100 space-y-4 text-justify leading-relaxed">
            <p>
              Starting an e-commerce business is one of the most rewarding ventures in today’s digital-first world...
              {/* 👉 Full 1000-word content from my previous draft goes here. Break into <p> tags with subheadings for clarity. */}
            </p>
            {/* Add the full text broken into sections with <h3> and <p> */}
          </div>
        </motion.section>

        {/* 🛍️ E-Commerce Process */}
        <motion.section
          id="process"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-purple-400 shadow-lg rounded-2xl p-8 mb-12 max-w-4xl mx-auto mt-20"
        >
          <h1 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
            E-commerce Business Setup Process
          </h1>
          <ol className="space-y-4 text-fuchsia-100">
            {[
              "Choose a unique business name and register your company",
              "Apply for GST registration and PAN for tax compliance",
              "Open a current bank account for business transactions",
              "Set up your online store (Shopify, WooCommerce, Custom Website, etc.)",
              "List products with detailed descriptions and pricing",
              "Integrate secure payment gateways (UPI, Netbanking, Credit/Debit Cards)",
              "Set up reliable logistics/shipping partners",
              "Promote your store via SEO, social media, and digital marketing",
            ].map((step, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* 💬 General Comments */}
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

        {/* ✉️ Contact Form */}
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

export default ECommerce;
