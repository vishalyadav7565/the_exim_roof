import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CompanyRegistrationPage = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", text: "" });

  // Load comments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("companyRegComments");
    if (saved) setComments(JSON.parse(saved));
  }, []);

  // Save comments to localStorage
  useEffect(() => {
    localStorage.setItem("companyRegComments", JSON.stringify(comments));
  }, [comments]);

  const handleComment = (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.text) return;

    const comment = {
      id: Date.now(),
      name: newComment.name,
      text: newComment.text,
      time: new Date().toLocaleString(),
    };

    setComments((prev) => [...prev, comment]);
    setNewComment({ name: "", text: "" });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white py-12 px-6">
        {/* Hero Section */}
        <section className="relative w-full h-[350px] mt-20 mb-12">
          <img
            src="/company-registration.jpg" // 👉 Replace with your banner image
            alt="Company Registration"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              Company Registration
            </h1>
            <p className="text-fuchsia-100 mt-4 text-lg md:text-xl max-w-2xl">
              Register your company quickly, legally, and hassle-free with our expert assistance.
            </p>
          </div>
        </section>

        {/* Service Content */}
        <section className="bg-white/5 backdrop-blur-lg border border-cyan-400 shadow-lg rounded-2xl p-8 mb-12 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-cyan-200">📑 About Our Service</h2>

          <div className="text-fuchsia-100 leading-relaxed space-y-6">
            <p>
              Starting a company is one of the most exciting decisions in anyone’s professional
              journey. It represents a fresh beginning, an idea turning into reality, and the chance
              to build something meaningful. However, the legal and procedural formalities that come
              with company registration can often be overwhelming. Many entrepreneurs feel lost when
              it comes to deciding the right structure for their business, understanding compliance
              requirements, or even knowing where to begin. This is where our{" "}
              <strong>Company Registration Service</strong> becomes your trusted partner.
            </p>

            <p>
              We specialize in making the registration process smooth, transparent, and hassle-free.
              Whether you are a solo entrepreneur starting a small venture or a group of partners
              planning to launch a large business, our team guides you at every step. We believe that
              entrepreneurs should focus on their vision, products, and growth, while we take care of
              all the legal paperwork and compliance behind the scenes.
            </p>

            <h3 className="text-xl font-semibold text-cyan-300">
              Why is Company Registration Important?
            </h3>
            <p>
              Registering your company is not just about paperwork; it is about giving your business
              a <strong>legal identity</strong>. A registered company builds trust with customers,
              suppliers, banks, and investors. It also offers protection from personal liability,
              ensures compliance with government rules, and opens the door to various benefits such
              as funding opportunities, tax advantages, and business credibility.
            </p>

            <h3 className="text-xl font-semibold text-cyan-300">Our Expertise</h3>
            <p>We provide end-to-end support for different types of business entities:</p>
            <ul className="list-disc pl-6">
              <li>✅ Private Limited Company (Pvt Ltd)</li>
              <li>✅ Limited Liability Partnership (LLP)</li>
              <li>✅ One Person Company (OPC)</li>
              <li>✅ Partnership Firm</li>
              <li>✅ Sole Proprietorship</li>
              <li>✅ NGO / Section 8 Company</li>
            </ul>
            <p>
              We also assist with <strong>GST Registration, PAN, TAN, IEC</strong>, and other
              compliance requirements to make your company fully operational.
            </p>

            <h3 className="text-xl font-semibold text-cyan-300">
              Step-by-Step Registration Process
            </h3>
            <ol className="list-decimal pl-6">
              <li>Consultation & Planning</li>
              <li>Name Reservation with ROC</li>
              <li>Preparation of Documents (MOA, AOA, etc.)</li>
              <li>Digital Signatures & DIN</li>
              <li>Filing with MCA</li>
              <li>Approval & Incorporation Certificate</li>
              <li>Post-Incorporation Compliance</li>
            </ol>

            <h3 className="text-xl font-semibold text-cyan-300">
              Benefits of Choosing Our Service
            </h3>
            <ul className="list-disc pl-6">
              <li>Expert Guidance with years of experience</li>
              <li>Time-Saving hassle-free process</li>
              <li>Affordable Pricing with no hidden charges</li>
              <li>End-to-End Support from start to compliance</li>
              <li>Customer-Focused approach</li>
            </ul>

            <h3 className="text-xl font-semibold text-cyan-300">Why Act Now?</h3>
            <p>
              Delaying company registration can limit your opportunities. Customers, vendors, and
              investors prefer working with registered businesses because they offer trust and
              accountability. By registering your business today, you open the door to growth
              tomorrow.
            </p>

            <h3 className="text-xl font-semibold text-cyan-300">Our Promise</h3>
            <p>
              We are more than just a registration service. We are your partners in growth. Our
              mission is to simplify business compliance and create a stress-free journey for
              entrepreneurs. With our support, you can focus on building your brand, reaching
              customers, and achieving your goals while we handle all the legal complexities.
            </p>
          </div>
        </section>

        {/* Comments Section */}
        <section className="bg-white/5 backdrop-blur-lg border border-emerald-400 shadow-lg rounded-2xl p-8 mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-emerald-300 mb-6">💬 Comments</h2>

          {/* Show Comments */}
          <div className="mb-6 space-y-4">
            {comments.length > 0 ? (
              comments.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-lg bg-white/10 border border-emerald-500/30"
                >
                  <p className="text-fuchsia-100">“{c.text}”</p>
                  <p className="text-sm text-gray-400 mt-1">
                    – {c.name} | 🕒 {c.time}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No comments yet. Be the first!</p>
            )}
          </div>

          {/* Comment Form */}
          <form onSubmit={handleComment} className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              value={newComment.name}
              onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
              className="border border-emerald-400 bg-transparent p-2 rounded w-full focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
            <textarea
              placeholder="Write your comment..."
              value={newComment.text}
              onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
              className="border border-emerald-400 bg-transparent p-2 rounded w-full focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-5 py-2 rounded-lg shadow hover:shadow-emerald-400/40 transition"
            >
              Submit Comment
            </button>
          </form>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default CompanyRegistrationPage;
