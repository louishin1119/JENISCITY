import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/adminAuth";
import { navGroups } from "@/lib/docsNav";
import { isOverridden } from "@/lib/docsStore";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

function flattenPages(items: import("@/lib/docsNav").NavItem[]): { label: string; href: string }[] {
  const out: { label: string; href: string }[] = [];
  for (const item of items) {
    if (item.type === "page") out.push({ label: item.label, href: item.href });
    else out.push(...flattenPages(item.children));
  }
  return out;
}

export default async function AdminDocsPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="font-display text-base font-bold text-ink">
        JENIS <span className="text-signal italic">CITY</span>
      </Link>
      <h1 className="mt-6 font-display text-2xl font-bold text-ink">가이드 · 법률 문서 관리</h1>
      <p className="mt-2 text-sm text-ink-muted">
        문서를 선택해 본문을 수정할 수 있습니다. 수정한 내용은 저장 즉시 실제 가이드 페이지에 반영됩니다.
      </p>

      <div className="mt-6">
        <AdminNav />
      </div>

      <div className="mt-8 space-y-8">
        {navGroups.map((group) => {
          const pages = flattenPages(group.items);
          return (
            <div key={group.title}>
              <p className="mono-tag mb-2 text-xs text-signal">{group.title}</p>
              <div className="divide-y divide-hairline rounded-xl border border-hairline bg-surface">
                {pages.map((p) => (
                  <Link
                    key={p.href}
                    href={`/admin/docs/edit${p.href.replace("/guide", "")}`}
                    className="flex items-center justify-between px-4 py-3 text-sm text-ink transition-colors hover:bg-surface-raised"
                  >
                    <span>{p.label}</span>
                    {isOverridden(p.href) && (
                      <span className="mono-tag rounded-full bg-signal/15 px-2 py-0.5 text-[10px] text-signal">
                        수정됨
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
