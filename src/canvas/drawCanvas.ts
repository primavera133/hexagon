import { drawHexagon } from "./drawHexagon";

import { r, longCathetus, shortCathetus } from "./constants";
import { drawCode } from "./drawCode";
import { gridData } from "./gridData";
import { isWithin } from "./isWithin";

export const drawCanvas = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
) => {
  function moveX(x: number) {
    return x * 2 * longCathetus;
  }

  function moveY(y: number) {
    return y * (2 * r - shortCathetus); // return y + 1.5 * r
  }

  // let offsetX =  1.5 * longCathetus;
  let offsetX = -longCathetus + 1.5 * longCathetus;
  // let offsetY = r;
  let offsetY = 0;

  gridData.forEach((value, key) => {
    const xAdjust = (-1) ** value.y * (longCathetus / 2);
    const x = offsetX + xAdjust + moveX(value.x);
    const y = offsetY + moveY(value.y);
    if (isWithin(canvasWidth, canvasHeight, x, y)) {
      drawHexagon(ctx, x, y, "#6b9", "#174");
      drawCode(ctx, x, y, key);
    } else {
      // console.log(key);
    }
  });
};
