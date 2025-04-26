<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
  import Cube from "./Cube.svelte";
  import { positions, type rotAxisType } from "./model";

  const COLORS = {
    white: "#FFFFFF",
    yellow: "#FFFF00",
    red: "#FF0000",
    orange: "#FFA500",
    blue: "#0000FF",
    green: "#00FF00",
  };

  let x = -6.087414455248885;
  let y = 2.4046333628934424;
  let z = 2.335561018356455;

  const {
    whichAxis,
    rotAxis,
  }: { whichAxis: (typeof positions)[number]; rotAxis: rotAxisType } = $props();
  let rotation = $state(0);
  useTask((delta) => {
    rotation += delta;
  });
</script>

<T.PerspectiveCamera makeDefault position={[x, y, z]}>
  <OrbitControls></OrbitControls>
  <!-- onchange={(e) => console.dir(e.target.object.position)} -->
</T.PerspectiveCamera>

{#if rotAxis == "x"}
  {#each positions as x}
    <T.Group rotation.x={x == whichAxis ? rotation : 0}>
      {#each positions as y}
        {#each positions as z}
          {#if !(x == 0 && x == y && y == z)}
            <Cube
              position={[x, y, z]}
              color={{ [-1]: COLORS.yellow, 0: "maroon", 1: COLORS.white }[y]}
              colorSideA={{ [-1]: COLORS.blue, 0: "maroon", 1: COLORS.green }[
                x
              ]}
              colorSideB={{ [-1]: COLORS.orange, 0: "maroon", 1: COLORS.red }[
                z
              ]}
            />
          {/if}
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}

{#if rotAxis == "y"}
  {#each positions as y}
    <T.Group rotation.y={y == whichAxis ? rotation : 0}>
      {#each positions as x}
        {#each positions as z}
          {#if !(x == 0 && x == y && y == z)}
            <Cube
              position={[x, y, z]}
              color={{ [-1]: COLORS.yellow, 0: "maroon", 1: COLORS.white }[y]}
              colorSideA={{ [-1]: COLORS.blue, 0: "maroon", 1: COLORS.green }[
                x
              ]}
              colorSideB={{ [-1]: COLORS.orange, 0: "maroon", 1: COLORS.red }[
                z
              ]}
            />
          {/if}
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}

{#if rotAxis == "z"}
  {#each positions as z}
    <T.Group rotation.z={z == whichAxis ? rotation : 0}>
      {#each positions as x}
        {#each positions as y}
          {#if !(x == 0 && x == y && y == z)}
            <Cube
              position={[x, y, z]}
              color={{ [-1]: COLORS.yellow, 0: "maroon", 1: COLORS.white }[y]}
              colorSideA={{ [-1]: COLORS.blue, 0: "maroon", 1: COLORS.green }[
                x
              ]}
              colorSideB={{ [-1]: COLORS.orange, 0: "maroon", 1: COLORS.red }[
                z
              ]}
            />
          {/if}
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}
