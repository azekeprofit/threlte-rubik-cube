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
  none: [0, 0, 0],
};
export type colorKey = keyof typeof COLORS;

export type side = "top" | "bottom" | "left" | "right" | "front" | "back";

export class CubeColor {
  x: coord;
  y: coord;
  z: coord;
  top = $state<colorKey>("none");
  bottom = $state<colorKey>("none");
  left = $state<colorKey>("none");
  right = $state<colorKey>("none");
  front = $state<colorKey>("none");
  back = $state<colorKey>("none");

  constructor(x: coord, y: coord, z: coord) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.bottom = y == 1 ? "white" : "none";
    this.top = y == -1 ? "yellow" : "none";
    this.right = x == 1 ? "blue" : "none";
    this.left = x == -1 ? "green" : "none";
    this.front = z == 1 ? "red" : "none";
    this.back = z == -1 ? "orange" : "none";
  }

  drawingOrder() {
    return [
      this.right,
      this.left,
      this.bottom,
      this.top,
      this.front,
      this.back,
    ];
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
