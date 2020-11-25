const db = require('./db.json') as Rectangle[];

type Rectangle = {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  backgroundColor: string;
};

export const updateRectanglePosition = (id: string, x: number, y: number): void => {
  const rectangle = db.find(item => item.id === id);
  rectangle.x = x;
  rectangle.y = y;
};

export default db;
