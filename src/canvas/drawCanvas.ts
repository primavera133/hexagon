import { drawHexagon } from "./drawHexagon";

import {
  hexHeight,
  hexOffsetY,
  hexWidth,
  longCathetus,
  shortCathetus,
} from "./constants";
import { drawCode } from "./drawCode";
import { gridData } from "./gridData";
import { isWithin } from "./isWithin";

export const drawCanvas = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  posX: number,
  posY: number,
  trail: string[],
) => {
  // console.log("trail", trail);
  let offsetX = -(posX * hexWidth) + canvasWidth / 2;
  if ((-1) ** posY > 0) {
    offsetX -= longCathetus; // withdraw half a width of a hex for smoother diagonal movements
  }
  const offsetY =
    -(((2 * hexHeight - 2 * shortCathetus) * posY) / 2) + canvasHeight / 2;

  gridData.forEach((value, key) => {
    const xAdjust = (-1) ** value.y * (longCathetus / 2); // odd / even x-wise adjustment
    const x = offsetX + xAdjust + value.x * hexWidth;
    const y = offsetY + value.y * hexOffsetY;
    let fillStyle = "#6b9";

    if (value.x === posX && value.y === posY) {
      fillStyle = "#900";
    } else if (trail.includes(`${value.x}:${value.y}`)) {
      fillStyle = "#7ca";
    }
    if (isWithin(canvasWidth, canvasHeight, x, y)) {
      drawHexagon(ctx, x, y, fillStyle, "#174");
      drawCode(ctx, x, y, key);
    } else {
      // console.log(key);
    }
  });
};
