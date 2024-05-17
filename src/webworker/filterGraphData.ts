import { Coord, GraphEdge } from "./graphdata";

function filterMap<K, V>(
  map: Map<K, V>,
  predicate: (key: K, startCoords: Coord, endCoords: Coord) => boolean,
  startCoords: { x: number; y: number },
  endCoords: { x: number; y: number },
): Map<K, V> {
  const filteredMap = new Map<K, V>();

  for (const [key, value] of map) {
    if (predicate(key, startCoords, endCoords)) {
      filteredMap.set(key, value);
    }
  }

  return filteredMap;
}

export function limitGraphNodesPredicate(
  key: string,
  startCoords: { x: number; y: number },
  endCoords: { x: number; y: number },
) {
  const [x, y] = key.split(":").map(Number);
  return (
    x >= startCoords.x - 10 &&
    x <= endCoords.x + 10 &&
    y >= startCoords.y - 10 &&
    y <= endCoords.y + 10
  );
}

export function getLimitedGraphNodes(
  gridGraphNodes: Map<string, GraphEdge[]>,
  startCoords: Coord,
  endCoords: Coord,
) {
  return filterMap(
    gridGraphNodes,
    limitGraphNodesPredicate,
    startCoords,
    endCoords,
  );
}
