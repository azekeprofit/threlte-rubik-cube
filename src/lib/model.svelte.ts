export const positions = [-1, 0, 1] as const;
export type coord = (typeof positions)[number];
export type rotAxisType = "x" | "y" | "z";
export const COLORS = {
  white: [0, 0, 100],
  yellow: [60, 100, 50],
  red: [0, 100, 50],
  orange: [30, 100, 70],
  blue: [240, 100, 50],
  green: [120, 100, 50],
};
export type colorKey = keyof typeof COLORS;

export type side = "top" | "bottom" | "left" | "right" | "front" | "back";

export class CubeColor {
  x: coord;
  y: coord;
  z: coord;
  top = $state<colorKey>("white");
  bottom = $state<colorKey>("white");
  left = $state<colorKey>("white");
  right = $state<colorKey>("white");
  front = $state<colorKey>("white");
  back = $state<colorKey>("white");

  constructor(x: coord, y: coord, z: coord) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.top = this.bottom = {
      [-1]: "yellow",
      0: "white",
      1: "white",
    }[y] as colorKey;
    this.left = this.right = { [-1]: "green", 0: "white", 1: "blue" }[
      x
    ] as colorKey;
    this.front = this.back = { [-1]: "orange", 0: "white", 1: "red" }[
      z
    ] as colorKey;
  }
}

export type rotationProps = {
  whichAxis: (typeof positions)[number];
  rotAxis: rotAxisType;
  reverse: boolean;
};

export const assetPath = `${import.meta.env.BASE_URL}/assets`;

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
