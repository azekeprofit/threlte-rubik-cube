<script lang="ts">
  type vector3 = [coord, coord, coord];
  import { T } from "@threlte/core";
  import { Edges, useTexture } from "@threlte/extras";
  import type { SvelteMap } from "svelte/reactivity";
  import { CubeColor, type coord } from "./model.svelte";

  const {
    position,
    colors,
    ring,
  }: {
    position: vector3;
    colors: SvelteMap<string, CubeColor>;
    ring: CubeColor[];
  } = $props();

  let [x, y, z] = position;
  const posKey = JSON.stringify(position);

  if (!colors.has(posKey)) {
    colors.set(posKey, new CubeColor(x, y, z));
  }

  let c = colors.get(posKey)!;

  function attach({ parent, ref }: { parent: any; ref: any }) {
    if (Array.isArray(parent.material))
      parent.material = [...parent.material, ref];
    else parent.material = [ref];
  }

  const base=import.meta.env.BASE_URL;
</script>

{#await useTexture(`${base}/assets/${ring.indexOf(c)}.png`) then texture}
  <T.Mesh {position}>
    <T.BoxGeometry args={[1, 1, 1]} />
    <T.MeshToonMaterial map={texture} color={c.right} {attach} reflectivity={20} />
    <T.MeshToonMaterial map={texture} color={c.left} {attach} reflectivity={20} />
    <T.MeshToonMaterial map={texture} color={c.bottom} {attach} reflectivity={20} />
    <T.MeshToonMaterial map={texture} color={c.top} {attach}  reflectivity={20}/>
    <T.MeshToonMaterial map={texture} color={c.front} {attach} reflectivity={2} />
    <T.MeshToonMaterial map={texture} color={c.back} {attach}  reflectivity={20} />
    <Edges color="black" thickness={1} />
  </T.Mesh>
{/await}
