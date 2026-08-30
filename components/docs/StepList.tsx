function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code
        key={i}
        className="mono-tag rounded bg-surface-raised px-1.5 py-0.5 text-[13px] text-signal"
      >
        {part.slice(1, -1)}
      </code>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function StepList({
  items,
}: {
  items: { title: string; desc: string }[];
}) {
  return (
    <ol className="space-y-6">
      {items.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span className="mono-tag flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal text-xs font-medium text-white">
            {i + 1}
          </span>
          <div>
            <p className="font-semibold text-ink">{step.title}</p>
            <p className="mt-1 text-sm text-ink-muted">{renderInline(step.desc)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
