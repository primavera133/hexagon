import { gridSize } from "../canvas/constants";
import { gridData, gridMeta, initGridData } from "../canvas/gridData";

export let worker: Worker;

export function initGrid() {
  initGridData(0, gridSize.x, 0, gridSize.y);

  worker = new Worker(new URL("./hexagonWorker", import.meta.url), {
    type: "module",
  });

  worker.postMessage({ gridData, gridMeta });
}
