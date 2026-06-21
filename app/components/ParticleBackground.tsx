"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const N = 6000;
const STARS = 2500;
const S = 2.2; // global scale multiplier — makes everything fill the screen

function eio(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// H = vertical screen half-height in world units (camera z=11, FOV 75° vertical)
const H = 11 * Math.tan((75 / 2) * Math.PI / 180); // ≈ 8.44

// Fill a Float32Array slice with a 4-edge border halo of Gaussian dust clouds.
// Each edge gets n/4 particles, centered just off-screen, fading inward.
function fillBorderDust(p: Float32Array, offset: number, n: number, W: number) {
  const perEdge = Math.floor(n / 4);
  for (let i = 0; i < n; i++) {
    const edge = Math.min(Math.floor(i / perEdge), 3); // 0=L 1=R 2=T 3=B
    const u1 = Math.max(Math.random(), 1e-7);
    const u2 = Math.random();
    const mag = Math.sqrt(-2 * Math.log(u1));
    const g1 = mag * Math.cos(2 * Math.PI * u2);
    const g2 = mag * Math.sin(2 * Math.PI * u2);
    let x = 0, y = 0;
    if (edge === 0) { x = -(W * 0.92) + g1 * (W * 0.26); y = g2 * H * 0.80; }
    if (edge === 1) { x =  (W * 0.92) + g1 * (W * 0.26); y = g2 * H * 0.80; }
    if (edge === 2) { x = g1 * W * 0.80; y =  (H * 0.92) + g2 * (H * 0.26); }
    if (edge === 3) { x = g1 * W * 0.80; y = -(H * 0.92) + g2 * (H * 0.26); }
    p[(offset + i)*3]     = x;
    p[(offset + i)*3 + 1] = y;
    p[(offset + i)*3 + 2] = (Math.random() - .5) * 1.0;
  }
}

// ─── Shape builders (all coords multiplied by S) ──────────────────────────

function buildHourglass(n: number, W: number): Float32Array {
  const p = new Float32Array(n * 3);
  const mainN  = Math.floor(n * 0.62);
  const wingN  = n - mainN;

  // ── Central hourglass ──────────────────────────────────────
  for (let i = 0; i < mainN; i++) {
    const t = i / mainN;
    const y = (t - 0.5) * 9 * S;
    const pinch = Math.abs(y / (4.5 * S));
    const r = (0.15 + pinch * 2.8) * S;
    const theta = t * Math.PI * 60;
    const jit = (Math.random() - .5) * .3 * S;
    p[i*3]   = Math.cos(theta) * (r + jit);
    p[i*3+1] = y + (Math.random() - .5) * .2 * S;
    p[i*3+2] = Math.sin(theta) * (r + jit);
  }

  // ── Border dust halo: all 4 screen edges ──────────────────────
  fillBorderDust(p, mainN, wingN, W);
  return p;
}

function buildDNA(n: number, W: number): Float32Array {
  const p = new Float32Array(n * 3);
  const mainN = Math.floor(n * 0.62);
  const wingN = n - mainN;

  // ── Central helix ──────────────────────────────────────────
  const half = Math.floor(mainN / 2);
  for (let i = 0; i < mainN; i++) {
    const s2  = i >= half;
    const idx = s2 ? i - half : i;
    const t   = idx / half;
    const y   = (t - 0.5) * 9 * S;
    const twist = t * Math.PI * 7;
    const off = s2 ? Math.PI : 0;
    const r   = (1.6 + (Math.random() - .5) * .1) * S;
    p[i*3]   = Math.cos(twist + off) * r;
    p[i*3+1] = y + (Math.random() - .5) * .06 * S;
    p[i*3+2] = Math.sin(twist + off) * r;
  }

  // ── Border dust halo: all 4 screen edges ──────────────────────
  fillBorderDust(p, mainN, wingN, W);
  return p;
}

function buildNeuralNetwork(n: number, W: number): Float32Array {
  const p = new Float32Array(n * 3);
  const mainN = Math.floor(n * 0.60);
  const wingN = n - mainN;

  // ── Central network ────────────────────────────────────────
  const nodeCount = 28;
  const nodes: [number, number, number][] = [];
  for (let i = 0; i < nodeCount; i++) {
    const phi   = Math.acos(1 - 2 * (i + .5) / nodeCount);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r     = (1.8 + (i % 4) * .55) * S;
    nodes.push([
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi) * .65,
      r * Math.sin(phi) * Math.sin(theta) * .4,
    ]);
  }
  const edges: [number, number][] = [];
  const threshold = 3.4 * S;
  for (let a = 0; a < nodeCount; a++) {
    for (let b = a + 1; b < nodeCount; b++) {
      const dx = nodes[a][0]-nodes[b][0], dy = nodes[a][1]-nodes[b][1], dz = nodes[a][2]-nodes[b][2];
      if (Math.sqrt(dx*dx+dy*dy+dz*dz) < threshold) edges.push([a, b]);
    }
  }
  const nodeP = Math.floor(mainN * .3);
  for (let i = 0; i < nodeP; i++) {
    const nd = nodes[i % nodeCount];
    const r = Math.random() * .15 * S;
    const th = Math.random()*Math.PI*2, ph = Math.acos(2*Math.random()-1);
    p[i*3]   = nd[0] + r*Math.sin(ph)*Math.cos(th);
    p[i*3+1] = nd[1] + r*Math.sin(ph)*Math.sin(th);
    p[i*3+2] = nd[2] + r*Math.cos(ph);
  }
  for (let i = nodeP; i < mainN; i++) {
    const [a, b] = edges[(i - nodeP) % edges.length];
    const t = Math.random();
    p[i*3]   = nodes[a][0] + (nodes[b][0]-nodes[a][0])*t + (Math.random()-.5)*.04*S;
    p[i*3+1] = nodes[a][1] + (nodes[b][1]-nodes[a][1])*t + (Math.random()-.5)*.04*S;
    p[i*3+2] = nodes[a][2] + (nodes[b][2]-nodes[a][2])*t + (Math.random()-.5)*.04*S;
  }

  // ── Border dust halo: all 4 screen edges ──────────────────────
  fillBorderDust(p, mainN, wingN, W);
  return p;
}

function buildGalaxy(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  const arms = 4;
  for (let i = 0; i < n; i++) {
    const arm = i % arms;
    const t   = i / n;
    const r   = (0.3 + Math.pow(t, .55) * 5.5) * S;
    const armAngle = (arm / arms) * Math.PI * 2;
    const spiral   = Math.log(r / S + 1) * 2.2;
    const scatter  = (Math.random() - .5) * r * .22;
    const angle    = armAngle + spiral + (Math.random() - .5) * .2;
    p[i*3]   = Math.cos(angle) * r + scatter;
    p[i*3+1] = (Math.random() - .5) * .25 * S * (1 - t * .6);
    p[i*3+2] = Math.sin(angle) * r + scatter;
  }
  return p;
}

function buildAtom(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  const nucleusN = Math.floor(n * .07);
  for (let i = 0; i < nucleusN; i++) {
    const r = Math.random() * .35 * S;
    const th = Math.random()*Math.PI*2, ph = Math.acos(2*Math.random()-1);
    p[i*3]   = r*Math.sin(ph)*Math.cos(th);
    p[i*3+1] = r*Math.sin(ph)*Math.sin(th);
    p[i*3+2] = r*Math.cos(ph);
  }
  const orbitals = [
    { r: 1.8*S, tiltX: 0,             tiltZ: 0 },
    { r: 2.7*S, tiltX: Math.PI/3,     tiltZ: 0 },
    { r: 3.5*S, tiltX: Math.PI*2/3,   tiltZ: Math.PI/5 },
    { r: 4.2*S, tiltX: Math.PI/4,     tiltZ: Math.PI/2 },
  ];
  const perOrbit = Math.floor((n - nucleusN) / orbitals.length);
  orbitals.forEach((orb, oi) => {
    const start = nucleusN + oi * perOrbit;
    const end   = oi === orbitals.length - 1 ? n : start + perOrbit;
    for (let i = start; i < end; i++) {
      const t = (i - start) / (end - start);
      const angle = t * Math.PI * 2;
      const jit   = (Math.random() - .5) * .07 * S;
      let x = Math.cos(angle) * (orb.r + jit);
      let y = Math.sin(angle) * (orb.r + jit);
      let z = (Math.random() - .5) * .06 * S;
      const cx = Math.cos(orb.tiltX), sx = Math.sin(orb.tiltX);
      const y2 = y*cx - z*sx, z2 = y*sx + z*cx;
      const cz = Math.cos(orb.tiltZ), sz = Math.sin(orb.tiltZ);
      p[i*3]   = x*cz - y2*sz;
      p[i*3+1] = x*sz + y2*cz;
      p[i*3+2] = z2;
    }
  });
  return p;
}

function buildStardust(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r  = (1.5 + Math.pow(Math.random(), .4) * 7) * S;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    p[i*3]   = r*Math.sin(ph)*Math.cos(th);
    p[i*3+1] = r*Math.sin(ph)*Math.sin(th) * .6;
    p[i*3+2] = r*Math.cos(ph) * .5;
  }
  return p;
}

// ─── Palettes: [color A (r,g,b), color B (r,g,b)] per shape ───────────────
const PALETTES: [number,number,number,number,number,number][] = [
  [0.1,  0.55, 1.0,  0.75, 0.9,  1.0 ],  // Hourglass  – electric blue / white-blue
  [0.1,  0.7,  1.0,  0.9,  0.95, 1.0 ],  // DNA        – blue / icy white
  [0.0,  0.95, 0.8,  0.5,  1.0,  0.85],  // Neural     – teal / mint
  [1.0,  0.82, 0.2,  1.0,  1.0,  0.65],  // Galaxy     – gold / warm white
  [0.15, 0.55, 1.0,  0.4,  0.85, 1.0 ],  // Atom       – cobalt / sky
  [0.65, 0.82, 1.0,  1.0,  1.0,  1.0 ],  // Stardust   – soft blue / white
];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    // Wider FOV + pulled further back = shapes fill more of the screen
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 300);
    camera.position.set(0, 0, 11);

    // Stars — spread very wide
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(STARS * 3);
    for (let i = 0; i < STARS; i++) {
      starPos[i*3]   = (Math.random() - .5) * 150;
      starPos[i*3+1] = (Math.random() - .5) * 150;
      starPos[i*3+2] = (Math.random() - .5) * 150 - 30;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: 0xffffff, size: 0.09, transparent: true, opacity: 0.4, sizeAttenuation: true,
    })));

    // W = screen half-width in world units, accounting for actual aspect ratio
    const W = camera.position.z * Math.tan((75 / 2) * Math.PI / 180) * (window.innerWidth / window.innerHeight);

    // Build shapes
    const shapes = [
      buildHourglass(N, W),
      buildDNA(N, W),
      buildNeuralNetwork(N, W),
      buildGalaxy(N),
      buildAtom(N),
      buildStardust(N),
    ];
    const SHAPE_COUNT = shapes.length;

    const currPos = new Float32Array(N * 3);
    const currCol = new Float32Array(N * 3);
    currPos.set(shapes[0]);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(currPos, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(currCol, 3));

    // Glow sprite
    const sprite = (() => {
      const sz = 64, c = document.createElement("canvas");
      c.width = sz; c.height = sz;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(sz/2, sz/2, 0, sz/2, sz/2, sz/2);
      g.addColorStop(0,    "rgba(255,255,255,1)");
      g.addColorStop(0.2,  "rgba(180,220,255,0.9)");
      g.addColorStop(0.55, "rgba(60,130,255,0.4)");
      g.addColorStop(1,    "rgba(0,40,180,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, sz, sz);
      return new THREE.CanvasTexture(c);
    })();

    const mat = new THREE.PointsMaterial({
      size: 0.07, map: sprite, vertexColors: true,
      transparent: true, opacity: 1.0,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const colAttr = geo.attributes.color    as THREE.BufferAttribute;
    let time = 0, rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      time += 0.007;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const rawP = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;

      const seg    = Math.min(Math.floor(rawP * (SHAPE_COUNT - 1)), SHAPE_COUNT - 2);
      const localT = eio(Math.max(0, Math.min(1, rawP * (SHAPE_COUNT - 1) - seg)));

      const fromShape = shapes[seg];
      const toShape   = shapes[seg + 1];
      const fromPal   = PALETTES[seg];
      const toPal     = PALETTES[seg + 1];

      for (let i = 0; i < N; i++) {
        const delay = (i / N) * 0.22;
        const p     = eio(Math.max(0, Math.min(1, (localT - delay) / (1 - delay + .001))));
        const breathe = Math.sin(time * 1.6 + i * 0.015) * 0.035 * S * (1 - p * .4);

        currPos[i*3]   = fromShape[i*3]   + (toShape[i*3]   - fromShape[i*3])   * p + breathe;
        currPos[i*3+1] = fromShape[i*3+1] + (toShape[i*3+1] - fromShape[i*3+1]) * p;
        currPos[i*3+2] = fromShape[i*3+2] + (toShape[i*3+2] - fromShape[i*3+2]) * p + breathe;

        const cf = i % 2 === 0 ? 0 : 3;
        currCol[i*3]   = fromPal[cf]   + (toPal[cf]   - fromPal[cf])   * p;
        currCol[i*3+1] = fromPal[cf+1] + (toPal[cf+1] - fromPal[cf+1]) * p;
        currCol[i*3+2] = fromPal[cf+2] + (toPal[cf+2] - fromPal[cf+2]) * p;
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Per-shape rotation speeds
      const speeds = [0.0022, 0.0018, 0.0013, 0.0038, 0.0028, 0.0008];
      const rotA = speeds[seg], rotB = speeds[Math.min(seg + 1, SHAPE_COUNT - 1)];
      points.rotation.y += rotA + (rotB - rotA) * localT;

      // Per-shape tilt (galaxy lies flat, others upright)
      const tilts = [0, 0, 0.12, 0.55, 0.05, 0.08];
      const tiltA = tilts[seg], tiltB = tilts[Math.min(seg + 1, SHAPE_COUNT - 1)];
      points.rotation.x = tiltA + (tiltB - tiltA) * localT;

      // Gentle camera sway
      camera.position.x = Math.sin(time * .16) * .4;
      camera.position.y = Math.sin(time * .11) * .25 + rawP * .6;
      camera.position.z = 11 + rawP * 1.5;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      starGeo.dispose();
      sprite.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
