# Progress

Session notes. I direct. Agent lifts. We write it down.

---

## 2026-08-24 — Repo stood up

Empty git folder existed locally. GitHub did not. Built the house: docs, Cursor MCP, local `bangersss-mcp` (not a global npm).

**Call:** dry mode. Close Rekordbox before any DB write. Do not let Bangers rearrange Apple Music or the 35k stems tree until a plan lives in `plans/`.

Upstream: https://www.npmjs.com/package/bangersss-mcp (LobeHub listing: https://lobehub.com/mcp/albinekb-bangersss-mcp). GitHub source 404 as of today — npm is the install.

Siblings stay siblings. Mixer = blackhole. Generator = stems. Remaps = music_migration.

---

## 2026-09-23 — Dry speak probe

`scripts/speak.mjs` starts local `bangersss-mcp` over stdio, lists tools, and reads three surfaces: Rekordbox (`rb_connect`, `rb_search_tracks` limit 3), one Apple Music album folder (`list_audio_files`), and the first real file named in the Traktor NML (`read_tags`). It writes nothing and does not commit a collection. Paths come from the home directory. Bangers still has no native Traktor API — the NML hit is a file read.
