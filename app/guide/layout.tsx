import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsLegalFooter from "@/components/docs/DocsLegalFooter";

export default function GuideLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <DocsSidebar />
      <div className="min-w-0 flex-1">
        <main>{children}</main>
        <DocsLegalFooter />
      </div>
    </div>
  );
}
