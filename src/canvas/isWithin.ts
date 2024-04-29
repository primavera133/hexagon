import { longCathetus, r } from "./constants";

export const isWithin = (
  canvasWidth: number,
  canvasHeight: number,
  x: number,
  y: number,
) => {
  const xLeft = x - longCathetus + 2 * r;
  const xRight = x + longCathetus - 2 * r;
  const yTop = y + 2 * r;
  const yBottom = y - r;
  return (
    xLeft >= 0 && xRight <= canvasWidth && yTop >= 0 && yBottom <= canvasHeight
  );
};
