import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generateRouter from './routes/generate.js';
import generateVideoRouter from './routes/generateVideo.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// API routes
app.use('/api/generate', generateRouter);
app.use('/api/generateVideo', generateVideoRouter);

// Static frontend
app.use(express.static(path.join(__dirname, '..', 'public')));

// Fallback to index.html for root
app.get('*', (_req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});
