<script lang="ts">
  import { Canvas, type ThrelteUseTask } from "@threlte/core";
  import Scene from "./lib/Scene.svelte";
  import type { positions, rotAxisType } from "./lib/model.svelte";

  let whichAxis = $state<(typeof positions)[number]>(1);
  let rotAxis = $state<rotAxisType>("y");
  let reverse = $state(true);

  let start:()=>void=$state(null!);
</script>

<div style="width:500px;height:500px">
  <Canvas>
    <Scene {whichAxis} {rotAxis} {reverse} bind:start />
  </Canvas>
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
</div>
<div>
  {#if start!=null}
  <button onclick={start}>start/stop</button>
  {/if}
</div>
