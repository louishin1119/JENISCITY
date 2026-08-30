"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { searchablePages } from "@/lib/docsNav";

export default function DocsSearch() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-lg border border-hairline bg-surface px-3 py-2 text-sm text-ink-faint transition-colors hover:border-signal-dim"
      >
        <Search size={14} />
        <span>가이드 검색</span>
        <kbd className="mono-tag ml-auto rounded border border-hairline px-1.5 py-0.5 text-[10px]">
          Ctrl K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-24"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-xl border border-hairline bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Command label="가이드 검색">
              <div className="flex items-center gap-2 border-b border-hairline px-4">
                <Search size={16} className="text-ink-faint" />
                <Command.Input
                  autoFocus
                  placeholder="문서 제목으로 검색..."
                  className="w-full bg-transparent py-3.5 text-sm text-ink outline-none placeholder:text-ink-faint"
                />
              </div>
              <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-ink-faint">
                  결과가 없습니다.
                </Command.Empty>
                {searchablePages.map((p) => (
                  <Command.Item
                    key={p.href}
                    value={p.label}
                    onSelect={() => go(p.href)}
                    className="cursor-pointer rounded-lg px-3 py-2.5 text-sm text-ink data-[selected=true]:bg-surface-raised"
                  >
                    {p.label}
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
