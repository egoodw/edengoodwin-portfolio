# Personal Portfolio Website

> Eden Goodwin's personal academic/research portfolio site.

**Status:** active
**Language:** HTML, CSS, JSX (no bundler — browser-native React via CDN)

## Overview

Static single-page-style portfolio. JSX components are loaded directly in the browser
via Babel standalone — no build step required. Served locally with `serve.sh` (Python
http.server on port 8080).

## Quick Start

```bash
bash serve.sh
# open http://localhost:8080/Goodwin\ Group\ source.html
```

## Directory Structure

```
main/
├── Goodwin Group source.html   # main entry point
├── serve.sh                    # local dev server
├── css/
│   ├── styles.css              # core styles
│   └── demos.css               # demo-specific styles
├── js/
│   ├── shell.jsx               # page shell / layout
│   ├── sections.jsx            # content sections
│   ├── demos.jsx               # interactive demos
│   └── variations.jsx          # style variations
└── assets/
    └── Curriculum Vitae.docx
```

## Notes

`.bak` files are old snapshots — safe to delete once the source version is stable.
Consider adding a `.gitignore` if this goes into version control.

## Agent Tasks


