<script lang="ts">
  type vector3 = [number, number, number];
  import { T } from "@threlte/core";
  import { Edges, Outlines } from "@threlte/extras";
  const size=1;
  import {DoubleSide,Vector3,Euler, MeshBasicMaterial} from 'three';

  const { position,rotation,color,colorSideA,colorSideB}:{position:vector3,rotation:vector3,color?:string,colorSideA?:string,colorSideB?:string}=$props();
  let m1:any=new MeshBasicMaterial({color}); // this shuts up Typescript
  let m2=new MeshBasicMaterial({color:colorSideA});
  let m3=new MeshBasicMaterial({color:colorSideB});
</script>


<T.Mesh {position} {rotation} material={[m2,m2,m1,m1,m3,m3]}>
  <T.BoxGeometry args={[size, size,size]} />
  
  <Edges
  color="black"
  thickness={1}
/>
</T.Mesh>

