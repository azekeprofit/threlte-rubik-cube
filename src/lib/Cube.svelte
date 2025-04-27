<script lang="ts">
  type vector3 = [coord, coord, coord];
  import { T } from "@threlte/core";
  import { Edges } from "@threlte/extras";
  import type { SvelteMap } from "svelte/reactivity";
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

  if (!colors.has(posKey)) {
    colors.set(posKey, new CubeColor(x, y, z));
  }

  let c = colors.get(posKey)!;

  function attach({ parent, ref }: { parent: any; ref: any }) {
    if (Array.isArray(parent.material))
      parent.material = [...parent.material, ref];
    else parent.material = [ref];
  }
</script>

<T.Mesh {position}>
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.MeshBasicMaterial color={c.right} {attach} />
  <T.MeshBasicMaterial color={c.left} {attach} />
  <T.MeshBasicMaterial color={c.bottom} {attach} />
  <T.MeshBasicMaterial color={c.top} {attach} />
  <T.MeshBasicMaterial color={c.front} {attach} />
  <T.MeshBasicMaterial color={c.back} {attach} />
  <Edges color="black" thickness={1} />
</T.Mesh>
