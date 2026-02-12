const { createServer } = require('http');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 3000;

// Use 'serve' package to serve static files
const serve = spawn('npx', ['serve', '.', '-p', PORT.toString(), '-n'], {
  stdio: 'inherit',
  shell: true
});

serve.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

serve.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});

console.log(`震撼震撼震撼 ConversationMine.com serving on port ${PORT}震撼震撼震撼`);
