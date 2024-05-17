import { describe, expect, it } from "vitest";
import {
  getLimitedGraphNodes,
  limitGraphNodesPredicate,
} from "./filterGraphData";
import { GraphEdge } from "./graphdata";

describe("filterGraphData", () => {
  it("should return true for coordinates within the range", () => {
    const startCoords = { x: 50, y: 50 };
    const endCoords = { x: 100, y: 100 };

    expect(limitGraphNodesPredicate("55:55", startCoords, endCoords)).toBe(
      true,
    );
    expect(limitGraphNodesPredicate("40:40", startCoords, endCoords)).toBe(
      true,
    );
    expect(limitGraphNodesPredicate("110:110", startCoords, endCoords)).toBe(
      true,
    );
    expect(limitGraphNodesPredicate("50:90", startCoords, endCoords)).toBe(
      true,
    );
  });

  it("should return false for coordinates outside the range", () => {
    const startCoords = { x: 50, y: 50 };
    const endCoords = { x: 100, y: 100 };

    expect(limitGraphNodesPredicate("30:30", startCoords, endCoords)).toBe(
      false,
    );
    expect(limitGraphNodesPredicate("120:120", startCoords, endCoords)).toBe(
      false,
    );
    expect(limitGraphNodesPredicate("50:150", startCoords, endCoords)).toBe(
      false,
    );
    expect(limitGraphNodesPredicate("0:0", startCoords, endCoords)).toBe(false);
  });

  it("should handle edge cases correctly", () => {
    const startCoords = { x: 50, y: 50 };
    const endCoords = { x: 100, y: 100 };

    expect(limitGraphNodesPredicate("40:40", startCoords, endCoords)).toBe(
      true,
    );
    expect(limitGraphNodesPredicate("110:110", startCoords, endCoords)).toBe(
      true,
    );
    expect(limitGraphNodesPredicate("50:40", startCoords, endCoords)).toBe(
      true,
    );
    expect(limitGraphNodesPredicate("100:110", startCoords, endCoords)).toBe(
      true,
    );
  });

  it("should return the correct number of nodes", () => {
    const graphData: Map<string, GraphEdge[]> = new Map();

    graphData.set("0:0", [{ target: "0:1", weight: 1 }]);
    graphData.set("10:10", [{ target: "0:1", weight: 1 }]);
    graphData.set("20:10", [{ target: "0:1", weight: 1 }]);
    graphData.set("20:20", [{ target: "0:1", weight: 1 }]);
    graphData.set("100:100", [{ target: "0:1", weight: 1 }]);

    const startCoords = { x: 15, y: 15 };
    const endCoords = { x: 75, y: 75 };

    const result = getLimitedGraphNodes(graphData, startCoords, endCoords);
    expect(result.size).toBe(3);
  });
});
