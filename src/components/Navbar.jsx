import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import blogData from "../utils/blogData";
import serviceData from "../utils/serviceData";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState(""); // ✅ added
  const [results, setResults] = useState([]);
const [serviceOpen, setServiceOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = React.useRef(null);
  useEffect(() => {
  if (!isOpen) {
    setServiceOpen(false);
  }
}, [isOpen]);
useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  if (isOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= LIVE SEARCH ================= */
  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    const query = search.toLowerCase();
    const combined = [...blogData, ...serviceData];

    const filtered = combined.filter((item) =>
      item.title.toLowerCase().includes(query)
    );

    setResults(filtered);
  }, [search]);

  /* ================= SUBMIT SEARCH ================= */
  const handleSearch = (e) => {
    e.preventDefault();

    if (results.length > 0) {
      const first = results[0];

      if (first.type === "blog") {
        navigate(`/blogs/${first.slug}`);
      } else {
        navigate(`/service/${first.slug}`);
      }
    }

    setSearch("");
    setResults([]);
    setIsOpen(false);
  };

  return (
  <nav className={`fixed w-full z-50 h-20 transition-all duration-500
  ${isScrolled 
    ? "bg-gradient-to-r from-white/90 via-gray-200/80 to-black/90 backdrop-blur-lg shadow-lg" 
    : "bg-gradient-to-r from-white/70 via-gray-300/60 to-black/70 backdrop-blur-md"
  }`}>
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">
          <Link to="/"><img 
  src={Logo} 
  alt="The Exim Roof" 
  className="h-full max-h-40 w-auto object-contain" 
/></Link>
        </h1>

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
              <li><Link to="/service/gst" className="block px-4 py-2 hover:bg-gray-700">GST Return Filing Services</Link></li>
              <li><Link to="/service/legal-metrology-certificate-in-india" className="block px-4 py-2 hover:bg-gray-700">Legal Metrology (LMPC)</Link></li>
              <li><Link to="/service/company" className="block px-4 py-2 hover:bg-gray-700">Private Limited Company</Link></li>
              <li><Link to="/service/msme" className="block px-4 py-2 hover:bg-gray-700">MSME Registration</Link></li>
              <li><Link to="/service/manpower" className="block px-4 py-2 hover:bg-gray-700">Manpower Recruitment</Link></li>
              <li><Link to="/service/consultancy" className="block px-4 py-2 hover:bg-gray-700">Consultancy Services</Link></li>
              <li><Link to="/service/export" className="block px-4 py-2 hover:bg-gray-700">Export Services</Link></li>
              <li><Link to="/service/customs" className="block px-4 py-2 hover:bg-gray-700">Customs</Link></li>
            </ul>
          </li>

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

        {/* ================= DESKTOP SEARCH ================= */}
        <div className="hidden md:block relative ml-6"> {/* ✅ added relative */}
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
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

          {/* 🔥 Search Dropdown */}
          {results.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white text-black rounded shadow-lg z-50 max-h-60 overflow-y-auto">
              {results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.type === "blog") {
                      navigate(`/blogs/${item.slug}`);
                    } else {
                      navigate(`/service/${item.slug}`);
                    }
                    setSearch("");
                    setResults([]);
                  }}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex justify-between"
                >
                  <span>{item.title}</span>
                  <span className="text-xs text-gray-500">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enquiry Button */}
        <Link
          to="/enquiry"
          className="hidden md:block px-5 py-2 rounded-lg transition bg-blue-600 text-white hover:bg-blue-700 ml-4"
        >
          Enquiry Now
        </Link>

       {/* ================= MOBILE MENU ================= */}
<div
  ref={menuRef}
  className={`md:hidden fixed top-[88px] left-0 w-full bg-black/95 text-white backdrop-blur-lg shadow-xl transform transition-all duration-300 ease-in-out z-40 ${
    isOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 pointer-events-none"
  }`}
>

  {/* 🔍 Search */}
  <div className="p-4 border-b border-gray-700 relative">
    <form onSubmit={handleSearch} className="flex">
      <input
        type="text"
        placeholder="Search blogs & services..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 px-3 py-2 rounded-l bg-white text-black focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 rounded-r hover:bg-blue-700"
      >
        🔍
      </button>
    </form>

    {/* Live Results */}
    {results.length > 0 && (
      <div className="absolute left-4 right-4 top-16 bg-white text-black rounded shadow-lg max-h-60 overflow-y-auto z-50">
        {results.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              navigate(
                item.type === "blog"
                  ? `/blogs/${item.slug}`
                  : `/service/${item.slug}`
              );
              setSearch("");
              setResults([]);
              setIsOpen(false);
            }}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex justify-between"
          >
            <span>{item.title}</span>
            <span className="text-xs text-gray-500">{item.type}</span>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* 📌 Menu Links */}
  <ul className="flex flex-col p-4 space-y-4 font-medium">

    <li>
      <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
        Home
      </Link>
    </li>

    <li>
      <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
        About Us
      </Link>
    </li>

    {/* Services Toggle */}
    <li>
      <button
        onClick={() => setServiceOpen(!serviceOpen)}
        className="flex justify-between items-center w-full hover:text-blue-400"
      >
        Services
        <span className="text-sm">{serviceOpen ? "▲" : "▼"}</span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          serviceOpen ? "max-h-96 mt-3" : "max-h-0"
        }`}
      >
        <ul className="ml-4 space-y-3 text-sm text-gray-300">

          <li><Link to="" onClick={() => setIsOpen(false)}>GST Return Filing</Link></li>
          <li><Link to="/service/legal-metrology-certificate-in-india" onClick={() => setIsOpen(false)}>Legal Metrology (LMPC)</Link></li>
          <li><Link to="/service/company" onClick={() => setIsOpen(false)}>Private Limited Company</Link></li>
          <li><Link to="/service/msme" onClick={() => setIsOpen(false)}>MSME Registration</Link></li>
          <li><Link to="/service/manpower" onClick={() => setIsOpen(false)}>Manpower Recruitment</Link></li>
          <li><Link to="/service/consultancy" onClick={() => setIsOpen(false)}>Consultancy Services</Link></li>
          <li><Link to="/service/export" onClick={() => setIsOpen(false)}>Export Services</Link></li>
          <li><Link to="/service/customs" onClick={() => setIsOpen(false)}>Customs</Link></li>

        </ul>
      </div>
    </li>

    <li>
     <Link
    to="/blogs"
    onClick={() => setIsOpen(false)}
    className="hover:text-blue-400"
  >
    Blogs
  </Link>
    </li>

    <li>
      <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
        Contact Us
      </Link>
    </li>

    <li>
      <Link
        to="/enquiry"
        onClick={() => setIsOpen(false)}
        className="block text-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
      >
        Enquiry Now
      </Link>
    </li>

  </ul>
</div>
        {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-3xl text-white focus:outline-none"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white/90
        flex flex-col items-center justify-center
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 text-white text-3xl"
        >
          ✕
        </button>
      </div>
</div>
    
    </nav>
    
  );
};

export default Navbar;