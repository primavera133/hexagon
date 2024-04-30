import { useState } from "react";
import { gridSize, startCoords } from "../canvas/constants";

type NavigateProps = (
  event: React.KeyboardEvent<HTMLCanvasElement>,
  x: number,
  y: number,
) => void;

type HookReturnValue = [x: number, y: number, navigate: NavigateProps];

export const useNavigation = (): HookReturnValue => {
  const [x, setX] = useState<number>(startCoords.x);
  const [y, setY] = useState<number>(startCoords.y);
  const navigate: NavigateProps = (event, x, y) => {
    if (event.key === "a") {
      if (x > 0) setX(x - 1);
    }
    if (event.key === "d") {
      if (x < gridSize.x) setX(x + 1);
    }
    if (event.key === "q") {
      if (y % 2 && x > 0) setX(x - 1);
      if (y > 0) setY(y - 1);
    }
    if (event.key === "e") {
      if (y % 2 === 0 && x < gridSize.x) setX(x + 1);
      if (y > 0) setY(y - 1);
    }
    if (event.key === "z") {
      if (y % 2 && x > 0) setX(x - 1);
      if (y < gridSize.y) setY(y + 1);
    }
    if (event.key === "c") {
      if (y % 2 === 0 && x < gridSize.x) setX(x + 1);
      if (y < gridSize.y) setY(y + 1);
    }
  };

  return [x, y, navigate];
};
