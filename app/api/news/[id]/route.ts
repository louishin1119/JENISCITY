import { NextResponse } from "next/server";
import { deleteNews } from "@/lib/newsStore";
import { isAuthenticated } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const { id } = await params;
  deleteNews(id);
  return NextResponse.json({ ok: true });
}
