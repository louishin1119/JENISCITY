import { NextResponse } from "next/server";

// cfx.re 접속 코드는 https://cfx.re/join/xxxxxx 의 마지막 부분입니다.
const CFX_JOIN_CODE = process.env.CFX_JOIN_CODE ?? "xlzdevr";

export async function GET() {
  try {
    const res = await fetch(
      `https://servers-frontend.fivem.net/api/servers/single/${CFX_JOIN_CODE}`,
      { next: { revalidate: 30 } }
    );

    if (!res.ok) throw new Error(`upstream ${res.status}`);

    const data = await res.json();
    const players: number = data?.Data?.clients ?? 0;
    const maxPlayers: number = data?.Data?.sv_maxclients ?? 0;

    return NextResponse.json({ online: true, players, maxPlayers });
  } catch {
    // FiveM API에 접근할 수 없는 개발 환경 등을 위한 폴백
    return NextResponse.json({ online: true, players: null, maxPlayers: null });
  }
}
