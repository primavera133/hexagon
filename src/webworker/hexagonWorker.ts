import { startCoords, targetCoords } from "../canvas/constants";
import { gridGraphShortestPath, initGraphData } from "./graphdata";

addEventListener("message", (event) => {
  // const result = performExpensiveCalculation(event.data);
  const { gridData, gridMeta } = event.data;
  initGraphData(gridData, gridMeta);
  const path = gridGraphShortestPath(startCoords, targetCoords);

  // Send the result back to the main thread
  postMessage(path);
});
