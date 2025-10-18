#!/usr/bin/env python3
"""
generate_sitemap.py

Generates sitemap.xml from a folder of static files.

Configuration:
  - BASE_URL (env or edit below) : your site root, e.g. "https://jejakiman.com"
  - SITE_DIR (env or edit below) : folder containing built HTML (default: ".")
  - OUTPUT_FILE (env or edit below) : output path for sitemap (default: "sitemap.xml")

This script:
  - walks SITE_DIR
  - includes .html files (skips sitemap.xml and 404.html)
  - converts index.html -> site root "/"
  - uses file mtime for <lastmod>
  - percent-encodes paths safely
"""
import os
import datetime
import sys
from urllib.parse import quote
from xml.sax.saxutils import escape

# Configuration (you can override with environment variables in GitHub Actions)
BASE_URL = os.environ.get("BASE_URL", "https://jejakiman.pages.dev").rstrip("/")
SITE_DIR = os.environ.get("SITE_DIR", ".").rstrip("/")
OUTPUT_FILE = os.environ.get("OUTPUT_FILE", "sitemap.xml")

# Files to exclude explicitly
EXCLUDE_FILES = {"404.html", "sitemap.xml"}

if not os.path.isdir(SITE_DIR):
    print(f"Error: SITE_DIR does not exist: {SITE_DIR}", file=sys.stderr)
    sys.exit(2)

entries = []

for root, dirs, files in os.walk(SITE_DIR):
    # skip .git folders or node_modules if present in the walk
    rel_parts = os.path.relpath(root, SITE_DIR).split(os.sep)
    if ".git" in rel_parts or "node_modules" in rel_parts or "eng" in rel_parts:
        continue

    for fname in files:
        if not fname.endswith(".html"):
            continue
        if fname in EXCLUDE_FILES:
            continue

        full_path = os.path.join(root, fname)
        rel_path = os.path.relpath(full_path, SITE_DIR).replace(os.sep, "/")

        if rel_path == "index.html":
            loc = BASE_URL + "/"
        else:
            # percent-encode path but keep slashes
            loc = BASE_URL + "/" + quote(rel_path, safe="/")

        # last modification date in UTC (YYYY-MM-DD)
        lastmod = datetime.datetime.utcfromtimestamp(os.path.getmtime(full_path)).date().isoformat()

        entries.append((loc, lastmod))

# Sort entries for stable output
entries.sort(key=lambda x: x[0])

# Write sitemap.xml
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
    for loc, lastmod in entries:
        f.write("  <url>\n")
        f.write(f"    <loc>{escape(loc)}</loc>\n")
        f.write(f"    <lastmod>{lastmod}</lastmod>\n")
        f.write("  </url>\n")
    f.write("</urlset>\n")

print(f"✅ Generated {OUTPUT_FILE} with {len(entries)} URLs")
# exit 0 even if empty to avoid failing workflow for small sites; change if you prefer non-zero
sys.exit(0)
