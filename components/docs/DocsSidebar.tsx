"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { navGroups, defaultExpandedIds, NavItem } from "@/lib/docsNav";
import DocsSearch from "./DocsSearch";

function NavNode({ item, depth }: { item: NavItem; depth: number }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(defaultExpandedIds.includes(item.id));
  const paddingLeft = 12 + depth * 16;

  if (item.type === "page") {
    const active = pathname === item.href;
    return (
      <Link
        href={item.href}
        style={{ paddingLeft }}
        className={`block rounded-md py-1.5 pr-3 text-sm transition-colors ${
          active
            ? "bg-surface-raised text-ink"
            : "text-ink-muted hover:text-ink"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{ paddingLeft }}
        className="flex w-full items-center gap-1.5 rounded-md py-1.5 pr-3 text-left text-sm text-ink-muted transition-colors hover:text-ink"
      >
        {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        <span>{item.label}</span>
      </button>
      {expanded && (
        <div>
          {item.children.map((child) => (
            <NavNode key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DocsSidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-hairline bg-asphalt">
      <div className="px-4 pt-4">
        <Link
          href="/"
          className="mb-3 block font-display text-base font-bold tracking-tight text-ink transition-opacity hover:opacity-80"
        >
          JENIS <span className="text-signal italic">CITY</span>
        </Link>
      </div>
      <div className="px-4 pb-4">
        <DocsSearch />
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-8">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="mono-tag mb-1.5 px-3 text-[10px] tracking-wider text-ink-faint">
              {group.title}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavNode key={item.id} item={item} depth={0} />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
