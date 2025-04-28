export const positions = [-1, 0, 1] as const;
export type coord = (typeof positions)[number];
export type rotAxisType = "x" | "y" | "z";
export const COLORS = {
  white: "#FFFFFF",
  yellow: "#FF0",
  red: "#F00",
  orange: "#C60",
  blue: "#00F",
  green: "#0F0",
};

export type side = "top" | "bottom" | "left" | "right" | "front" | "back";

export class CubeColor {
  x: coord;
  y: coord;
  z: coord;
  top = $state("maroon");
  bottom = $state("maroon");
  left = $state("maroon");
  right = $state("maroon");
  front = $state("maroon");
  back = $state("maroon");

  constructor(x: coord, y: coord, z: coord) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.top = this.bottom = {
      [-1]: COLORS.yellow,
      0: "cyan",
      1: COLORS.white,
    }[y];
    this.left = this.right = { [-1]: COLORS.green, 0: "cyan", 1: COLORS.blue }[
      x
    ];
    this.front = this.back = { [-1]: COLORS.orange, 0: "cyan", 1: COLORS.red }[
      z
    ];

    // this.top = "red";
    // this.bottom = "maroon";
    // this.left = "cyan";
    // this.right = "purple";
    // this.front = "green";
    // this.back = "blue";
  }
}

export const degree90 = Math.PI / 2;
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
