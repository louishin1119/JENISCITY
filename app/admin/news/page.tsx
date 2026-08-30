import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/adminAuth";
import { readNews } from "@/lib/newsStore";
import AdminNewsManager from "@/components/admin/AdminNewsManager";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const posts = readNews();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="font-display text-base font-bold text-ink">
        JENIS <span className="text-signal italic">CITY</span>
      </Link>
      <h1 className="mt-6 font-display text-2xl font-bold text-ink">공지 · 소식 관리</h1>
      <p className="mt-2 text-sm text-ink-muted">
        여기서 등록한 글은 /news 페이지에 즉시 반영됩니다.
      </p>

      <div className="mt-6">
        <AdminNav />
      </div>

      <AdminNewsManager initialPosts={posts} />
    </div>
  );
}
