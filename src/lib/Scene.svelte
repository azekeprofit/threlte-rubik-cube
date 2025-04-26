<script>
  import { T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
  // import { Checkbox, Pane, ThemeUtils, Slider } from "svelte-tweakpane-ui";
  import Cube from "./Cube.svelte";

  const COLORS = {
    white: "#FFFFFF",
    yellow: "#FFFF00",
    red: "#FF0000",
    orange: "#FFA500",
    blue: "#0000FF",
    green: "#00FF00",
  };

  const positions = [-1, 0, 1];
  let x = -6.087414455248885;
  let y = 2.4046333628934424;
  let z = 2.335561018356455;
</script>

<T.PerspectiveCamera makeDefault position={[x, y, z]}>
  <OrbitControls></OrbitControls>       <!-- onchange={(e) => console.dir(e.target.object.position)} -->
</T.PerspectiveCamera>
<T.DirectionalLight position.y={10} position.z={10} />
<T.AmbientLight intensity={0.3} />

<!-- <Pane
  theme={ThemeUtils.presets.light}
  position="fixed"
  title="OrbitControls"
>
  <Slider
    label="x"
    bind:value={x}
  />
  <Slider
    label="y"
    bind:value={y}
  />
  <Slider
    label="z"
    bind:value={z}
  />
</Pane> -->
{#each positions as x}
  {#each positions as y}
    {#each positions as z}
      {#if !(x == 0 && x == y && y == z)}
        <Cube
          position={[x, y, z]}
          rotation={[0, 0, 0]}
          color={{ [-1]: COLORS.red, 0: COLORS.blue, 1: COLORS.green }[x]}
        />
      {/if}
    {/each}
  {/each}
{/each}
