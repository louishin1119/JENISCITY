"use client";

import { useState } from "react";

export default function PlatformTabs({
  tabs,
}: {
  tabs: { label: string; content: string }[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface">
      <div className="flex border-b border-hairline">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2.5 text-sm transition-colors ${
              active === i
                ? "border-b-2 border-signal text-ink"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-5 text-sm text-ink-muted">{tabs[active]?.content}</div>
    </div>
  );
}
