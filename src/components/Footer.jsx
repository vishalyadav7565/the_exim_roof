import React, { useState, useEffect } from "react";
import { Facebook, Instagram, Linkedin, ArrowUp } from "lucide-react";

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-gradient-to-br from-[#010203] via-[#424343] to-[#091413] overflow-hidden">
      {/* Top Contact Bar */}
      <div className="bg-[#424343] px-6 py-3 flex flex-col md:flex-row items-center justify-between text-sm space-y-2 md:space-y-0">
        <div className="space-y-1 md:space-y-0 md:space-x-4 text-center md:text-left">
          <p>
            <span className="text-yellow-400 font-semibold">Corporate Office:</span>{" "}
            C–100, Sec–2, Noida, UP – 201301
          </p>
          <p>
            <span className="text-yellow-400 font-semibold ">Registered Office:</span>{" "}
            73, National Park, Lajpat Nagar–IV, New Delhi – 110024
          </p>
        </div>
        <div className="flex items-center space-x-5 text-sm">
          <p>📞 +91-999900-3311</p>
          <p>✉️ info@ascgroup.in</p>
          <div className="flex space-x-3">
            <a href="#" className="hover:text-yellow-400"><Facebook size={18} /></a>
            <a href="#" className="hover:text-yellow-400"><Instagram size={18} /></a>
            <a href="#" className="hover:text-yellow-400"><Linkedin size={18} /></a>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 relative">
        {/* Background pattern mimic */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#012b85_0%,_#00184a_80%)] opacity-60 -z-10"></div>

        {/* Important Links */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Important Links</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>Home</li>
            <li>About Us</li>
            <li>Blogs</li>
            <li>Career</li>
            <li>Contact Us</li>
            <li>Newsletter</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>Corporate Profile</li>
            <li>CSR Policy</li>
            <li>Privacy Policy</li>
            <li>Anti Bribery Policy</li>
            <li>Latest Update</li>
            <li>Local Page</li>
          </ul>
        </div>

        {/* Group Websites */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Group Websites</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li><a href="#" className="hover:text-yellow-400">www.ascgroup.sg</a></li>
            <li><a href="#" className="hover:text-yellow-400">www.insolvencyservices.in</a></li>
            <li><a href="#" className="hover:text-yellow-400">www.asccertification.com</a></li>
            <li><a href="#" className="hover:text-yellow-400">www.ascventures.ca</a></li>
            <li><a href="#" className="hover:text-yellow-400">www.legalmetrology.in</a></li>
            <li><a href="#" className="hover:text-yellow-400">www.eximadvisory.com</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Newsletter Subscription</h3>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-3 py-2 rounded-md bg-white/10 border border-gray-400 text-white placeholder-gray-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-3 py-2 rounded-md bg-white/10 border border-gray-400 text-white placeholder-gray-300"
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 text-[#002366] font-semibold py-2 rounded-md hover:bg-yellow-500 transition"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#001a4d] py-4 text-center text-gray-300 text-sm">
        © 2025 ASC Group. All Rights Reserved. Designed by{" "}
        <a href="https://www.instagram.com/novusviatech/" className="text-yellow-400 hover:underline">
          Novusviatech
        </a>
      </div>

      {/* Scroll To Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-400 hover:bg-blue-500 text-[#002366] p-3 rounded-full shadow-lg transition duration-300"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
