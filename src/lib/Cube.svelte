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
    debug,
  }: {
    position: vector3;
    colors: SvelteMap<string, CubeColor>;
    ring: CubeColor[];
    debug: boolean;
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

  let index=$derived(ring.indexOf(c));
  let texturePath=$derived(`${import.meta.env.BASE_URL}/assets/${debug?index:-1}.png`);
  let sPos=$derived(index==-1?position:[x*1.02,y*1.02,z*1.02] as vector3);
</script>

{#await useTexture(texturePath) then texture}
  <T.Mesh position={sPos}>
    <T.BoxGeometry args={[1,1,1]} />
    <T.MeshBasicMaterial map={texture} color={c.right} {attach} />
    <T.MeshBasicMaterial map={texture} color={c.left} {attach}  />
    <T.MeshBasicMaterial map={texture} color={c.bottom} {attach}  />
    <T.MeshBasicMaterial map={texture} color={c.top} {attach}  />
    <T.MeshBasicMaterial map={texture} color={c.front} {attach}  />
    <T.MeshBasicMaterial map={texture} color={c.back} {attach}  />
    <Edges color="black" thickness={1} />
  </T.Mesh>
{/await}
