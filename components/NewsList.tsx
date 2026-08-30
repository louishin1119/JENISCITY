"use client";

import { useMemo, useState } from "react";
import { NewsCategory, NewsPost } from "@/lib/data";

const TABS: Array<NewsCategory | "전체"> = ["전체", "공지사항", "패치노트"];
const PAGE_SIZE = 4;

export default function NewsList({ posts }: { posts: NewsPost[] }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("전체");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (tab === "전체" ? posts : posts.filter((p) => p.category === tab)),
    [posts, tab]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function selectTab(t: (typeof TABS)[number]) {
    setTab(t);
    setPage(1);
  }

  return (
    <div>
      <div className="mb-8 flex gap-2 border-b border-hairline">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => selectTab(t)}
            className={`px-4 py-3 text-sm transition-colors ${
              tab === t
                ? "border-b-2 border-signal text-ink"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-col divide-y divide-hairline">
        {current.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-faint">
            해당 카테고리에 게시물이 없습니다.
          </p>
        )}
        {current.map((post) => (
          <article key={post.id} className="grid gap-2 py-6 sm:grid-cols-[100px_1fr]">
            <p className="mono-tag text-xs text-ink-faint">{post.date}</p>
            <div>
              <span className="mono-tag text-[10px] text-signal">{post.category}</span>
              <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4 mono-tag text-xs text-ink-muted">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="disabled:opacity-30"
          >
            이전
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="disabled:opacity-30"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
