export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}
