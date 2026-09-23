#!/usr/bin/env node
/**
 * One-shot: start bangersss-mcp, list tools, read Rekordbox / Apple Music / a Traktor NML file.
 * Dry. No writes. No commit.
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HOME = os.homedir();
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SERVER = path.join(ROOT, 'node_modules/bangersss-mcp/dist/index.js');
const NODE = '/opt/homebrew/bin/node';
const NML = path.join(HOME, 'Documents/Native Instruments/Traktor 4.5.1/collection.nml');
const APPLE = path.join(HOME, 'Music/Music/Media.localized');

function textOf(result) {
  return (result.content ?? []).map((c) => c.text ?? JSON.stringify(c)).join('\n');
}

function firstAppleAlbum() {
  const r = spawnSync(
    'bash',
    [
      '-lc',
      `find ${JSON.stringify(APPLE)} -maxdepth 5 -type f -name '*.m4a' ! -path '*Automatically Add*' 2>/dev/null | head -5`,
    ],
    { encoding: 'utf8', timeout: 20000 },
  );
  const file = (r.stdout || '')
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l.endsWith('.m4a'));
  return file ? path.dirname(file) : null;
}

function firstTraktorFile() {
  const raw = fs.readFileSync(NML, 'utf8');
  const re = /<LOCATION DIR="([^"]+)" FILE="([^"]+)"/g;
  let m;
  while ((m = re.exec(raw))) {
    const fileName = m[2];
    if (fileName.toLowerCase().endsWith('.m4p')) continue;
    const dir = '/' + m[1].split('/:').filter(Boolean).join('/');
    const loc = path.join(dir, fileName);
    if (fs.existsSync(loc)) return loc;
  }
  return null;
}

async function main() {
  console.log('--- bangersss-mcp speak (read-only) ---');
  console.log('server:', SERVER);

  const transport = new StdioClientTransport({
    command: NODE,
    args: [SERVER],
    stderr: 'inherit',
  });
  const client = new Client({ name: 'ix_bangers-speak', version: '0.0.1' });
  await client.connect(transport);

  const tools = await client.listTools();
  const names = tools.tools.map((t) => t.name);
  console.log('\n[running] tools:', names.length);
  console.log(
    '  rb_*:',
    names.filter((n) => n.startsWith('rb_')).join(', ') || '(none)',
  );
  console.log(
    '  traktor_*:',
    names.filter((n) => n.toLowerCase().includes('traktor')).join(', ') ||
      '(none — Bangers has no native Traktor API)',
  );

  console.log('\n=== Rekordbox (master.db, read) ===');
  const rb = await client.callTool({ name: 'rb_connect', arguments: {} });
  console.log(textOf(rb));
  const search = await client.callTool({
    name: 'rb_search_tracks',
    arguments: { limit: 3 },
  });
  const searchText = textOf(search);
  console.log(searchText.length > 1200 ? searchText.slice(0, 1200) + '\n…' : searchText);

  console.log('\n=== Apple Music (one album folder, list) ===');
  const album = firstAppleAlbum();
  if (!album) {
    console.log('No .m4a under Media.localized');
  } else {
    console.log('folder:', album);
    const listed = await client.callTool({
      name: 'list_audio_files',
      arguments: { path: album, sortBy: 'name' },
    });
    const listedText = textOf(listed);
    console.log(listedText.length > 1200 ? listedText.slice(0, 1200) + '\n…' : listedText);
  }

  console.log('\n=== Traktor (NML location → read_tags) ===');
  const trakFile = firstTraktorFile();
  console.log('collection.nml:', NML, fs.existsSync(NML) ? 'present' : 'MISSING');
  console.log('first FILE=', trakFile);
  if (trakFile && fs.existsSync(trakFile)) {
    const tags = await client.callTool({
      name: 'read_tags',
      arguments: { path: trakFile },
    });
    const tagText = textOf(tags);
    console.log(tagText.length > 1200 ? tagText.slice(0, 1200) + '\n…' : tagText);
  } else {
    console.log('audio path missing on disk — NML points somewhere we cannot open');
  }

  await client.close();
  console.log('\n--- done (no writes) ---');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
