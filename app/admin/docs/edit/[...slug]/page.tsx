import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/adminAuth";
import { getEffectiveDoc } from "@/lib/docsStore";
import { isOverridden } from "@/lib/docsStore";
import AdminNav from "@/components/admin/AdminNav";
import DocEditor from "@/components/admin/DocEditor";

export const dynamic = "force-dynamic";

export default async function AdminDocEditPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const { slug } = await params;
  const href = `/guide/${slug.join("/")}`;
  const doc = getEffectiveDoc(href);

  if (!doc) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="font-display text-base font-bold text-ink">
        JENIS <span className="text-signal italic">CITY</span>
      </Link>
      <h1 className="mt-6 font-display text-2xl font-bold text-ink">{doc.title}</h1>
      <p className="mt-2 text-sm text-ink-muted">
        {doc.breadcrumb.join(" / ")}
      </p>

      <div className="mt-6">
        <AdminNav />
      </div>

      <div className="mt-8">
        <DocEditor
          href={href}
          initialBody={doc.body ?? ""}
          hasOverride={isOverridden(href)}
        />
      </div>
    </div>
  );
}
