
import React, { useEffect, useRef } from 'react';

const FloatingParticles = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particles = [];
    const particleCount = 12; // 8-12 particles

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseSize: Math.random() * 60 + 40, // Larger, subtle orbs
        size: 0, // Will be set in loop
        speedX: (Math.random() - 0.5) * 0.15, // Slow, organic motion
        speedY: (Math.random() - 0.5) * 0.15,
        baseOpacity: Math.random() * 0.04 + 0.06, // 6-10% opacity
        opacity: 0,
        hue: 20 + Math.random() * 20 // Copper/Rose tones
      });
      particles[i].size = particles[i].baseSize;
      particles[i].opacity = particles[i].baseOpacity;
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < -100) particle.x = canvas.width + 100;
        if (particle.x > canvas.width + 100) particle.x = -100;
        if (particle.y < -100) particle.y = canvas.height + 100;
        if (particle.y > canvas.height + 100) particle.y = -100;

        // Interaction logic
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 200;

        let targetSize = particle.baseSize;
        let targetOpacity = particle.baseOpacity;

        if (distance < interactionRadius) {
          targetSize = particle.baseSize * 1.15; // Scale up to 1.15x
          targetOpacity = particle.baseOpacity + 0.05; // Slightly increase opacity
        }

        // Smooth transition
        particle.size += (targetSize - particle.size) * 0.1;
        particle.opacity += (targetOpacity - particle.opacity) * 0.1;

        // Draw particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 40%, 70%, ${particle.opacity})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 40%, 70%, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      // Blend mode overlay or screen works well for subtle lighting
      style={{ mixBlendMode: 'screen' }} 
    />
  );
};

export default FloatingParticles;
