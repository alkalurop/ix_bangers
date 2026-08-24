# RUNBOOK — Bangers on `ix`

Open **this** folder in Cursor so [`.cursor/mcp.json`](../.cursor/mcp.json) loads.

## Install (already done on this Mac)

Node via Homebrew. Package is a **project** dependency (`package.json`), not `npm install -g`.

```bash
cd ~/github/ixamal/ix_bangers
/opt/homebrew/bin/npm install
```

Cursor starts the server. Full path matters (GUI Cursor has no Homebrew PATH):

`/opt/homebrew/bin/node` → `node_modules/bangersss-mcp/dist/index.js`

If MCP is red: Cursor → Settings → MCP → refresh. Do not type the binary in a terminal and wait — it hangs on stdio.

## First session (dry)

1. Pick a **tiny** folder. Not `stems_audio`. Not `Media.localized`.
2. `scan_incoming` or `scan_directory`.
3. `get_pending_changes` — should be empty until we stage.
4. Do **not** `commit_changes` unless David says so.

## Rekordbox

- Read: `rb_connect` then search / stats / playlists / cues.
- Write: Rekordbox **quit**. Then overlay. Then commit. Backup is the MCP’s job; we still do not treat that as a substitute for David’s own backup.

## Apple Music / stems / Traktor

Those trees are live libraries. A plan in `plans/` first. music_migration already hoisted Apple Music; stems repo already generates STEMs. This repo catalogs the Bangers pass, it does not replace those shops.
