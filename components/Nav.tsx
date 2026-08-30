import Link from "next/link";
import StatusBadge from "./StatusBadge";

const DISCORD_URL = "https://discord.gg/2026turn";
const JOIN_URL = "https://cfx.re/join/xlzdevr";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-asphalt/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          JENIS <span className="text-signal italic">CITY</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-ink-muted md:flex">
          <Link href="/news" className="transition-colors hover:text-ink">
            소식
          </Link>
          <Link href="/guide" className="transition-colors hover:text-ink">
            가이드
          </Link>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            디스코드
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <StatusBadge />
          </div>
          <a
            href={JOIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-signal px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            GAME START
          </a>
        </div>
      </div>
    </header>
  );
}
