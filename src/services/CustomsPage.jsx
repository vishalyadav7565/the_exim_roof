import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL;

const heroImages = [
  "https://cdn-icons-png.flaticon.com/512/2972/2972185.png", // Cargo Ship
  "https://cdn-icons-png.flaticon.com/512/1995/1995574.png", // Airplane Cargo
  "https://cdn-icons-png.flaticon.com/512/883/883407.png",   // Documents
  "https://cdn-icons-png.flaticon.com/512/1046/1046784.png", // Shipping Container
];

const CustomsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [generalComment, setGeneralComment] = useState({ name: "", text: "" });

  // ✅ Rotate Hero Images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ General comment submit
  const handleGeneralComment = async (e) => {
    e.preventDefault();
    if (!generalComment.name.trim() || !generalComment.text.trim()) return;

    try {
      await axios.post(CONTACT_API_URL, {
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white">

        {/* 🌟 Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative grid md:grid-cols-2 gap-8 items-center justify-center py-20 px-6 bg-gradient-to-r from-cyan-600/40 to-fuchsia-700/40 backdrop-blur-sm"
        >
          {/* Left */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              Hassle-Free Customs Clearance
            </h1>
            <p className="mt-4 max-w-xl text-lg text-fuchsia-100">
              Simplifying import & export formalities so your business can focus on growth.
            </p>
            <div className="mt-6 flex gap-4 justify-center md:justify-start">
              <a
                href="#about"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold shadow hover:shadow-cyan-400/40 transition"
              >
                About Service
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl border border-white/20 bg-black/30 text-white font-semibold hover:bg-white/10 transition"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right - Rotating Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <img
              src={heroImages[currentIndex]}
              alt="Customs Illustration"
              className="w-72 md:w-96 drop-shadow-xl"
            />
          </motion.div>
        </motion.section>

        {/* ℹ️ About Customs Clearance Service */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-purple-400 shadow-lg rounded-2xl p-8 mb-12 max-w-5xl mx-auto mt-12"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
            About Our Customs Clearance Service
          </h2>
          <div className="prose prose-invert max-w-none text-fuchsia-100 leading-relaxed space-y-6">
            <p>
              Customs clearance is one of the most critical steps in global trade. Whether you are importing raw materials for production or exporting finished goods to international customers, your shipment cannot move forward until it is cleared by customs authorities. This process involves strict documentation, classification of goods, payment of duties, and compliance with trade laws. For many businesses, especially those new to international trade, navigating customs can be complex and time-consuming.
            </p>
            <p>
              Our <strong>Customs Clearance Service</strong> is designed to simplify this journey. We take care of the paperwork, procedures, and compliance checks so that your cargo moves seamlessly across borders. With years of experience in handling diverse goods and close coordination with customs officials, we ensure that your consignments are cleared quickly, efficiently, and without unnecessary delays.
            </p>
            <p>
              By working with us, you can focus on growing your business, building supplier and customer relationships, while we ensure that your shipments meet every regulatory requirement. Our service goes beyond clearance—we provide end-to-end support, from documentation to delivery, keeping you informed every step of the way.
            </p>

            <h3 className="text-2xl font-semibold text-cyan-300">Why Customs Clearance Matters</h3>
            <p>
              Customs clearance is more than a formality—it is the gateway to smooth global trade. Improper documentation or non-compliance can result in fines, penalties, or worse, seizure of goods. Every country has its own set of import-export laws, duty rates, and documentation standards. Navigating this complex system requires expertise and precision. Our team ensures that your shipments are classified correctly, duties are calculated accurately, and paperwork is prepared in line with the latest trade laws.
            </p>

            <h3 className="text-2xl font-semibold text-cyan-300">Our Key Services</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Import & Export Customs Clearance</li>
              <li>Preparation & Filing of Shipping Bills and Bills of Entry</li>
              <li>HS Code Classification and Duty Assessment</li>
              <li>Management of Import Export Code (IEC) Requirements</li>
              <li>Handling of Restricted, Sensitive, and Special Cargo</li>
              <li>Customs Duty, IGST, and Tax Consultation</li>
              <li>Assistance in Duty Drawback & Export Incentives</li>
              <li>24/7 Cargo Tracking and Clearance Updates</li>
            </ul>

            <h3 className="text-2xl font-semibold text-cyan-300">Step-by-Step Process</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Collection of shipping documents (invoice, packing list, bill of lading, etc.)</li>
              <li>Verification and classification of goods under HS Code</li>
              <li>Calculation of applicable duties and taxes</li>
              <li>Filing of customs declaration on ICEGATE or other government systems</li>
              <li>Physical inspection and assessment by customs authorities</li>
              <li>Payment of duties and clearance fees</li>
              <li>Final customs clearance and release of cargo</li>
              <li>Last-mile delivery coordination</li>
            </ol>

            <h3 className="text-2xl font-semibold text-cyan-300">Why Choose Us?</h3>
            <p>
              Choosing the right customs clearance partner is crucial for your business success. Our team provides:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Expertise:</strong> Years of experience across industries and commodities.</li>
              <li><strong>Accuracy:</strong> No errors in documentation or duty calculation.</li>
              <li><strong>Speed:</strong> Faster clearance means reduced demurrage costs.</li>
              <li><strong>Transparency:</strong> Regular updates and complete visibility.</li>
              <li><strong>Compliance:</strong> 100% adherence to legal and regulatory standards.</li>
            </ul>

            <h3 className="text-2xl font-semibold text-cyan-300">Our Promise</h3>
            <p>
              We don’t just clear goods—we clear the path for your business success. From the moment your cargo leaves the port of origin until it reaches your warehouse, we are with you every step of the way. Our promise is to reduce your stress, minimize your costs, and ensure that customs is never a barrier to your growth.
            </p>

            <p>
              With us, customs clearance is no longer a challenge—it becomes a smooth and efficient process. Whether you are a first-time importer or an established exporter, we tailor our services to your specific needs.
            </p>
          </div>
        </motion.section>

        {/* 💬 General Comments */}
        <motion.section
          id="comments"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg border border-purple-400 rounded-2xl shadow-lg p-8 mt-12"
        >
          <h2 className="text-2xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
            Leave a Comment
          </h2>
          <form onSubmit={handleGeneralComment} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={generalComment.name}
              onChange={(e) =>
                setGeneralComment({ ...generalComment, name: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <textarea
              placeholder="Your Comment"
              value={generalComment.text}
              onChange={(e) =>
                setGeneralComment({ ...generalComment, text: e.target.value })
              }
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold hover:shadow-lg transition"
            >
              Submit Comment
            </button>
          </form>
        </motion.section>

        {/* 📩 Contact Form */}
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
      </div>
      <Footer />
    </>
  );
};

export default CustomsPage;
