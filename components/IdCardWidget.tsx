"use client";

import { useEffect, useState } from "react";
import { identities } from "@/lib/data";

type Phase = "redacted" | "typing-alias" | "typing-job" | "settled" | "reissuing";

function useTypewriter(text: string, active: boolean, speed = 55) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (!active) return;
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);

  return shown;
}

export default function IdCardWidget() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("redacted");
  const identity = identities[index];

  const alias = useTypewriter(identity.alias, phase === "typing-alias");
  const job = useTypewriter(identity.job, phase === "typing-job");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("typing-alias"), 700));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    if (phase === "typing-alias" && alias.length === identity.alias.length) {
      const t = setTimeout(() => setPhase("typing-job"), 250);
      return () => clearTimeout(t);
    }
  }, [phase, alias, identity.alias]);

  useEffect(() => {
    if (phase === "typing-job" && job.length === identity.job.length) {
      const t = setTimeout(() => setPhase("settled"), 2600);
      return () => clearTimeout(t);
    }
  }, [phase, job, identity.job]);

  useEffect(() => {
    if (phase === "settled") {
      const t = setTimeout(() => setPhase("reissuing"), 500);
      return () => clearTimeout(t);
    }
    if (phase === "reissuing") {
      const t = setTimeout(() => {
        setIndex((i) => (i + 1) % identities.length);
        setPhase("redacted");
      }, 550);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const dim = phase === "redacted" || phase === "reissuing";

  return (
    <div
      className="relative w-full max-w-sm rounded-2xl border border-hairline bg-surface p-6 shadow-[0_0_60px_-15px_rgba(46,107,255,0.35)] transition-opacity duration-500"
      style={{ opacity: dim ? 0.35 : 1 }}
      aria-live="polite"
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="mono-tag text-[10px] text-ink-faint">LSPD · CITY IDENTITY</span>
        <span className="mono-tag text-[10px] text-signal">{identity.code}</span>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-md border border-hairline bg-surface-raised">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-signal to-violet opacity-80" />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <div>
            <p className="mono-tag text-[10px] text-ink-faint">ALIAS</p>
            <p className="font-display text-xl font-semibold text-ink">
              {alias || "\u00A0"}
              {phase === "typing-alias" && <span className="animate-pulse text-signal">▌</span>}
            </p>
          </div>
          <div>
            <p className="mono-tag text-[10px] text-ink-faint">OCCUPATION</p>
            <p className="text-sm text-ink-muted">
              {job || "\u00A0"}
              {phase === "typing-job" && <span className="animate-pulse text-signal">▌</span>}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-hairline pt-4">
        <span className="mono-tag text-[10px] text-ink-faint">DISTRICT</span>
        <span className="mono-tag text-[10px] text-ink-muted">{identity.district}</span>
      </div>
    </div>
  );
}
