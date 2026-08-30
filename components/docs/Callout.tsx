import { CheckCircle2, Info } from "lucide-react";

export default function Callout({
  tone,
  text,
}: {
  tone: "success" | "info";
  text: string;
}) {
  const isSuccess = tone === "success";
  return (
    <div
      className={`flex items-start gap-2.5 rounded-xl border px-4 py-3.5 text-sm ${
        isSuccess
          ? "border-emerald-900/60 bg-emerald-950/40 text-emerald-300"
          : "border-signal-dim bg-signal/10 text-ink"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
      ) : (
        <Info size={18} className="mt-0.5 shrink-0" />
      )}
      <p>{text}</p>
    </div>
  );
}
