export interface GridData {
  x: number;
  y: number;
}

export interface GridMeta {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
}

export const gridData = new Map<string, GridData>();
export let gridMeta: GridMeta;

export function initGridData(
  xStart: number,
  xEnd: number,
  yStart: number,
  yEnd: number,
) {
  gridMeta = {
    xStart,
    xEnd,
    yStart,
    yEnd,
  };
  for (let x = xStart; x < xEnd; x++) {
    for (let y = yStart; y < yEnd; y++) {
      gridData.set(`${x}:${y}`, {
        x,
        y,
      });
    }
  }
}
