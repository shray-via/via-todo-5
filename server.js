import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'To-Do List API is running' });
});

// Serve static files from dist in production, proxy to Vite in dev
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  // SPA fallback - serve index.html for all non-API routes
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // In development, respond to unmatched API routes
  // Static files are served by Vite on port 5173
  app.use('/api', (req, res) => {
    res.json({ status: 'ok', message: 'API available in development' });
  });
}

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});