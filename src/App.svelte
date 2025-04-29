<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./components/Scene.svelte";
  import type { positions, rotAxisType } from "./lib/model.svelte";

  let whichAxis = $state<(typeof positions)[number]>(1);
  let rotAxis = $state<rotAxisType>("y");
  let reverse = $state(false);
  let debug=$state(false);

  let start:()=>void=$state(null!);

  let vx=$state(0)
  let vy=$state(0)

  function setPoint(x:number,y:number){
    vx=x;
    vy=y;
  }
</script>

<div style="width:500px;height:400px;border:1px solid black;display:inline-block;">
  <Canvas>
    <Scene {whichAxis} {rotAxis} {reverse} {debug} bind:start {setPoint} />
  </Canvas>
</div>
<div style="height:400px;display: inline-block;vertical-align:middle">
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
  {#if start!=null}
  <button onclick={start}>start/stop</button>
  {/if}
</div>
<div>
  x: {vx}
  y: {vy}
</div>
</div>