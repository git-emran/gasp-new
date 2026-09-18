"use client";

import React, { useEffect, useRef } from "react";

const VERTEX_SHADER = `#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_objectUV;

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) {
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) {
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  vec2 objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / objectBoxSize;

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec4 u_colors[10];
uniform float u_colorsCount;

uniform float u_distortion;
uniform float u_swirl;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_objectUV;
out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float hash21(vec2 p) {
  p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
  p += dot(p, p + 19.19);
  return fract(p.x * p.y);
}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float noise(vec2 n, vec2 seedOffset) {
  return valueNoise(n + seedOffset);
}

vec2 getPosition(int i, float t) {
  float a = float(i) * .37;
  float b = .6 + fract(float(i) / 3.) * .9;
  float c = .8 + fract(float(i + 1) / 4.);

  float x = sin(t * b + a);
  float y = cos(t * c + a * 1.5);

  return .5 + .5 * vec2(x, y);
}

void main() {
  vec2 uv = v_objectUV;
  uv += .5;
  vec2 grainUV = uv * 1000.;

  float grain = noise(grainUV, vec2(0.));
  float mixerGrain = .4 * u_grainMixer * (grain - .5);

  const float firstFrameOffset = 41.5;
  float t = .5 * (u_time + firstFrameOffset);

  float radius = smoothstep(0., 1., length(uv - .5));
  float center = 1. - radius;
  for (float i = 1.; i <= 2.; i++) {
    uv.x += u_distortion * center / i * sin(t + i * .4 * smoothstep(.0, 1., uv.y)) * cos(.2 * t + i * 2.4 * smoothstep(.0, 1., uv.y));
    uv.y += u_distortion * center / i * cos(t + i * 2. * smoothstep(.0, 1., uv.x));
  }

  vec2 uvRotated = uv;
  uvRotated -= vec2(.5);
  float angle = 3. * u_swirl * radius;
  uvRotated = rotate(uvRotated, -angle);
  uvRotated += vec2(.5);

  vec3 color = vec3(0.);
  float opacity = 0.;
  float totalWeight = 0.;

  for (int i = 0; i < 10; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 pos = getPosition(i, t) + mixerGrain;
    vec3 colorFraction = u_colors[i].rgb * u_colors[i].a;
    float opacityFraction = u_colors[i].a;

    float dist = length(uvRotated - pos);

    dist = pow(dist, 3.5);
    float weight = 1. / (dist + 1e-3);
    color += colorFraction * weight;
    opacity += opacityFraction * weight;
    totalWeight += weight;
  }

  color /= max(1e-4, totalWeight);
  opacity /= max(1e-4, totalWeight);

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  color = mix(color, grainOverlayColor, .35 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`;

function hexToHsl(hex) {
  const cleanHex = hex.replace("#", "");
  const [r, g, b] = (
    cleanHex.length === 3
      ? cleanHex.split("").map((c) => c + c)
      : [cleanHex.slice(0, 2), cleanHex.slice(2, 4), cleanHex.slice(4, 6)]
  ).map((c) => parseInt(c, 16) / 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h =
      max === r
        ? (g - b) / d + (g < b ? 6 : 0)
        : max === g
        ? (b - r) / d + 2
        : (r - g) / d + 4;
    h /= 6;
  }
  return [360 * h, 100 * s, 100 * l];
}

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s = clamp(s, 0, 100) / 100;
  l = clamp(l, 0, 100) / 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    Math.round(
      255 *
        (l -
          a *
            Math.max(
              -1,
              Math.min(k(n) - 3, Math.min(9 - k(n), 1))
            ))
    );
  return `#${[f(0), f(8), f(4)]
    .map((c) => c.toString(16).padStart(2, "0"))
    .join("")}`;
}

function generatePalette(tintHex, bgHex = "#ffffff") {
  let [h, s, l] = hexToHsl(tintHex);
  s = Math.max(s, 38);
  l = clamp(l, 42, 62);
  return [
    bgHex,
    hslToHex(h, s + 8, Math.min(l + 20, 82)),
    hslToHex(h + 38, s, Math.min(l + 28, 86)),
    hslToHex(h - 28, s - 8, Math.min(l + 34, 88)),
  ];
}

function hexToRgbaArray(hex) {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c
      .split("")
      .map((x) => x + x)
      .join("");
  }
  if (c.length === 6) {
    c += "ff";
  }
  return [
    parseInt(c.slice(0, 2), 16) / 255,
    parseInt(c.slice(2, 4), 16) / 255,
    parseInt(c.slice(4, 6), 16) / 255,
    parseInt(c.slice(6, 8), 16) / 255,
  ];
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function LamaBackgroundShader({
  tint = "#cc785c",
  themeBg = "#ffffff",
  distortion = 0.8,
  swirl = 0.2,
  speed = 0.25,
  grainMixer = 0.15,
  grainOverlay = 0.08,
  minPixelRatio = 1,
  maxPixelCount = 1500000,
}) {
  const containerRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const uniformsRef = useRef({});
  const rafIdRef = useRef(null);
  const currentFrameRef = useRef(0);
  const lastRenderTimeRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.display = "block";
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    container.appendChild(canvas);

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });

    if (!gl) {
      console.warn("WebGL2 not supported");
      return;
    }

    glRef.current = gl;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    programRef.current = program;

    // Quad geometry
    const posAttr = gl.getAttribLocation(program, "a_position");
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uLocs = {
      u_time: gl.getUniformLocation(program, "u_time"),
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_pixelRatio: gl.getUniformLocation(program, "u_pixelRatio"),
      u_originX: gl.getUniformLocation(program, "u_originX"),
      u_originY: gl.getUniformLocation(program, "u_originY"),
      u_worldWidth: gl.getUniformLocation(program, "u_worldWidth"),
      u_worldHeight: gl.getUniformLocation(program, "u_worldHeight"),
      u_fit: gl.getUniformLocation(program, "u_fit"),
      u_scale: gl.getUniformLocation(program, "u_scale"),
      u_rotation: gl.getUniformLocation(program, "u_rotation"),
      u_offsetX: gl.getUniformLocation(program, "u_offsetX"),
      u_offsetY: gl.getUniformLocation(program, "u_offsetY"),
      u_distortion: gl.getUniformLocation(program, "u_distortion"),
      u_swirl: gl.getUniformLocation(program, "u_swirl"),
      u_grainMixer: gl.getUniformLocation(program, "u_grainMixer"),
      u_grainOverlay: gl.getUniformLocation(program, "u_grainOverlay"),
      u_colors: gl.getUniformLocation(program, "u_colors"),
      u_colorsCount: gl.getUniformLocation(program, "u_colorsCount"),
    };
    uniformsRef.current = uLocs;

    const handleResize = () => {
      if (!canvas || !gl) return;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const pr = Math.max(dpr, minPixelRatio);

      let w = Math.round(width * pr);
      let h = Math.round(height * pr);

      const maxPixels = maxPixelCount || 1500000;
      const curPixels = w * h;
      if (curPixels > maxPixels) {
        const scale = Math.sqrt(maxPixels / curPixels);
        w = Math.round(w * scale);
        h = Math.round(h * scale);
      }

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener("resize", handleResize);

    const render = (time) => {
      if (!glRef.current || !programRef.current) return;
      const delta = time - (lastRenderTimeRef.current || time);
      lastRenderTimeRef.current = time;

      currentFrameRef.current += delta * speed;

      gl.useProgram(program);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Set uniforms
      gl.uniform1f(uLocs.u_time, currentFrameRef.current * 0.001);
      gl.uniform2f(uLocs.u_resolution, canvas.width, canvas.height);
      gl.uniform1f(uLocs.u_pixelRatio, 1.0);
      gl.uniform1f(uLocs.u_originX, 0.5);
      gl.uniform1f(uLocs.u_originY, 0.5);
      gl.uniform1f(uLocs.u_worldWidth, 0);
      gl.uniform1f(uLocs.u_worldHeight, 0);
      gl.uniform1f(uLocs.u_fit, 0);
      gl.uniform1f(uLocs.u_scale, 1);
      gl.uniform1f(uLocs.u_rotation, 0);
      gl.uniform1f(uLocs.u_offsetX, 0);
      gl.uniform1f(uLocs.u_offsetY, 0);

      gl.uniform1f(uLocs.u_distortion, distortion);
      gl.uniform1f(uLocs.u_swirl, swirl);
      gl.uniform1f(uLocs.u_grainMixer, grainMixer);
      gl.uniform1f(uLocs.u_grainOverlay, grainOverlay);

      const palette = generatePalette(tint, themeBg);
      const colorVectors = palette.flatMap((hex) => hexToRgbaArray(hex));
      gl.uniform4fv(uLocs.u_colors, new Float32Array(colorVectors));
      gl.uniform1f(uLocs.u_colorsCount, palette.length);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafIdRef.current = requestAnimationFrame(render);
    };

    lastRenderTimeRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(render);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      if (gl) {
        if (posBuffer) gl.deleteBuffer(posBuffer);
        if (program) gl.deleteProgram(program);
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
      }
      canvas.remove();
    };
  }, [tint, themeBg, distortion, swirl, speed, grainMixer, grainOverlay, minPixelRatio, maxPixelCount]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    />
  );
}
