<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
  import {
    type rotationProps,
    type rotAxisType,
    type side,
    CubeColor,
    degree90,
    positions,
  } from "./model.svelte";

  let x = -4.437954042433267;
  let y = 3.866852872687497;
  let z = 3.6940133200380143;

  const ringOrder = [0, 1, 2, 7, 8, 3, 6, 5, 4];
  const ringSides: Record<rotAxisType, side[]> = {
    x: ["front", "top", "back", "bottom", "left", "right"],
    y: ["front", "left", "back", "right", "top", "bottom"],
    z: ["right", "top", "left", "bottom", "front", "back"],
  };

  let {
    whichAxis,
    rotAxis,
    reverse,
    start = $bindable(),
  }: rotationProps & {
    start: () => void;
  } = $props();

  import { SvelteMap } from "svelte/reactivity";
  import Cube from "./Cube.svelte";
  let colors = new SvelteMap<string, CubeColor>();

  let ring = $state<CubeColor[]>([]);

  let rotation = $state(0);
  let yReverse = $derived(rotAxis == "y" ? !reverse : reverse);
  let zReverse = $derived(rotAxis == "z" ? !reverse : reverse);
  let step = $derived(yReverse ? -2 : 2);
  let task = useTask(
    (delta) => {
      rotation += delta * step;
      if (Math.abs(rotation) > degree90) {
        task.stop();
        rotation = 0;
        ring = [];
        let i = 0;
        for (let c of colors.values()) {
          if (c[rotAxis] == whichAxis) {
            ring[ringOrder[i++]] = c;
          }
        }

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
          ];
      }
    },
    { autoStart: false }
  );

  start = () => {
    task.start();
    rotation = 0;
  };
</script>

<T.PerspectiveCamera makeDefault position={[x, y, z]}>
  <OrbitControls></OrbitControls>
  <!-- onchange={(e) => console.dir(e.target.object.position)} -->
</T.PerspectiveCamera>

{#if rotAxis == "x"}
  {#each positions as x}
    <T.Group rotation.x={x == whichAxis ? rotation : 0}>
      {#each positions as y}
        {#each positions as z}
          <Cube position={[x, y, z]} {colors} {ring} />
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}

{#if rotAxis == "y"}
  {#each positions as y}
    <T.Group rotation.y={y == whichAxis ? rotation : 0}>
      {#each positions as x}
        {#each positions as z}
          <Cube position={[x, y, z]} {colors} {ring} />
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}

{#if rotAxis == "z"}
  {#each positions as z}
    <T.Group rotation.z={z == whichAxis ? rotation : 0}>
      {#each positions as x}
        {#each positions as y}
          <Cube position={[x, y, z]} {colors} {ring} />
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}
