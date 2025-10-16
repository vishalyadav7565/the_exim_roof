import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Enquiry from "./components/enquiry";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Enquiry" element={<Enquiry />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        {/* Nested service routes */}
        <Route path="/service/*" element={<Service />} />
      </Routes>
    </Router>
  );
};

export default App;
