<script lang="ts">
  import { T } from "@threlte/core";
  import type { IntersectionEvent } from "@threlte/extras";
  import {
    flatAxes,
    type coord,
    type cubeCoord,
    type rotAxisType,
  } from "../model/model.svelte";
  import { Vector3 } from "three";
  import type { CubeColor } from "../model/cube.svelte";

  let {
    zPlane,
    hovered,
    whichAxis = $bindable(),
    rotAxis = $bindable(),
    reverse = $bindable(),
    start,
  }: {
    hovered: CubeColor | null;
    zPlane: rotAxisType;
    whichAxis: coord;
    rotAxis: rotAxisType;
    reverse: boolean;
    start: () => void;
  } = $props();

  function xy(
    firstCoord: rotAxisType,
    secondCoord: rotAxisType,
    plus: boolean
  ) {
    let v = new Vector3();
    v[zPlane] = hovered![zPlane];
    v[firstCoord] = hovered![firstCoord];
    v[secondCoord] = plus ? 2 : -2;
    return [v.x, v.y, v.z] as cubeCoord;
  }

  let f = $derived(flatAxes(zPlane));
</script>

{#snippet arrow(
  firstCoord: rotAxisType,
  secondCoord: rotAxisType,
  plus: boolean,
  num:number
)}
  <T.Mesh
    position={xy(firstCoord, secondCoord, plus)}
    onclick={(e: IntersectionEvent<MouseEvent>) => {
      e.stopPropagation();
      rotAxis = firstCoord;
      whichAxis = hovered![firstCoord];
      let touchPoint = hovered![zPlane];
      console.dir(num)
      reverse =
        (zPlane == "z" && touchPoint == -1) ||
        (zPlane == "x" && touchPoint == 1) ||
        (zPlane == "y" && touchPoint == -1 && num==2)
          ? !plus
          : plus;
      start();
    }}
  >
    <T.BoxGeometry args={[0.3, 0.3, 0.3]} />
    <T.MeshBasicMaterial color="pink" />
  </T.Mesh>
{/snippet}

{#if hovered != null}
  {@render arrow(f[0], f[1], true,1)}
  {@render arrow(f[1], f[0], true,2)}
  {@render arrow(f[0], f[1], false,1)}
  {@render arrow(f[1], f[0], false,2)}
{/if}
