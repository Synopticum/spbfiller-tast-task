import path from 'path';
import express from 'express';
import morgan from 'morgan';
import db, { updateRectanglePosition } from './db';

const app = express();

app.use(morgan('combined'));
app.use(express.json());

const publicPath = path.resolve(process.cwd(), 'dist', 'web');

const simulateWaiting = (): Promise<void> => {
  const timeout = Boolean(Math.random() < 0.5) ? 300 : 500;
  return new Promise((resolve, reject) => setTimeout(resolve, timeout));
};

app.use('/web/', express.static(publicPath, { index: false }));

app.use('/api/rectangles', async (req, res) => {
  await simulateWaiting();

  res.set('Content-Type', 'application/json');
  res.end(JSON.stringify(db));
});

app.put('/api/rectangle', async (req, res) => {
  await simulateWaiting();

  const { id, x, y } = req.body;
  updateRectanglePosition(id, x, y);

  res.set('Content-Type', 'application/json');
  res.end();
});

app.listen(3000, () => {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`API_URL: ${process.env.API_URL}`);
});

export default app;
