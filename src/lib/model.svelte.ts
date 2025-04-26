export const positions = [-1, 0, 1] as const;
export type coord=typeof positions[number];
export type rotAxisType='x'|'y'|'z';
export const COLORS = {
  white: "#FFFFFF",
  yellow: "#FFFF00",
  red: "#FF0000",
  orange: "#FFA500",
  blue: "#0000FF",
  green: "#00FF00",
};


export class CubeColor {
  top=$state('maroon');
  sideA=$state('maroon');
  sideB=$state('maroon');

  constructor(x:coord,y:coord,z:coord){
    this.top = { [-1]: COLORS.yellow, 0: "maroon", 1: COLORS.white }[y];
    this.sideA = { [-1]: COLORS.blue, 0: "maroon", 1: COLORS.green }[x];
    this.sideB = { [-1]: COLORS.orange, 0: "maroon", 1: COLORS.red }[z];
  }
}

export const degree90=Math.PI/2;