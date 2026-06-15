// NoiseTexture.ts — procedural noise texture generator for glass grain

import * as THREE from "three";

/**
 * Generates a seamless Perlin-like noise texture on a canvas.
 * Used inside the lens for frosted glass grain.
 */
export function createNoiseTexture(size = 256): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  // Generate multi-octave noise
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;

      // Hash-based pseudo-random for fine grain
      const n1 = hash(x * 0.1, y * 0.1) * 255;
      const n2 = hash(x * 0.05 + 100, y * 0.05 + 100) * 255;
      const blended = n1 * 0.6 + n2 * 0.4;

      data[i] = blended;
      data[i + 1] = blended;
      data[i + 2] = blended;
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return texture;
}

/** Fast hash function for pseudo-random noise */
function hash(x: number, y: number): number {
  let h = x * 127.1 + y * 311.7;
  h = Math.sin(h) * 43758.5453;
  return h - Math.floor(h);
}
