#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import re
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parents[1]
COOKBOOK_DIR = ROOT / "cookbook"
ENTRIES_DIR = COOKBOOK_DIR / "entries"
OUT_JSON = COOKBOOK_DIR / "index.json"

FM_RE = re.compile(r"^---\s*\n([\s\S]*?)\n---\s*\n", re.M)

def slugify(s: str) -> str:
    s = s.strip().lower()
    s = s.replace("ä","ae").replace("ö","oe").replace("ü","ue").replace("ß","ss")
    s = re.sub(r"[^a-z0-9\-_. ]+", "", s)
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"-{2,}", "-", s)
    return s.strip("-")

def parse_frontmatter(md: str) -> dict:
    m = FM_RE.match(md)
    if not m:
        return {}
    block = m.group(1)
    data = {}
    for line in block.splitlines():
        line = line.strip()
        if not line or line.startswith("#") or ":" not in line:
            continue
        k, v = line.split(":", 1)
        k = k.strip()
        v = v.strip()

        # tags: [a, b] oder tags: a,b
        if k == "tags":
            if v.startswith("[") and v.endswith("]"):
                inner = v[1:-1].strip()
                tags = [t.strip() for t in inner.split(",") if t.strip()]
            else:
                tags = [t.strip() for t in v.split(",") if t.strip()]
            data[k] = tags
        else:
            data[k] = v.strip('"').strip("'")
    return data

def main():
    if not ENTRIES_DIR.exists():
        raise SystemExit(f"Entries-Ordner fehlt: {ENTRIES_DIR}")

    items = []
    for md_path in sorted(ENTRIES_DIR.glob("*.md")):
        text = md_path.read_text(encoding="utf-8", errors="replace")
        fm = parse_frontmatter(text)

        title = fm.get("title") or md_path.stem
        date = fm.get("date") or ""
        tags = fm.get("tags") or []
        summary = fm.get("summary") or ""

        # slug: prefer frontmatter, sonst aus Dateiname/Title
        slug = fm.get("slug") or slugify(md_path.stem)

        # Pfad relativ zur cookbook/index.html
        rel_path = f"./entries/{md_path.name}"

        items.append({
            "slug": slug,
            "title": title,
            "date": date,
            "tags": tags,
            "summary": summary,
            "path": rel_path,
        })

    # Sortierung: date desc, fallback: filename
    def parse_date(d):
        try:
            return datetime.strptime(d, "%Y-%m-%d")
        except Exception:
            return datetime.min

    items.sort(key=lambda x: (parse_date(x.get("date","")), x["slug"]), reverse=True)

    OUT_JSON.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[OK] Wrote {OUT_JSON} with {len(items)} entries")

if __name__ == "__main__":
    main()
