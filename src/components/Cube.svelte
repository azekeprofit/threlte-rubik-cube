<script lang="ts">
  import { T } from "@threlte/core";
  import { Edges, useTexture, type IntersectionEvent } from "@threlte/extras";
  import type { SvelteMap } from "svelte/reactivity";
  import { assetPath, type cubeCoord, type rotAxisType } from "../model/model.svelte";
  import { Pulse } from "../reactive/pulse.svelte";
  import { COLORS, CubeColor, type colorKey } from "../model/cube.svelte";

  let {
    position,
    colors,
    ring,
    debug,
    pulse,
    hovered = $bindable(),
    zPlane = $bindable(),
  }: {
    position: cubeCoord;
    colors: SvelteMap<string, CubeColor>;
    ring: CubeColor[];
    debug: boolean;
    pulse: Pulse;
    hovered: CubeColor|null;
    zPlane: rotAxisType;
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
  let texturePath = $derived(`${assetPath}/${debug ? index : -1}.png`);

  function hsl(k: colorKey) {
    if (k == "none") return "";
    const [h, s, l] = COLORS[k];
    return `hsl(${h},${s}%,${hovered===c ? l - pulse.value : l}%)`;
  }
</script>

{#await useTexture(texturePath) then texture}
  <T.Mesh
    {name}
    {position}
    onclick={(e: IntersectionEvent<MouseEvent>) => {
      e.stopPropagation();
      const {normal}=e;
      if(normal?.x!==0)zPlane='x';
      else if(normal?.y!==0)zPlane='y';
      else zPlane='z';
      hovered = c;
    }}
  >
    <T.BoxGeometry args={[0.95, 0.95, 0.95]} />
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
