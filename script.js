/* ============================================
   RIMAS KAWADIS — PORTFOLIO SCRIPTS
   Animations, Navigation & Interactivity
   ============================================ */

// ─── Background Particle Canvas ───
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((w * h) / 18000), 80);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.06 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animFrame = requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
})();


// ─── Navbar Scroll Effect ───
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  });
})();


// ─── Mobile Navigation Toggle ───
(function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close mobile menu on link click
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();


// ─── Active Nav Link Highlighting ───
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
  );

  sections.forEach(section => observer.observe(section));
})();


// ─── Scroll Reveal Animations ───
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Don't unobserve — keeps class but saves resources
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
})();


// ─── Typing Effect ───
(function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    'AI Product Development & Marketing',
    'Prototype Development Manager',
    'Business Analysis & Strategic Planning',
    'Creator of Skooly Smart AI 🏆',
    'Innovation & Systems Thinking',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 100;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      delay = 40;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      delay = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      delay = 2500; // Pause at full text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  // Start after a short delay
  setTimeout(type, 1000);
})();


// ─── Smooth Scroll for Nav Links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.getElementById('navbar').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  });
});


// ─── Contact Form Handler ───
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const form = document.getElementById('contactForm');

  // Build mailto link with form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value || 'Portfolio Contact';
  const message = document.getElementById('message').value;

  const mailtoBody = `Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
  const mailtoLink = `mailto:reemaszeyad05@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

  // Open email client
  window.location.href = mailtoLink;

  // Show success feedback
  btn.textContent = '✓ Opening email client...';
  btn.style.background = 'linear-gradient(135deg, #06b6d4, #0891b2)';

  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    form.reset();
  }, 3000);
}


// ─── Parallax-like effect for hero gradient ───
(function initParallax() {
  const heroGradient = document.querySelector('.hero-gradient');
  if (!heroGradient) return;

  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroGradient.style.transform = `translate(${x}px, ${y}px)`;
  });
})();


// ─── Lazy Load Videos ───
(function initLazyVideos() {
  const videos = document.querySelectorAll('video');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          video.preload = 'metadata';
          observer.unobserve(video);
        }
      });
    },
    { threshold: 0.1 }
  );

  videos.forEach(video => observer.observe(video));
})();


// ─── Add subtle hover tilt to feature cards ───
(function initTilt() {
  const cards = document.querySelectorAll('.feature-card, .cert-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


// ─── Year in footer (keep current) ───
// Already hardcoded to 2026, but you could make it dynamic:
// document.querySelector('.footer-year')?.textContent = new Date().getFullYear();
