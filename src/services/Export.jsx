import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL;

// 🚢 Export Hero Images
const heroImages = [
  "https://cdn-icons-png.flaticon.com/512/2972/2972185.png", // Cargo Ship
  "https://cdn-icons-png.flaticon.com/512/1995/1995574.png", // Airplane Cargo
  "https://cdn-icons-png.flaticon.com/512/883/883407.png",   // Documents
  "https://cdn-icons-png.flaticon.com/512/1046/1046784.png", // Container
];

const Export = () => {
  const [generalComment, setGeneralComment] = useState({ name: "", text: "" });
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔄 Auto change hero image every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // General comment submit
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
          className="relative grid md:grid-cols-2 gap-8 items-center py-20 px-6 bg-gradient-to-r from-blue-600/40 to-indigo-700/40 backdrop-blur-sm"
        >
          {/* Left */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Simplify Your Export Journey
            </h1>
            <p className="mt-4 max-w-xl text-lg text-indigo-100">
              From documentation to logistics, we help you scale globally with ease.
            </p>
            <div className="mt-6 flex gap-4 justify-center md:justify-start">
              <a
                href="#process"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow hover:shadow-blue-400/40 transition"
              >
                Explore Process
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
              alt="Export Illustration"
              className="w-72 md:w-96 drop-shadow-xl"
            />
          </motion.div>
        </motion.section>

        {/* 🚢 Export Process */}
        <motion.section
          id="process"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-blue-400 shadow-lg rounded-2xl p-8 mb-12 max-w-4xl mx-auto mt-20"
        >
          <h1 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Export Business Setup Process
          </h1>
          <ol className="space-y-4 text-indigo-100">
            {[
              "Register your business entity (Proprietorship, LLP, Pvt Ltd)",
              "Obtain Import Export Code (IEC) from DGFT",
              "Register with Export Promotion Councils",
              "Open a current account in an authorized bank",
              "Find international buyers & sign contracts",
              "Prepare customs documentation & compliance",
              "Choose reliable shipping & logistics partners",
              "Claim export incentives (MEIS, RoDTEP, etc.)",
            ].map((step, i) => (
              <li key={i} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* 📖 Export Services Content (1000 words) */}
       <motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="bg-white/5 backdrop-blur-lg border border-indigo-400 shadow-lg rounded-2xl p-8 mb-12 max-w-5xl mx-auto leading-relaxed text-indigo-100"
>
  <h2 className="text-3xl font-bold mb-6 text-blue-200">🌍 Our Export Services</h2>

  <p className="mb-4">
    At <strong>Company Registration & Export Solutions</strong>, we specialize in helping
    entrepreneurs, startups, and established businesses expand their reach to
    global markets. Exporting products and services internationally not only
    increases profitability but also strengthens the presence of Indian
    businesses on the world stage. Our services are designed to provide end-to-end
    support for exporters — from business registration and compliance to logistics,
    customs clearance, and global trade connections.
  </p>

  <p className="mb-4">
    Export is the backbone of any growing economy, and with India emerging as a
    global manufacturing hub, the demand for high-quality products across
    countries has never been higher. Whether you are an individual entrepreneur
    starting small or a corporation looking to scale your operations
    internationally, our team ensures that you meet all the legal, technical,
    and financial requirements with ease. Our mission is to simplify the complex
    processes of export business and enable you to focus on what you do best —
    producing world-class goods and services.
  </p>

  <h3 className="text-2xl font-semibold mt-6 mb-3 text-indigo-300">
    ✅ Why Choose Our Export Services?
  </h3>
  <p className="mb-4">
    Many businesses face challenges while entering global trade. The hurdles may
    include lack of knowledge about export laws, documentation errors, logistics
    confusion, and difficulty in finding international buyers. We act as your
    single-window solution to overcome these challenges. By choosing us, you get:
  </p>
  <ul className="list-disc pl-6 space-y-2">
    <li>Comprehensive guidance on business and company registration.</li>
    <li>Support in obtaining Import Export Code (IEC) from DGFT.</li>
    <li>Assistance in compliance with customs and taxation rules.</li>
    <li>Market research and buyer identification across international platforms.</li>
    <li>Connections with shipping, freight forwarding, and logistics partners.</li>
    <li>Guidance to avail government export incentives like RoDTEP and EPCG.</li>
    <li>Dedicated support for export documentation and banking procedures.</li>
  </ul>

  <h3 className="text-2xl font-semibold mt-6 mb-3 text-indigo-300">
    📑 Step-by-Step Export Services We Provide
  </h3>
  <p className="mb-4">
    To ensure a smooth experience for our clients, we follow a structured
    process. Each step is handled with precision, ensuring legal compliance and
    efficiency. Here’s how we help:
  </p>
  <ol className="list-decimal pl-6 space-y-2">
    <li><strong>Business Formation & Company Registration:</strong> We guide you in setting up a Proprietorship, Partnership, LLP, or Private Limited Company depending on your business needs.</li>
    <li><strong>IEC Code Registration:</strong> Without IEC, you cannot export legally from India. We handle the DGFT application process seamlessly.</li>
    <li><strong>Export Promotion Council Registration:</strong> Becoming a member of EPCs enables you to access benefits, incentives, and international trade fairs.</li>
    <li><strong>Banking & Finance Setup:</strong> We help you open current accounts with authorized banks and integrate export financing options like packing credit and pre/post shipment finance.</li>
    <li><strong>Product Classification & Compliance:</strong> Correct HS Code classification ensures accurate customs duty, taxes, and incentives.</li>
    <li><strong>Logistics & Shipping Support:</strong> Our tie-ups with freight forwarders, CHA (Customs House Agents), and shipping lines ensure your goods move safely.</li>
    <li><strong>Customs Documentation:</strong> From commercial invoices to shipping bills, we handle every paper requirement.</li>
    <li><strong>Export Incentives Guidance:</strong> Avail schemes like RoDTEP, Duty Drawback, SEIS, and MEIS effectively.</li>
  </ol>

  <h3 className="text-2xl font-semibold mt-6 mb-3 text-indigo-300">
    🌐 Industries We Serve
  </h3>
  <p className="mb-4">
    Export opportunities vary across industries, and each has its own
    compliance needs. Our services are tailored for:
  </p>
  <ul className="list-disc pl-6 space-y-2">
    <li>Agro products and food processing</li>
    <li>Textiles and garments</li>
    <li>Handicrafts and furniture</li>
    <li>Engineering goods and machinery</li>
    <li>Pharmaceuticals and healthcare products</li>
    <li>IT services and software solutions</li>
    <li>Automobiles and spare parts</li>
    <li>Chemicals, dyes, and raw materials</li>
  </ul>

  <h3 className="text-2xl font-semibold mt-6 mb-3 text-indigo-300">
    📦 Logistics and Global Network
  </h3>
  <p className="mb-4">
    A successful export transaction depends heavily on logistics. We understand
    that delays and damages can cause significant losses. Therefore, we
    collaborate with trusted international shipping companies, airlines, and
    cargo agents to deliver your products on time. From Full Container Load
    (FCL) to Less than Container Load (LCL) shipments, we handle them all. Our
    services also extend to warehousing, packaging, labeling, and cargo
    insurance.
  </p>

  <h3 className="text-2xl font-semibold mt-6 mb-3 text-indigo-300">
    🏦 Banking, Payments & Forex Assistance
  </h3>
  <p className="mb-4">
    International trade involves multiple financial aspects like currency
    exchange, advance payments, letters of credit, and export financing. Our
    finance experts assist in setting up banking arrangements, preparing export
    bills, negotiating with buyers, and ensuring you receive payments without
    delay. We also provide guidance on hedging against forex risks.
  </p>

  <h3 className="text-2xl font-semibold mt-6 mb-3 text-indigo-300">
    📜 Government Schemes & Incentives
  </h3>
  <p className="mb-4">
    The Indian government offers several schemes to encourage exporters. Many
    businesses miss out on these due to lack of awareness. We help you claim
    benefits under schemes such as:
  </p>
  <ul className="list-disc pl-6 space-y-2">
    <li>Remission of Duties and Taxes on Exported Products (RoDTEP)</li>
    <li>Export Promotion Capital Goods (EPCG) Scheme</li>
    <li>Advance Authorization Scheme</li>
    <li>Market Access Initiative (MAI)</li>
    <li>Export Credit Guarantee Corporation (ECGC) support</li>
  </ul>

  <h3 className="text-2xl font-semibold mt-6 mb-3 text-indigo-300">
    🌎 Why Export from India?
  </h3>
  <p className="mb-4">
    India has a strong base in manufacturing, agriculture, IT, and services.
    With increasing global demand for Indian products, now is the perfect time
    to start exporting. Exporting not only provides access to larger markets but
    also strengthens India’s foreign exchange reserves. By taking your business
    global, you diversify risks, increase profitability, and build a strong
    international reputation.
  </p>

  <h3 className="text-2xl font-semibold mt-6 mb-3 text-indigo-300">
    🙋 Frequently Asked Questions
  </h3>
  <p className="mb-2"><strong>Q1: Do I need a company to start exporting?</strong><br/> You can start as a sole proprietor, but registering as an LLP or Pvt Ltd gives you credibility and more benefits.</p>
  <p className="mb-2"><strong>Q2: How long does it take to get an IEC?</strong><br/> Generally, it takes 3–5 working days after submission of correct documents.</p>
  <p className="mb-2"><strong>Q3: Can I export without an EPC registration?</strong><br/> Yes, but registering with EPCs helps you avail government benefits.</p>
  <p className="mb-2"><strong>Q4: What if I don’t have international buyers?</strong><br/> We provide market research, trade fair connections, and digital marketing strategies to help you find buyers.</p>

  <h3 className="text-2xl font-semibold mt-6 mb-3 text-indigo-300">
    🚀 Conclusion
  </h3>
  <p>
    Export is not just about selling products abroad; it is about building
    long-term international relationships, ensuring compliance, and maintaining
    consistent quality. With our <strong>Export Services</strong>, you get a
    partner that walks with you through every stage of the journey — from
    registration to revenue. Our expertise, connections, and dedication ensure
    that your business not only survives but thrives in the global market.
  </p>
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
              className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-5 py-2 rounded-lg shadow hover:shadow-emerald-400/40 transition"
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

export default Export;
