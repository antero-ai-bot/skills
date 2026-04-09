# LLM Wiki Skill

Based on Andrej Karpathy's pattern for building personal knowledge bases with LLMs.

## Overview

This skill enables an LLM to maintain a persistent, compounding wiki between you and your raw sources. Instead of RAG (rediscovering knowledge from scratch each query), the wiki accumulates knowledge—cross-references already exist, contradictions are flagged, synthesis is already done.

## Three Layers

### 1. Raw Sources (`sources/`)
Your curated collection of immutable source documents. Articles, papers, images, data files. The LLM reads from them but never modifies them. This is your source of truth.

### 2. Wiki (`wiki/`)
LLM-generated markdown files. Summaries, entity pages, concept pages, comparisons, synthesis. The LLM creates and updates pages, maintains cross-references, and keeps everything consistent.

### 3. Schema (`SCHEMA.md`)
Instructions telling the LLM how the wiki is structured, conventions, and workflows for ingesting sources, answering questions, and maintaining the wiki.

## Core Workflows

### Ingest
When you share a link or text:
1. Fetch the content (URL or use provided text)
2. Extract key information
3. Create/update relevant wiki pages
4. Update `index.md` and `log.md`
5. Add cross-references

### Query
When you ask questions:
1. Search the wiki (start with index.md)
2. Read relevant pages
3. Synthesize an answer with citations
4. Optionally save valuable answers back to the wiki

### Lint
Periodic health-check:
- Contradictions between pages
- Stale claims superseded by newer sources
- Orphan pages with no inbound links
- Missing cross-references
- Data gaps

## Special Files

- **index.md**: Catalog of all wiki pages with summaries. Updated on every ingest.
- **log.md**: Chronological record of ingests, queries, lint passes. Format: `## [YYYY-MM-DD] <type> | Title`

## Vault Location

Default vault: `/Users/antero/clawd/obsidian/`
- Raw sources: `sources/`
- Wiki pages: `wiki/`
- Index: `index.md`
- Log: `log.md`

## Usage

When you send me:
- **A URL**: I'll fetch it, extract the key information, and create wiki pages for it
- **Text/notes**: I'll integrate it into the appropriate wiki pages
- **Questions**: I'll answer against the accumulated wiki, then optionally save the answer

**Current vault structure:**
```
obsidian/
├── index.md          # Catalog of all wiki pages
├── log.md            # Activity history
├── sources/          # Raw immutable sources
│   └── *.md
└── wiki/             # LLM-generated pages
    └── *.md
```

## Commands

This skill provides these capabilities:
- **ingest <source>**: Process a new source (URL or text) and integrate into wiki
- **query <question>**: Answer a question against the wiki
- **lint**: Health-check the wiki
- **search <term>**: Search wiki content
- **index**: Show wiki index
- **log**: Show recent activity log

## Integration

The skill is loaded. Just send me links or text anytime you want to add to the wiki!