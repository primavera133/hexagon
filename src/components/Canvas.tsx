import { useEffect, useRef, useState } from "react";
import { clearCanvas } from "../canvas/clearCanvas";
import { gridSize, startCoords } from "../canvas/constants";
import { drawCanvas } from "../canvas/drawCanvas";
import { initGridData } from "../canvas/gridData";

interface CanvasProps {
  canvasHeight?: number;
  canvasWidth?: number;
}

export const Canvas = ({
  canvasWidth = window.innerWidth,
  canvasHeight = window.innerHeight,
}: CanvasProps) => {
  const [x, setX] = useState<number>(startCoords.x);
  const [y, setY] = useState<number>(startCoords.y);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    initGridData(0, gridSize.x, 0, gridSize.y);
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext("2d");
      if (ctx.current == null) throw new Error("Could not get context");

      drawCanvas(ctx.current, canvasWidth, canvasHeight, x, y);
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
    if (event.key === "a") {
      setX(x - 1);
    }
    if (event.key === "d") {
      setX(x + 1);
    }
    if (event.key === "q") {
      if (y % 2) setX(x - 1);
      setY(y - 1);
    }
    if (event.key === "e") {
      if (y % 2 === 0) setX(x + 1);
      setY(y - 1);
    }
    if (event.key === "z") {
      if (y % 2) setX(x - 1);
      setY(y + 1);
    }
    if (event.key === "c") {
      if (y % 2 === 0) setX(x + 1);
      setY(y + 1);
    }
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
