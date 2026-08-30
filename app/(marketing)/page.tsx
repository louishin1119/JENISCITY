import Link from "next/link";
import IdCardWidget from "@/components/IdCardWidget";
import { readNews } from "@/lib/newsStore";

export const dynamic = "force-dynamic";

const facts = [
  { label: "FRAMEWORK", value: "커스텀 vRP" },
  { label: "CONTENT", value: "직업 · 경제 · 갱" },
  { label: "ENTRY", value: "디스코드 심사제" },
];

export default function Home() {
  const recent = readNews().slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mono-tag mb-6 text-xs text-ink-faint">
              LOS SANTOS · SINCE 2026 &nbsp;·&nbsp; FIVEM ROLEPLAY · KR
            </p>
            <h1 className="text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              새 이름, 새 직업,
              <br />
              두 번째 인생
            </h1>
            <p className="mt-6 max-w-md text-balance text-ink-muted">
              제니스시티에서는 아무도 당신의 과거를 묻지 않습니다. 경찰이든 정비공이든
              뒷골목 상인이든, 오늘 누가 될지는 당신이 정합니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://discord.gg/2026turn"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-signal px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                디스코드 입장
              </a>
              <Link
                href="/guide"
                className="rounded-full border border-hairline px-6 py-3 text-sm font-medium text-ink-muted transition-colors hover:border-signal hover:text-ink"
              >
                처음이신가요?
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-hairline pt-6">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="mono-tag text-[10px] text-ink-faint">{f.label}</dt>
                  <dd className="mt-1 text-sm text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex justify-center lg:justify-end">
            <IdCardWidget />
          </div>
        </div>
      </section>

      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-xl font-semibold">최근 소식</h2>
            <Link href="/news" className="text-sm text-signal hover:underline">
              전체 보기
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {recent.map((post) => (
              <Link
                key={post.id}
                href="/news"
                className="group rounded-xl border border-hairline bg-surface p-5 transition-colors hover:border-signal-dim"
              >
                <span className="mono-tag text-[10px] text-signal">{post.category}</span>
                <h3 className="mt-3 font-display text-base font-semibold leading-snug text-ink group-hover:text-white">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{post.excerpt}</p>
                <p className="mono-tag mt-4 text-[10px] text-ink-faint">{post.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
