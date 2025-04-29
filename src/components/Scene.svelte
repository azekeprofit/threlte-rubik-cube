<script lang="ts">
  import { T, useThrelte } from "@threlte/core";
  import { Environment, interactivity, OrbitControls } from "@threlte/extras";
  import { expoOut } from "svelte/easing";
  import { Tween } from "svelte/motion";
  import { SvelteMap } from "svelte/reactivity";
  import { Pulse } from "../reactive/pulse.svelte";
  import Cube from "./Cube.svelte";
  import {
    type rotationProps,
    assetPath,
    CubeColor,
    positions,
    rotateColoursInRing,
  } from "../lib/model.svelte";
  import { Raycaster, Vector2 } from "three";

  let x = -4.437954042433267;
  let y = 3.866852872687497;
  let z = 3.6940133200380143;

  const degree90 = Math.PI / 2;
  const ringOrder = [0, 1, 2, 7, 8, 3, 6, 5, 4];

  let {
    whichAxis,
    rotAxis,
    reverse,
    debug,
    start = $bindable(),
  }: rotationProps & {
    start: () => void;
    debug: boolean;
  } = $props();

  let colors = new SvelteMap<string, CubeColor>();

  let ring = $derived.by(() => {
    let ring = [];
    let i = 0;
    for (let c of colors.values()) {
      if (c[rotAxis] == whichAxis) {
        ring[ringOrder[i++]] = c;
      }
    }
    return ring;
  });

  let angle = new Tween(0, { duration: 1000, easing: expoOut });

  start = () => {
    const yReverse = rotAxis == "y" ? !reverse : reverse;
    angle.set(yReverse ? -degree90 : degree90).then(() => {
      rotateColoursInRing(ring, rotAxis, reverse);
      return angle.set(0, { duration: 0 });
    });
  };

  let pulse = new Pulse(0, 15, 30);
  let hovered = $state<CubeColor | null>(null);
  function setHover(c: CubeColor) {
    hovered = c;
  }

  let { scene, camera, canvas } = useThrelte();

  class PickHelper {
    raycaster: Raycaster;
    pickedObject = $state("");
    constructor() {
      this.raycaster = new Raycaster();
      this.pickedObject = "";
    }
    pick(normalizedPosition: Vector2) {
      // restore the color if there is a picked object
      if (this.pickedObject) {
        this.pickedObject = "";
      }

      // cast a ray through the frustum
      this.raycaster.setFromCamera(normalizedPosition, camera.current);
      // get the list of objects the ray intersected
      const intersectedObjects = this.raycaster.intersectObjects(
        scene.children
      );
      if (intersectedObjects.length) {
        // pick the first object. It's the closest one
        let closest = intersectedObjects[0].object;
        while (!closest.name && closest.parent) {
          closest = closest.parent;
        }
        this.pickedObject = closest.name;
        console.dir(intersectedObjects);
      }
    }
  }

  let pickHelper = new PickHelper();

  canvas.addEventListener(
    "mousemove",
    (e) => {
      const rect = canvas.getBoundingClientRect();
      let x = (e.clientX - rect.left) / rect.width;
      let y = (e.clientY - rect.top) / rect.height;
      let vx=2*x-1;
      let vy=1-2*y;
      let v = new Vector2(vx*2.5, vy*2.5);
      pickHelper.pick(v);
      // console.dir(v);
    },
    false
  );
</script>

<T.PerspectiveCamera makeDefault position={[x, y, z]}>
  <OrbitControls></OrbitControls>
  <!-- onchange={(e) => console.dir(e.target.object.position)} -->
</T.PerspectiveCamera>

<T.AmbientLight intensity={5} />

{#if rotAxis == "x"}
  {#each positions as x}
    <T.Group rotation.x={x == whichAxis ? angle.current : 0}>
      {#each positions as y}
        {#each positions as z}
          <Cube
            position={[x, y, z]}
            {colors}
            {ring}
            {debug}
            {pulse}
            hovered={pickHelper.pickedObject}
          />
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}

{#if rotAxis == "y"}
  {#each positions as y}
    <T.Group rotation.y={y == whichAxis ? angle.current : 0}>
      {#each positions as x}
        {#each positions as z}
          <Cube
            position={[x, y, z]}
            {colors}
            {ring}
            {debug}
            {pulse}
            hovered={pickHelper.pickedObject}
          />
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}

{#if rotAxis == "z"}
  {#each positions as z}
    <T.Group rotation.z={z == whichAxis ? angle.current : 0}>
      {#each positions as x}
        {#each positions as y}
          <Cube
            position={[x, y, z]}
            {colors}
            {ring}
            {debug}
            {pulse}
            hovered={pickHelper.pickedObject}
          />
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}

<Environment isBackground={false} url={`${assetPath}/studio_small_08_1k.hdr`} />
