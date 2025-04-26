<script lang="ts">
  type vector3 = [number, number, number];
  import { T } from "@threlte/core";
  const fullSize=1;
  const size=fullSize-.01;
  import {DoubleSide,Vector3,Euler, MeshBasicMaterial} from 'three';
  export let position: vector3;
  export let rotation: vector3;
  export let color: string|undefined;
  export let colorSideA: string|undefined;
  export let colorSideB: string|undefined;
  let m1:any=new MeshBasicMaterial({color});
  let m2=new MeshBasicMaterial({color:colorSideA});
  let m3=new MeshBasicMaterial({color:colorSideB});
</script>


<T.Mesh {position} {rotation} material={[m2,m2,m1,m1,m3,m3]}>
  <T.BoxGeometry args={[size, size,size]} />
</T.Mesh>
<T.Mesh {position} {rotation}>
  <T.BoxGeometry args={[fullSize,fullSize,fullSize]} />
  <T.MeshBasicMaterial color={"#000"} wireframe={true} />
</T.Mesh>
