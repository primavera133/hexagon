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

  let offsetX = 1.5 * longCathetus;
  let offsetY = 2 * longCathetus;

  gridData.forEach((value, key) => {
    let oddEvenOperator = (-1) ** value.y; // gives -1 for odd, 1 for even
    const xAdjust = oddEvenOperator * (longCathetus / 2);
    const x = offsetX + xAdjust + moveX(value.x);
    const y = offsetY + moveY(value.y);
    if (isWithin(canvasWidth, canvasHeight, x, y)) {
      drawHexagon(ctx, x, y, "#6b9", "#174");
      drawCode(ctx, x, y, key);
    } else {
      // console.log(key);
    }
  });

  // // loop over Y
  // let xIterator = 0;
  // while (xIterator < data.length) {
  //   let yIterator = 0;
  //   while (yIterator < data[xIterator].length) {
  //     const { codeX, codeY } = data[xIterator][yIterator];
  //     let oddEvenOperator = (-1) ** xIterator; // gives -1 for odd, 1 for even
  //     const xStart = offsetX + oddEvenOperator * (longCathetus / 2);

  //     const x = xStart + codeX;
  //     const y = codeY * 2 * r;

  //     drawHexagon(ctx, x, y, "#6b9", "#174");

  //     yIterator++;
  //   }
  //   xIterator++;
  // }

  // xIterator = 0;
  // for (let y = r; y < canvasHeight; y = moveY(y)) {
  //   let oddEvenOperator = (-1) ** xIterator; // gives -1 for odd, 1 for even
  //   const xStart = offsetX + oddEvenOperator * (longCathetus / 2);

  //   // loop over X
  //   let yIterator = 0;
  //   for (let x = xStart; x < canvasWidth; x = moveX(x)) {
  //     drawHexagon(ctx, x, y, "#6b9", "#174");

  //     drawCode(ctx, x, y, `${xIterator}:${yIterator}`);
  //     yIterator++;
  //   }
  //   xIterator++;
  // }
};
