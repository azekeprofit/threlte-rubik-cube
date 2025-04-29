<script lang="ts">
  import { T } from "@threlte/core";
  import { Environment, interactivity, OrbitControls } from "@threlte/extras";
  import { expoOut } from "svelte/easing";
  import { Tween } from "svelte/motion";
  import { SvelteMap } from "svelte/reactivity";
  import { Pulse } from "../reactive/pulse.svelte";
  import Cube from "./Cube.svelte";
  import {
    type rotationProps,
    assetPath,
    CubeColor,
    positions,
    rotateColoursInRing,
  } from "../lib/model.svelte";

  let x = -4.437954042433267;
  let y = 3.866852872687497;
  let z = 3.6940133200380143;

  const degree90 = Math.PI / 2;
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

  let angle = new Tween(0, { duration: 1000, easing: expoOut });

  start = () => {
    const yReverse = rotAxis == "y" ? !reverse : reverse;
    angle.set(yReverse ? -degree90 : degree90).then(() => {
      rotateColoursInRing(ring, rotAxis, reverse);
      return angle.set(0, { duration: 0 });
    });
  };

  let pulse = new Pulse(0, 15, 30);
  let hovered = $state<CubeColor | null>(null);
  function setHover(c:CubeColor){
    hovered=c;
  }

  interactivity({
    filter: (hits, state) => {
      // Only return the first hit
      return hits.slice(0, 1)
    }
  })
</script>

<T.PerspectiveCamera makeDefault position={[x, y, z]}>
  <OrbitControls></OrbitControls>
  <!-- onchange={(e) => console.dir(e.target.object.position)} -->
</T.PerspectiveCamera>

<T.AmbientLight intensity={5} />

{#if rotAxis == "x"}
  {#each positions as x}
    <T.Group rotation.x={x == whichAxis ? angle.current : 0}>
      {#each positions as y}
        {#each positions as z}
          <Cube position={[x, y, z]} {colors} {ring} {debug} {pulse} {hovered} {setHover}/>
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
          <Cube position={[x, y, z]} {colors} {ring} {debug} {pulse}{hovered} {setHover}/>
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
          <Cube position={[x, y, z]} {colors} {ring} {debug} {pulse} {hovered}  {setHover}/>
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}

<Environment isBackground={false} url={`${assetPath}/studio_small_08_1k.hdr`} />
