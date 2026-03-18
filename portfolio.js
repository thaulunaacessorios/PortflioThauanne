// portfolio.js - Thauanne Luna 2026

/* ============================================
   CURRÍCULO — fora do DOMContentLoaded
============================================ */
function showCurriculo(tipo, btn) {
  var foto = document.getElementById('curriculo-foto');
  var semFoto = document.getElementById('curriculo-sem-foto');

  if (!foto || !semFoto) return;

  foto.style.display = 'none';
  semFoto.style.display = 'none';

  document.getElementById('curriculo-' + tipo).style.display = 'block';

  document.querySelectorAll('.curriculo-tab').forEach(function(t) {
    t.classList.remove('active');
  });

  btn.classList.add('active');
}

/* ============================================
   SPLASH SCREEN — Typewriter
============================================ */
function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;

  document.body.style.overflow = 'hidden';

  const nameEl = document.getElementById('splashName');
  const cursor = document.getElementById('splashCursor');
  const tagline = document.getElementById('splashTagline');

  if (!nameEl || !cursor) return;

  const part1 = 'Thauanne ';
  const part2 = 'Luna';
  const fullText = part1 + part2;

  const span1 = document.createElement('span');
  const span2 = document.createElement('span');
  span2.classList.add('accent');

  nameEl.insertBefore(span1, cursor);
  nameEl.insertBefore(span2, cursor);

  let i = 0;
  const speed = 90;

  function type() {
    if (i < fullText.length) {
      if (i < part1.length) {
        span1.textContent += fullText[i];
      } else {
        span2.textContent += fullText[i];
      }
      i++;
      setTimeout(type, speed);
    } else {
      if (tagline) tagline.classList.add('visible');

      setTimeout(() => {
        if (cursor) cursor.style.display = 'none';
      }, 800);

      setTimeout(() => {
        splash.style.transition = 'opacity 0.7s ease';
        splash.style.opacity = '0';
        setTimeout(() => {
          splash.style.display = 'none';
          document.body.style.overflow = '';
        }, 700);
      }, 1200);
    }
  }

  setTimeout(type, 300);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSplash);
} else {
  initSplash();
}

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================
     CURSOR — bolinha + rastro de estrelinhas
  ============================================ */
  const cursorDot = document.querySelector('.cursor-dot');

  let mouseX = -100, mouseY = -100;
  let trailParticles = [];

  function moveCursor(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    }

    spawnTrailParticle(mouseX, mouseY);
  }

  function animateCursor() {
    trailParticles.forEach((p, i) => {
      p.life -= 0.04;
      p.y -= 0.5;
      p.x += p.vx;
      p.el.style.left = p.x + 'px';
      p.el.style.top = p.y + 'px';
      p.el.style.opacity = Math.max(0, p.life);
      p.el.style.transform = `translate(-50%, -50%) scale(${p.life})`;
      if (p.life <= 0) {
        p.el.remove();
        trailParticles.splice(i, 1);
      }
    });
    requestAnimationFrame(animateCursor);
  }

  function spawnTrailParticle(x, y) {
    if (trailParticles.length > 28) return;
    const el = document.createElement('div');
    const size = Math.random() * 5 + 2;
    const shapes = ['✦', '✧', '·', '✸', '★', '⋆'];
    el.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    el.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: ${size + 6}px;
      color: hsl(${330 + Math.random() * 40}, 80%, ${65 + Math.random() * 20}%);
      pointer-events: none;
      z-index: 99996;
      transform: translate(-50%, -50%);
      transition: none;
      user-select: none;
    `;
    document.body.appendChild(el);
    trailParticles.push({
      el,
      x: x + (Math.random() - 0.5) * 12,
      y: y + (Math.random() - 0.5) * 12,
      vx: (Math.random() - 0.5) * 1.2,
      life: 0.9 + Math.random() * 0.2
    });
  }

  document.addEventListener('mousemove', moveCursor);
  animateCursor();

  /* ============================================
     RIPPLE nos botões
  ============================================ */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.cssText = `
        width: 10px; height: 10px;
        left: ${e.clientX - rect.left - 5}px;
        top: ${e.clientY - rect.top - 5}px;
        position: absolute; border-radius: 50%;
        background: rgba(255,255,255,0.4);
        transform: scale(0);
        animation: rippleAnim 0.6s linear;
        pointer-events: none;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* ============================================
     MENU MOBILE
  ============================================ */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileBackdrop = document.getElementById('mobileMenuBackdrop');

  function openMobileMenu() {
    mobileMenu?.classList.add('active');
    document.body.classList.add('menu-open');
    mobileBackdrop?.classList.add('active');
  }

  function closeMobileMenu() {
    mobileMenu?.classList.remove('active');
    document.body.classList.remove('menu-open');
    mobileBackdrop?.classList.remove('active');
  }

  mobileMenuBtn?.addEventListener('click', openMobileMenu);
  mobileCloseBtn?.addEventListener('click', closeMobileMenu);
  mobileBackdrop?.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ============================================
     THEME TOGGLE
  ============================================ */
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  function initTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', saved);
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  initTheme();
  themeToggle?.addEventListener('click', toggleTheme);

  /* ============================================
     SCROLL SUAVE
  ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMobileMenu();
      }
    });
  });

  /* ============================================
     NAVEGAÇÃO ATIVA
  ============================================ */
  function updateActiveNav() {
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ============================================
     SCROLL REVEAL
  ============================================ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  document.querySelectorAll(
    '.project-card, .curso-preview-card, .curso-card, .certificado-card, .section-title, .about-grid, .contact-content'
  ).forEach((el, i) => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 3) * 0.12}s`;
      revealObserver.observe(el);
    }
  });

  /* ============================================
     HEADER + PROGRESS BAR
  ============================================ */
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    document.documentElement.style.setProperty('--scroll-progress', scrolled + '%');

    if (header) {
      const isDark = html.getAttribute('data-theme') === 'dark';
      if (window.scrollY > 80) {
        header.style.boxShadow = isDark
          ? '0 2px 24px rgba(0,0,0,0.4)'
          : '0 2px 24px rgba(232,99,140,0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    }
  }, { passive: true });

  /* ============================================
     BOTÃO VOLTAR AO TOPO
  ============================================ */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================
     OTIMIZAÇÃO — lazy load imagens
  ============================================ */
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });

  /* ============================================
     OTIMIZAÇÃO — prefetch páginas internas
  ============================================ */
  ['Index.html', 'Cursos.html', 'Certificados.html'].forEach(href => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  });

  console.log('🌸 Portfólio Thauanne Luna — carregado com sucesso!');
});