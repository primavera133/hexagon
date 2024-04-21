import { a, r } from "./constants";

export function drawHexagon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fillStyle: string,
  strokeStyle: string,
) {
  const sides = 6;
  const rotator = 1.5;

  ctx.beginPath();
  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  for (var i = 0 + rotator; i < sides + rotator; i++) {
    const xTo = x + r * Math.cos(a * i);
    const yTo = y + r * Math.sin(a * i);
    ctx.lineTo(xTo, yTo);
  }

  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
