export const getNeighboursTopLeft = (x: number, y: number) => [
  y % 2 ? x - 1 : x,
  y - 1,
];
export const getNeighboursTopRight = (x: number, y: number) => [
  y % 2 ? x : x + 1,
  y - 1,
];
export const getNeighboursBottomLeft = (x: number, y: number) => [
  y % 2 ? x - 1 : x,
  y + 1,
];
export const getNeighboursBottomRight = (x: number, y: number) => [
  y % 2 ? x : x + 1,
  y + 1,
];
export function getNeighbours(x: number, y: number) {
  return [
    getNeighboursTopLeft(x, y),
    getNeighboursTopRight(x, y),
    [x - 1, y], // left
    [x + 1, y], // right
    getNeighboursBottomLeft(x, y),
    getNeighboursBottomRight(x, y),
  ];
}
