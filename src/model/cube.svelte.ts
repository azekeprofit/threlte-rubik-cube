import { useThrelte } from "@threlte/core";
import { Vector3 } from "three";
import type { coord } from "./model.svelte";

export const COLORS = {
  white: [0, 0, 100],
  yellow: [60, 100, 50],
  red: [0, 100, 50],
  orange: [40, 100, 50],
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

  screenXY() {
    const { camera } = useThrelte();
    var vector = new Vector3(this.x, this.y, this.z);
    vector.project(camera.current);
    return vector;
  }
}
