import GithubSlugger from "github-slugger";

export type TocItem = {
  level: 2 | 3;
  text: string;
  id: string;
};

/** Extract ## / ### headings from markdown body (outside fenced code). IDs match rehype-slug style. */
export function extractTocFromMarkdown(body: string): TocItem[] {
  const slugger = new GithubSlugger();
  const lines = body.split("\n");
  let inFence = false;
  const toc: TocItem[] = [];

  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const m = /^(#{2,3})\s+(.+)$/.exec(t);
    if (!m) continue;

    const level = m[1].length as 2 | 3;
    if (level !== 2 && level !== 3) continue;

    const text = m[2].replace(/\s+#+\s*$/, "").trim();
    if (!text) continue;

    const id = slugger.slug(text);
    toc.push({ level, text, id });
  }

  return toc;
}
