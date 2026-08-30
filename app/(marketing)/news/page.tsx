import NewsList from "@/components/NewsList";
import { readNews } from "@/lib/newsStore";

export const dynamic = "force-dynamic";

export default function NewsPage() {
  const posts = readNews();

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <p className="mono-tag mb-2 text-xs text-ink-faint">UPDATE LOG</p>
      <h1 className="font-display text-3xl font-bold">소식</h1>
      <p className="mt-3 text-ink-muted">
        서버 업데이트와 공지를 여기에 올립니다. 최신 글이 맨 위입니다.
      </p>

      <div className="mt-10">
        <NewsList posts={posts} />
      </div>
    </section>
  );
}
