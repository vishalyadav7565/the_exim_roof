import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import axios from "axios";
import ContactForm from "../components/ContactForm";
import { Link } from "react-router-dom";
import { ShieldCheck, Lightbulb, Users } from "lucide-react";
import AboutImage from "../assets/about.jpeg";


// 🔢 Reusable Counter Component
const Counter = ({ from, to, duration = 2 }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = from;
    const increment = (to - from) / (duration * 60);
    const interval = setInterval(() => {
      start += increment;
      if (start >= to) {
        clearInterval(interval);
        setCount(to);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [from, to, duration]);

  return (
    <motion.h3
      className="text-4xl font-extrabold text-cyan-200"
      initial={{ textShadow: "0px 0px 0px rgba(59,130,246,0.8)" }}
      animate={{
        textShadow: [
          "0px 0px 5px rgba(59,130,246,0.8)",
          "0px 0px 20px rgba(59,130,246,1)",
          "0px 0px 5px rgba(59,130,246,0.8)",
        ],
      }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      {count}+
    </motion.h3>
  );
};

const Home = () => {
  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/contacts/`,
        formData
      );
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("❌ Something went wrong, please try again.");
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="text-center mt-10 px-6">
        <h1 className="text-4xl font-bold text-cyan-50">
          Welcome to The Exim Roof
        </h1>
        <p className="mt-4 text-lg text-fuchsia-200">
          Learn more about The Exim Roof and our expertise in Business,
          Finance, Tax, HR, and Global Trade.
        </p>
      </div>

{/* About Section */}

<section className="max-w-7xl mx-auto py-20 px-6">

  <h2 className="text-4xl font-extrabold mb-6 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400">
  About Us
</h2>
  <div className="grid md:grid-cols-2 gap-12 items-center">
    {/* Left Side Image */}
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="flex justify-center"
    >
      <img
        src={AboutImage}
        alt="About The Exim Roof"
        className="rounded-3xl shadow-2xl max-h-96 object-cover hover:scale-105 transition-transform duration-500"
      />
    </motion.div>

    {/* Right Side Content */}
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      
      <p className="text-white/90 leading-relaxed mb-4 text-lg">
        At <span className="font-semibold text-cyan-300">The Exim Roof</span>, we are passionate about simplifying business and compliance for startups, SMEs, and global enterprises. Our experts ensure that finance, tax, HR, and international trade are never roadblocks to growth.
      </p>
      <p className="text-white/80 leading-relaxed mb-4 text-lg">
        From <span className="text-emerald-300">GST registration</span> to 
        <span className="text-emerald-300"> ITR filing</span>, 
        <span className="text-emerald-300"> company incorporation</span>, 
        <span className="text-emerald-300"> import-export compliance</span>, 
        and <span className="text-emerald-300"> HR consultancy</span>, 
        we provide comprehensive business solutions under one roof.
      </p>
      <p className="text-white/70 leading-relaxed text-lg">
        Our mission is simple: <span className="text-cyan-300 font-medium">empower businesses with expert-driven, reliable, and transparent solutions</span>, helping them scale confidently.
      </p>
    </motion.div>
  </div>

  {/* Core Values Grid */}
  <div className="mt-20">
    <h3 className="text-4xl font-extrabold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400 mb-12">
      Our Core Values
    </h3>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Integrity */}
      <motion.div
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="p-8 rounded-3xl bg-gradient-to-tr from-pink-600/10 to-pink-500/20 backdrop-blur-md border border-pink-400 shadow-lg text-center cursor-pointer hover:shadow-pink-400/50 transition"
      >
        <ShieldCheck className="w-12 h-12 mx-auto mb-5 text-pink-400" />
        <h4 className="text-2xl font-bold text-pink-300 mb-3">Integrity</h4>
        <p className="text-white/80 leading-relaxed">
          Honesty, ethics, and transparency are at the core of everything we do.
        </p>
      </motion.div>

      {/* Innovation */}
      <motion.div
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="p-8 rounded-3xl bg-gradient-to-tr from-indigo-600/10 to-indigo-500/20 backdrop-blur-md border border-indigo-400 shadow-lg text-center cursor-pointer hover:shadow-indigo-400/50 transition"
      >
        <Lightbulb className="w-12 h-12 mx-auto mb-5 text-indigo-400" />
        <h4 className="text-2xl font-bold text-indigo-300 mb-3">Innovation</h4>
        <p className="text-white/80 leading-relaxed">
          Embracing new ideas and technology to deliver smarter solutions.
        </p>
      </motion.div>

      {/* Customer First */}
      <motion.div
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="p-8 rounded-3xl bg-gradient-to-tr from-emerald-600/10 to-emerald-500/20 backdrop-blur-md border border-emerald-400 shadow-lg text-center cursor-pointer hover:shadow-emerald-400/50 transition"
      >
        <Users className="w-12 h-12 mx-auto mb-5 text-emerald-400" />
        <h4 className="text-2xl font-bold text-emerald-300 mb-3">Customer First</h4>
        <p className="text-white/80 leading-relaxed">
          Clients are at the heart of everything we do, ensuring trust and satisfaction.
        </p>
      </motion.div>
    </div>
  </div>
</section>



      {/* Services Section */}
      <section className="py-16 px-6">
  <h2 className="text-3xl font-bold mb-10 text-center text-cyan-200">
    Our Services
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {[
      { name: "GST Registration", path: "gst", glow: "0 0 25px rgba(16,185,129,0.8)", bg: "rgba(16,185,129,0.15)" },
      { name: "ITR Return", path: "itr-return", glow: "0 0 25px rgba(6,182,212,0.8)", bg: "rgba(6,182,212,0.15)" },
      { name: "Company Registration", path: "company", glow: "0 0 25px rgba(234,179,8,0.8)", bg: "rgba(234,179,8,0.15)" },
      { name: "Consultancy", path: "consultancy", glow: "0 0 25px rgba(168,85,247,0.8)", bg: "rgba(168,85,247,0.15)" },
      { name: "Human Resources", path: "manpower", glow: "0 0 25px rgba(236,72,153,0.8)", bg: "rgba(236,72,153,0.15)" },
      { name: "Import", path: "import", glow: "0 0 25px rgba(16,185,129,0.8)", bg: "rgba(16,185,129,0.15)" },
      { name: "Export", path: "export", glow: "0 0 25px rgba(6,182,212,0.8)", bg: "rgba(6,182,212,0.15)" },
      { name: "E-commerce", path: "ecommerce", glow: "0 0 25px rgba(168,85,247,0.8)", bg: "rgba(168,85,247,0.15)" },
      { name: "Finance", path: "finance", glow: "0 0 25px rgba(234,179,8,0.8)", bg: "rgba(234,179,8,0.15)" },
    ].map((service, index) => (
      <Link key={index} to={`/service/${service.path}`}>
        <motion.div
          className="p-6 rounded-xl cursor-pointer"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{
            scale: 1.08,
            backgroundColor: service.bg,
            boxShadow: service.glow,
          }}
          style={{
            backgroundColor: "transparent",
            boxShadow: `5px 25px 75px rgba(0,0,0,0.75),
                        10px 10px 70px rgba(0,0,0,0.25),
                        inset 5px 5px 10px rgba(0,0,0,0.5),
                        inset 5px 5px 20px rgba(255,255,255,0.2),
                        inset -5px -5px 15px rgba(0,0,0,0.75)`,
          }}
        >
          <h3 className="text-xl font-semibold text-emerald-200">{service.name}</h3>
          <p className="text-fuchsia-200 mt-2">
            Expert solutions tailored for your business needs in{" "}
            {service.name.toLowerCase()}.
          </p>
        </motion.div>
      </Link>
    ))}
  </div>
</section>

      {/* Achievements Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-cyan-200">
          Our Biggest Achievements
        </h2>
        <p className="text-cyan-200 max-w-3xl mx-auto">
          Over the years, we have helped thousands of businesses scale globally,
          simplify compliance, and achieve financial growth.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          <div>
            <Counter from={0} to={500} duration={3} />
            <p className="text-cyan-200">Clients Served</p>
          </div>
          <div>
            <Counter from={0} to={200} duration={3} />
            <p className="text-cyan-200">Company Registrations</p>
          </div>
          <div>
            <Counter from={0} to={300} duration={3} />
            <p className="text-cyan-200">GST Returns Filed</p>
          </div>
          <div>
            <Counter from={0} to={50} duration={3} />
            <p className="text-cyan-200">Expert Consultants</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center text-cyan-200">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-transparent p-6 rounded-xl shadow">
            <p className="text-cyan-200">
              "The Exim Roof made our company registration smooth and
              hassle-free!"
            </p>
            <h4 className="mt-4 font-semibold text-blue-700">- Rajesh Sharma</h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-700">
              "They handle all our GST and ITR filing with perfection."
            </p>
            <h4 className="mt-4 font-semibold text-blue-700">- Priya Verma</h4>
          </div>
        </div>
      </section>

      {/* Blog & Articles */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Blog & Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["GST Updates", "ITR Tips", "Global Trade Insights"].map(
            (blog, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">{blog}</h3>
                <p className="text-gray-600 mt-2">
                  Stay updated with the latest in {blog.toLowerCase()}.
                </p>
                <a
                  href="#"
                  className="mt-3 inline-block text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </a>
              </div>
            )
          )}
        </div>
      </section>
  
     {/*contact form*/}
    <ContactForm/>
    </MainLayout>
  );
};

export default Home;
