export type Tier = { name: string; requirement: string; perks: string[] };

export default function PricingTiers({ tiers }: { tiers: Tier[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className="rounded-xl border border-hairline bg-surface p-5"
        >
          <div className="flex items-baseline justify-between">
            <h3 className="mono-tag text-sm font-semibold text-signal">{tier.name}</h3>
            <span className="mono-tag text-[11px] text-ink-faint">{tier.requirement}</span>
          </div>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
            {tier.perks.map((perk, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-signal">·</span>
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
