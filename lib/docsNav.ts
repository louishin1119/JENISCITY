export type NavPage = {
  type: "page";
  id: string;
  label: string;
  href: string;
};

export type NavFolder = {
  type: "folder";
  id: string;
  label: string;
  children: NavItem[];
};

export type NavItem = NavPage | NavFolder;

export type NavGroup = {
  title: string;
  items: NavItem[];
};

const page = (id: string, label: string, href: string): NavPage => ({
  type: "page",
  id,
  label,
  href,
});

const folder = (id: string, label: string, children: NavItem[]): NavFolder => ({
  type: "folder",
  id,
  label,
  children,
});

export const navGroups: NavGroup[] = [
  {
    title: "가이드",
    items: [
      folder("start-guide", "시작가이드", [
        page("getting-started", "시작 가이드", "/guide/start/getting-started"),
        page("pricing-tier", "결제등급안내", "/guide/start/pricing-tier"),
      ]),
    ],
  },
  {
    title: "이용약관",
    items: [page("payment-terms", "결제 약관", "/guide/terms/payment-terms")],
  },
  {
    title: "규칙",
    items: [
      folder("rules", "규칙", [
        page("rules-overview", "규칙", "/guide/rules/rules"),
        page("rp-terms", "알피 정의", "/guide/rules/rp-terms"),
        page("key-guide", "키 가이드", "/guide/rules/key-guide"),
        page("phone-guide", "휴대폰 사용법", "/guide/rules/phone-guide"),
        page("vehicle-guide", "차량 이용 방법", "/guide/rules/vehicle-guide"),
        page("respawn-guide", "사망 및 부활 안내", "/guide/rules/respawn-guide"),
        page("play-standard", "플레이 기준표", "/guide/rules/play-standard"),
        page("faq", "FAQ", "/guide/rules/faq"),
      ]),
    ],
  },
  {
    title: "LAW",
    items: [
      folder("basic-law", "기초 법률", [
        page("basic-server-law", "기본 서버 법률", "/guide/law/basic-server-law"),
        page("server-sanctions", "서버 제재 법률", "/guide/law/server-sanctions"),
        page("discord-law", "디스코드 이용 법률", "/guide/law/discord-law"),
        page("newbie-protection", "뉴비 보호법", "/guide/law/newbie-protection"),
        page("official-punishment", "공무원 처벌", "/guide/law/official-punishment"),
        page("official-special-law", "공무원 특별법", "/guide/law/official-special-law"),
        page("system-abuse", "시스템 악용/불법 프로그램", "/guide/law/system-abuse"),
        page("protected-zone", "보호구역", "/guide/law/protected-zone"),
        page("dual-rp", "이중 RP", "/guide/law/dual-rp"),
        page("non-rp", "NON-RP", "/guide/law/non-rp"),
        page("trading-law", "매매/거래", "/guide/law/trading-law"),
        page("faction-jobs", "특수직(팩션)", "/guide/law/faction-jobs"),
        page("official-seizure", "공무원 물품 압수", "/guide/law/official-seizure"),
        page("checkpoint", "불심 검문", "/guide/law/checkpoint"),
        page("faction-protection", "팩션 보호 기간", "/guide/law/faction-protection"),
        page("memory-rp", "기억 RP", "/guide/law/memory-rp"),
        page("hunting-zombie", "사냥터/좀비존", "/guide/law/hunting-zombie"),
        page("blacklist", "블랙리스트", "/guide/law/blacklist"),
        page("vehicle-seizure", "차량 압류", "/guide/law/vehicle-seizure"),
        page("chat-voice", "채팅/음성", "/guide/law/chat-voice"),
        page("lb-phone", "LB폰(I 휴대폰)", "/guide/law/lb-phone"),
        page("aviation-law", "항공법 규정", "/guide/law/aviation-law"),
      ]),
    ],
  },
  {
    title: "스토리 알피",
    items: [
      page("story-rp-law", "통합 RP 법률", "/guide/story/rp-law"),
      page("story-burglary", "빈집털이", "/guide/story/burglary"),
      page("story-village", "마을털이", "/guide/story/village"),
      page("story-salon", "미용실 털이", "/guide/story/salon"),
      page("story-atm", "ATM 털이", "/guide/story/atm"),
      page("story-store", "편의점 털이", "/guide/story/store"),
      page("story-jewelry", "보석상 털이", "/guide/story/jewelry"),
      page("story-chicken", "닭공장", "/guide/story/chicken-factory"),
      page("story-bank-south", "남부은행", "/guide/story/bank-south"),
      page("story-bank-north", "북부은행", "/guide/story/bank-north"),
      page("story-old-police", "구 경찰서 털이", "/guide/story/old-police"),
      page("story-old-security", "구 보안청 털이", "/guide/story/old-security"),
    ],
  },
  {
    title: "범죄와의 전쟁",
    items: [
      page("crime-war-overview", "범죄와의 전쟁", "/guide/crime-war/overview"),
      page("crime-wanted", "수배", "/guide/crime-war/wanted"),
      page("crime-escape", "도주", "/guide/crime-war/escape"),
      page("crime-warrant", "영장", "/guide/crime-war/warrant"),
      page("crime-sea", "해상", "/guide/crime-war/sea"),
    ],
  },
  {
    title: "조직 알피",
    items: [
      page("org-rp-law", "조직 RP 법률", "/guide/org/rp-law"),
      page("org-ground-c", "지상 C", "/guide/org/ground-c"),
      page("org-ground-d", "지상 D", "/guide/org/ground-d"),
      page("org-casino", "카지노 게릴라", "/guide/org/casino-guerrilla"),
      page("org-private", "사유지 게릴라", "/guide/org/private-guerrilla"),
      page("org-business", "사업장 게릴라", "/guide/org/business-guerrilla"),
      page("org-airport", "남부공항 게릴라", "/guide/org/airport-guerrilla"),
      page("org-sea-hegemony", "해상패권전", "/guide/org/sea-hegemony"),
      page("org-kidnap", "납치", "/guide/org/kidnap"),
      page("org-gunshop", "건샵 털이", "/guide/org/gunshop"),
    ],
  },
];

// 사이드바에서 기본적으로 펼쳐 보여줄 폴더
export const defaultExpandedIds = ["start-guide", "basic-law"];

// 사이드바 트리에는 없지만 푸터에서 링크되는 약관/정책 페이지
export const legalPages: NavPage[] = [
  page("legal-terms", "서비스 이용약관", "/guide/legal/terms"),
  page("legal-privacy", "개인정보 처리방침", "/guide/legal/privacy"),
];

function flatten(items: NavItem[], acc: NavPage[] = []): NavPage[] {
  for (const item of items) {
    if (item.type === "page") acc.push(item);
    else flatten(item.children, acc);
  }
  return acc;
}

// 검색과 이전/다음 페이지 내비게이션에 쓰이는 평탄화된 문서 순서
export const flatPages: NavPage[] = navGroups.flatMap((g) => flatten(g.items));

export const searchablePages: NavPage[] = [...flatPages, ...legalPages];

export function getAdjacentPages(href: string): { prev?: NavPage; next?: NavPage } {
  const idx = flatPages.findIndex((p) => p.href === href);
  if (idx === -1) return {};
  return { prev: flatPages[idx - 1], next: flatPages[idx + 1] };
}
