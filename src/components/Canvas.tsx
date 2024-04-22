import { useRef, useEffect, SyntheticEvent, useState } from "react";
import { initGridData } from "../canvas/gridData";
import { drawCanvas } from "../canvas/drawCanvas";
import { gridSize, startCoords } from "../canvas/constants";

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

  let ctx: CanvasRenderingContext2D | null;

  useEffect(() => {
    initGridData(0, gridSize.x, 0, gridSize.y);
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      ctx = canvas.getContext("2d");
      if (ctx == null) throw new Error("Could not get context");
      drawCanvas(ctx, canvasWidth, canvasHeight, x, y);
    }
  }, []);

  useEffect(() => {
    if (ctx != null) {
      drawCanvas(ctx, canvasWidth, canvasHeight, x, y);
    }
  }, [x, y]);

  const handleKeyDown = (event: any) => {
    console.log(event.key);
    if (event.key === "a") {
      setX(x - 1);
    }
    if (event.key === "d") {
      setX(x + 1);
    }
    if (event.key === "q") {
      setX(x - 1);
      setY(y - 1);
    }
    if (event.key === "e") {
      setX(x + 1);
      setY(y - 1);
    }
    if (event.key === "z") {
      setX(x - 1);
      setY(y + 1);
    }
    if (event.key === "c") {
      setX(x + 1);
      setY(y + 1);
    }
    console.log(x, y);
  };

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className="canvas"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    />
  );
};
