"use client";

import { useState } from "react";
import Link from "next/link";
import Markdown from "@/components/docs/Markdown";

export default function DocEditor({
  href,
  initialBody,
  hasOverride,
}: {
  href: string;
  initialBody: string;
  hasOverride: boolean;
}) {
  const [body, setBody] = useState(initialBody);
  const [saving, setSaving] = useState(false);
  const [reverting, setReverting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [overridden, setOverridden] = useState(hasOverride);
  const [showPreview, setShowPreview] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError("");
    setMessage("");

    const res = await fetch("/api/docs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ href, body }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "저장에 실패했습니다.");
      return;
    }

    setOverridden(true);
    setMessage("저장했습니다. 가이드 페이지에 바로 반영됩니다.");
  }

  async function handleRevert() {
    if (!confirm("수정 내용을 지우고 기본 문서로 되돌릴까요?")) return;
    setReverting(true);
    setError("");
    setMessage("");

    const res = await fetch(`/api/docs?href=${encodeURIComponent(href)}`, {
      method: "DELETE",
    });

    setReverting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "되돌리기에 실패했습니다.");
      return;
    }

    setOverridden(false);
    setMessage("기본 문서로 되돌렸습니다. (편집 중인 내용은 페이지를 새로고침하면 기본값으로 채워집니다)");
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {overridden && (
            <span className="mono-tag rounded-full bg-signal/15 px-2 py-0.5 text-[10px] text-signal">
              수정됨
            </span>
          )}
          <Link href="/admin/docs" className="text-sm text-ink-faint hover:text-ink">
            ← 목록으로
          </Link>
        </div>
        <button
          onClick={() => setShowPreview((v) => !v)}
          className="text-sm text-ink-faint hover:text-ink"
        >
          {showPreview ? "편집으로 전환" : "미리보기"}
        </button>
      </div>

      {showPreview ? (
        <div className="min-h-[400px] rounded-xl border border-hairline bg-surface p-6">
          <Markdown content={body} />
        </div>
      ) : (
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={24}
          placeholder="마크다운으로 작성하세요. ## 제목, ### 소제목, - 목록, | 표 | 문법 | 지원 |"
          className="mono-tag w-full rounded-xl border border-hairline bg-surface p-4 text-[13px] leading-relaxed text-ink outline-none focus:border-signal-dim"
        />
      )}

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      {message && <p className="mt-3 text-sm text-emerald-400">{message}</p>}

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-signal px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {saving ? "저장 중..." : "저장"}
        </button>
        {overridden && (
          <button
            onClick={handleRevert}
            disabled={reverting}
            className="rounded-full border border-hairline px-5 py-2 text-sm text-ink-muted transition-colors hover:border-signal-dim hover:text-ink disabled:opacity-50"
          >
            {reverting ? "되돌리는 중..." : "기본값으로 되돌리기"}
          </button>
        )}
      </div>
    </div>
  );
}
