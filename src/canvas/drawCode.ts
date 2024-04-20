export function drawCode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  code: string,
) {
  ctx.font = "16px serif";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(code, x, y);
}
