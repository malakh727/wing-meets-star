import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

export interface PostItem {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  type: "essay" | "note";
  href: string;
}

interface Props {
  posts: PostItem[];
  allTags: string[];
  lang?: "en" | "ar";
}

function buildUrl(type: string | null, tag: string | null): string {
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (tag) params.set("tag", tag);
  const qs = params.toString();
  return qs ? `?${qs}` : window.location.pathname;
}

export default function TagFilter({ posts, allTags, lang = "en" }: Props) {
  const isRtl = lang === "ar";

  const [activeType, setActiveType] = useState<"essay" | "note" | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Restore filter state from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("type");
    const g = params.get("tag");
    if (t === "essay" || t === "note") setActiveType(t);
    if (g) setActiveTag(g);
  }, []);

  // Sync URL whenever filters change
  useEffect(() => {
    window.history.pushState({}, "", buildUrl(activeType, activeTag));
  }, [activeType, activeTag]);

  // Close modal on ESC
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModalOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const selectTag = useCallback((tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
    setModalOpen(false);
  }, []);

  const filtered = posts.filter((p) => {
    if (activeType && p.type !== activeType) return false;
    if (activeTag && !p.tags?.includes(activeTag)) return false;
    return true;
  });

  // ── Styles ──────────────────────────────────────────────────────────────

  const ghostPill: React.CSSProperties = {
    fontFamily: "inherit",
    fontSize: "0.75rem",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    border: "1px solid rgba(46,196,196,0.3)",
    background: "rgba(46,196,196,0.08)",
    color: "#2EC4C4",
    cursor: "pointer",
    transition: "all 0.15s ease",
    letterSpacing: "0.03em",
    whiteSpace: "nowrap" as const,
  };

  function typePill(t: "all" | "essay" | "note"): React.CSSProperties {
    const base: React.CSSProperties = {
      fontFamily: "inherit",
      fontSize: "0.75rem",
      padding: "0.25rem 0.75rem",
      borderRadius: "9999px",
      cursor: "pointer",
      transition: "all 0.15s ease",
      letterSpacing: "0.03em",
      border: "1px solid transparent",
      whiteSpace: "nowrap" as const,
    };
    const isActive =
      (t === "all" && activeType === null) ||
      (t === "essay" && activeType === "essay") ||
      (t === "note" && activeType === "note");

    if (!isActive) {
      return {
        ...base,
        background: "rgba(255,255,255,0.05)",
        color: "#948f98",
        border: "1px solid rgba(255,255,255,0.1)",
      };
    }
    if (t === "essay") return { ...base, background: "#B076E8", color: "#131315", fontWeight: 600 };
    if (t === "note") return { ...base, background: "#2EC4C4", color: "#131315", fontWeight: 600 };
    // "all" active
    return { ...base, background: "rgba(255,255,255,0.12)", color: "#e5e1e4", border: "1px solid rgba(255,255,255,0.2)", fontWeight: 600 };
  }

  function tagModalPill(tag: string): React.CSSProperties {
    const isActive = activeTag === tag;
    return isActive
      ? { ...ghostPill, background: "#2EC4C4", color: "#131315", border: "1px solid #2EC4C4", fontWeight: 600 }
      : ghostPill;
  }

  const tagButtonStyle: React.CSSProperties = activeTag
    ? { ...ghostPill, background: "#2EC4C4", color: "#131315", border: "1px solid #2EC4C4", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.35rem" }
    : { ...ghostPill, color: "#948f98", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: "0.35rem" };

  // ── Labels ───────────────────────────────────────────────────────────────

  const labels = isRtl
    ? { all: "الكل", essay: "مقال", note: "ملاحظة", filterTag: "تصفية حسب الوسم", modalTitle: "تصفية حسب الوسم", noResults: "لا توجد كتابات بهذا التصفية." }
    : { all: "All", essay: "Essay", note: "Note", filterTag: "Filter by tag ▾", modalTitle: "Filter by tag", noResults: "No posts match this filter." };

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      {/* ── Filter bar ── */}
      <div
        className="flex flex-wrap items-center gap-2 mb-8"
        style={{
          justifyContent:"flex-start",
          position: "sticky",
          top: "4rem",
          zIndex: 40,
          background: "rgba(19,19,21,0.85)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          marginLeft: "-1.5rem",
          marginRight: "-1.5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
        }}
      >
        {/* Type filter */}
        <button style={typePill("all")} onClick={() => setActiveType(null)}>{labels.all}</button>
        <button style={typePill("essay")} onClick={() => setActiveType(activeType === "essay" ? null : "essay")}>{labels.essay}</button>
        <button style={typePill("note")} onClick={() => setActiveType(activeType === "note" ? null : "note")}>{labels.note}</button>

        {/* Divider */}
        <span style={{ color: "#3a3a3c", userSelect: "none", padding: "0 0.25rem" }}>|</span>

        {/* Tag button */}
        {activeTag ? (
          <button style={tagButtonStyle} onClick={() => setModalOpen(true)}>
            <span>{activeTag}</span>
            <span
              onClick={(e) => { e.stopPropagation(); setActiveTag(null); }}
              style={{ lineHeight: 1, opacity: 0.8, fontWeight: 700, cursor: "pointer" }}
              aria-label="Clear tag filter"
            >
              ×
            </span>
          </button>
        ) : (
          <button style={tagButtonStyle} onClick={() => setModalOpen(true)}>
            {labels.filterTag}
          </button>
        )}
      </div>

      {/* ── Tag modal (portalled to body to escape astro-island stacking context) ── */}
      {modalOpen && createPortal(
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,0.65)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              background: "#1b1b1d",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "0.75rem",
              width: "100%",
              maxWidth: "32rem",
              maxHeight: "70vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
            dir={isRtl ? "rtl" : "ltr"}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontFamily: "inherit", fontSize: "0.875rem", color: "#e5e1e4", fontWeight: 600, letterSpacing: "0.02em" }}>
                {labels.modalTitle}
              </span>
              <button
                onClick={() => setModalOpen(false)}
                style={{ background: "none", border: "none", color: "#948f98", fontSize: "1.25rem", cursor: "pointer", lineHeight: 1, padding: "0.1rem 0.3rem", borderRadius: "0.25rem" }}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            {/* Tag grid */}
            <div style={{ padding: "1rem 1.25rem", overflowY: "auto", display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "flex-start" }}>
              {allTags.map((tag) => (
                <button key={tag} style={tagModalPill(tag)} onClick={() => selectTag(tag)}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── Post list ── */}
      {filtered.length === 0 ? (
        <p className="font-label text-sm text-on-surface-muted py-12" style={{ textAlign: isRtl ? "right" : "center" }}>
          {labels.noResults}
        </p>
      ) : (
        <ol className="space-y-1">
          {filtered.map((post) => (
            <li key={post.slug}>
              <a
                href={post.href}
                className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 py-5 px-4 -mx-4 rounded transition-colors duration-200 hover:bg-surface-low card-glow"
              >
                <time
                  className="font-label text-sm text-on-surface-muted shrink-0 mt-1"
                  style={{ width: isRtl ? "10rem" : "9rem" }}
                >
                  {post.date}
                </time>
                <div className="flex-1" style={{ textAlign: isRtl ? "right" : "left" }}>
                  <div className="flex items-baseline gap-2 mb-0.5 row">
                    <h2 className="font-body text-xl text-on-surface group-hover:text-primary transition-colors duration-200 leading-snug">
                      {post.title}
                    </h2>
                    <span
                      className="font-label text-xs shrink-0"
                      style={post.type === "essay" ? { color: "#B076E8", opacity: 0.8 } : { color: "#2EC4C4", opacity: 0.8 }}
                    >
                      {isRtl ? (post.type === "essay" ? "مقال" : "ملاحظة") : post.type}
                    </span>
                  </div>
                  {post.description && (
                    <p className="font-body text-base text-on-surface-muted mt-1 leading-relaxed">
                      {post.description}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2" style={{ justifyContent: "flex-start" }}>
                      {post.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={(e) => { e.preventDefault(); selectTag(tag); }}
                          style={activeTag === tag
                            ? { ...ghostPill, background: "#2EC4C4", color: "#131315", border: "1px solid #2EC4C4", fontWeight: 600 }
                            : ghostPill}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
