// LensShader.ts — GLSL uniforms + vertex/fragment for liquid glass refraction
// This shader outputs transparent pixels outside the lens area
// and applies glass effects only within the circular lens region

import * as THREE from "three";

export const LensUniforms = {
  uTime: { value: 0 },
  uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  uResolution: { value: new THREE.Vector2(1, 1) },
  uTexture: { value: null as THREE.Texture | null },
  uLensRadius: { value: 0.07 },
  uRefractionStrength: { value: 0.05 },
  uChromaticAberration: { value: 0.015 },
  uBlurAmount: { value: 0.004 },
  uNoiseStrength: { value: 0.05 },
  uWobble: { value: 0 },
  uScale: { value: 1.0 },
  uVelocity: { value: new THREE.Vector2(0, 0) },
};

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform vec2  uResolution;
  uniform sampler2D uTexture;
  uniform float uLensRadius;
  uniform float uRefractionStrength;
  uniform float uChromaticAberration;
  uniform float uBlurAmount;
  uniform float uNoiseStrength;
  uniform float uWobble;
  uniform float uScale;
  uniform vec2  uVelocity;

  varying vec2 vUv;

  /* ---- simplex-like noise ---- */
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289((x * 34.0 + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187,
      0.366025403784439,
     -0.577350269189626,
      0.024390243902439
    );
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289v2(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x_) - 0.5;
    vec3 ox = floor(x_ + 0.5);
    vec3 a0 = x_ - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  /* ---- frosted blur (9-tap Gaussian) ---- */
  vec3 frostedSample(sampler2D tex, vec2 uv, float blur) {
    vec3 col = vec3(0.0);
    float total = 0.0;
    for (int x = -1; x <= 1; x++) {
      for (int y = -1; y <= 1; y++) {
        vec2 offset = vec2(float(x), float(y)) * blur;
        float w = 1.0 - length(vec2(float(x), float(y))) * 0.25;
        col += texture2D(tex, uv + offset).rgb * w;
        total += w;
      }
    }
    return col / total;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 centeredUv = (uv - 0.5) * aspect;
    vec2 mousePos  = (uMouse - 0.5) * aspect;

    float dist = length(centeredUv - mousePos);
    float radius = uLensRadius * uScale;

    /* soft lens mask with smooth edge */
    float mask = 1.0 - smoothstep(radius * 0.65, radius, dist);

    /* ── TRANSPARENT OUTSIDE LENS ── */
    if (mask < 0.001) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      return;
    }

    /* --- liquid wobble from velocity --- */
    vec2 dir = normalize(centeredUv - mousePos + 0.0001);
    float wobbleNoise = snoise(centeredUv * 12.0 + uTime * 2.0) * uWobble;
    float wobblePhase = sin(dot(dir, uVelocity.xy) * 20.0 + uTime * 8.0) * uWobble * 0.5;

    /* --- refraction offset (magnification) --- */
    vec2 refractDir = (centeredUv - mousePos) / aspect;
    float refractMag = uRefractionStrength * mask * (1.0 + wobbleNoise + wobblePhase);

    /* per-channel chromatic aberration */
    float chrEdge = uChromaticAberration * smoothstep(radius * 0.3, radius, dist);

    vec2 uvR = uv - refractDir * (refractMag + chrEdge);
    vec2 uvG = uv - refractDir * refractMag;
    vec2 uvB = uv - refractDir * (refractMag - chrEdge);

    /* frosted glass blur inside the lens */
    float blur = uBlurAmount * mask;
    float r = frostedSample(uTexture, uvR, blur).r;
    float g = frostedSample(uTexture, uvG, blur).g;
    float b = frostedSample(uTexture, uvB, blur).b;
    vec3 refracted = vec3(r, g, b);

    /* --- noise texture inside glass --- */
    float noise = snoise(centeredUv * 30.0 + uTime * 0.5) * 0.5 + 0.5;
    float fineNoise = snoise(centeredUv * 80.0 - uTime * 0.3) * 0.5 + 0.5;
    float combinedNoise = mix(noise, fineNoise, 0.4);
    refracted += combinedNoise * uNoiseStrength * mask * 0.4;

    /* --- glass rim highlight (Fresnel-like) --- */
    float rim = smoothstep(radius * 0.5, radius, dist);
    float highlight = pow(rim, 2.0) * mask;

    /* Orange and purple premium glow */
    vec3 orangeGlow = vec3(1.0, 0.45, 0.1) * highlight * 0.6;
    vec3 purpleGlow = vec3(0.55, 0.2, 1.0) * highlight * 0.5;
    float glowAngle = atan(dir.y, dir.x);
    float glowMix = sin(glowAngle * 1.0 + uTime * 0.5) * 0.5 + 0.5;
    vec3 rimGlow = mix(orangeGlow, purpleGlow, glowMix);

    /* soft glass specular highlight */
    vec2 lightDir = normalize(vec2(0.4, 0.6));
    float specAngle = dot(dir, lightDir);
    float specular = pow(max(specAngle, 0.0), 16.0) * mask * 0.4;
    vec3 specColor = vec3(1.0, 0.98, 0.95) * specular;

    /* inner glass tint — slight cool bias */
    vec3 glassTint = vec3(0.94, 0.96, 1.0);
    refracted *= mix(vec3(1.0), glassTint, mask * 0.2);

    /* --- composite --- */
    vec3 lensColor = refracted + rimGlow + specColor;

    /* subtle brightness lift inside lens */
    lensColor *= 1.0 + mask * 0.1;

    /* edge darkening for depth */
    float innerShadow = smoothstep(radius * 0.8, radius, dist) * mask * 0.2;
    lensColor -= vec3(innerShadow);

    /* ── Output with alpha = mask so only the lens area is visible ── */
    gl_FragColor = vec4(lensColor, mask);
  }
`;
