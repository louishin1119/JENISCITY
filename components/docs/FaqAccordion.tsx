"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-hairline rounded-xl border border-hairline bg-surface">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center gap-2 px-4 py-3.5 text-left text-sm font-medium text-ink"
            >
              <ChevronRight
                size={15}
                className={`shrink-0 text-ink-faint transition-transform ${
                  open ? "rotate-90" : ""
                }`}
              />
              {item.q}
            </button>
            {open && (
              <div className="px-4 pb-4 pl-9 text-sm text-ink-muted">{item.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
