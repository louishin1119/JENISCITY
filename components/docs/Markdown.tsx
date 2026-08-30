import React from "react";

export function slugify(text: string): string {
  return text
    .trim()
    .replace(/[#*`]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}\-_.]/gu, "");
}

export function extractHeadings(md: string): { id: string; label: string; level: 2 | 3 }[] {
  const lines = md.split("\n");
  const out: { id: string; label: string; level: 2 | 3 }[] = [];
  for (const line of lines) {
    const h2 = /^##\s+(.+)$/.exec(line);
    const h3 = /^###\s+(.+)$/.exec(line);
    if (h2) out.push({ id: slugify(h2[1]), label: h2[1].trim(), level: 2 });
    else if (h3) out.push({ id: slugify(h3[1]), label: h3[1].trim(), level: 3 });
  }
  return out;
}

function renderInlineText(text: string, keyPrefix: string): React.ReactNode[] {
  // bold **text** and inline `code`
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return tokens.map((tok, i) => {
    if (tok.startsWith("**") && tok.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-${i}`} className="font-semibold text-ink">
          {tok.slice(2, -2)}
        </strong>
      );
    }
    if (tok.startsWith("`") && tok.endsWith("`")) {
      return (
        <code
          key={`${keyPrefix}-${i}`}
          className="mono-tag rounded bg-surface-raised px-1.5 py-0.5 text-[13px] text-signal"
        >
          {tok.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={`${keyPrefix}-${i}`}>{tok}</React.Fragment>;
  });
}

function isRule(line: string) {
  return /^(-{3,}|─{3,}|━{3,})$/.test(line.trim());
}

export default function Markdown({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (isRule(line)) {
      blocks.push(<hr key={key++} className="my-8 border-hairline" />);
      i++;
      continue;
    }

    const h2 = /^##\s+(.+)$/.exec(line);
    const h3 = /^###\s+(.+)$/.exec(line);
    const h4 = /^####\s+(.+)$/.exec(line);

    if (h2) {
      const id = slugify(h2[1]);
      blocks.push(
        <h2
          key={key++}
          id={id}
          className="mt-10 scroll-mt-8 font-display text-xl font-semibold text-ink"
        >
          {renderInlineText(h2[1].trim(), `h2-${key}`)}
        </h2>
      );
      i++;
      continue;
    }
    if (h3) {
      const id = slugify(h3[1]);
      blocks.push(
        <h3
          key={key++}
          id={id}
          className="mt-8 scroll-mt-8 font-display text-lg font-semibold text-ink"
        >
          {renderInlineText(h3[1].trim(), `h3-${key}`)}
        </h3>
      );
      i++;
      continue;
    }
    if (h4) {
      blocks.push(
        <h4 key={key++} className="mt-6 font-semibold text-ink">
          {renderInlineText(h4[1].trim(), `h4-${key}`)}
        </h4>
      );
      i++;
      continue;
    }

    // blockquote
    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote key={key++} className="my-4 border-l-2 border-signal pl-4 text-ink-muted">
          {quoteLines.join(" ")}
        </blockquote>
      );
      continue;
    }

    // table (pipe syntax)
    if (line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines
        .filter((l) => !/^\|[\s:|-]+\|$/.test(l.trim()))
        .map((l) =>
          l
            .trim()
            .replace(/^\||\|$/g, "")
            .split("|")
            .map((c) => c.trim())
        );
      const [header, ...body] = rows;
      blocks.push(
        <div key={key++} className="my-5 overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-surface-raised">
                {header.map((h, hi) => (
                  <th
                    key={hi}
                    className="border-b border-hairline px-4 py-2.5 text-left font-semibold text-ink"
                  >
                    {renderInlineText(h, `th-${key}-${hi}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} className="border-b border-hairline last:border-0">
                  {row.map((c, ci) => (
                    <td key={ci} className="px-4 py-2.5 text-ink-muted">
                      {renderInlineText(c, `td-${key}-${ri}-${ci}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // unordered list
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={key++} className="my-3 list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
          {items.map((it, ii) => (
            <li key={ii}>{renderInlineText(it, `ul-${key}-${ii}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push(
        <ol key={key++} className="my-3 list-decimal space-y-1.5 pl-5 text-sm text-ink-muted">
          {items.map((it, ii) => (
            <li key={ii}>{renderInlineText(it, `ol-${key}-${ii}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // paragraph: collect until blank line or next special line
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !isRule(lines[i]) &&
      !/^#{2,4}\s+/.test(lines[i]) &&
      !/^[-*]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith("|") &&
      !/^>\s?/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} className="my-3 text-sm leading-relaxed text-ink-muted">
        {renderInlineText(paraLines.join(" "), `p-${key}`)}
      </p>
    );
  }

  return <div>{blocks}</div>;
}
