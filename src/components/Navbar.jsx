import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/blogs?search=${encodeURIComponent(search)}`);
      setSearch("");
      setIsOpen(false); // close mobile menu after search
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 p-6 transition-colors duration-500 ease-in-out ${
        isScrolled
          ? "backdrop-blur-sm bg-black/40 text-white shadow-lg"
          : "backdrop-blur-md bg-black/30 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">The Exim Roof</h1>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-6 font-medium items-center">
          <li>
            <Link to="/" className="hover:text-blue-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-400 transition">
              About Us
            </Link>
          </li>

          {/* Services Dropdown */}
          <li className="relative group">
            <button className="flex items-center hover:text-blue-400 transition">
              Services
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <ul className="absolute left-0 mt-2 w-56 rounded-lg shadow-lg transition-all duration-300 ease-in-out bg-black/80 text-white opacity-0 group-hover:opacity-100 invisible group-hover:visible">
              <li>
                <Link to="/service/gst" className="block px-4 py-2 hover:bg-gray-700">
                  GST Return Filing Services
                </Link>
              </li>
              <li>
                <Link to="/service/company" className="block px-4 py-2 hover:bg-gray-700">
                  Private Limited Company
                </Link>
              </li>
              <li>
                <Link to="/service/msme" className="block px-4 py-2 hover:bg-gray-700">
                  MSME Registration
                </Link>
              </li>
              <li>
                <Link to="/service/manpower" className="block px-4 py-2 hover:bg-gray-700">
                  Manpower Recruitment
                </Link>
              </li>
              <li>
                <Link to="/service/consultancy" className="block px-4 py-2 hover:bg-gray-700">
                  Consultancy Services
                </Link>
              </li>
              <li>
                <Link to="/service/export" className="block px-4 py-2 hover:bg-gray-700">
                  Export Services
                </Link>
              </li>
              <li>
                <Link to="/service/customs" className="block px-4 py-2 hover:bg-gray-700">
                  Customs
                </Link>
              </li>
            </ul>
          </li>

          {/* Blog Link */}
          <li>
            <Link to="/blogs" className="hover:text-blue-400 transition">
              Blogs
            </Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-blue-400 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Desktop Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center ml-6">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-l w-52 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded-r hover:bg-blue-700 text-white"
          >
            🔍
          </button>
        </form>

        {/* Enquiry Button */}
        <Link
          to="/enquiry"
          className="hidden md:block px-5 py-2 rounded-lg transition bg-blue-600 text-white hover:bg-blue-700 ml-4"
        >
          Enquiry Now
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden shadow-md bg-black/90 text-white backdrop-blur-md">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="flex p-3">
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-3 py-2 rounded-l focus:outline-none bg-white text-black placeholder-gray-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded-r hover:bg-blue-700 text-white"
            >
              🔍
            </button>
          </form>

          <ul className="flex flex-col space-y-2 p-4 font-medium">
            <li>
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400">
                About Us
              </Link>
            </li>

            {/* Services Dropdown (Expanded) */}
            <li>
              <span className="font-semibold">Services</span>
              <ul className="ml-4 mt-2 space-y-1">
                <li>
                  <Link to="/service/gst" className="block hover:text-blue-400">
                    GST Return Filing Services
                  </Link>
                </li>
                <li>
                  <Link to="/service/company" className="block hover:text-blue-400">
                    Private Limited Company
                  </Link>
                </li>
                <li>
                  <Link to="/service/msme" className="block hover:text-blue-400">
                    MSME Registration
                  </Link>
                </li>
                <li>
                  <Link to="/service/manpower" className="block hover:text-blue-400">
                    Manpower Recruitment
                  </Link>
                </li>
                <li>
                  <Link to="/service/consultancy" className="block hover:text-blue-400">
                    Consultancy Services
                  </Link>
                </li>
                <li>
                  <Link to="/service/itr" className="block hover:text-blue-400">
                    Salaried Individual Tax Filing
                  </Link>
                </li>
                <li>
                  <Link to="/service/import-export" className="block hover:text-blue-400">
                    Import-Export Services
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/blogs" className="hover:text-blue-400">
                Blogs
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-blue-400">
                Contact Us
              </Link>
            </li>

            <li>
              <Link
                to="/enquiry"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Enquiry Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
