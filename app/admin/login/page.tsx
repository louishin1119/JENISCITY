"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "로그인에 실패했습니다.");
        setLoading(false);
        return;
      }

      router.push("/admin/news");
      router.refresh();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-asphalt px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-hairline bg-surface p-8"
      >
        <Link href="/" className="font-display text-base font-bold text-ink">
          JENIS <span className="text-signal italic">CITY</span>
        </Link>
        <h1 className="mt-6 font-display text-xl font-bold text-ink">관리자 로그인</h1>
        <p className="mt-2 text-sm text-ink-muted">
          공지·소식을 등록하려면 로그인하세요.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          autoFocus
          className="mt-6 w-full rounded-lg border border-hairline bg-surface-raised px-4 py-2.5 text-sm text-ink outline-none focus:border-signal-dim"
        />

        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading || password.length === 0}
          className="mt-4 w-full rounded-full bg-signal px-4 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "확인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
