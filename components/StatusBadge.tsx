"use client";

import { useEffect, useState } from "react";

type Status = { online: boolean; players: number | null; maxPlayers: number | null };

export default function StatusBadge() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch("/api/server-status", { cache: "no-store" });
        const data: Status = await res.json();
        if (!cancelled) setStatus(data);
      } catch {
        if (!cancelled) setStatus({ online: true, players: null, maxPlayers: null });
      }
    }

    poll();
    const interval = setInterval(poll, 30_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const online = status?.online ?? true;

  return (
    <div className="flex items-center gap-2 mono-tag text-xs text-ink-muted">
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full rounded-full ${
            online ? "bg-signal animate-ping" : "bg-ink-faint"
          } opacity-75`}
        />
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            online ? "bg-signal" : "bg-ink-faint"
          }`}
        />
      </span>
      <span>{online ? "SERVER ONLINE" : "SERVER OFFLINE"}</span>
      {status?.players !== null && status?.players !== undefined && (
        <span className="text-ink-faint">
          {status.players}/{status.maxPlayers}
        </span>
      )}
    </div>
  );
}
