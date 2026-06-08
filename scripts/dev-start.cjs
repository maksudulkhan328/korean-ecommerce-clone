#!/usr/bin/env node
// Kills any process on port 8080 then starts Vite
const { execSync, spawn } = require('child_process');

const PORT = 8080;

// Kill whatever is on port 8080
try {
  const out = execSync('netstat -ano', { encoding: 'utf8' });
  const lines = out.split('\n').filter(l => l.includes(`:${PORT}`) && l.includes('LISTENING'));
  lines.forEach(line => {
    const parts = line.trim().split(/\s+/);
    const pid = parts[parts.length - 1];
    if (pid && pid !== '0') {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
        console.log(`\x1b[33mKilled PID ${pid} on port ${PORT}\x1b[0m`);
      } catch (e) { /* already dead */ }
    }
  });
} catch (e) { /* netstat failed, ignore */ }

// Small delay to ensure port is released
setTimeout(() => {
  // Spawn Vite
  const vite = spawn('node', ['node_modules/vite/bin/vite.js'], {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: false,
  });
  vite.on('exit', code => process.exit(code ?? 0));
}, 300);
