// sum.test.js
import { describe, expect, test } from "vitest";
import {
  getNeighbours,
  getNeighboursBottomLeft,
  getNeighboursBottomRight,
  getNeighboursTopLeft,
  getNeighboursTopRight,
} from "./graphdata";

type Coordinate = [number, number];

const testCases: { x: number; y: number; expected: Coordinate[] }[] = [
  {
    x: 0,
    y: 0,
    expected: [
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ],
  },
  {
    x: 1,
    y: 0,
    expected: [
      [1, -1],
      [2, -1],
      [0, 0],
      [2, 0],
      [1, 1],
      [2, 1],
    ],
  },
  {
    x: 1,
    y: 1,
    expected: [
      [0, 0],
      [1, 0],
      [0, 1],
      [2, 1],
      [0, 2],
      [1, 2],
    ],
  },
  {
    x: 2,
    y: 2,
    expected: [
      [2, 1],
      [3, 1],
      [1, 2],
      [3, 2],
      [2, 3],
      [3, 3],
    ],
  },
  {
    x: 2,
    y: 3,
    expected: [
      [1, 2],
      [2, 2],
      [1, 3],
      [3, 3],
      [1, 4],
      [2, 4],
    ],
  },
];

describe("getNeighbours", () => {
  testCases.forEach(({ x, y, expected }) => {
    test(`getNeighboursTopLeft(${x}, ${y}) should return ${JSON.stringify(expected[0])}`, () => {
      const result = getNeighboursTopLeft(x, y);
      expect(result).toEqual(expected[0]);
    });
    test(`getNeighboursTopRight(${x}, ${y}) should return ${JSON.stringify(expected[1])}`, () => {
      const result = getNeighboursTopRight(x, y);
      expect(result).toEqual(expected[1]);
    });
    test(`getNeighboursBottomLeft(${x}, ${y}) should return ${JSON.stringify(expected[4])}`, () => {
      const result = getNeighboursBottomLeft(x, y);
      expect(result).toEqual(expected[4]);
    });
    test(`getNeighboursBottomRight(${x}, ${y}) should return ${JSON.stringify(expected[5])}`, () => {
      const result = getNeighboursBottomRight(x, y);
      expect(result).toEqual(expected[5]);
    });
    test(`getNeighbors(${x}, ${y}) should return ${JSON.stringify(expected)}`, () => {
      const result = getNeighbours(x, y);
      expect(result).toEqual(expected);
    });
  });
});
