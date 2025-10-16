import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL;

const heroImages = [
  "https://cdn-icons-png.flaticon.com/512/2910/2910768.png",
  "https://cdn-icons-png.flaticon.com/512/3103/3103446.png",
  "https://cdn-icons-png.flaticon.com/512/159/159604.png",
];

const collapsibleSections = [
  {
    title: "IEC Registration & HS Codes",
    content:
      "Obtaining an Import Export Code (IEC) from DGFT is mandatory. Correct classification using HS codes ensures compliance with customs regulations, accurate duty application, and avoids penalties.",
  },
  {
    title: "Documentation & Compliance",
    content:
      "We assist with commercial invoices, packing lists, letters of credit, and bills of lading. Accurate documentation ensures smooth customs clearance and avoids delays.",
  },
  {
    title: "Supplier Coordination & Shipping",
    content:
      "We coordinate with international suppliers, negotiate contracts, arrange transport documents, and choose the best shipping methods for cost, speed, and safety.",
  },
  {
    title: "Customs Clearance & Taxes",
    content:
      "We help file Bills of Entry via ICEGATE, calculate applicable customs duties, GST, and other levies, ensuring compliance with local regulations including labeling and packaging.",
  },
  {
    title: "Logistics & Risk Management",
    content:
      "We track shipments in real-time, provide insurance guidance, and manage risks related to damage, theft, or delays. International trade agreements can be leveraged for cost benefits.",
  },
  {
    title: "Industry-Specific Import Solutions",
    content:
      "Our services cater to electronics, textiles, pharmaceuticals, machinery, and more. SMEs can benefit from scalable solutions that meet import needs efficiently.",
  },
  {
    title: "Ongoing Support & Compliance",
    content:
      "We provide record-keeping, tax filing, audits, and ongoing compliance support, allowing businesses to focus on growth while we handle import complexities.",
  },
];

const ImportServices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [generalComment, setGeneralComment] = useState({ name: "", text: "" });
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
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
    setOpenSections({ ...openSections, [index]: !openSections[index] });
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
              Start Your Import Journey
            </h1>
            <p className="mt-4 max-w-xl text-lg text-fuchsia-100">
              Learn the complete import process and manage your international shipments smoothly.
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
              alt="Import Illustration"
              className="w-72 md:w-96 drop-shadow-xl"
            />
          </motion.div>
        </motion.section>

        {/* Import Process Section */}
        <motion.section
          id="process"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-purple-400 shadow-lg rounded-2xl p-8 mb-12 max-w-4xl mx-auto mt-20"
        >
          <h1 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
            Import Process
          </h1>
          <ol className="space-y-4 text-fuchsia-100">
            {[
              "Obtain IEC (Import Export Code) from DGFT.",
              "Identify goods and HS Code for customs classification.",
              "Check import policies and restrictions.",
              "Arrange foreign supplier agreement and invoice.",
              "Book shipment and arrange transport documents (Bill of Lading/Airway Bill).",
              "File Bill of Entry with Customs through ICEGATE.",
              "Pay applicable import duties, GST, and cess.",
              "Get clearance from Customs and take delivery.",
            ].map((step, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* Collapsible Import Services Section */}
        <motion.section
          id="import-services"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-cyan-400 shadow-lg rounded-2xl p-8 mb-12 max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6 text-cyan-200 text-center">Comprehensive Import Services</h2>
          {collapsibleSections.map((section, index) => (
            <div key={index} className="mb-4 border-b border-white/20">
              <button
                onClick={() => toggleSection(index)}
                className="flex justify-between items-center w-full text-left py-3 text-lg font-semibold text-fuchsia-200 hover:text-cyan-300 focus:outline-none"
              >
                {section.title}
                {openSections[index] ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openSections[index] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4 }}
                  className="text-fuchsia-100 leading-relaxed py-2"
                >
                  {section.content}
                </motion.div>
              )}
            </div>
          ))}
        </motion.section>

        {/* General Comment Section */}
        <motion.section
          id="comments"
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

export default ImportServices;
