import * as indexExports from "./index";

import { describe, it, expect } from 'vitest'

describe("index.ts", () => {
  const expectedExports = [
    "SurfaceMesh",
    "MeshColors",
    "Surface",
    "minMax",
    "ViewerClient",
    "colorMaps",
    "colorInterpolates",
    "Legend",
  ].sort();

  it("should export the expected exports", () => {
    const actualExports = Object.keys(indexExports).sort();

    expect(actualExports).toEqual(expectedExports);
  });

  it("should export the expected number of exports", () => {
    const actualExports = Object.keys(indexExports);

    expect(actualExports.length).toEqual(expectedExports.length);
  });
});
