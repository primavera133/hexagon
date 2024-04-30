import { produce } from "immer";
import { useState } from "react";
import { gridSize, startCoords } from "../canvas/constants";

interface NavigateProps {
  event: React.KeyboardEvent<HTMLCanvasElement>;
  x: number;
  y: number;
}

type Navigate = ({ event, x, y }: NavigateProps) => void;

type HookReturnValue = [
  x: number,
  y: number,
  trail: string[],
  navigate: Navigate,
];

export const useNavigation = (): HookReturnValue => {
  const [x, setX] = useState<number>(startCoords.x);
  const [y, setY] = useState<number>(startCoords.y);
  const [trail, setTrail] = useState<string[]>([
    `${startCoords.x}:${startCoords.y}`,
  ]);

  const navigate: Navigate = ({ event, x, y }: NavigateProps) => {
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
    setTrail(
      produce(trail, (draft) => {
        draft.push(`${x}:${y}`);
      }),
    );
  };

  return [x, y, trail, navigate];
};
