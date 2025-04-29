<script lang="ts">
  type vector3 = [coord, coord, coord];
  import { T } from "@threlte/core";
  import { Edges, useTexture, type IntersectionEvent } from "@threlte/extras";
  import type { SvelteMap } from "svelte/reactivity";
  import {
  assetPath,
    COLORS,
    CubeColor,
    type colorKey,
    type coord,
  } from "../lib/model.svelte";
  import { Pulse } from "../reactive/pulse.svelte";

  let {
    position,
    colors,
    ring,
    debug,
    pulse,
    setHover,
  }: {
    position: vector3;
    colors: SvelteMap<string, CubeColor>;
    ring: CubeColor[];
    debug: boolean;
    pulse: Pulse;
    setHover: (c: CubeColor|null) => void;
  } = $props();

  let [x, y, z] = position;
  const name = JSON.stringify(position);

  if (!colors.has(name)) {
    colors.set(name, new CubeColor(x, y, z));
  }

  let c = colors.get(name)!;

  function attach({ parent, ref }: { parent: any; ref: any }) {
    if (Array.isArray(parent.material))
      parent.material = [...parent.material, ref];
    else parent.material = [ref];
  }

  let index = $derived(ring.indexOf(c));
  let texturePath = $derived(
    `${assetPath}/${debug ? index : -1}.png`
  );

  function hsl(k: colorKey) {
    if (k == "none") return "";
    const [h, s, l] = COLORS[k];
    return `hsl(${h},${s}%,${index != -1 ? l - pulse.value : l}%)`;
  }
</script>

{#await useTexture(texturePath) then texture}
  <T.Mesh {name} {position}
  onpointerenter={(e: IntersectionEvent<MouseEvent>) => {
    e.stopPropagation();
    setHover(c);
  }}>
  onpointerleave={(e: IntersectionEvent<MouseEvent>) => {
    setHover(null);
  }}>
    <T.BoxGeometry args={[.95, .95, .95]} />
    {#each c.drawingOrder() as color}
      {#if color != "none"}
        <T.MeshStandardMaterial
          metalness={0.5}
          roughness={0}
          map={texture}
          color={hsl(color)}
          {attach}
        />
      {:else}
        <T.MeshBasicMaterial visible={false} {attach} />
      {/if}
    {/each}
  </T.Mesh>
{/await}
