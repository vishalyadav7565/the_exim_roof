import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error loading blogs:", err));
  }, []);

  const categories = ["All", ...new Set(blogs.map((b) => b.category))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = category === "All" || blog.category === category;
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.content.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getSnippet = (html, length = 150) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  return (
    <>
      {/* Navbar would go here if needed */}  
      <Navbar/>
    
    <div className="min-h-screen bg-gradient-to-b from-[#010203] via-[#424343] to-[#091413] py-12 ">
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">
          Our Blogs
        </h1>

        {/* Search Input */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-2/3 p-3 rounded-l-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white placeholder-gray-400 shadow-sm"
          />
          <button
            onClick={() => {}}
            className="px-4 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-shadow shadow"
          >
            🔍
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                category === cat
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog List */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block mb-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {blog.category}
                  </span>
                  <h2 className="text-2xl font-semibold mb-4 text-white">
                    {blog.title}
                  </h2>
                  <p className="text-gray-300 mb-4">{getSnippet(blog.content)}</p>
                </div>
                <Link
                  to={`/blog/${blog.id}`}
                  className="mt-auto text-blue-400 font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-2">
              No blogs found.
            </p>
          )}
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
}
