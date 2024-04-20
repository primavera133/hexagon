import { useRef, useEffect } from "react";
import { initGridData } from "../canvas/gridData";
import { drawCanvas } from "../canvas/drawCanvas";

interface CanvasProps {
  canvasHeight?: number;
  canvasWidth?: number;
}

export const Canvas = ({
  canvasWidth = window.innerWidth,
  canvasHeight = window.innerHeight,
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    initGridData(0, 50, 0, 50);
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx == null) throw new Error("Could not get context");
      drawCanvas(ctx, canvasWidth, canvasHeight);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className="canvas"
    />
  );
};
