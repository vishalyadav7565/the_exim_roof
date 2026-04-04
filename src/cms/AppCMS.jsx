import React, { useEffect, useState } from "react";
import {
    Routes,
    Route,
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

/*
    Lightweight CMS shell for a React project.
    - Uses localStorage to persist pages (mock backend).
    - Simple, clean CMS with editor + pages.
*/

const STORAGE_KEY = "exim_cms_pages_v1";

// Load pages from storage
function loadPages() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : defaultPages();
    } catch {
        return defaultPages();
    }
}

// Save to storage
function savePages(pages) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
}

// Default initial pages
function defaultPages() {
    return [
        {
            id: "home",
            title: "Home",
            slug: "/",
            content: "<h1>Welcome to The Exim Roof</h1><p>Edit this page.</p>",
            updatedAt: new Date().toISOString(),
        },
        {
            id: "about",
            title: "About",
            slug: "/about",
            content: "<h2>About</h2><p>About page content.</p>",
            updatedAt: new Date().toISOString(),
        },
    ];
}

// simple id generator
function uid(prefix = "") {
    return prefix + Math.random().toString(36).slice(2, 9);
}

export default function AppCMS() {
    const [pages, setPages] = useState(loadPages());

    useEffect(() => {
        savePages(pages);
    }, [pages]);

    const createPage = (partial = {}) => {
        const newPage = {
            id: uid("p_"),
            title: partial.title || "Untitled",
            slug: partial.slug || `/${uid("page-")}`,
            content: partial.content || "<p></p>",
            updatedAt: new Date().toISOString(),
        };
        setPages((s) => [newPage, ...s]);
        return newPage;
    };

    const updatePage = (id, patch) => {
        setPages((s) =>
            s.map((p) =>
                p.id === id
                    ? { ...p, ...patch, updatedAt: new Date().toISOString() }
                    : p
            )
        );
    };

    const deletePage = (id) => {
        setPages((s) => s.filter((p) => p.id !== id));
    };

    return (
        <div style={styles.app}>
            <Sidebar pages={pages} onCreate={() => createPage()} />
            <main style={styles.main}>
                <Topbar />
                <div style={styles.container}>
                    <Routes>
                        <Route path="/" element={<Dashboard pages={pages} />} />
                        <Route
                            path="/pages"
                            element={
                                <PagesList
                                    pages={pages}
                                    onDelete={deletePage}
                                    onCreate={() => createPage()}
                                />
                            }
                        />
                        <Route
                            path="/pages/new"
                            element={
                                <Editor
                                    onSave={(p) => updatePage(p.id, p)}
                                    onCreate={createPage}
                                />
                            }
                        />
                        <Route
                            path="/pages/:id"
                            element={
                                <Editor
                                    pages={pages}
                                    onSave={(id, patch) =>
                                        updatePage(id, patch)
                                    }
                                />
                            }
                        />
                        <Route path="/media" element={<MediaLibrary />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}

/* ---------- SIDEBAR ---------- */
function Sidebar({ pages, onCreate }) {
    return (
        <aside style={styles.sidebar}>
            <div style={styles.brand}>
                <strong>The Exim Roof</strong>
            </div>
            <nav style={{ marginTop: 12 }}>
                <NavLink to="/cms">Dashboard</NavLink>
                <NavLink to="/cms/pages">Pages ({pages.length})</NavLink>
                <NavLink to="/cms/media">Media</NavLink>
                <NavLink to="/cms/settings">Settings</NavLink>
            </nav>

            <div style={{ marginTop: "auto", padding: 12 }}>
                <button style={styles.button} onClick={onCreate}>
                    + New Page
                </button>
            </div>
        </aside>
    );
}

/* ---------- TOPBAR ---------- */
function Topbar() {
    return (
        <header style={styles.topbar}>
            <div>CMS</div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>Local mode</div>
        </header>
    );
}

/* ---------- DASHBOARD ---------- */
function Dashboard({ pages }) {
    return (
        <section>
            <h2>Dashboard</h2>
            <p>Quick overview of your CMS.</p>

            <div style={styles.cardRow}>
                <small style={styles.card}>
                    <strong>{pages.length}</strong>
                    <div>Pages</div>
                </small>
                <small style={styles.card}>
                    <strong>—</strong>
                    <div>Media</div>
                </small>
            </div>

            <h3 style={{ marginTop: 20 }}>Recently updated</h3>
            <ul>
                {pages.slice(0, 5).map((p) => (
                    <li key={p.id}>
                        <Link to={`/cms/pages/${p.id}`}>{p.title}</Link> —{" "}
                        <em>{new Date(p.updatedAt).toLocaleString()}</em>
                    </li>
                ))}
            </ul>
        </section>
    );
}

/* ---------- PAGES LIST ---------- */
function PagesList({ pages, onDelete, onCreate }) {
    const navigate = useNavigate();

    return (
        <section>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Pages</h2>
                <button
                    style={styles.button}
                    onClick={() => {
                        const p = onCreate();
                        navigate(`/cms/pages/${p.id}`);
                    }}
                >
                    + New
                </button>
            </div>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Slug</th>
                        <th>Updated</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pages.map((p) => (
                        <tr key={p.id}>
                            <td>
                                <Link to={`/cms/pages/${p.id}`}>{p.title}</Link>
                            </td>
                            <td>{p.slug}</td>
                            <td>
                                {new Date(p.updatedAt).toLocaleString()}
                            </td>
                            <td>
                                <button
                                    style={styles.iconButton}
                                    onClick={() => {
                                        if (
                                            confirm(`Delete "${p.title}"?`)
                                        )
                                            onDelete(p.id);
                                    }}
                                >
                                    ✕
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

/* ---------- EDITOR ---------- */
function Editor({ pages = [], onSave, onCreate }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const existing = id ? pages.find((p) => p.id === id) : null;

    const [title, setTitle] = useState(existing?.title || "");
    const [slug, setSlug] = useState(existing?.slug || "");
    const [content, setContent] = useState(existing?.content || "");

    useEffect(() => {
        if (existing) {
            setTitle(existing.title);
            setSlug(existing.slug);
            setContent(existing.content);
        }
    }, [id]);

    const handleSave = () => {
        if (existing) {
            onSave(existing.id, { title, slug, content });
            navigate("/cms/pages");
            return;
        }

        const newPage = onCreate({
            title: title || "Untitled",
            slug: slug || `/${uid("p-")}`,
            content,
        });

        navigate(`/cms/pages/${newPage.id}`);
    };

    return (
        <section>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>{existing ? `Edit: ${existing.title}` : "New Page"}</h2>

                <div>
                    <button style={styles.button} onClick={handleSave}>
                        Save
                    </button>

                    <button
                        style={{ ...styles.button, marginLeft: 8 }}
                        onClick={() => navigate("/cms/pages")}
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <div style={{ marginTop: 12 }}>
                <label style={styles.label}>Title</label>
                <input
                    style={styles.input}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label style={styles.label}>URL Slug</label>
                <input
                    style={styles.input}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                />

                <label style={styles.label}>Content (HTML)</label>
                <textarea
                    style={styles.textarea}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={12}
                />

                <h4 style={{ marginTop: 16 }}>Preview</h4>
                <div
                    style={styles.preview}
                    dangerouslySetInnerHTML={{
                        __html: content || "<em>Empty</em>",
                    }}
                />
            </div>
        </section>
    );
}

function MediaLibrary() {
    return (
        <section>
            <h2>Media Library</h2>
            <p>Media upload not implemented yet.</p>
        </section>
    );
}

function Settings() {
    return (
        <section>
            <h2>Settings</h2>

            <label style={styles.label}>Site Title</label>
            <input style={styles.input} defaultValue="The Exim Roof" />
        </section>
    );
}

function NotFound() {
    return (
        <section>
            <h2>Not Found</h2>
        </section>
    );
}

function NavLink({ to, children }) {
    return (
        <div style={{ margin: "8px 0" }}>
            <Link to={to} style={styles.link}>
                {children}
            </Link>
        </div>
    );
}

/* ---------- STYLE ---------- */
const styles = {
    app: {
        display: "flex",
        height: "100vh",
        background: "#f6f7fb",
        fontFamily: "Inter, sans-serif",
    },
    sidebar: {
        width: 220,
        background: "#fff",
        borderRight: "1px solid #e6e9ef",
        padding: 12,
        display: "flex",
        flexDirection: "column",
    },
    brand: {
        fontSize: 16,
        padding: 8,
        borderBottom: "1px solid #eee",
    },
    main: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    topbar: {
        height: 56,
        background: "#fff",
        borderBottom: "1px solid #e6e9ef",
        padding: "0 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    container: {
        padding: 20,
        overflow: "auto",
    },
    button: {
        background: "#0b69ff",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: 6,
        border: "none",
        cursor: "pointer",
    },
    iconButton: {
        padding: "4px 8px",
        borderRadius: 6,
        border: "1px solid #ccc",
        background: "transparent",
        cursor: "pointer",
    },
    link: {
        color: "#0b69ff",
        textDecoration: "none",
        fontSize: 14,
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: 12,
    },
    label: {
        marginTop: 12,
        fontSize: 13,
        color: "#333",
    },
    input: {
        padding: 8,
        borderRadius: 6,
        border: "1px solid #d9e0ec",
        fontSize: 14,
        width: "100%",
    },
    textarea: {
        padding: 10,
        border: "1px solid #d9e0ec",
        borderRadius: 6,
        width: "100%",
        fontFamily: "monospace",
    },
    preview: {
        padding: 12,
        border: "1px dashed #ddd",
        minHeight: 80,
        background: "#fff",
        borderRadius: 6,
    },
    cardRow: {
        display: "flex",
        gap: 12,
        marginTop: 20,
    },
    card: {
        background: "#fff",
        padding: 12,
        borderRadius: 8,
        flex: 1,
        boxShadow: "0 0 0 1px rgba(0,0,0,0.05)",
    },
};
