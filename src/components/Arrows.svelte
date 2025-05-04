<script lang="ts">
  import { T } from "@threlte/core";
  import type { IntersectionEvent } from "@threlte/extras";
  import type { coord, cubeCoord, rotAxisType } from "../model/model.svelte";
  import { Vector3 } from "three";
  import type { CubeColor } from "../model/cube.svelte";

  let {
    zPlane,
    hovered,
  }: {
    hovered: CubeColor | null;
    zPlane: rotAxisType;
  } = $props();

  let flatAxes = $derived<[rotAxisType, rotAxisType]>(
    zPlane == "x" ? ["y", "z"] : zPlane == "y" ? ["x", "z"] : ["x", "y"]
  );

  function xy(rev: boolean, plus: boolean) {
    let v = new Vector3();
    let firstCoord = flatAxes[rev ? 0 : 1];
    v[zPlane] = hovered![zPlane];
    v[firstCoord] = hovered![firstCoord];
    v[flatAxes[rev ? 1 : 0]] = plus ? 2 : -2;
    return [v.x, v.y, v.z] as cubeCoord;
  }
</script>

{#snippet arrow(rev: boolean, plus: boolean)}
  <T.Mesh
    position={xy(rev, plus)}
    onclick={(e: IntersectionEvent<MouseEvent>) => {
      e.stopPropagation();
      console.dir(e);
    }}
  >
    <T.BoxGeometry args={[0.3, 0.3, 0.3]} />
    <T.MeshBasicMaterial color="pink" />
  </T.Mesh>
{/snippet}

{#if hovered != null}
  {@render arrow(true, true)}
  {@render arrow(false, true)}
  {@render arrow(true, false)}
  {@render arrow(false, false)}
{/if}
