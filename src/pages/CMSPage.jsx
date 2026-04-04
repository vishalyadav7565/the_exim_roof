import { useParams } from "react-router-dom";

export default function CMSPage() {
  const { slug } = useParams();

  const pages = JSON.parse(localStorage.getItem("exim_cms_pages_v1")) || [];

  const page = pages.find((p) => p.slug.replace("/", "") === slug);

  if (!page) return <h1>Page not found</h1>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>

      <div
        className="prose max-w-full"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}
