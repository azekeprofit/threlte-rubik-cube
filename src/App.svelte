<script lang="ts">
  import { Canvas } from "@threlte/core";
  import Scene from "./components/Scene.svelte";
  import type { CubeColor } from "./model/cube.svelte";
  import { flatAxes, type rotAxisType } from "./model/model.svelte";

  let debug = $state(false);
  let hovered = $state<CubeColor | null>(null);
  let zPlane = $state<rotAxisType>("z");
</script>

<div
  style="width:500px;height:400px;border:1px solid black;display:inline-block"
>
  <Canvas>
    <Scene {debug} bind:hovered bind:zPlane />
  </Canvas>
</div>
<div style="height:400px;display: inline-block;vertical-align:middle">
  <div>
    <label>
      <input type="checkbox" bind:checked={debug} />debug
    </label>
  </div>
  <div>
    hovered: {hovered?.x}: {hovered?.y}: {hovered?.z}
  </div>

  <div>
    zPlane: {zPlane}
    
  </div>
  <div>
    f: {flatAxes(zPlane)}
  </div>
</div>
