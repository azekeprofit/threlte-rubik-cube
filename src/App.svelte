<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./components/Scene.svelte";
  import type {
    directionsType,
    positions,
    rotAxisType,
  } from "./model/model.svelte";
  import {
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    RotateCcw,
    RotateCw,
  } from "@lucide/svelte";
  import type { CubeColor } from "./model/cube.svelte";

  let whichAxis = $state<(typeof positions)[number]>(1);
  let rotAxis = $state<rotAxisType>("y");
  let reverse = $state(false);
  let debug = $state(false);
  let showRing = $state(false);

  let start: () => void = $state(null!);

  let hovered = $state<CubeColor | null>(null);

  let directions = $state<directionsType | undefined>(undefined);

  function arrow(axis: rotAxisType, rev: boolean) {
    if (hovered && directions) {
      const dir = directions[axis];
      rotAxis = dir.axis;
      whichAxis = hovered[rotAxis];
      reverse = rev ? !dir.reverse : dir.reverse;
    }
    showRing = true;
  }
</script>

<div
  style="width:500px;height:400px;border:1px solid black;display:inline-block"
>
  <Canvas>
    <Scene
      {whichAxis}
      {rotAxis}
      {reverse}
      {debug}
      bind:start
      bind:hovered
      {showRing}
      setDirections={(d) => (directions = d)}
    />
  </Canvas>
</div>
<div style="height:400px;display: inline-block;vertical-align:middle">
  <div>
    <RotateCw onmouseover={() => arrow("x", false)} onclick={start} />
    <RotateCcw onmouseover={() => arrow("x", true)} onclick={start} />
    <br />
    <ArrowUp onmouseover={() => arrow("y", true)} onclick={start} /><br />
    <ArrowDown onmouseover={() => arrow("y", false)} onclick={start} /><br />
    <ArrowLeft onmouseover={() => arrow("z", true)} onclick={start} />
    <ArrowRight onmouseover={() => arrow("z", false)} onclick={start} />
  </div>

  <div>
    rotAxis:
    <label
      ><input
        type="radio"
        bind:group={rotAxis}
        name="rotAxis"
        value={"x"}
      />x</label
    >
    <label
      ><input
        type="radio"
        bind:group={rotAxis}
        name="rotAxis"
        value={"y"}
      />y</label
    >
    <label
      ><input
        type="radio"
        bind:group={rotAxis}
        name="rotAxis"
        value={"z"}
      />z</label
    >
  </div>
  <div>
    which:
    <label
      ><input
        type="radio"
        bind:group={whichAxis}
        name="whichAxis"
        value={-1}
      />-1</label
    >
    <label
      ><input
        type="radio"
        bind:group={whichAxis}
        name="whichAxis"
        value={0}
      />0</label
    >
    <label
      ><input
        type="radio"
        bind:group={whichAxis}
        name="whichAxis"
        value={1}
      />1</label
    >
  </div>
  <div>
    <label>
      <input type="checkbox" bind:checked={reverse} />rev
    </label>
    <label>
      <input type="checkbox" bind:checked={debug} />debug
    </label>
  </div>
  <div>
    {#if start != null}
      <button onclick={start}>start/stop</button>
    {/if}
  </div>
</div>
