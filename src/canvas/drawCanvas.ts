import { drawHexagon } from "./drawHexagon";

import { longCathetus, r, shortCathetus } from "./constants";
import { drawCode } from "./drawCode";
import { gridData } from "./gridData";
import { isWithin } from "./isWithin";

function moveX(x: number) {
  return x * 2 * longCathetus;
}

function moveY(y: number) {
  return y * (2 * r - shortCathetus); // return y + 1.5 * r
}

export const drawCanvas = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  posX: number,
  posY: number,
) => {
  // let offsetX =  1.5 * longCathetus;
  const offsetX = -longCathetus + 1.5 * longCathetus;
  // let offsetY = r;
  const offsetY = 0;

  gridData.forEach((value, key) => {
    const xAdjust = (-1) ** value.y * (longCathetus / 2);
    const x = offsetX + xAdjust + moveX(value.x);
    const y = offsetY + moveY(value.y);
    let fillStyle = "#6b9";
    if (value.x === posX && value.y === posY) {
      fillStyle = "#900";
    }
    if (isWithin(canvasWidth, canvasHeight, x, y)) {
      drawHexagon(ctx, x, y, fillStyle, "#174");
      drawCode(ctx, x, y, key);
    } else {
      // console.log(key);
    }
  });
};
