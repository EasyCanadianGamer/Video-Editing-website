/* =============================================
   CANADIAN GAMER — particles.js
   Hero canvas particle / constellation effect
   ============================================= */

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animId = null;

    // Color palette: red, purple, dark blue mix
    this.colors = [
      { r: 225, g: 29,  b: 72  }, // crimson red
      { r: 225, g: 29,  b: 72  },
      { r: 225, g: 29,  b: 72  },
      { r: 124, g: 58,  b: 237 }, // purple
      { r: 124, g: 58,  b: 237 },
      { r: 124, g: 58,  b: 237 },
      { r: 30,  g: 64,  b: 175 }, // dark blue
      { r: 30,  g: 64,  b: 175 },
      { r: 192, g: 132, b: 252 }, // light purple
      { r: 240, g: 240, b: 240 }, // white
    ];

    this.init();

    // Debounced resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.init(), 200);
    });
  }

  randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  createParticle() {
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    return {
      x: this.randomBetween(0, this.canvas.width),
      y: this.randomBetween(0, this.canvas.height),
      vx: this.randomBetween(-0.28, 0.28),
      vy: this.randomBetween(-0.28, 0.28),
      radius: this.randomBetween(1, 2.4),
      alpha: this.randomBetween(0.25, 0.65),
      color,
    };
  }

  init() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;

    const count = Math.min(Math.floor(window.innerWidth / 11), 120);
    this.particles = Array.from({ length: count }, () => this.createParticle());

    if (!this.animId) this.animate();
  }

  draw() {
    const { ctx, canvas, particles } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connecting lines first (below particles)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;

        if (dist < maxDist) {
          const lineAlpha = (1 - dist / maxDist) * 0.11;
          const c = particles[i].color;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${lineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;
      ctx.fill();
    }
  }

  update() {
    const { canvas, particles } = this;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges with a small padding
      if (p.x < -10)             { p.x = canvas.width  + 10; }
      else if (p.x > canvas.width  + 10) { p.x = -10; }
      if (p.y < -10)             { p.y = canvas.height + 10; }
      else if (p.y > canvas.height + 10) { p.y = -10; }
    }
  }

  animate() {
    this.animId = requestAnimationFrame(() => this.animate());
    this.draw();
    this.update();
  }
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem('particle-canvas');
});
