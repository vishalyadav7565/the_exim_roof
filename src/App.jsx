import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Enquiry from "./components/enquiry";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";
import AppCMS from "./cms/AppCMS";
import CMSPage from "./pages/CMSPage";
import ScrollToTop from "./components/ScrollToTop";

// Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";


// ----------------------------------------------------
// META UPDATER COMPONENT
// ----------------------------------------------------
const MetaUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.toLowerCase();

    const meta = {
      "/": {
        title: "Home | The Exim Roof",
        desc: "Welcome to The Exim Roof — your trusted export and import partner for global business growth.",
        image: "/seo/home-banner.jpg",
      },
      "/about": {
        title: "About Us | The Exim Roof",
        desc: "Learn more about The Exim Roof — our mission, expertise, and commitment to international trade excellence.",
        image: "/seo/about-banner.jpg",
      },
      "/contact": {
        title: "Contact | The Exim Roof",
        desc: "Reach out to The Exim Roof team for business inquiries, partnerships, and export-import assistance.",
        image: "/seo/contact-banner.jpg",
      },
      "/enquiry": {
        title: "Enquiry | The Exim Roof",
        desc: "Submit your enquiry and our experts will connect with you for customized export-import solutions.",
        image: "/seo/enquiry-banner.jpg",
      },
      "/blogs": {
        title: "Blogs | The Exim Roof",
        desc: "Stay updated with export-import trends, logistics tips, and trade insights from The Exim Roof.",
        image: "/seo/blogs-banner.jpg",
      },
      "/service": {
        title: "Services | The Exim Roof",
        desc: "Explore our global trade, logistics, and export-import services tailored to your business growth.",
        image: "/seo/services-banner.jpg",
      },
    };

    let { title, desc, image } = meta[path] || {
      title: "The Exim Roof",
      desc: "Leading Export-Import Platform for Global Trade.",
      image: "/seo/default-banner.jpg",
    };

    if (path.startsWith("/blog/")) {
      title = "Blog Detail | The Exim Roof";
      desc = "Detailed insights, articles, and updates from The Exim Roof blog.";
      image = "/seo/blog-detail.jpg";
    }

    document.title = title;

    const setMeta = (attr, value, isProperty = false) => {
      let selector = isProperty
        ? `meta[property='${attr}']`
        : `meta[name='${attr}']`;

      let tag = document.querySelector(selector);

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(isProperty ? "property" : "name", attr);
        document.head.appendChild(tag);
      }

      tag.setAttribute("content", value);
    };

    setMeta("description", desc);
    setMeta("og:title", title, true);
    setMeta("og:description", desc, true);
    setMeta("og:image", image, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", window.location.href, true);
    setMeta("og:site_name", "The Exim Roof", true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", desc);
    setMeta("twitter:image", image);

  }, [location]);

  return null;
};


// ----------------------------------------------------
// MAIN APP COMPONENT
// ----------------------------------------------------
const App = () => {

  // 🔥 Firebase Test
  useEffect(() => {
    async function loadServices() {
      try {
        const snap = await getDocs(collection(db, "services"));
        const data = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("🔥 Firebase Data:", data);
      } catch (error) {
        console.error("❌ Error fetching:", error);
      }
    }

    loadServices();
  }, []);

  return (
    <BrowserRouter>
      {/* MUST be inside Router */}
      <ScrollToTop />
      <MetaUpdater />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/service/*" element={<Service />} />

        {/* FireCMS */}
        <Route path="/cms/*" element={<AppCMS />} />
        <Route path="/cms/pages/:slug" element={<CMSPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;