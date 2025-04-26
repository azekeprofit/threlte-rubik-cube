<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./lib/Scene.svelte";
  import type { rotAxisType, positions } from "./lib/model";

  let whichAxis = $state<(typeof positions)[number]>(0);
  let rotAxis = $state<rotAxisType>("x");
</script>

<div style="width:300px;height:300px">
  <Canvas>
    <Scene {whichAxis} {rotAxis} />
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