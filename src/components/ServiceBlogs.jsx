import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import blogsData from "../data/blogs.json"; // local blogs.json
import PropTypes from "prop-types";

const ServiceBlogs = ({ categoryName, heroTitle, heroDescription, heroImage }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsState, setCommentsState] = useState({});
  const [generalComment, setGeneralComment] = useState({ name: "", text: "" });

  useEffect(() => {
    try {
      // Filter blogs by category
      const filtered = blogsData.filter((b) => b.category === categoryName);
      setBlogs(filtered);
    } catch (err) {
      console.error("❌ Error loading blogs:", err);
    } finally {
      setLoading(false);
    }
  }, [categoryName]);

  const handleCommentSubmit = (e, blogId) => {
    e.preventDefault();
    const comment = commentsState[blogId];
    if (!comment?.name || !comment?.text) return;

    alert(`✅ Comment submitted!\nName: ${comment.name}\nText: ${comment.text}`);
    setCommentsState({ ...commentsState, [blogId]: { name: "", text: "" } });
  };

  const handleGeneralComment = (e) => {
    e.preventDefault();
    if (!generalComment.name || !generalComment.text) return;

    alert(`✅ General comment submitted!\nName: ${generalComment.name}\nText: ${generalComment.text}`);
    setGeneralComment({ name: "", text: "" });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white py-12 px-6">

        {/* Hero Banner */}
        {heroTitle && (
          <section className="relative w-full h-[400px] mb-12">
            {heroImage && (
              <img
                src={heroImage}
                alt={heroTitle}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                {heroTitle}
              </h1>
              {heroDescription && (
                <p className="text-fuchsia-100 mt-4 text-lg md:text-xl max-w-2xl">
                  {heroDescription}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Blogs Section */}
        <section className="bg-white/5 backdrop-blur-lg border border-cyan-400 shadow-lg rounded-2xl p-8 mb-12 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-cyan-200">📖 {categoryName} Blogs</h2>
          {loading ? (
            <p className="text-fuchsia-300">Loading blogs...</p>
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <article
                key={blog.id}
                className="mb-8 pb-6 border-b border-white/10 last:border-0"
              >
                <h3 className="text-xl font-semibold text-fuchsia-300 mb-2">
                  {blog.title}
                </h3>
                <div
                  className="text-fuchsia-100"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Comments */}
                <div className="mt-5">
                  <h4 className="text-lg font-semibold text-cyan-300">💬 Comments</h4>
                  {blog.comments && blog.comments.length > 0 ? (
                    blog.comments.map((c) => (
                      <div
                        key={c.id}
                        className="mt-3 p-3 rounded-lg bg-white/10 border border-cyan-500/30"
                      >
                        <p className="text-fuchsia-100">“{c.text}”</p>
                        <p className="text-sm text-gray-400 mt-1">– {c.name}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No comments yet.</p>
                  )}

                  <form
                    onSubmit={(e) => handleCommentSubmit(e, blog.id)}
                    className="mt-4 space-y-3"
                  >
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={commentsState[blog.id]?.name || ""}
                      onChange={(e) =>
                        setCommentsState({
                          ...commentsState,
                          [blog.id]: {
                            ...commentsState[blog.id],
                            name: e.target.value,
                          },
                        })
                      }
                      className="border border-cyan-400 bg-transparent p-2 rounded w-full focus:ring-2 focus:ring-cyan-500 outline-none"
                      required
                    />
                    <textarea
                      placeholder="Write a comment..."
                      value={commentsState[blog.id]?.text || ""}
                      onChange={(e) =>
                        setCommentsState({
                          ...commentsState,
                          [blog.id]: {
                            ...commentsState[blog.id],
                            text: e.target.value,
                          },
                        })
                      }
                      className="border border-cyan-400 bg-transparent p-2 rounded w-full focus:ring-2 focus:ring-cyan-500 outline-none"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white px-5 py-2 rounded-lg shadow hover:shadow-cyan-400/40 transition"
                    >
                      Submit Comment
                    </button>
                  </form>
                </div>
              </article>
            ))
          ) : (
            <p className="text-gray-400">No blogs available yet.</p>
          )}
        </section>

        {/* General Comments */}
        <section className="bg-white/5 backdrop-blur-lg border border-emerald-400 shadow-lg rounded-2xl p-8 mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-emerald-300 mb-6">💬 Leave a General Comment</h2>
          <form onSubmit={handleGeneralComment} className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              value={generalComment.name}
              onChange={(e) => setGeneralComment({ ...generalComment, name: e.target.value })}
              className="border border-emerald-400 bg-transparent p-2 rounded w-full focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
            <textarea
              placeholder="Write your comment..."
              value={generalComment.text}
              onChange={(e) => setGeneralComment({ ...generalComment, text: e.target.value })}
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

        <div className="my-10 max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

ServiceBlogs.propTypes = {
  categoryName: PropTypes.string.isRequired,
  heroTitle: PropTypes.string,
  heroDescription: PropTypes.string,
  heroImage: PropTypes.string,
};

export default ServiceBlogs;
