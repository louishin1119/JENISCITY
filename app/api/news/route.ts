import { NextResponse } from "next/server";
import { readNews, addNews } from "@/lib/newsStore";
import { isAuthenticated } from "@/lib/adminAuth";
import { NewsCategory } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(readNews());
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const title = body?.title?.trim();
  const excerpt = body?.excerpt?.trim();
  const date = body?.date?.trim();
  const category = body?.category as NewsCategory | undefined;

  if (!title || !excerpt || !date || (category !== "공지사항" && category !== "패치노트")) {
    return NextResponse.json({ error: "모든 필드를 올바르게 입력해주세요." }, { status: 400 });
  }

  const post = addNews({ title, excerpt, date, category });
  return NextResponse.json(post);
}
