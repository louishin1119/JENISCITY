import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/adminAuth";
import { docsByHref } from "@/lib/docsContent";
import { setDocOverride, clearDocOverride } from "@/lib/docsStore";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const href = body?.href;
  const content = body?.body;

  if (typeof href !== "string" || !docsByHref[href]) {
    return NextResponse.json({ error: "존재하지 않는 문서입니다." }, { status: 400 });
  }
  if (typeof content !== "string") {
    return NextResponse.json({ error: "본문 내용이 필요합니다." }, { status: 400 });
  }

  setDocOverride(href, content);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const href = searchParams.get("href");

  if (!href || !docsByHref[href]) {
    return NextResponse.json({ error: "존재하지 않는 문서입니다." }, { status: 400 });
  }

  clearDocOverride(href);
  return NextResponse.json({ ok: true });
}
