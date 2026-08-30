import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "jenis_admin";
const SECRET = process.env.ADMIN_SECRET || "jenis-city-dev-secret-change-me";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jeniscity2026";

function sessionToken(): string {
  return crypto.createHmac("sha256", SECRET).update("admin-session").digest("hex");
}

export function checkPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export async function createSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8시간
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  return value === sessionToken();
}
