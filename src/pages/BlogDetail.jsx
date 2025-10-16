import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch("/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        const foundBlog = data.find((b) => b.id.toString() === id);
        setBlog(foundBlog);
      })
      .catch((err) => console.error("Error loading blog:", err));
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#010203] via-[#424343] to-[#091413] px-4">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Blog not found.</p>
          <Link
            to="/blogs"
            className="mt-4 inline-block text-blue-400 font-semibold hover:underline"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#010203] via-[#424343] to-[#091413] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl p-8 shadow-lg">
        {/* Category Tag */}
        <span className="inline-block mb-4 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
          {blog.category}
        </span>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-white">{blog.title}</h1>

        {/* Blog Content */}
        <div
          className="prose prose-invert max-w-none text-gray-300"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Back Link */}
        <div className="mt-8">
          <Link
            to="/blogs"
            className="text-blue-400 font-semibold hover:underline"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
