// One-time setup for scripts/browse.py: a repo-local Python venv with Camoufox
// (a privacy-hardened Firefox that sites treat as a normal visitor).
//   npm run browser:setup
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/render.mjs';

const venv = path.join(ROOT, '.venv');
const py = path.join(venv, process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
const run = (cmd) => { console.log('> ' + cmd); execSync(cmd, { stdio: 'inherit', cwd: ROOT }); };
if (!fs.existsSync(py)) run(`${process.platform === 'win32' ? 'python' : 'python3'} -m venv .venv`);
run(`"${py}" -m pip install -q "camoufox[geoip]"`);
run(`"${py}" -m camoufox fetch`);
console.log('\nready: ' + path.relative(ROOT, py) + ' scripts/browse.py read <url>');
