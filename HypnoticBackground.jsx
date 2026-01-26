
import React, { useEffect, useRef, useState } from 'react';

/**
 * @typedef {Object} Particle
 * @property {number} x - X coordinate
 * @property {number} y - Y coordinate
 * @property {number} vx - Velocity X
 * @property {number} vy - Velocity Y
 * @property {number} life - Current life value
 * @property {number} maxLife - Maximum life duration
 * @property {number} size - Radius of the particle
 */

/**
 * Hook to detect if user prefers reduced motion
 * @returns {boolean} True if user prefers reduced motion
 */
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// --- Noise Functions ---

/**
 * Hash function for 2D coordinates
 * @param {number} x 
 * @param {number} y 
 * @returns {number} Hashed value
 */
const hash2D = (x, y) => {
  let h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return h - Math.floor(h);
};

/**
 * Smoothstep interpolation
 * @param {number} t 
 * @returns {number} Smoothed value
 */
const smoothstep = (t) => {
  return t * t * (3 - 2 * t);
};

/**
 * Linear interpolation
 * @param {number} a Start
 * @param {number} b End
 * @param {number} t Interpolation factor
 * @returns {number} Interpolated value
 */
const lerp = (a, b, t) => {
  return a + (b - a) * t;
};

/**
 * Value noise generation
 * @param {number} x 
 * @param {number} y 
 * @returns {number} Noise value
 */
const valueNoise = (x, y) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const u = smoothstep(xf);
  const v = smoothstep(yf);

  const n00 = hash2D(xi, yi);
  const n10 = hash2D(xi + 1, yi);
  const n01 = hash2D(xi, yi + 1);
  const n11 = hash2D(xi + 1, yi + 1);

  const nx0 = lerp(n00, n10, u);
  const nx1 = lerp(n01, n11, u);
  return lerp(nx0, nx1, v);
};

/**
 * Fractal Brownian Motion
 * @param {number} x 
 * @param {number} y 
 * @param {number} [octaves=4] 
 * @returns {number} Accumulated noise value
 */
const fbm = (x, y, octaves = 4) => {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    value += amplitude * valueNoise(x * frequency, y * frequency);
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return value / maxValue;
};

/**
 * HypnoticBackground Component
 * Renders a canvas-based particle flow animation.
 */
const HypnoticBackground = () => {
  /** @type {React.MutableRefObject<HTMLCanvasElement | null>} */
  const canvasRef = useRef(null);
  
  /** @type {React.MutableRefObject<Particle[]>} */
  const particlesRef = useRef([]);
  
  /** @type {React.MutableRefObject<number>} */
  const timeRef = useRef(0);
  
  /** @type {React.MutableRefObject<number | null>} */
  const animationIdRef = useRef(null);
  
  const prefersReducedMotion = usePrefersReducedMotion();
  const [motionEnabled, setMotionEnabled] = useState(!prefersReducedMotion);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // ResizeObserver for responsive sizing
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.observe(canvas);

    // Initialize particles
    const initializeParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: 0,
          vy: 0,
          life: Math.random(),
          maxLife: 1 + Math.random() * 2,
          size: 0.5 + Math.random() * 1.5,
        });
      }
    };

    initializeParticles();

    // Animation loop
    const animate = () => {
      // Pause animation when tab is hidden
      if (document.hidden) {
        animationIdRef.current = null;
        return;
      }

      if (!motionEnabled) {
        // Static background when motion is disabled
        ctx.fillStyle = '#0A0A0A';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      timeRef.current += 0.01;

      // Clear canvas with fade effect
      // Maintained fade overlay 0.045
      ctx.fillStyle = 'rgba(10, 10, 10, 0.045)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ultra-slow global motion anchor with low-frequency sine-based offset
      const drift = Math.sin(timeRef.current * 0.00001) * 0.3;

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Flow field based on Perlin noise
        const noiseScale = 0.005;
        const angle = fbm(
          particle.x * noiseScale + timeRef.current * 0.5,
          particle.y * noiseScale + timeRef.current * 0.3,
          3
        ) * Math.PI * 2 + drift; // Added drift modulation

        const speed = 2; // Particle speed maintained
        particle.vx = Math.cos(angle) * speed;
        particle.vy = Math.sin(angle) * speed;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Update life
        particle.life += 0.01;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Reset particle if life exceeds maxLife
        if (particle.life > particle.maxLife) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = 0;
        }

        // Draw particle with alpha based on life
        // Maintained stroke opacity 0.09
        const alpha = Math.sin((particle.life / particle.maxLife) * Math.PI) * 0.09;
        ctx.fillStyle = `rgba(201, 169, 97, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Maintained line width 1.6
        ctx.lineWidth = 1.6;
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Visibility change handler to resume animation
    const handleVisibilityChange = () => {
      if (!document.hidden && animationIdRef.current === null && motionEnabled) {
        animate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [motionEnabled]);

  return (
    // Updated container z-index to z-0 as requested
    <div className="fixed inset-0 z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: '#0A0A0A' }}
      />
      <button
        onClick={() => setMotionEnabled(!motionEnabled)}
        className="absolute bottom-4 right-4 px-3 py-1 text-xs bg-[#C9A961] text-black rounded hover:bg-opacity-80 transition-all z-50"
        aria-label="Toggle motion"
      >
        {motionEnabled ? 'Motion: ON' : 'Motion: OFF'}
      </button>
    </div>
  );
};

export default HypnoticBackground;
