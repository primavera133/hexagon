import { useEffect, useRef } from "react";
import { clearCanvas } from "../canvas/clearCanvas";
import { gridSize } from "../canvas/constants";
import { drawCanvas } from "../canvas/drawCanvas";
import { initGridData } from "../canvas/gridData";
import { useNavigation } from "../hooks/useNavigation";
import { useWindowSize } from "../hooks/useWindowSize";

export const Canvas = () => {
  const [canvasWidth, canvasHeight] = useWindowSize();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  const [x, y, navigate] = useNavigation();

  useEffect(() => {
    initGridData(0, gridSize.x, 0, gridSize.y);
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext("2d");
      if (ctx.current == null) throw new Error("Could not get context");

      drawCanvas(ctx.current, canvasWidth, canvasHeight, x, y);
      canvasRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      if (ctx.current != null) {
        clearCanvas(ctx.current, canvasWidth, canvasHeight);
        drawCanvas(ctx.current, canvasWidth, canvasHeight, x, y);
      }
    }
  }, [x, y, canvasHeight, canvasWidth]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (navigate) navigate(event, x, y);
  };

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className="canvas"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    />
  );
};
