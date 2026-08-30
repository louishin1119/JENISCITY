"use client";

import { useState, FormEvent } from "react";
import { NewsPost, NewsCategory } from "@/lib/data";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function AdminNewsManager({ initialPosts }: { initialPosts: NewsPost[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<NewsCategory>("공지사항");
  const [excerpt, setExcerpt] = useState("");
  const [date, setDate] = useState(todayISO());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, excerpt, date }),
    });

    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "등록에 실패했습니다.");
      return;
    }

    const newPost: NewsPost = await res.json();
    setPosts((prev) => [newPost, ...prev]);
    setTitle("");
    setExcerpt("");
    setDate(todayISO());
  }

  async function handleDelete(id: string) {
    const prev = posts;
    setPosts((p) => p.filter((post) => post.id !== id));
    const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
    if (!res.ok) setPosts(prev); // 실패 시 롤백
  }

  return (
    <div className="mt-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-hairline bg-surface p-5"
      >
        <div className="flex gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as NewsCategory)}
            className="rounded-lg border border-hairline bg-surface-raised px-3 py-2 text-sm text-ink outline-none focus:border-signal-dim"
          >
            <option value="공지사항">공지사항</option>
            <option value="패치노트">패치노트</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-hairline bg-surface-raised px-3 py-2 text-sm text-ink outline-none focus:border-signal-dim"
          />
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          required
          className="w-full rounded-lg border border-hairline bg-surface-raised px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-signal-dim"
        />

        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="내용 요약"
          required
          rows={3}
          className="w-full rounded-lg border border-hairline bg-surface-raised px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-signal-dim"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-signal px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {submitting ? "등록 중..." : "등록"}
        </button>
      </form>

      <div className="mt-8 divide-y divide-hairline rounded-xl border border-hairline bg-surface">
        {posts.length === 0 && (
          <p className="p-6 text-center text-sm text-ink-faint">등록된 글이 없습니다.</p>
        )}
        {posts.map((post) => (
          <div key={post.id} className="flex items-start justify-between gap-4 p-4">
            <div>
              <span className="mono-tag text-[10px] text-signal">{post.category}</span>
              <p className="mt-1 font-semibold text-ink">{post.title}</p>
              <p className="mt-1 text-sm text-ink-muted">{post.excerpt}</p>
              <p className="mono-tag mt-2 text-[10px] text-ink-faint">{post.date}</p>
            </div>
            <button
              onClick={() => handleDelete(post.id)}
              className="shrink-0 text-sm text-red-400 hover:underline"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
