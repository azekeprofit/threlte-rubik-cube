<script lang="ts">
  import {
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    RotateCcw,
    RotateCw,
  } from "@lucide/svelte";
  import { Canvas } from "@threlte/core";
  import Scene from "./components/Scene.svelte";
  import type {
    positions,
    rotAxisType
  } from "./model/model.svelte";


  let debug = $state(false);
  let start= $state(()=>{});
  let arrow= $state<(axis: rotAxisType, rev: boolean)=>void>(()=>{});

</script>

<div
  style="width:500px;height:400px;border:1px solid black;display:inline-block"
>
  <Canvas>
    <Scene
      {debug}
      bind:arrow
      bind:start
    />
  </Canvas>
</div>
<div style="height:400px;display: inline-block;vertical-align:middle">
  <div>
    <RotateCw onmouseover={() => arrow("y", false)} onclick={start} />
    <RotateCcw onmouseover={() => arrow("y", true)} onclick={start} />
    <br />
    <ArrowUp onmouseover={() => arrow("x", true)} onclick={start} /><br />
    <ArrowDown onmouseover={() => arrow("x", false)} onclick={start} /><br />
    <ArrowLeft onmouseover={() => arrow("z", true)} onclick={start} />
    <ArrowRight onmouseover={() => arrow("z", false)} onclick={start} />
  </div>

  <div>
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
