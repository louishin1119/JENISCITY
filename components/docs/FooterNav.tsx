import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavPage } from "@/lib/docsNav";

export default function FooterNav({
  prev,
  next,
}: {
  prev?: NavPage;
  next?: NavPage;
}) {
  if (!prev && !next) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-2 rounded-xl border border-hairline bg-surface px-4 py-3.5 transition-colors hover:border-signal-dim"
        >
          <ChevronLeft size={16} className="text-ink-faint" />
          <div>
            <p className="mono-tag text-[10px] text-ink-faint">이전 페이지</p>
            <p className="text-sm text-ink group-hover:text-white">{prev.label}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link
          href={next.href}
          className="group flex items-center justify-end gap-2 rounded-xl border border-hairline bg-surface px-4 py-3.5 text-right transition-colors hover:border-signal-dim"
        >
          <div>
            <p className="mono-tag text-[10px] text-ink-faint">다음 페이지</p>
            <p className="text-sm text-ink group-hover:text-white">{next.label}</p>
          </div>
          <ChevronRight size={16} className="text-ink-faint" />
        </Link>
      )}
    </div>
  );
}
