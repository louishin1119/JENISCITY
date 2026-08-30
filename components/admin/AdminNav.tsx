"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const linkClass = (href: string) =>
    `text-sm transition-colors ${
      pathname.startsWith(href) ? "text-ink" : "text-ink-faint hover:text-ink-muted"
    }`;

  return (
    <div className="flex items-center justify-between border-b border-hairline pb-4">
      <nav className="flex gap-5">
        <Link href="/admin/news" className={linkClass("/admin/news")}>
          공지 · 소식 관리
        </Link>
        <Link href="/admin/docs" className={linkClass("/admin/docs")}>
          가이드 · 법률 문서 관리
        </Link>
      </nav>
      <button
        onClick={handleLogout}
        className="text-sm text-ink-faint transition-colors hover:text-ink"
      >
        로그아웃
      </button>
    </div>
  );
}
