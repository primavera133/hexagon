import { GridData, GridMeta } from "../canvas/gridData";

interface GraphEdge {
  target: string;
  weight: number;
}

export const gridGraphNodes = new Map<string, GraphEdge[]>();

export function initGraphData(
  gridData: Map<string, GridData>,
  gridMeta: GridMeta,
) {
  // Create a graph from the grid data
  gridData.forEach((_, key) => {
    gridGraphAddNode(key);
  });
  // Add edges to the graph
  let n = 0;
  gridData.forEach((_, key) => {
    const [x, y] = key.split(":").map(Number);
    const neighbors = [
      [y % 2 ? x : x - 1, y - 1], // top left
      [y % 2 ? x : x + 1, y - 1], // top right
      [x - 1, y], // left
      [x + 1, y], // right
      [y % 2 ? x : x - 1, y + 1], // bottom left
      [y % 2 ? x : x + 1, y + 1], // bottom right
    ];
    neighbors.forEach(([nx, ny]) => {
      n++;

      if (
        nx >= gridMeta.xStart &&
        nx <= gridMeta.xEnd &&
        ny >= gridMeta.yStart &&
        ny <= gridMeta.yEnd
      ) {
        gridGraphAddEdge(key, `${nx}:${ny}`, Math.random());
      }
    });
  });
  console.log("n", n);
}

function gridGraphAddNode(name: string) {
  gridGraphNodes.set(name, []);
}

function gridGraphAddEdge(start: string, end: string, weight: number) {
  gridGraphNodes.get(start)?.push({ target: end, weight });
}

export function gridGraphShortestPath(
  startCoords: { x: number; y: number },
  endCoords: { x: number; y: number },
): string[] {
  const start = `${startCoords.x}:${startCoords.y}`;
  const end = `${endCoords.x}:${endCoords.y}`;

  const dist = new Map<string, number>();
  const prev = new Map<string, string>();
  const unvisited = new Set<string>();

  gridGraphNodes.forEach((_, key) => {
    dist.set(key, Infinity);
    prev.set(key, "");
    unvisited.add(key);
  });

  dist.set(start, 0);

  const timing = Date.now();
  console.log("timing", timing);

  let x = 0;
  while (unvisited.size > 0) {
    x++;
    let minDist = Infinity;
    let minNode = "";
    unvisited.forEach((node) => {
      if (dist.get(node)! < minDist) {
        minDist = dist.get(node)!;
        minNode = node;
      }
    });

    unvisited.delete(minNode);

    gridGraphNodes.get(minNode)?.forEach((edge) => {
      const alt = dist.get(minNode)! + edge.weight;
      if (alt < dist.get(edge.target)!) {
        dist.set(edge.target, alt);
        prev.set(edge.target, minNode);
      }
    });
  }

  console.log("timing revisited", Date.now() - timing);
  console.log("x", x);

  const path: string[] = [];
  let current = end;
  let x2 = 0;
  while (current !== "") {
    x2++;
    path.unshift(current);
    current = prev.get(current)!;
  }
  console.log("x2", x2);
  return path;
}
