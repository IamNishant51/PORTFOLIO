"use client";

import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = (a_pos + 1.0) * 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scroll;
uniform float u_seed;

in vec2 v_uv;
out vec4 outColor;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash12(i);
  float b = hash12(i + vec2(1.0, 0.0));
  float c = hash12(i + vec2(0.0, 1.0));
  float d = hash12(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.55;
  mat2 m = mat2(1.6, -1.2, 1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.55;
  }
  return v;
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_res.x / max(u_res.y, 1.0);

  // Cursor distortion lives in a slightly "stretched" space so it feels physical.
  vec2 p = uv;
  p.x *= aspect;
  vec2 m = u_mouse;
  m.x *= aspect;

  float d = length(p - m);
  float cursorInfluence = exp(-d * 7.0);

  // Subtle warp field (domain distortion) — makes it feel hand-made, not a static noise.
  vec2 warp = vec2(
    fbm(p * 2.5 + vec2(u_time * 0.12, 0.0) + u_seed),
    fbm(p * 2.5 + vec2(0.0, -u_time * 0.10) - u_seed)
  );
  uv += (warp - 0.5) * (0.014 + 0.01 * cursorInfluence) * (0.35 + 0.65 * cursorInfluence);

  // Scroll drift (very small) — makes the paper "breathe" with the page.
  uv.y += (u_scroll - 0.5) * 0.03;

  // Paper base: tiny luminance variation
  float grain = fbm(uv * vec2(260.0, 180.0) + u_seed * 2.0);

  // Fibers: thin directional streaks at 2 scales
  float fiber1 = fbm(vec2(uv.x * 18.0, uv.y * 240.0) + vec2(u_seed, 0.0));
  float fiber2 = fbm(vec2(uv.x * 42.0, uv.y * 520.0) - vec2(0.0, u_seed));
  float fibers = (smoothstep(0.62, 0.95, fiber1) * 0.6 + smoothstep(0.65, 0.96, fiber2) * 0.4);

  // Micro specks
  float speck = step(0.996, hash12(uv * u_res + u_seed * 999.0));

  vec3 col = vec3(0.0);
  col += grain * 0.11;
  col += fibers * 0.10;
  col += speck * 0.20;

  // Cursor bloom (very soft lighting on hover)
  col += cursorInfluence * 0.015;

  outColor = vec4(col, 1.0);
}
`;

function compileShader(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Failed to create shader");
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(info || "Shader compile failed");
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext, vsSrc: string, fsSrc: string) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSrc);
  const program = gl.createProgram();
  if (!program) throw new Error("Failed to create program");
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(info || "Program link failed");
  }
  return program;
}

export default function PaperTexture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseTargetRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
    });

    if (!gl) return;

    let program: WebGLProgram | null = null;
    let vao: WebGLVertexArrayObject | null = null;

    // Uniforms
    let uRes: WebGLUniformLocation | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uMouse: WebGLUniformLocation | null = null;
    let uScroll: WebGLUniformLocation | null = null;
    let uSeed: WebGLUniformLocation | null = null;

    const seed = Math.random() * 1000;

    try {
      program = createProgram(gl, VERT, FRAG);
      gl.useProgram(program);

      vao = gl.createVertexArray();
      gl.bindVertexArray(vao);

      const posLoc = gl.getAttribLocation(program, "a_pos");
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);

      // Fullscreen triangle strip (2 triangles)
      const verts = new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        1, 1,
      ]);
      gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      uRes = gl.getUniformLocation(program, "u_res");
      uTime = gl.getUniformLocation(program, "u_time");
      uMouse = gl.getUniformLocation(program, "u_mouse");
      uScroll = gl.getUniformLocation(program, "u_scroll");
      uSeed = gl.getUniformLocation(program, "u_seed");

      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.CULL_FACE);

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.floor(window.innerWidth * dpr);
        const h = Math.floor(window.innerHeight * dpr);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          canvas.style.width = `${window.innerWidth}px`;
          canvas.style.height = `${window.innerHeight}px`;
          gl.viewport(0, 0, w, h);
        }
        gl.uniform2f(uRes, canvas.width, canvas.height);
      };

      const updateScroll = () => {
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
        return doc.scrollTop / max;
      };

      const onPointerMove = (e: PointerEvent) => {
        mouseTargetRef.current = {
          x: e.clientX / window.innerWidth,
          y: 1.0 - e.clientY / window.innerHeight,
        };
      };

      window.addEventListener("resize", resize, { passive: true });
      window.addEventListener("pointermove", onPointerMove, { passive: true });

      resize();

      const render = (t: number) => {
        // Ease mouse to remove robotic feeling
        mouseRef.current.x +=
          (mouseTargetRef.current.x - mouseRef.current.x) * 0.08;
        mouseRef.current.y +=
          (mouseTargetRef.current.y - mouseRef.current.y) * 0.08;

        gl.useProgram(program);
        gl.bindVertexArray(vao);

        gl.uniform1f(uTime, prefersReducedMotion ? 0 : t * 0.001);
        gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
        gl.uniform1f(uScroll, updateScroll());
        gl.uniform1f(uSeed, seed);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        if (!prefersReducedMotion) {
          rafRef.current = requestAnimationFrame(render);
        }
      };

      rafRef.current = requestAnimationFrame(render);

      if (prefersReducedMotion) {
        // One-and-done render
        render(0);
      }

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointerMove);
        if (vao) gl.deleteVertexArray(vao);
        if (program) gl.deleteProgram(program);
      };
    } catch {
      // If shaders fail, silently fall back to plain white.
      return;
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99]"
      style={{ willChange: "transform", mixBlendMode: "screen", opacity: 0.22 }}
      aria-hidden="true"
    />
  );
}
