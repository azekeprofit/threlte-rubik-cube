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
  import type { CubeColor } from "../model/cube.svelte";
  import {
    allDirections,
    assetPath,
    calculateRing,
    positions,
    rotateColoursInRing,
    type coord,
    type cubeCoord,
    type rotAxisType,
  } from "../model/model.svelte";
  import { Pulse } from "../reactive/pulse.svelte";
  import Arrows from "./Arrows.svelte";
  import Cube from "./Cube.svelte";

  let x = -4.437954042433267;
  let y = 3.86685287268749;
  let z = 3.6940133200380143;

  const degree90 = Math.PI / 2;

  

  let {
    debug,
    hovered=$bindable(),
    zPlane=$bindable(),
  }: {
    debug: boolean;
    hovered:CubeColor|null;
    zPlane:rotAxisType,
  } = $props();

  let whichAxis = $state<(typeof positions)[number]>(1);
  let rotAxis = $state<rotAxisType>("y");
  let reverse = $state(false);
  let colors = new SvelteMap<string, CubeColor>();

  let ring = $derived(calculateRing(colors, rotAxis, whichAxis));
  let directions = $derived(
    hovered ? allDirections(colors, zPlane) : undefined
  );
  let angle = new Tween(0, { duration: 1000, easing: expoOut });

  function arrow(axis: rotAxisType, rev: boolean) {
    if (hovered && directions) {
      const dir = directions[axis];
      rotAxis = dir.axis;
      whichAxis = hovered[rotAxis];
      reverse = rev ? !dir.reverse : dir.reverse;
    }
  }

  function start() {
    const yReverse = rotAxis == "y" ? !reverse : reverse;
    angle.set(yReverse ? -degree90 : degree90).then(() => {
      rotateColoursInRing(ring, rotAxis, reverse);
      return angle.set(0, { duration: 0 });
    });
  }

  let pulse = new Pulse(0, 30, 50);

  interactivity();
</script>

<T.PerspectiveCamera makeDefault position={[x, y, z]}>
  <OrbitControls>
    <Gizmo />
  </OrbitControls>
  <!-- onchange={(e) => console.dir(e.target.object.position)} -->
</T.PerspectiveCamera>

<T.AmbientLight intensity={3} />

{#snippet cubes(positionFunc: (a: coord, b: coord) => cubeCoord)}
  {#each positions as a}
    {#each positions as b}
      <Cube
        position={positionFunc(a, b)}
        {colors}
        {ring}
        {debug}
        {pulse}
        bind:hovered
        bind:zPlane
      />
    {/each}
  {/each}
{/snippet}

{#if rotAxis == "x"}
  {#each positions as x}
    <T.Group rotation.x={x == whichAxis ? angle.current : 0}>
      {@render cubes((y, z) => [x, y, z])}
    </T.Group>
  {/each}
{/if}

{#if rotAxis == "y"}
  {#each positions as y}
    <T.Group rotation.y={y == whichAxis ? angle.current : 0}>
      {@render cubes((x, z) => [x, y, z])}
    </T.Group>
  {/each}
{/if}

{#if rotAxis == "z"}
  {#each positions as z}
    <T.Group rotation.z={z == whichAxis ? angle.current : 0}>
      {@render cubes((x, y) => [x, y, z])}
    </T.Group>
  {/each}
{/if}

<Arrows {hovered} {zPlane} bind:whichAxis bind:rotAxis bind:reverse {start} />

<Environment isBackground={false} url={`${assetPath}/studio_small_08_1k.hdr`} />
