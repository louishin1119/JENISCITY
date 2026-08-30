import fs from "fs";
import path from "path";
import { NewsPost, newsPosts as seedPosts } from "./data";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "news.json");

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(seedPosts, null, 2), "utf-8");
  }
}

export function readNews(): NewsPost[] {
  ensureFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  try {
    return JSON.parse(raw) as NewsPost[];
  } catch {
    return seedPosts;
  }
}

function writeNews(posts: NewsPost[]) {
  ensureFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), "utf-8");
}

export function addNews(post: Omit<NewsPost, "id">): NewsPost {
  const posts = readNews();
  const newPost: NewsPost = { id: `n-${Date.now()}`, ...post };
  writeNews([newPost, ...posts]);
  return newPost;
}

export function deleteNews(id: string) {
  const posts = readNews();
  writeNews(posts.filter((p) => p.id !== id));
}
