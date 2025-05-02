import type { SvelteMap } from "svelte/reactivity";
import type { CubeColor, side } from "./cube.svelte";
import type { Vector3 } from "three";
import { max } from "three/tsl";

export const positions = [-1, 0, 1] as const;
export type coord = (typeof positions)[number];
const rotAxisValues = ["x", "y", "z"] as const;
export type rotAxisType = (typeof rotAxisValues)[number];
export type cubeCoord = [coord, coord, coord];

export const assetPath = `${import.meta.env.BASE_URL}/assets`;

const ringOrder = [0, 1, 2, 7, 8, 3, 6, 5, 4];

export function calculateRing(
  colors: SvelteMap<string, CubeColor>,
  rotAxis: rotAxisType,
  whichAxis: coord
) {
  let ring = [];
  let i = 0;
  for (let c of colors.values()) {
    if (c[rotAxis] == whichAxis) {
      ring[ringOrder[i++]] = c;
    }
  }
  return ring;
}

function maxCoord(dirs: Map<rotAxisType, Vector3>, axis: rotAxisType) {
  return dirs
    .entries()
    .reduce((a, b) => (Math.abs(a[1][axis]) > Math.abs(b[1][axis]) ? a : b));
}

export interface direction {
  axis: rotAxisType;
  reverse: boolean;
}
export type directionsType = Record<rotAxisType, direction>;

function maxAxis(axes: any[], index: number) {
  return axes.reduce((a, b) => (Math.abs(a[index]) > Math.abs(b[index]) ? a : b));
}

const lowerFartherCorner = JSON.stringify([-1, -1, -1]);
const xPoint = JSON.stringify([1, -1, -1]);
const yPoint = JSON.stringify([-1, 1, -1]);
const zPoint = JSON.stringify([-1, -1, 1]);

export function allDirections(
  colors: SvelteMap<string, CubeColor>,
  cube: CubeColor
) {
  let initPos = colors.get(lowerFartherCorner)!.screenXY();

  let xPos = colors.get(xPoint)!.screenXY().sub(initPos);
  let xAxisLen = xPos.length();

  let yPos = colors.get(yPoint)!.screenXY().sub(initPos);
  let yAxisLen = yPos.length();

  let zPos = colors.get(zPoint)!.screenXY().sub(initPos);
  let zAxisLen = zPos.length();

  let areas = [];
  if (Math.abs(cube.z) === 1) areas.push(["z", xAxisLen + yAxisLen]);
  if (Math.abs(cube.y) === 1) areas.push(["y", xAxisLen + zAxisLen]);
  if (Math.abs(cube.x) === 1) areas.push(["x", yAxisLen + zAxisLen]);

  let zPlane = maxAxis(areas, 1)[0];

  let maxCoords =
    zPlane === "z"
      ? [
          ["x", "x", xPos.x],
          ["x", "y", xPos.y],
          ["y", "x", yPos.x],
          ["y", "y", yPos.y],
        ]
      : zPlane === "y"
      ? [
          ["x", "x", xPos.x],
          ["x", "y", xPos.y],
          ["z", "x", zPos.x],
          ["z", "y", zPos.y],
        ]
      : [
          ["y", "x", yPos.x],
          ["y", "y", yPos.y],
          ["z", "x", zPos.x],
          ["z", "y", zPos.y],
        ];
  let maxCoord = maxAxis(maxCoords, 2);

  let otherCoord = maxCoords.find(
    (x) => x[0] !== maxCoord[0] && x[1] !== maxCoord[1]
  )!;

  let xDirection = maxCoord[1] == "y" ? maxCoord : otherCoord;
  let yDirection = maxCoord[1] == "x" ? maxCoord : otherCoord;

  $inspect([
    initPos,
    xPos,
    yPos,
    zPos,
    zPlane,
    maxCoord,
    otherCoord,
    xDirection,
    yDirection,
  ]);

  const dirs: directionsType = {
    x: { axis: xDirection[0], reverse: xDirection[2] > 0 },
    y: { axis: yDirection[0], reverse: yDirection[2] < 0 },
    z: { axis: zPlane, reverse: true },
  };

  return dirs;
}

const ringSides: Record<rotAxisType, side[]> = {
  x: ["front", "top", "back", "bottom", "left", "right"],
  y: ["front", "left", "back", "right", "top", "bottom"],
  z: ["right", "top", "left", "bottom", "front", "back"],
};

export function rotateColoursInRing(
  ring: CubeColor[],
  rotAxis: rotAxisType,
  reverse: boolean
) {
  let zReverse = rotAxis == "z" ? !reverse : reverse;
  if (zReverse)
    [
      ring[2][ringSides[rotAxis][0]],
      ring[3][ringSides[rotAxis][0]],
      ring[4][ringSides[rotAxis][0]],
      ring[4][ringSides[rotAxis][3]],
      ring[5][ringSides[rotAxis][3]],
      ring[6][ringSides[rotAxis][3]],
      ring[6][ringSides[rotAxis][2]],
      ring[7][ringSides[rotAxis][2]],
      ring[0][ringSides[rotAxis][2]],
      ring[0][ringSides[rotAxis][1]],
      ring[1][ringSides[rotAxis][1]],
      ring[2][ringSides[rotAxis][1]],

      ring[2][ringSides[rotAxis][4]],
      ring[3][ringSides[rotAxis][4]],
      ring[4][ringSides[rotAxis][4]],
      ring[4][ringSides[rotAxis][4]],
      ring[5][ringSides[rotAxis][4]],
      ring[6][ringSides[rotAxis][4]],
      ring[6][ringSides[rotAxis][4]],
      ring[7][ringSides[rotAxis][4]],
      ring[0][ringSides[rotAxis][4]],
      ring[0][ringSides[rotAxis][4]],
      ring[1][ringSides[rotAxis][4]],
      ring[2][ringSides[rotAxis][4]],

      ring[2][ringSides[rotAxis][5]],
      ring[3][ringSides[rotAxis][5]],
      ring[4][ringSides[rotAxis][5]],
      ring[4][ringSides[rotAxis][5]],
      ring[5][ringSides[rotAxis][5]],
      ring[6][ringSides[rotAxis][5]],
      ring[6][ringSides[rotAxis][5]],
      ring[7][ringSides[rotAxis][5]],
      ring[0][ringSides[rotAxis][5]],
      ring[0][ringSides[rotAxis][5]],
      ring[1][ringSides[rotAxis][5]],
      ring[2][ringSides[rotAxis][5]],
    ] = [
      ring[0][ringSides[rotAxis][1]],
      ring[1][ringSides[rotAxis][1]],
      ring[2][ringSides[rotAxis][1]],
      ring[2][ringSides[rotAxis][0]],
      ring[3][ringSides[rotAxis][0]],
      ring[4][ringSides[rotAxis][0]],
      ring[4][ringSides[rotAxis][3]],
      ring[5][ringSides[rotAxis][3]],
      ring[6][ringSides[rotAxis][3]],
      ring[6][ringSides[rotAxis][2]],
      ring[7][ringSides[rotAxis][2]],
      ring[0][ringSides[rotAxis][2]],

      ring[0][ringSides[rotAxis][4]],
      ring[1][ringSides[rotAxis][4]],
      ring[2][ringSides[rotAxis][4]],
      ring[2][ringSides[rotAxis][4]],
      ring[3][ringSides[rotAxis][4]],
      ring[4][ringSides[rotAxis][4]],
      ring[4][ringSides[rotAxis][4]],
      ring[5][ringSides[rotAxis][4]],
      ring[6][ringSides[rotAxis][4]],
      ring[6][ringSides[rotAxis][4]],
      ring[7][ringSides[rotAxis][4]],
      ring[0][ringSides[rotAxis][4]],

      ring[0][ringSides[rotAxis][5]],
      ring[1][ringSides[rotAxis][5]],
      ring[2][ringSides[rotAxis][5]],
      ring[2][ringSides[rotAxis][5]],
      ring[3][ringSides[rotAxis][5]],
      ring[4][ringSides[rotAxis][5]],
      ring[4][ringSides[rotAxis][5]],
      ring[5][ringSides[rotAxis][5]],
      ring[6][ringSides[rotAxis][5]],
      ring[6][ringSides[rotAxis][5]],
      ring[7][ringSides[rotAxis][5]],
      ring[0][ringSides[rotAxis][5]],
    ];
  else
    [
      ring[0][ringSides[rotAxis][1]],
      ring[1][ringSides[rotAxis][1]],
      ring[2][ringSides[rotAxis][1]],
      ring[2][ringSides[rotAxis][0]],
      ring[3][ringSides[rotAxis][0]],
      ring[4][ringSides[rotAxis][0]],
      ring[4][ringSides[rotAxis][3]],
      ring[5][ringSides[rotAxis][3]],
      ring[6][ringSides[rotAxis][3]],
      ring[6][ringSides[rotAxis][2]],
      ring[7][ringSides[rotAxis][2]],
      ring[0][ringSides[rotAxis][2]],

      ring[0][ringSides[rotAxis][4]],
      ring[1][ringSides[rotAxis][4]],
      ring[2][ringSides[rotAxis][4]],
      ring[2][ringSides[rotAxis][4]],
      ring[3][ringSides[rotAxis][4]],
      ring[4][ringSides[rotAxis][4]],
      ring[4][ringSides[rotAxis][4]],
      ring[5][ringSides[rotAxis][4]],
      ring[6][ringSides[rotAxis][4]],
      ring[6][ringSides[rotAxis][4]],
      ring[7][ringSides[rotAxis][4]],
      ring[0][ringSides[rotAxis][4]],

      ring[0][ringSides[rotAxis][5]],
      ring[1][ringSides[rotAxis][5]],
      ring[2][ringSides[rotAxis][5]],
      ring[2][ringSides[rotAxis][5]],
      ring[3][ringSides[rotAxis][5]],
      ring[4][ringSides[rotAxis][5]],
      ring[4][ringSides[rotAxis][5]],
      ring[5][ringSides[rotAxis][5]],
      ring[6][ringSides[rotAxis][5]],
      ring[6][ringSides[rotAxis][5]],
      ring[7][ringSides[rotAxis][5]],
      ring[0][ringSides[rotAxis][5]],
    ] = [
      ring[2][ringSides[rotAxis][0]],
      ring[3][ringSides[rotAxis][0]],
      ring[4][ringSides[rotAxis][0]],
      ring[4][ringSides[rotAxis][3]],
      ring[5][ringSides[rotAxis][3]],
      ring[6][ringSides[rotAxis][3]],
      ring[6][ringSides[rotAxis][2]],
      ring[7][ringSides[rotAxis][2]],
      ring[0][ringSides[rotAxis][2]],
      ring[0][ringSides[rotAxis][1]],
      ring[1][ringSides[rotAxis][1]],
      ring[2][ringSides[rotAxis][1]],

      ring[2][ringSides[rotAxis][4]],
      ring[3][ringSides[rotAxis][4]],
      ring[4][ringSides[rotAxis][4]],
      ring[4][ringSides[rotAxis][4]],
      ring[5][ringSides[rotAxis][4]],
      ring[6][ringSides[rotAxis][4]],
      ring[6][ringSides[rotAxis][4]],
      ring[7][ringSides[rotAxis][4]],
      ring[0][ringSides[rotAxis][4]],
      ring[0][ringSides[rotAxis][4]],
      ring[1][ringSides[rotAxis][4]],
      ring[2][ringSides[rotAxis][4]],

      ring[2][ringSides[rotAxis][5]],
      ring[3][ringSides[rotAxis][5]],
      ring[4][ringSides[rotAxis][5]],
      ring[4][ringSides[rotAxis][5]],
      ring[5][ringSides[rotAxis][5]],
      ring[6][ringSides[rotAxis][5]],
      ring[6][ringSides[rotAxis][5]],
      ring[7][ringSides[rotAxis][5]],
      ring[0][ringSides[rotAxis][5]],
      ring[0][ringSides[rotAxis][5]],
      ring[1][ringSides[rotAxis][5]],
      ring[2][ringSides[rotAxis][5]],
    ];
}
