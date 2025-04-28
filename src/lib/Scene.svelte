<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import { Environment, OrbitControls } from "@threlte/extras";
  import {
    type rotationProps,
    assetPath,
    CubeColor,
    degree90,
    positions,
    rotateColoursInRing
  } from "./model.svelte";

  let x = -4.437954042433267;
  let y = 3.866852872687497;
  let z = 3.6940133200380143;

  const ringOrder = [0, 1, 2, 7, 8, 3, 6, 5, 4];

  let {
    whichAxis,
    rotAxis,
    reverse,
    debug,
    start = $bindable(),
  }: rotationProps & {
    start: () => void;
    debug: boolean;
  } = $props();

  import { SvelteMap } from "svelte/reactivity";
  import Cube from "./Cube.svelte";
  let colors = new SvelteMap<string, CubeColor>();

  let ring = $derived.by(() => {
    let ring = [];
    let i = 0;
    for (let c of colors.values()) {
      if (c[rotAxis] == whichAxis) {
        ring[ringOrder[i++]] = c;
      }
    }
    return ring;
  });

  let rotation = $state(0);
  let yReverse = $derived(rotAxis == "y" ? !reverse : reverse);
  let step = $derived(yReverse ? -2 : 2);
  let task = useTask(
    (delta) => {
      rotation += delta * step;
      if (Math.abs(rotation) > degree90) {
        task.stop();
        rotation = 0;
        rotateColoursInRing(ring, rotAxis, reverse);
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

<T.AmbientLight intensity={5} />

{#if rotAxis == "x"}
  {#each positions as x}
    <T.Group rotation.x={x == whichAxis ? rotation : 0}>
      {#each positions as y}
        {#each positions as z}
          <Cube position={[x, y, z]} {colors} {ring} {debug} />
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
          <Cube position={[x, y, z]} {colors} {ring} {debug} />
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
          <Cube position={[x, y, z]} {colors} {ring} {debug} />
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}

<Environment
  isBackground={false}
  url={`${assetPath}/studio_small_08_1k.hdr`}
/>
