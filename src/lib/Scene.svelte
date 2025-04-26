<script lang="ts">
  import { T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
  import { positions, type rotAxisType } from "./model.svelte";

  let x = -6.087414455248885;
  let y = 2.4046333628934424;
  let z = 2.335561018356455;

  const {
    whichAxis,
    rotAxis,
    reverse,
  }: {
    whichAxis: (typeof positions)[number];
    rotAxis: rotAxisType;
    reverse: boolean;
  } = $props();

  import Rotation from "./Rotation.svelte";
</script>

<T.PerspectiveCamera makeDefault position={[x, y, z]}>
  <OrbitControls></OrbitControls>
  <!-- onchange={(e) => console.dir(e.target.object.position)} -->
</T.PerspectiveCamera>
<Rotation {whichAxis} {rotAxis} {reverse} />