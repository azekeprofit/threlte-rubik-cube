<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./components/Scene.svelte";

  let debug = $state(false);
</script>

<div
  style="width:500px;height:400px;border:1px solid black;display:inline-block"
>
  <Canvas>
    <Scene {debug} />
  </Canvas>
</div>
<div style="height:400px;display: inline-block;vertical-align:middle">
  <div>
    <label>
      <input type="checkbox" bind:checked={debug} />debug
    </label>
  </div>
</div>
