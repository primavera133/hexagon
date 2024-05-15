import { useEffect, useMemo, useRef, useState } from "react";
import { clearCanvas } from "../canvas/clearCanvas";
import { drawCanvas } from "../canvas/drawCanvas";
import { useNavigation } from "../hooks/useNavigation";
import { useWindowSize } from "../hooks/useWindowSize";
import { worker } from "../webworker";

export const Canvas = () => {
  const [canvasWidth, canvasHeight] = useWindowSize();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  const [x, y, trail, navigate] = useNavigation();
  const [path, setPath] = useState<string[]>([]);

  const memoizedPath = useMemo(() => path, [path]);

  worker.onmessage = (event) => {
    setPath(event.data);
  };

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext("2d");
      if (ctx.current == null) throw new Error("Could not get context");
      canvasRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      if (ctx.current != null) {
        clearCanvas(ctx.current, canvasWidth, canvasHeight);
        drawCanvas(ctx.current, canvasWidth, canvasHeight, x, y, memoizedPath);
      }
    }
  }, [x, y, canvasHeight, canvasWidth, memoizedPath]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (navigate) navigate({ event, x, y });
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
