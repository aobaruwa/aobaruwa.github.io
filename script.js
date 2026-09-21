const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

async function loadPageContent() {
  const main = document.querySelector('main[data-content-url]');
  if (!main) return;

  try {
    const response = await fetch(main.dataset.contentUrl);
    if (!response.ok) throw new Error(`Unable to load ${main.dataset.contentUrl}`);
    main.innerHTML = await response.text();
    document.dispatchEvent(new Event('page:loaded'));
  } catch (error) {
    main.innerHTML = '<p class="page-error">Portfolio content could not be loaded. Start the site with <code>python3 -m http.server 8000</code>.</p>';
    console.error(error);
  }
}

document.getElementById('year').textContent = new Date().getFullYear();
document.addEventListener('page:loaded', initCanvases);
loadPageContent();

function initCanvases() {

// Interactive particle network behind the hero visual
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const wrap = canvas.parentElement;
  const colors = ['#d9f85a', '#f26f4f', '#f2f0e9'];
  let particles = [];
  const mouse = { x: -9999, y: -9999 };

  function seed(w, h) {
    const count = Math.max(24, Math.min(Math.round((w * h) / 14000), 60));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      c: colors[Math.floor(Math.random() * colors.length)]
    }));
  }

  function resize() {
    const rect = wrap.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    seed(rect.width, rect.height);
  }

  function frame() {
    const rect = wrap.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > rect.width) p.vx *= -1;
      if (p.y < 0 || p.y > rect.height) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 90) {
        p.x += (dx / dist) * 0.6;
        p.y += (dy / dist) * 0.6;
      }
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p = particles[i], q = particles[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 110) {
          ctx.strokeStyle = `rgba(217,248,90,${1 - d / 110})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => {
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    if (!reduceMotion) requestAnimationFrame(frame);
  }

  wrap.addEventListener('mousemove', e => {
    const rect = wrap.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  wrap.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  window.addEventListener('resize', resize);
  resize();
  frame();
})();
}

}

// Drifting blobs behind the Background section
(function () {
  const canvas = document.getElementById('blob-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const section = canvas.parentElement;
  let blobs = [];

  function seed(w, h) {
    blobs = [
      { x: w * 0.12, y: h * 0.25, r: w * 0.09, c: 'rgba(217,248,90,0.35)', vy: 0.15 },
      { x: w * 0.85, y: h * 0.6, r: w * 0.07, c: 'rgba(242,111,79,0.3)', vy: -0.12 },
      { x: w * 0.55, y: h * 0.15, r: w * 0.05, c: 'rgba(20,34,31,0.08)', vy: 0.1 }
    ];
  }

  function resize() {
    const rect = section.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    seed(rect.width, rect.height);
  }

  function frame() {
    const rect = section.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    blobs.forEach(b => {
      b.y += b.vy;
      if (b.y < -b.r) b.y = rect.height + b.r;
      if (b.y > rect.height + b.r) b.y = -b.r;
      ctx.fillStyle = b.c;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
    if (!reduceMotion) requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize);
  resize();
  frame();
})();