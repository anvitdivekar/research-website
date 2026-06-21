"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 3000;
const STAR_COUNT = 1500;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Build hourglass grid positions
function buildHourglass(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = i / count;
    // Vertical range -3 to 3
    const y = (t - 0.5) * 6;
    // Hourglass radius: wide at top/bottom, narrow at center
    const pinch = Math.abs(y) / 3; // 0 at center, 1 at edge
    const radius = 0.3 + pinch * 1.8;
    const theta = t * Math.PI * 40; // spiral fill
    const jitter = (Math.random() - 0.5) * 0.15;
    pos[i * 3] = Math.cos(theta) * (radius + jitter);
    pos[i * 3 + 1] = y + (Math.random() - 0.5) * 0.1;
    pos[i * 3 + 2] = Math.sin(theta) * (radius + jitter);
  }
  return pos;
}

// Build DNA double helix positions
function buildDNA(count: number): Float32Array {
  const pos = new Float32Array(count * 3);
  const half = Math.floor(count / 2);

  for (let i = 0; i < count; i++) {
    const isStrand2 = i >= half;
    const idx = isStrand2 ? i - half : i;
    const t = idx / half;
    const y = (t - 0.5) * 6;
    const twist = t * Math.PI * 6; // 3 full turns
    const offset = isStrand2 ? Math.PI : 0; // opposite strand
    const radius = 1.2;
    const jitter = (Math.random() - 0.5) * 0.08;

    pos[i * 3] = Math.cos(twist + offset) * (radius + jitter);
    pos[i * 3 + 1] = y + (Math.random() - 0.5) * 0.05;
    pos[i * 3 + 2] = Math.sin(twist + offset) * (radius + jitter);
  }

  // Add rungs between the two strands (use remaining particles if any)
  return pos;
}

export default function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // ── Scene & Camera ─────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    // ── Star field ─────────────────────────────────────────────
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 80 - 10;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.06,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // ── Particle system ────────────────────────────────────────
    const hourglassPos = buildHourglass(PARTICLE_COUNT);
    const dnaPos = buildDNA(PARTICLE_COUNT);

    const currentPos = new Float32Array(PARTICLE_COUNT * 3);
    currentPos.set(hourglassPos);

    // Per-particle color: blue-white gradient
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = i / PARTICLE_COUNT;
      // Strand coloring: strand 1 electric blue, strand 2 white-blue
      const isStrand2 = t > 0.5;
      if (isStrand2) {
        colors[i * 3] = 0.7 + Math.random() * 0.3;     // R
        colors[i * 3 + 1] = 0.85 + Math.random() * 0.15; // G
        colors[i * 3 + 2] = 1.0;                          // B
      } else {
        colors[i * 3] = 0.1 + Math.random() * 0.2;     // R
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.3; // G
        colors[i * 3 + 2] = 1.0;                        // B
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(currentPos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Circular sprite texture for soft glowing dots
    const sprite = (() => {
      const size = 64;
      const c = document.createElement("canvas");
      c.width = size;
      c.height = size;
      const ctx = c.getContext("2d")!;
      const grad = ctx.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2
      );
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.3, "rgba(180,220,255,0.8)");
      grad.addColorStop(1, "rgba(0,100,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(c);
    })();

    const mat = new THREE.PointsMaterial({
      size: 0.045,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // ── Resize ─────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Scroll ─────────────────────────────────────────────────
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      scrollRef.current = Math.min(1, scrolled / scrollable);
      setScrollProgress(scrollRef.current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Animate ────────────────────────────────────────────────
    let time = 0;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      time += 0.008;

      const progress = easeInOutCubic(Math.min(1, scrollRef.current * 1.6));

      // Morph particles between hourglass and DNA
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const delay = (i / PARTICLE_COUNT) * 0.3;
        const p = Math.min(1, Math.max(0, (progress - delay) / (1 - delay + 0.001)));
        const ep = easeInOutCubic(p);

        // Breathe / shimmer: small oscillation per particle
        const wave = Math.sin(time * 2 + i * 0.02) * 0.03 * (1 - ep * 0.5);

        currentPos[i * 3]     = lerp(hourglassPos[i * 3],     dnaPos[i * 3],     ep) + wave;
        currentPos[i * 3 + 1] = lerp(hourglassPos[i * 3 + 1], dnaPos[i * 3 + 1], ep);
        currentPos[i * 3 + 2] = lerp(hourglassPos[i * 3 + 2], dnaPos[i * 3 + 2], ep) + wave;
      }
      posAttr.needsUpdate = true;

      // Gentle auto-rotate (slows as user scrolls)
      const rotateSpeed = 0.003 * (1 - progress * 0.7);
      particles.rotation.y += rotateSpeed;

      // Camera drift: pull back slightly as DNA forms
      camera.position.z = 7 + progress * 1.5;
      camera.position.y = progress * 0.3;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      starGeo.dispose();
      starMat.dispose();
      sprite.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Deep space background */}
        <div className="absolute inset-0 bg-[#03030e]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(14,20,60,0.9) 0%, #03030e 70%)",
          }}
        />

        {/* Three.js canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Central glow halo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(56,189,248,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Top/bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#03030e]/80 via-transparent to-[#03030e]/80 pointer-events-none" />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <p
            className="text-xs uppercase tracking-[0.4em] text-sky-400/80 mb-8 font-medium transition-opacity duration-500"
            style={{ opacity: 1 - scrollProgress * 2 }}
          >
            Research · Mentorship · Discovery
          </p>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-6 leading-[1.05]"
            style={{ opacity: 1 - scrollProgress * 2 }}
          >
            <span className="shimmer-text">Technology that redefines</span>
            <br />
            <span className="text-white/90">the nature of interaction.</span>
          </h1>

          <p
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mt-4 leading-relaxed font-light"
            style={{ opacity: 1 - scrollProgress * 2 }}
          >
            Everything revolves around one thing&mdash;
            <span className="text-white/80">your growth.</span>
          </p>

          <div
            className="mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
            style={{ opacity: 1 - scrollProgress * 2 }}
          >
            <a
              href="#apply"
              className="px-8 py-3.5 rounded-full bg-sky-400 text-[#05050f] text-sm font-semibold tracking-wide hover:bg-sky-300 transition-all duration-200 hover:shadow-lg hover:shadow-sky-400/30"
            >
              Apply for Mentorship
            </a>
            <a
              href="#about"
              className="px-8 py-3.5 rounded-full border border-white/20 text-white/70 text-sm font-medium tracking-wide hover:border-white/40 hover:text-white transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 pointer-events-none"
          style={{ opacity: 1 - scrollProgress * 4 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}
