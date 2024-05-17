export const a = (2 * Math.PI) / 6;
export const r = 25;
export const shortCathetus = r * Math.cos(a);
export const longCathetus = r * Math.sin(a);
export const hexWidth = 2 * longCathetus;
export const hexHeight = 2 * r;
export const hexOffsetY = 2 * r - shortCathetus; // distance between two rows

export const gridSize = {
  x: 200,
  y: 150,
};

export const startCoords = {
  x: 50,
  y: 50,
};

export const targetCoords = {
  x: 150,
  y: 50,
};
