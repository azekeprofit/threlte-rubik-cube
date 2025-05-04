<script lang="ts">
  import { T } from "@threlte/core";
  import type { IntersectionEvent } from "@threlte/extras";
  import type { coord, cubeCoord, rotAxisType } from "../model/model.svelte";
  import { Vector3 } from "three";
  import type { CubeColor } from "../model/cube.svelte";

  let {
    a,
    b,
    zPlane,
    hovered,
  }: {
    a: number;
    b: number;
    hovered: CubeColor | null;
    zPlane: rotAxisType;
  } = $props();

  let flatAxes = $derived<[rotAxisType, rotAxisType]>(
    zPlane == "x" ? ["y", "z"] : zPlane == "y" ? ["x", "z"] : ["x", "y"]
  );

  function xy(rev: boolean) {
    let v = new Vector3();
    v[zPlane] = hovered![zPlane];
    v[flatAxes[rev ? 0 : 1]] = a;
    v[flatAxes[rev ? 1 : 0]] = b;
    return [v.x, v.y, v.z] as cubeCoord;
  }
</script>

{#snippet arrow(rev: boolean)}
  <T.Mesh
    position={xy(rev)}
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
  {@render arrow(true)}
  {@render arrow(false)}
{/if}
