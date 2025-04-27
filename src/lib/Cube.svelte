<script lang="ts">
  type vector3 = [coord, coord, coord];
  import { T } from "@threlte/core";
  import { Edges } from "@threlte/extras";
  import type { SvelteMap } from "svelte/reactivity";
  import { MeshBasicMaterial } from "three";
  import { CubeColor, type coord } from "./model.svelte";

  const {
    position,
    colors,
  }: {
    position: vector3;
    colors: SvelteMap<string, CubeColor>;
  } = $props();

  let [x, y, z] = position;
  const posKey = JSON.stringify(position);

  let c: CubeColor;
  if (colors.has(posKey)) {
    c = colors.get(posKey)!;
  } else {
    c = new CubeColor(x, y, z);
    colors.set(posKey, c);
  }

  let top: any = $derived(new MeshBasicMaterial({ color: c.top })); // this shuts up Typescript
  let left = $derived(new MeshBasicMaterial({ color: c.left }));
  let right = $derived(new MeshBasicMaterial({ color: c.right }));
  let front = $derived(new MeshBasicMaterial({ color: c.front }));
  let back = $derived(new MeshBasicMaterial({ color: c.back }));
  let bottom = $derived(new MeshBasicMaterial({ color: c.bottom }));
</script>

<T.Mesh {position} material={[right, left, bottom, top, front, back]}>
  <T.BoxGeometry args={[1, 1, 1]} />
  <Edges color="black" thickness={1} />
</T.Mesh>
