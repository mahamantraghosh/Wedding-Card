import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  swayPhase: number;
  swaySpeed: number;
  spriteIdx: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface PetalCanvasProps {
  burstNonce: number;
  burstType?: 'petals' | 'celebration';
  ambientActive?: boolean;
}

/**
 * High-performance rose petal & gold confetti canvas.
 * Pre-renders petal/confetti sprites once to tiny offscreen canvases and automatically
 * stops its requestAnimationFrame loop when idle or off-tab to preserve phone battery.
 */
export const PetalCanvas: React.FC<PetalCanvasProps> = ({
  burstNonce,
  burstType = 'petals',
  ambientActive = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const rafRef = useRef<number | null>(null);
  const spritesRef = useRef<HTMLCanvasElement[]>([]);
  const lastBurstRef = useRef<number>(0);

  // Build tiny cached offscreen petal & gold foil sprites once
  useEffect(() => {
    const colors = [
      { fill: '#e8b4ad', highlight: '#fae0db', kind: 'petal' },
      { fill: '#c8727c', highlight: '#ebafb6', kind: 'petal' },
      { fill: '#8f2c3f', highlight: '#c95c70', kind: 'petal' },
      { fill: '#f5ded3', highlight: '#fffaf7', kind: 'petal' },
      { fill: '#d6b065', highlight: '#f6e4b8', kind: 'foil' },
    ];

    spritesRef.current = colors.map((spec) => {
      const off = document.createElement('canvas');
      off.width = 28;
      off.height = 28;
      const ctx = off.getContext('2d');
      if (!ctx) return off;

      ctx.translate(14, 14);
      if (spec.kind === 'petal') {
        const grad = ctx.createRadialGradient(-2, -3, 1, 0, 0, 11);
        grad.addColorStop(0, spec.highlight);
        grad.addColorStop(1, spec.fill);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.bezierCurveTo(9, -8, 10, 4, 0, 10);
        ctx.bezierCurveTo(-10, 4, -9, -8, 0, -10);
        ctx.fill();
      } else {
        ctx.fillStyle = spec.fill;
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-4, -4, 8, 8);
        ctx.fillStyle = spec.highlight;
        ctx.fillRect(-2.5, -2.5, 3, 3);
      }
      return off;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const spawnBurst = (count: number, includeGold: boolean) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (let i = 0; i < count; i++) {
        const fromCenter = includeGold && i % 2 === 0;
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.9;
        const speed = fromCenter ? 2.6 + Math.random() * 4.5 : 0.8 + Math.random() * 1.8;
        petalsRef.current.push({
          x: fromCenter ? w * (0.25 + Math.random() * 0.5) : Math.random() * w,
          y: fromCenter ? h * 0.42 : -20 - Math.random() * 140,
          vx: fromCenter ? Math.cos(angle) * speed : (Math.random() - 0.5) * 1.1,
          vy: fromCenter ? Math.sin(angle) * speed - 1.2 : 1.1 + Math.random() * 1.9,
          size: 0.55 + Math.random() * 0.72,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.08,
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: 0.025 + Math.random() * 0.03,
          spriteIdx: includeGold ? Math.floor(Math.random() * 5) : Math.floor(Math.random() * 4),
          opacity: 0.85 + Math.random() * 0.15,
          life: 0,
          maxLife: 190 + Math.random() * 140,
        });
      }
    };

    const tick = () => {
      if (document.hidden) {
        rafRef.current = null;
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const list = petalsRef.current;
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.life += 1;
        p.swayPhase += p.swaySpeed;
        p.vy = Math.min(p.vy + 0.045, 2.8);
        p.x += p.vx + Math.sin(p.swayPhase) * 0.85;
        p.y += p.vy;
        p.rotation += p.vRot;

        const fadeRatio = p.life > p.maxLife * 0.72
          ? Math.max(0, 1 - (p.life - p.maxLife * 0.72) / (p.maxLife * 0.28))
          : 1;

        const sprite = spritesRef.current[p.spriteIdx];
        if (sprite && fadeRatio > 0.01) {
          ctx.save();
          ctx.globalAlpha = p.opacity * fadeRatio;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          const drawSize = 24 * p.size;
          ctx.drawImage(sprite, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
          ctx.restore();
        }

        if (p.life >= p.maxLife || p.y > h + 40) {
          list.splice(i, 1);
        }
      }

      if (list.length > 0) {
        rafRef.current = window.requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    const startLoop = () => {
      if (rafRef.current === null && petalsRef.current.length > 0) {
        rafRef.current = window.requestAnimationFrame(tick);
      }
    };

    if (burstNonce > 0 && burstNonce !== lastBurstRef.current) {
      lastBurstRef.current = burstNonce;
      spawnBurst(burstType === 'celebration' ? 52 : 34, burstType === 'celebration');
      startLoop();
    }

    let ambientInterval: number | null = null;
    if (ambientActive) {
      ambientInterval = window.setInterval(() => {
        if (!document.hidden && petalsRef.current.length < 14) {
          spawnBurst(2, false);
          startLoop();
        }
      }, 3600);
    }

    const onVisChange = () => {
      if (!document.hidden && petalsRef.current.length > 0) {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', onVisChange);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisChange);
      if (ambientInterval !== null) window.clearInterval(ambientInterval);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [burstNonce, burstType, ambientActive]);

  return (
    <canvas
      ref={canvasRef}
      data-testid="petal-canvas"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 w-full h-full"
    />
  );
};
