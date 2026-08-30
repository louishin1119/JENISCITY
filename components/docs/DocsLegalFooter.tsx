import Link from "next/link";

export default function DocsLegalFooter() {
  return (
    <footer className="mx-auto max-w-3xl border-t border-hairline px-8 py-8 text-xs text-ink-faint">
      <div className="flex flex-wrap gap-4">
        <Link href="/guide/legal/privacy" className="hover:text-ink-muted">
          개인정보 처리방침
        </Link>
        <Link href="/guide/legal/terms" className="hover:text-ink-muted">
          서비스 이용약관
        </Link>
      </div>
      <p className="mt-3">© 2026 JENIS CITY. All rights reserved.</p>
    </footer>
  );
}
