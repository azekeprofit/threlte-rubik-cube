<script lang="ts">
  type vector3 = [coord, coord, coord];
  import { T, useTask } from "@threlte/core";
  import { Edges, useTexture } from "@threlte/extras";
  import type { SvelteMap } from "svelte/reactivity";
  import {
    COLORS,
    CubeColor,
    type colorKey,
    type coord,
  } from "../lib/model.svelte";
  import { Pulse } from "../reactive/pulse.svelte";

  const {
    position,
    colors,
    ring,
    debug,
    pulse
  }: {
    position: vector3;
    colors: SvelteMap<string, CubeColor>;
    ring: CubeColor[];
    debug: boolean;
    pulse:Pulse;
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

  let index = $derived(ring.indexOf(c));
  let texturePath = $derived(
    `${import.meta.env.BASE_URL}/assets/${debug ? index : -1}.png`
  );

  function hsl(c: colorKey) {
    const [h, s, l] = COLORS[c];
    return `hsl(${h},${s}%,${index==-1?l:l - pulse.value}%)`;
  }
</script>

{#await useTexture(texturePath) then texture}
  <T.Mesh {position}>
    <T.BoxGeometry args={[1, 1, 1]} />
    <T.MeshStandardMaterial
      metalness={0.5}
      roughness={0}
      map={texture}
      color={hsl(c.right)}
      {attach}
    />
    <T.MeshStandardMaterial
      metalness={0.5}
      roughness={0}
      map={texture}
      color={hsl(c.left)}
      {attach}
    />
    <T.MeshStandardMaterial
      metalness={0.5}
      roughness={0}
      map={texture}
      color={hsl(c.bottom)}
      {attach}
    />
    <T.MeshStandardMaterial
      metalness={0.5}
      roughness={0}
      map={texture}
      color={hsl(c.top)}
      {attach}
    />
    <T.MeshStandardMaterial
      metalness={0.5}
      roughness={0}
      map={texture}
      color={hsl(c.front)}
      {attach}
    />
    <T.MeshStandardMaterial
      metalness={0.5}
      roughness={0}
      map={texture}
      color={hsl(c.back)}
      {attach}
    />
    <Edges color="black" />
  </T.Mesh>
{/await}
