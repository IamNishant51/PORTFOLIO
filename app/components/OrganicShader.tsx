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

in vec2 v_uv;
out vec4 outColor;

// Simplex-like noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * 7.0 * (1.0 / 49.0));
  vec4 x_ = floor(j * 7.0);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  vec3 f = vec3(1.0);
  for (int i = 0; i < 4; i++) {
    v += a * snoise(p * f);
    f *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_res.x / max(u_res.y, 1.0);

  vec2 pos = uv;
  pos.x *= aspect;

  vec2 mouse = u_mouse;
  mouse.x *= aspect;

  float t = u_time;

  // Layer 1 — large sweeping organic form
  float shape1 = fbm(vec3(pos * 1.8 + vec2(t * 0.06, t * 0.04), t * 0.08));

  // Layer 2 — secondary smaller form, drifts differently
  float shape2 = fbm(vec3(pos * 3.0 - vec2(t * 0.04, t * 0.06) + 5.0, t * 0.05 + 10.0));

  // Layer 3 — detail/erosion noise
  float detail = fbm(vec3(pos * 6.0 + vec2(t * 0.02, -t * 0.03), t * 0.03 + 20.0));

  // Mouse attraction — shape shifts toward cursor
  float dist = distance(pos, mouse);
  float mouseInfluence = exp(-dist * 3.0) * 0.25;
  vec2 mouseDir = normalize(pos - mouse + 0.001);
  pos += mouseDir * mouseInfluence;

  // Recalculate with mouse influence
  float shapeM = fbm(vec3(pos * 1.8 + vec2(t * 0.06, t * 0.04), t * 0.08));

  // Combine shapes: subtractive blend — black eats into white
  float combined = shapeM * 0.6 + shape2 * 0.3 + detail * 0.1;

  // Threshold to create stark black/white shapes
  float alpha = smoothstep(0.25, 0.65, combined);

  // Mirror vertically so shapes feel anchored
  float mirror = smoothstep(0.25, 0.65, fbm(vec3(vec2(uv.x, 1.0 - uv.y) * 2.2 + vec2(t * 0.05, -t * 0.03), t * 0.06 + 30.0)));
  alpha = max(alpha, mirror * 0.5);

  // Grain texture over the shapes
  float grain = snoise(vec3(uv * 180.0, t * 0.02));
  grain = grain * 0.12 + 0.88;

  // Edge erosion: subtle roughness on shape borders
  float edgeNoise = snoise(vec3(uv * 40.0 + vec2(t * 0.01), t * 0.01));
  float edge = smoothstep(0.3, 0.7, abs(combined - 0.45) * 5.0);
  edge *= edgeNoise * 0.06;

  vec3 color = mix(vec3(0.0), vec3(1.0), alpha);
  color *= grain;
  color -= edge;

  // Scroll-driven reveal: shapes fade in from bottom
  float scrollReveal = smoothstep(0.0, 0.4, uv.y - u_scroll * 0.6);
  color = mix(vec3(1.0), color, scrollReveal);

  outColor = vec4(color, 1.0);
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

export default function OrganicShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseTargetRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    let uRes: WebGLUniformLocation | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uMouse: WebGLUniformLocation | null = null;
    let uScroll: WebGLUniformLocation | null = null;

    try {
      program = createProgram(gl, VERT, FRAG);
      gl.useProgram(program);

      vao = gl.createVertexArray();
      gl.bindVertexArray(vao);

      const posLoc = gl.getAttribLocation(program, "a_pos");
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);

      const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
      gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      uRes = gl.getUniformLocation(program, "u_res");
      uTime = gl.getUniformLocation(program, "u_time");
      uMouse = gl.getUniformLocation(program, "u_mouse");
      uScroll = gl.getUniformLocation(program, "u_scroll");

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
        mouseRef.current.x += (mouseTargetRef.current.x - mouseRef.current.x) * 0.06;
        mouseRef.current.y += (mouseTargetRef.current.y - mouseRef.current.y) * 0.06;

        gl.useProgram(program);
        gl.bindVertexArray(vao);

        gl.uniform1f(uTime, prefersReducedMotion ? 0 : t * 0.001);
        gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
        gl.uniform1f(uScroll, updateScroll());

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        if (!prefersReducedMotion) {
          rafRef.current = requestAnimationFrame(render);
        }
      };

      rafRef.current = requestAnimationFrame(render);

      if (prefersReducedMotion) {
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
      return;
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    />
  );
}
