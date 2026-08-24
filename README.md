# ix_bangers

David’s Bangers shop on `ix`. I point, the agent heavy-lifts, we catalog the moves. [ixamal](https://github.com/ixamal) / [alkalurops.org](https://www.alkalurops.org).

**This repo is the integration log** — automation, markup, plans — for [bangersss-mcp](https://www.npmjs.com/package/bangersss-mcp) against the real library: stems, Apple Music, Rekordbox, Traktor. Audio stays on disk. Collections stay on disk. GitHub is notes + exported plans.

The mixer is [blackhole](https://github.com/ixamal/blackhole). Stem generation is [stems](https://github.com/ixamal/stems). Path remaps are [music_migration](https://github.com/ixamal/music_migration). Do not mix those fights into this chat.

**Dry mode until I say commit.** Bangers overlays file + Rekordbox writes. Preview first. Close Rekordbox before any DB write.

License: [Apache-2.0](LICENSE). Upstream MCP is MIT (albinekb / 0.3.4).

## Surfaces

| Surface | Role here | Do not |
|---------|-----------|--------|
| **Stems** | Catalog STEM files already on `~/Music/stems_audio` | Generate stems (that is the stems repo) |
| **Apple Music** | Read tags / playlists if we ingest *into* Music | Rewrite `Media.localized` without a written plan |
| **Rekordbox** | `rb_*` tools on `~/Library/Pioneer/rekordbox/master.db` | Write while Rekordbox is open |
| **Traktor** | Markup + playlists that later relink in NML | Pretend Bangers talks Traktor natively — it does not |

## Docs

| Doc | What |
|-----|------|
| [`docs/RUNBOOK.md`](docs/RUNBOOK.md) | Install, Cursor MCP, first dry scan |
| [`docs/MASTER_CONTEXT.md`](docs/MASTER_CONTEXT.md) | Paths, siblings, what this is not |
| [`docs/PROGRESS.md`](docs/PROGRESS.md) | The log |
| [`docs/settings/bangersss-mcp/NOTES.md`](docs/settings/bangersss-mcp/NOTES.md) | MCP notes |
| [`plans/`](plans/README.md) | Exported `.bangersss-mcp-plan.json` |

Cursor MCP config lives in [`.cursor/mcp.json`](.cursor/mcp.json). Open **this** folder so the server loads.

```bash
/opt/homebrew/bin/bangersss-mcp
```

That process waits on stdio. Cursor starts it. You do not.
