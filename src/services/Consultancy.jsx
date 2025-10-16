import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { motion } from "framer-motion";

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL;

const Consultancy = ({ Image }) => {
  const [generalComment, setGeneralComment] = useState({ name: "", text: "" });
  const [allComments, setAllComments] = useState([]);

  const handleGeneralComment = async (e) => {
    e.preventDefault();
    if (!generalComment.name || !generalComment.text) return;

    const newComment = {
      id: Date.now(),
      name: generalComment.name,
      text: generalComment.text,
      created_at: new Date().toISOString(),
    };

    try {
      await axios.post(CONTACT_API_URL, newComment);
      setAllComments([newComment, ...allComments]);
      setGeneralComment({ name: "", text: "" });
    } catch (err) {
      console.error("❌ Error posting comment:", err.response || err);
    }
  };

  return (
    <>
      <Navbar />

      {/* Page Container */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white py-12 px-6">
        
        {/* Hero Banner */}
        <section className="relative w-full h-[400px] mt-20 mb-12">
          <img
            src={Image}
            alt="Consultancy Services"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              Expert Business Consultancy
            </h1>
            <p className="text-fuchsia-100 mt-4 text-lg md:text-xl max-w-2xl">
              Professional guidance to grow, optimize, and scale your business.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-block bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-cyan-400/40 transition font-semibold"
            >
              Get Consultation
            </a>
          </div>
        </section>

        {/* About Consultancy (1000 words content) */}
        <motion.section
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-purple-400 shadow-lg rounded-2xl p-8 mb-12 max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
            About Our Consultancy
          </h2>
          <div className="space-y-4 text-fuchsia-100 leading-relaxed">
            <p>
              At <strong>Company Registration & Business Consultancy</strong>, we specialize in helping entrepreneurs,
              startups, and established businesses navigate the often-complex world of company formation,
              compliance, taxation, and strategic growth. Our consultancy is built on a foundation of trust,
              expertise, and a deep understanding of the evolving business landscape in India and beyond.
            </p>
            <p>
              Our team of experts works closely with clients to identify their unique needs and craft tailored
              solutions. Whether you are registering your first company, restructuring an existing organization,
              or exploring international expansion, we ensure that your journey is smooth, compliant, and aligned
              with your long-term goals.
            </p>
            <p>
              One of our core strengths is <em>Company Registration Services</em>. We simplify the process by handling
              every legal and procedural requirement, including name approval, drafting incorporation documents,
              filing with the Ministry of Corporate Affairs (MCA), and obtaining PAN, TAN, and GST registrations.
              By outsourcing this responsibility to us, our clients save valuable time and avoid costly mistakes.
            </p>
            <p>
              Beyond registration, we offer <strong>Business Strategy Consulting</strong>, where we analyze your
              industry, study competitors, and design strategies that maximize profitability and minimize risks.
              Our consultants are seasoned professionals who combine data-driven insights with practical experience,
              ensuring that you stay ahead in today’s competitive market.
            </p>
            <p>
              Financial planning and compliance are at the heart of sustainable growth. We provide expert guidance on
              taxation, bookkeeping, audits, and regulatory filings. This not only ensures compliance with Indian
              laws but also builds investor confidence, making it easier for businesses to secure funding or expand.
            </p>
            <p>
              Our consultancy also extends to <em>Licensing & Certifications</em>, including FSSAI, MSME, ISO, Import
              Export Code (IEC), and trademark registrations. By helping clients obtain the right certifications,
              we enhance their credibility and open new avenues of opportunity in both domestic and international
              markets.
            </p>
            <p>
              What sets us apart is our <strong>client-first approach</strong>. We don’t just provide services; we
              build long-term relationships. Each business is unique, and so are our solutions. From handholding
              startups in their initial years to supporting multinational corporations with complex compliance
              frameworks, we treat every project with equal importance.
            </p>
            <p>
              With globalization and digital transformation reshaping industries, businesses need agile partners who
              understand both local and global requirements. Our consultancy bridges that gap by offering end-to-end
              services, combining traditional expertise with modern tools like digital filing systems, cloud-based
              accounting, and real-time compliance tracking.
            </p>
            <p>
              Over the years, we have empowered hundreds of businesses to launch, stabilize, and scale. Our success
              stories include small startups that became profitable enterprises, family businesses that transitioned
              into private limited companies, and enterprises that successfully expanded into global markets. Each
              milestone achieved by our clients reflects our commitment and passion.
            </p>
            <p>
              Looking ahead, our mission is to continue being a trusted partner for businesses of all sizes. We
              envision a future where every entrepreneur, regardless of background, has access to expert consultancy
              that enables them to thrive. With innovation, transparency, and excellence at our core, we remain
              dedicated to simplifying business for you.
            </p>
          </div>
        </motion.section>

        {/* Comment Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-emerald-400 shadow-lg rounded-2xl p-8 mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-emerald-300 mb-6">
            💬 Leave a Comment
          </h2>

          <form onSubmit={handleGeneralComment} className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              value={generalComment.name}
              onChange={(e) =>
                setGeneralComment({ ...generalComment, name: e.target.value })
              }
              className="border border-emerald-400 bg-black/30 p-2 rounded w-full focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
            <textarea
              placeholder="Write your comment..."
              value={generalComment.text}
              onChange={(e) =>
                setGeneralComment({ ...generalComment, text: e.target.value })
              }
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

          {/* Display Comments */}
          <div className="mt-6 space-y-4">
            {allComments.length > 0 ? (
              allComments.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-lg bg-white/10 border border-emerald-500/30"
                >
                  <p className="text-fuchsia-100">“{c.text}”</p>
                  <p className="text-sm text-gray-400 mt-1">
                    – {c.name} •{" "}
                    {new Date(c.created_at).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No comments yet.</p>
            )}
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          id="contact"
          className="my-10 max-w-4xl mx-auto"
        >
          <ContactForm />
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default Consultancy;
