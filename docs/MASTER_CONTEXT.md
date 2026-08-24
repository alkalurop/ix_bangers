# ix_bangers — Bangers + library surfaces (`ix`)

## 1. Environment

- **User / Machine**: David / MacBook Pro 16-inch (M5 Max, 64 GB), host `ix`
- **OS**: macOS Tahoe 26.5.1
- **Node**: Homebrew `/opt/homebrew/bin/node` (v26.7.0). Cursor MCP must use this path — GUI has no brew PATH.
- **ffmpeg**: already on this Mac (BPM). **keyfinder-cli** not installed until we need keys.
- **MCP**: `bangersss-mcp` 0.3.4 (albinekb, MIT). Project install, not global.
- **GitHub**: https://github.com/ixamal/ix_bangers (docs + plans only — no audio, no NML, no `master.db`)
- **Siblings**: [stems](https://github.com/ixamal/stems), [music_migration](https://github.com/ixamal/music_migration), [blackhole](https://github.com/ixamal/blackhole)
- **Journal**: `docs/PROGRESS.md` + `git log`

## 2. What this repo is

Catalog of how we drive Bangers against David’s library. Exported plans, markup, run notes. Not the audio. Not the mixer. Not stem generation.

## 3. Paths (from music_migration — confirm before first execute)

| What | Where |
|------|--------|
| Stems tree | `~/Music/stems_audio/{Artist}/{Album}/` |
| Apple Music | `~/Music/Music/Media.localized` |
| Traktor NML | `~/Documents/Native Instruments/Traktor 4.5.1/collection.nml` |
| Rekordbox XML | `~/Music/PioneerDJ/rekordbox.xml` |
| Rekordbox live DB | `~/Library/Pioneer/rekordbox/master.db` |
| Rekordbox app prefs | `~/Library/Application Support/Pioneer/rekordbox6/` |

Bangers Rekordbox tools hit **master.db** (SQLCipher). Close Rekordbox before writes. Server backups before commits.

## 4. What Bangers does not do

No native Traktor NML. Traktor relink stays in music_migration. This repo can *describe* playlists and plans that later land in Traktor.

Engine DJ is unused on this rig. Skip `edj_*` unless David plugs a Pioneer engine drive.

## 5. Phases

1. MCP loads in Cursor. Dry scan of a tiny folder. Nothing committed to disk.
2. One Rekordbox **read** (`rb_connect`, stats). Rekordbox may stay open for reads; still no writes.
3. Markup a plan that touches stems / Apple Music / RB / Traktor as *one* story. Execute only when David says.
