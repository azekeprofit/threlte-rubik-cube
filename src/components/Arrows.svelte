<script lang="ts">
  import { T } from "@threlte/core";
  import type { IntersectionEvent } from "@threlte/extras";
  import type { coord, cubeCoord, rotAxisType } from "../model/model.svelte";
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

  let flatAxes = $derived<[rotAxisType, rotAxisType]>(
    zPlane == "x" ? ["y", "z"] : zPlane == "y" ? ["x", "z"] : ["x", "y"]
  );

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
</script>

{#snippet arrow(
  firstCoord: rotAxisType,
  secondCoord: rotAxisType,
  plus: boolean
)}
  <T.Mesh
    position={xy(firstCoord, secondCoord, plus)}
    onclick={(e: IntersectionEvent<MouseEvent>) => {
      e.stopPropagation();
      rotAxis = firstCoord;
      whichAxis = hovered![firstCoord];
      reverse = !plus;
      start();
    }}
  >
    <T.BoxGeometry args={[0.3, 0.3, 0.3]} />
    <T.MeshBasicMaterial color="pink" />
  </T.Mesh>
{/snippet}

{#if hovered != null}
  {@render arrow(flatAxes[0], flatAxes[1], true)}
  {@render arrow(flatAxes[1], flatAxes[0], true)}
  {@render arrow(flatAxes[0], flatAxes[1], false)}
  {@render arrow(flatAxes[1], flatAxes[0], false)}
{/if}
