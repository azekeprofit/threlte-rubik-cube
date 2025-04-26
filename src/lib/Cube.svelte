<script lang="ts">
  type vector3 = [number, number, number];
  import { T } from "@threlte/core";
  export let position: vector3;
  export let rotation: vector3;
  export let color: string|undefined;
</script>

<T.Mesh {position} {rotation}>
  <T.BoxGeometry args={[0.95, 0.95, 0.95]} />
  <T.MeshBasicMaterial {color} />
</T.Mesh>
<T.Mesh {position} {rotation}>
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.MeshBasicMaterial color={"#000"} wireframe={true} />
</T.Mesh>
