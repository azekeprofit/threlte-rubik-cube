<script lang="ts">
  import { T } from "@threlte/core";
  import {
    Environment,
    Gizmo,
    interactivity,
    OrbitControls,
  } from "@threlte/extras";
  import { expoOut } from "svelte/easing";
  import { Tween } from "svelte/motion";
  import { SvelteMap } from "svelte/reactivity";
  import {
    allDirections,
    assetPath,
    calculateRing,
    positions,
    rotateColoursInRing,
    type directionsType,
    type rotAxisType,
  } from "../model/model.svelte";
  import { Pulse } from "../reactive/pulse.svelte";
  import Cube from "./Cube.svelte";
  import type { CubeColor } from "../model/cube.svelte";

  let x = -4.437954042433267;
  let y = 3.86685287268749;
  let z = 3.6940133200380143;

  const degree90 = Math.PI / 2;

  let {
    whichAxis,
    rotAxis,
    reverse,
    debug,
    start = $bindable(),
    hovered = $bindable(),
    showRing,
    setDirections,
  }: {
    whichAxis: (typeof positions)[number];
    rotAxis: rotAxisType;
    reverse: boolean;
    start: () => void;
    debug: boolean;
    hovered: CubeColor | null;
    showRing: boolean;
    setDirections: (d?: directionsType) => void;
  } = $props();

  let colors = new SvelteMap<string, CubeColor>();

  let ring = $derived(calculateRing(colors, rotAxis, whichAxis));

  let directions = $derived(
    hovered ? allDirections(colors, hovered) : undefined
  );
  $effect(() => setDirections(directions));
  let angle = new Tween(0, { duration: 1000, easing: expoOut });

  start = () => {
    const yReverse = rotAxis == "y" ? !reverse : reverse;
    angle.set(yReverse ? -degree90 : degree90).then(() => {
      rotateColoursInRing(ring, rotAxis, reverse);
      return angle.set(0, { duration: 0 });
    });
  };

  let pulse = new Pulse(0, 15, 30);
  function setHover(c: CubeColor | null) {
    hovered = c;
  }

  interactivity();
</script>

<T.PerspectiveCamera makeDefault position={[x, y, z]}>
  <OrbitControls>
    <Gizmo />
  </OrbitControls>
  <!-- onchange={(e) => console.dir(e.target.object.position)} -->
</T.PerspectiveCamera>

<T.AmbientLight intensity={3} />

{#if rotAxis == "x"}
  {#each positions as x}
    <T.Group rotation.x={x == whichAxis ? angle.current : 0}>
      {#each positions as y}
        {#each positions as z}
          <Cube
            position={[x, y, z]}
            {colors}
            ring={showRing ? ring : [hovered!]}
            {debug}
            {pulse}
            {setHover}
          />
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}

{#if rotAxis == "y"}
  {#each positions as y}
    <T.Group rotation.y={y == whichAxis ? angle.current : 0}>
      {#each positions as x}
        {#each positions as z}
          <Cube
            position={[x, y, z]}
            {colors}
            ring={showRing ? ring : [hovered!]}
            {debug}
            {pulse}
            {setHover}
          />
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}

{#if rotAxis == "z"}
  {#each positions as z}
    <T.Group rotation.z={z == whichAxis ? angle.current : 0}>
      {#each positions as x}
        {#each positions as y}
          <Cube
            position={[x, y, z]}
            {colors}
            ring={showRing ? ring : [hovered!]}
            {debug}
            {pulse}
            {setHover}
          />
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}

<Environment isBackground={false} url={`${assetPath}/studio_small_08_1k.hdr`} />
