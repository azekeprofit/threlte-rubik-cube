<script lang="ts">
  type vector3 = [number, number, number];
  import { T } from "@threlte/core";
  import { Edges } from "@threlte/extras";
  import { MeshBasicMaterial } from "three";

  const {
    position,
    color,
    colorSideA,
    colorSideB,
  }: {
    position: vector3;
    color?: string;
    colorSideA?: string;
    colorSideB?: string;
  } = $props();
  let m1: any = new MeshBasicMaterial({ color }); // this shuts up Typescript
  let m2 = new MeshBasicMaterial({ color: colorSideA });
  let m3 = new MeshBasicMaterial({ color: colorSideB });
</script>

<T.Mesh {position} material={[m2, m2, m1, m1, m3, m3]}>
  <T.BoxGeometry args={[1, 1, 1]} />
  <Edges color="black" thickness={1} />
</T.Mesh>
