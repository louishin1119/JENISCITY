"use client";

import { useEffect, useState } from "react";

export default function AnchorNav({
  anchors,
}: {
  anchors: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(anchors[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    anchors.forEach((a) => {
      const el = document.getElementById(a.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [anchors]);

  function jump(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-hairline bg-surface px-4 py-3">
      <span className="mono-tag text-[10px] text-ink-faint">이 페이지</span>
      {anchors.map((a) => (
        <button
          key={a.id}
          onClick={() => jump(a.id)}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            active === a.id
              ? "border border-signal-dim text-signal"
              : "text-ink-muted hover:text-ink"
          }`}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}
