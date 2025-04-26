<script lang="ts">
  import { T, useTask, type ThrelteUseTask } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
  import {
    CubeColor,
    degree90,
    positions,
    type rotAxisType,
  } from "./model.svelte";

  let x = -6.087414455248885;
  let y = 2.4046333628934424;
  let z = 2.335561018356455;

  let {
    whichAxis,
    rotAxis,
    reverse,
    start = $bindable(),
  }: {
    whichAxis: (typeof positions)[number];
    rotAxis: rotAxisType;
    reverse: boolean;
    start: () => void;
  } = $props();

  import { SvelteMap } from "svelte/reactivity";
  import Cube from "./Cube.svelte";
  let colors = new SvelteMap<string, CubeColor>();

  let rotation = $state(0);
  let task = useTask(
    (delta) => {
      rotation += delta * (reverse ? -2 : 2);
      if (rotation > degree90) {
        task.stop();
        rotation=0;
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
          {#if !(x == 0 && x == y && y == z)}
            <Cube position={[x, y, z]} {colors} />
          {/if}
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
          {#if !(x == 0 && x == y && y == z)}
            <Cube position={[x, y, z]} {colors} />
          {/if}
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
          {#if !(x == 0 && x == y && y == z)}
            <Cube position={[x, y, z]} {colors} />
          {/if}
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}
