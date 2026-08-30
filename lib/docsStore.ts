import fs from "fs";
import path from "path";
import { docsByHref, DocPage } from "./docsContent";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "docs-overrides.json");

export type DocOverride = { body: string };

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({}, null, 2), "utf-8");
  }
}

function readOverrides(): Record<string, DocOverride> {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function writeOverrides(map: Record<string, DocOverride>) {
  ensureFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(map, null, 2), "utf-8");
}

export function getDocOverride(href: string): DocOverride | undefined {
  return readOverrides()[href];
}

export function setDocOverride(href: string, body: string) {
  const map = readOverrides();
  map[href] = { body };
  writeOverrides(map);
}

export function clearDocOverride(href: string) {
  const map = readOverrides();
  delete map[href];
  writeOverrides(map);
}

export function isOverridden(href: string): boolean {
  return href in readOverrides();
}

/** 기본(코드) 문서 + 관리자가 저장한 수정본을 합쳐서 실제 렌더링에 쓸 문서를 반환합니다. */
export function getEffectiveDoc(href: string): DocPage | undefined {
  const base = docsByHref[href];
  if (!base) return undefined;

  const override = getDocOverride(href);
  if (!override) return base;

  return {
    ...base,
    body: override.body,
    // 플레이스홀더였던 문서에 본문이 채워지면 "준비 중" 안내는 숨긴다.
    placeholderNote: override.body.trim() ? undefined : base.placeholderNote,
  };
}
