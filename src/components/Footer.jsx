import React, { useState, useEffect } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  ArrowUp,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import FooterComments from "./FooterComments";

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-gradient-to-br from-[#010203] via-[#1b2b2a] to-[#091413] text-gray-300 overflow-hidden">

      {/* ================= TOP CONTACT BAR ================= */}
      <div className="bg-black/60 border-b border-white/10 px-6 py-3 flex flex-col md:flex-row items-center justify-between text-sm">
        <span className="text-gray-300">
          Need Help? Talk to our Compliance Experts
        </span>

        <div className="flex flex-wrap items-center gap-5 mt-2 md:mt-0">
          <span className="flex items-center gap-1">
            <Phone size={14} /> +91-8546066019
          </span>

          <span className="flex items-center gap-1">
            <Mail size={14} /> info@theeximroof.com
          </span>

          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/theeximroof"
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label="Facebook"
              className="hover:text-yellow-400 transition"
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://www.instagram.com/theeximroof/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label="Instagram"
              className="hover:text-yellow-400 transition"
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://www.linkedin.com/company/the-exim-roof/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label="LinkedIn"
              className="hover:text-yellow-400 transition"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 relative">

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {["Home", "About Us", "Services", "Blogs", "Career", "Contact"].map(
              (link) => (
                <li
                  key={link}
                  className="hover:text-yellow-400 cursor-pointer transition"
                >
                  {link}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            Policies
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              "Corporate Profile",
              "CSR Policy",
              "Privacy Policy",
              "Anti-Bribery Policy",
              "Latest Updates",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-yellow-400 cursor-pointer transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Office */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">
            Our Office
          </h3>

          <p className="text-sm flex gap-2 mb-3">
            <MapPin size={16} />
            The Exim Roof, Noida, Uttar Pradesh, India
          </p>

          <div className="aspect-[16/9] rounded-lg overflow-hidden border border-white/10 shadow-lg">
            <iframe
              title="The Exim Roof Location"
              src="https://www.google.com/maps?q=The+Exim+Roof&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=The+Exim+Roof"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-block mt-3 text-sm text-yellow-400 hover:underline"
          >
            Get Directions →
          </a>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            Newsletter
          </h3>

          <p className="text-sm mb-3">
            Stay updated with compliance & certification news.
          </p>

          <form className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
            />

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-500 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ================= COMMENTS SECTION ================= */}
<div className="relative z-10 bg-black/50 border-t border-white/10 py-10">
  <div className="max-w-7xl mx-auto px-6">
    <h3 className="text-center text-yellow-400 text-lg font-semibold mb-50">
  
    </h3>

    <FooterComments/>
  </div>
</div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="bg-black/70 py-4 text-center text-sm text-gray-400">
        © 2026{" "}
        <span className="text-yellow-400 font-medium">
          The Exim Roof
        </span>. All Rights Reserved.
        <br />
        Designed by{" "}
        <a
          href="https://www.instagram.com/novusviatech/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-yellow-400 hover:underline"
        >
          Novusviatech
        </a>
      </div>

      {/* ================= SCROLL TO TOP ================= */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-yellow-400 text-black p-3 rounded-full shadow-xl hover:scale-110 transition"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;