<script lang="ts">
  import { T } from "@threlte/core";
  import type { IntersectionEvent } from "@threlte/extras";
  import { Vector3 } from "three";
  import type { CubeColor } from "../model/cube.svelte";
  import { injectLookAtPlugin } from "../model/lookAt.svelte";
  import {
    degree90,
    flatAxes,
    type coord,
    type cubeCoord,
    type rotAxisType,
  } from "../model/model.svelte";

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

  injectLookAtPlugin();
</script>

{#snippet arrow(
  firstCoord: rotAxisType,
  secondCoord: rotAxisType,
  plus: boolean,
  num: number
)}
  <T.Group
    lookAt={[hovered?.x, hovered?.y, hovered?.z]}
    position={xy(firstCoord, secondCoord, plus)}
  >
    <T.Mesh
      rotation.x={-degree90}
      onclick={(e: IntersectionEvent<MouseEvent>) => {
        e.stopPropagation();
        rotAxis = firstCoord;
        whichAxis = hovered![firstCoord];
        let touchPoint = hovered![zPlane];
        reverse =
          (zPlane == "z" && touchPoint == -1) ||
          (zPlane == "x" && touchPoint == 1) ||
          (zPlane == "y" && touchPoint == -1 && num % 2 == 2) ||
          (zPlane == "y" && touchPoint == 1 && num % 2 == 1)
            ? !plus
            : plus;
        start();
      }}
    >
      <T.ConeGeometry args={[0.1, 0.3]} />
      <T.MeshBasicMaterial color="gray" />
    </T.Mesh>
  </T.Group>
{/snippet}

{#if hovered != null}
  {@render arrow(f[0], f[1], true, 1)}
  {@render arrow(f[1], f[0], true, 2)}
  {@render arrow(f[0], f[1], false, 3)}
  {@render arrow(f[1], f[0], false, 4)}
{/if}
