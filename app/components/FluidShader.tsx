"use client";

import { useEffect, useRef } from "react";

/* ─── Vertex ─────────────────────────────────────────────────────────── */
const VERT = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = (a_pos + 1.0) * 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

/* ─── Fragment ───────────────────────────────────────────────────────── */
const FRAG = `#version 300 es
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;
uniform float u_scroll;

in  vec2 v_uv;
out vec4 outColor;

/* ── Noise helpers ── */
vec3 mod289v3(vec3 x){ return x - floor(x*(1./289.))*289.; }
vec4 mod289v4(vec4 x){ return x - floor(x*(1./289.))*289.; }
vec4 permute(vec4 x){ return mod289v4(((x*34.)+1.)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }

float snoise(vec3 v){
  const vec2 C = vec2(1./6., 1./3.);
  const vec4 D = vec4(0., .5, 1., 2.);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g  = step(x0.yzx, x0.xyz);
  vec3 l  = 1. - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289v3(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0., i1.z, i2.z, 1.))
    + i.y + vec4(0., i1.y, i2.y, 1.))
    + i.x + vec4(0., i1.x, i2.x, 1.));
  float n_ = .142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4  j  = p - 49.*floor(p*7.*(1./49.));
  vec4  x_ = floor(j*7.);
  vec4  y_ = floor(j - 7.*x_);
  vec4  x  = x_*ns.x + ns.yyyy;
  vec4  y  = y_*ns.x + ns.yyyy;
  vec4  h  = 1. - abs(x) - abs(y);
  vec4  b0 = vec4(x.xy, y.xy);
  vec4  b1 = vec4(x.zw, y.zw);
  vec4  s0 = floor(b0)*2.+1.;
  vec4  s1 = floor(b1)*2.+1.;
  vec4  sh = -step(h, vec4(0.));
  vec4  a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4  a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3  p0 = vec3(a0.xy, h.x);
  vec3  p1 = vec3(a0.zw, h.y);
  vec3  p2 = vec3(a1.xy, h.z);
  vec3  p3 = vec3(a1.zw, h.w);
  vec4  norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.);
  m = m*m;
  return 42.*dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

float fbm(vec3 p, int oct){
  float v=0., a=.5;
  for(int i=0;i<oct;i++){
    v += a*snoise(p);
    p *= 2.02;
    a *= .48;
  }
  return v;
}

/* ── Domain-warped fluid ── */
vec2 warp(vec2 p, float t){
  float q1 = fbm(vec3(p, t*.3), 4);
  float q2 = fbm(vec3(p + vec2(5.2, 1.3), t*.3), 4);
  vec2  q  = vec2(q1, q2);
  float r1 = fbm(vec3(p + 4.*q + vec2(1.7, 9.2), t*.25), 4);
  float r2 = fbm(vec3(p + 4.*q + vec2(8.3, 2.8), t*.25), 4);
  return vec2(r1, r2);
}

/* ── Chromatic aberration ── */
vec3 chromaShift(vec2 uv, float strength, float t){
  vec2 dir = uv - .5;
  float len = length(dir);
  vec2 offset = normalize(dir + .001) * len * strength;
  float r = fbm(vec3(uv + offset*1.2, t*.1), 3);
  float g = fbm(vec3(uv,              t*.1), 3);
  float b = fbm(vec3(uv - offset*.8,  t*.1), 3);
  return vec3(r, g, b);
}

void main(){
  vec2 uv = v_uv;
  float aspect = u_res.x / max(u_res.y, 1.);
  vec2 p = uv;
  p.x *= aspect;

  float t = u_time * .18;

  /* Mouse ripple */
  vec2 mouse = u_mouse;
  mouse.x *= aspect;
  float mdist = distance(p, mouse);
  float ripple = exp(-mdist * 5.) * .18;
  vec2 mdir = normalize(p - mouse + .001);
  p += mdir * ripple;

  /* Domain warp */
  vec2 w = warp(p * 1.4, t);
  vec2 warped = p + .35 * w;

  /* Fluid field value */
  float field = fbm(vec3(warped * 1.6, t), 5);

  /* Chromatic aberration on the field */
  vec3 chroma = chromaShift(uv + w * .04, .012, t);

  /* ── Color mapping ── */
  /* Base: deep void */
  vec3 colVoid   = vec3(.039, .039, .059);   /* #0A0A0F */
  /* Mid: electric blue */
  vec3 colBlue   = vec3(.145, .388, .933);   /* #2563eb */
  /* Peak: frost white */
  vec3 colFrost  = vec3(.941, .929, .902);   /* #F0EDE6 */
  /* Cream highlight */
  vec3 colCream  = vec3(.941, .929, .902);   /* #F0EDE6 */

  float f = field * .5 + .5;  /* remap [-1,1] → [0,1] */

  /* Layered gradient */
  vec3 col = colVoid;
  col = mix(col, colBlue,   smoothstep(.30, .55, f));
  col = mix(col, colFrost,  smoothstep(.55, .72, f));
  col = mix(col, colCream,  smoothstep(.72, .88, f) * .4);

  /* Apply chromatic aberration tint */
  col.r += chroma.r * .06;
  col.b += chroma.b * .04;

  /* Grain */
  float grain = snoise(vec3(uv * 220., t * .05)) * .04;
  col += grain;

  /* Scroll fade — top of page is full, fades as you scroll */
  float scrollFade = 1. - smoothstep(0., .6, u_scroll);
  col = mix(colVoid, col, scrollFade);

  /* Vignette */
  float vig = 1. - smoothstep(.4, 1.2, length((uv - .5) * vec2(aspect, 1.)));
  col *= mix(.55, 1., vig);

  outColor = vec4(col, 1.);
}`;

/* ─── WebGL helpers ─────────────────────────────────────────────────── */
function compileShader(gl: WebGL2RenderingContext, type: number, src: string) {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(s);
        gl.deleteShader(s);
        throw new Error(info ?? "Shader compile failed");
    }
    return s;
}

function createProgram(gl: WebGL2RenderingContext, vs: string, fs: string) {
    const v = compileShader(gl, gl.VERTEX_SHADER, vs);
    const f = compileShader(gl, gl.FRAGMENT_SHADER, fs);
    const p = gl.createProgram()!;
    gl.attachShader(p, v);
    gl.attachShader(p, f);
    gl.linkProgram(p);
    gl.deleteShader(v);
    gl.deleteShader(f);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(p);
        gl.deleteProgram(p);
        throw new Error(info ?? "Program link failed");
    }
    return p;
}

/* ─── Component ─────────────────────────────────────────────────────── */
export default function FluidShader({ className = "" }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number | null>(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const targetRef = useRef({ x: 0.5, y: 0.5 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const gl = canvas.getContext("webgl2", {
            alpha: false,
            antialias: false,
            depth: false,
            stencil: false,
            premultipliedAlpha: false,
            preserveDrawingBuffer: false,
        });
        if (!gl) return;

        let prog: WebGLProgram;

        try {
            prog = createProgram(gl, VERT, FRAG);
        } catch (e) {
            console.warn("FluidShader compile error:", e);
            return;
        }

        gl.useProgram(prog);
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const posLoc = gl.getAttribLocation(prog, "a_pos");
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        const uRes = gl.getUniformLocation(prog, "u_res");
        const uTime = gl.getUniformLocation(prog, "u_time");
        const uMouse = gl.getUniformLocation(prog, "u_mouse");
        const uScroll = gl.getUniformLocation(prog, "u_scroll");

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

        const getScroll = () => {
            const doc = document.documentElement;
            return doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight);
        };

        const onPointerMove = (e: PointerEvent) => {
            targetRef.current = {
                x: e.clientX / window.innerWidth,
                y: 1 - e.clientY / window.innerHeight,
            };
        };

        window.addEventListener("resize", resize, { passive: true });
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        resize();

        const render = (t: number) => {
            /* Smooth mouse lerp */
            mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.05;
            mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.05;

            gl.useProgram(prog);
            gl.bindVertexArray(vao);
            gl.uniform1f(uTime, prefersReducedMotion ? 0 : t * 0.001);
            gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
            gl.uniform1f(uScroll, getScroll());
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            if (!prefersReducedMotion) {
                rafRef.current = requestAnimationFrame(render);
            }
        };

        rafRef.current = requestAnimationFrame(render);
        if (prefersReducedMotion) render(0);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", onPointerMove);
            if (vao) gl.deleteVertexArray(vao);
            gl.deleteProgram(prog);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ willChange: "transform" }}
            aria-hidden="true"
        />
    );
}
