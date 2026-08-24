# bangersss-mcp

Upstream: [npm `bangersss-mcp`](https://www.npmjs.com/package/bangersss-mcp) 0.3.4 (MIT, albinekb). Listing: [LobeHub](https://lobehub.com/mcp/albinekb-bangersss-mcp). Clone URL 404 on 2026-08-24 — install from npm.

Cursor: [`.cursor/mcp.json`](../../../.cursor/mcp.json). Homebrew `node` runs the local `dist/index.js` so GUI Cursor finds Node.

## Mode

**Dry overlay.** File moves, renames, tag writes, Rekordbox SQL — all pending until `commit_changes`. Think git add, then commit.

## Tools we care about first

| Group | Tools | On this rig |
|-------|--------|-------------|
| Scan | `scan_directory`, `scan_incoming`, `list_audio_files` | Tiny folder first |
| Tags | `read_tags`, `batch_read_tags` | Safe. Writes stay overlay |
| Rekordbox | `rb_connect`, `rb_search_tracks`, `rb_list_playlists`, `rb_library_stats`, `rb_get_cue_points` | Reads. Writes later, RB quit |
| Plans | `create_plan`, `export_plan`, `view_plan` | Land JSON in `plans/` |
| Overlay | `get_pending_changes`, `discard_changes`, `commit_changes` | Commit is David’s word |

Skip Engine DJ. Skip `quick_ingest` into `stems_audio` or `Media.localized` until a plan exists.

## Still unknown

- Whether `rb_connect` opens Rekordbox 7’s SQLCipher DB on this Mac without extra key setup (package already depends on `better-sqlite3-multiple-ciphers`)
- Traktor: no MCP tools. Markup only.

Log answers here after the first connect.
