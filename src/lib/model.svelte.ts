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

export type side='top'|'bottom'|'left'|'right'|'front'|'back';

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
