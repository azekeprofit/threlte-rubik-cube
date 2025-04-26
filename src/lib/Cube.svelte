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

  let m1: any = new MeshBasicMaterial({ color: c.top }); // this shuts up Typescript
  let m2 = new MeshBasicMaterial({ color: c.sideA });
  let m3 = new MeshBasicMaterial({ color: c.sideB });
</script>

<T.Mesh {position} material={[m2, m2, m1, m1, m3, m3]}>
  <T.BoxGeometry args={[1, 1, 1]} />
  <Edges color="black" thickness={1} />
</T.Mesh>
