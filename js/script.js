// ===== LIGHTWEIGHT TECH NETWORK BACKGROUND =====
const networkCanvas = document.getElementById('particles-canvas');
if (networkCanvas) {
  const ctx = networkCanvas.getContext('2d');
  let particles = [];
  let w, h;

  function resizeNetworkCanvas() {
    w = networkCanvas.width = window.innerWidth;
    h = networkCanvas.height = window.innerHeight;
  }
  resizeNetworkCanvas();
  window.addEventListener('resize', resizeNetworkCanvas, { passive: true });

  const particleCount = window.innerWidth < 768 ? 20 : 35;
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      s: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      o: Math.random() * 0.2 + 0.05
    });
  }

  function drawNetworkParticles() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 184, 148, ${p.o})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < 10000) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          const alpha = 0.05 * (1 - Math.sqrt(distSq) / 100);
          ctx.strokeStyle = `rgba(9, 132, 227, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawNetworkParticles);
  }
  drawNetworkParticles();
}

// ===== FIRST PAGE INTERACTIVE IT NETWORK PACKETS & BINARY STREAM ENGINE =====
const techCanvas = document.getElementById('hero-tech-canvas') || document.getElementById('hero-bubbles-canvas');
const heroSection = document.getElementById('hero');

if (techCanvas && heroSection) {
  const tCtx = techCanvas.getContext('2d');
  let tWidth, tHeight;
  let cursorPackets = [];
  let ambientBits = [];
  let mouse = { x: -1000, y: -1000, lastX: -1000, lastY: -1000, moving: false };
  let pingRings = [];

  function resizeTechCanvas() {
    tWidth = techCanvas.width = heroSection.offsetWidth;
    tHeight = techCanvas.height = heroSection.offsetHeight;
  }
  resizeTechCanvas();
  window.addEventListener('resize', resizeTechCanvas, { passive: true });

  const techLabels = ['0', '1', '01', '10', 'ACK', 'SYN', 'IP', 'VLAN', 'M365', 'DNS', '200 OK', 'PING', 'ETH', 'GPO', 'SSL', 'AD'];
  const techColors = ['#00b894', '#0984e3', '#00cec9', '#6c5ce7', '#10b981'];

  // Ambient floating binary bits drifting in background
  const ambientCount = window.innerWidth < 768 ? 16 : 28;
  for (let i = 0; i < ambientCount; i++) {
    ambientBits.push({
      x: Math.random() * tWidth,
      y: Math.random() * tHeight,
      text: Math.random() > 0.5 ? '1' : '0',
      size: Math.random() * 4 + 11,
      vy: -(Math.random() * 0.6 + 0.25),
      vx: (Math.random() - 0.5) * 0.35,
      color: techColors[Math.floor(Math.random() * techColors.length)],
      alpha: Math.random() * 0.35 + 0.15
    });
  }

  // Mousemove listener over hero section
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;

    mouse.x = curX;
    mouse.y = curY;
    mouse.moving = true;

    // Calculate movement speed
    const dx = curX - (mouse.lastX === -1000 ? curX : mouse.lastX);
    const dy = curY - (mouse.lastY === -1000 ? curY : mouse.lastY);
    const speed = Math.sqrt(dx * dx + dy * dy);

    mouse.lastX = curX;
    mouse.lastY = curY;

    // Trigger radar ping ring on significant movement
    if (speed > 8 && (pingRings.length === 0 || pingRings[pingRings.length - 1].r > 20)) {
      if (pingRings.length < 8) {
        pingRings.push({
          x: curX,
          y: curY,
          r: 4,
          maxR: 42,
          alpha: 0.6,
          color: Math.random() > 0.5 ? '#00b894' : '#0984e3'
        });
      }
    }

    // Spawn IT data packets & binary bits
    const spawnCount = Math.min(3, Math.floor(speed / 9) + 1);
    for (let i = 0; i < spawnCount; i++) {
      if (cursorPackets.length < 75) {
        const isNode = Math.random() > 0.55;
        const label = techLabels[Math.floor(Math.random() * techLabels.length)];
        const color = techColors[Math.floor(Math.random() * techColors.length)];

        cursorPackets.push({
          x: curX + (Math.random() - 0.5) * 16,
          y: curY + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 1.4 + (dx * 0.04),
          vy: -(Math.random() * 1.6 + 0.9),
          text: label,
          isNode: isNode,
          size: isNode ? (Math.random() * 3 + 4) : (Math.random() * 4 + 11),
          color: color,
          alpha: 0.9,
          life: 1.0,
          decay: Math.random() * 0.016 + 0.012,
          rot: (Math.random() - 0.5) * 0.3
        });
      }
    }
  });

  heroSection.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
    mouse.moving = false;
  });

  function renderTechCanvas() {
    tCtx.clearRect(0, 0, tWidth, tHeight);

    // 1. Draw Radar Ping Rings around cursor positions
    for (let i = pingRings.length - 1; i >= 0; i--) {
      const ring = pingRings[i];
      ring.r += 1.8;
      ring.alpha -= 0.025;

      if (ring.alpha <= 0 || ring.r >= ring.maxR) {
        pingRings.splice(i, 1);
        continue;
      }

      tCtx.save();
      tCtx.beginPath();
      tCtx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
      tCtx.strokeStyle = ring.color;
      tCtx.globalAlpha = ring.alpha;
      tCtx.lineWidth = 1.2;
      tCtx.stroke();

      // Subtle center dot
      tCtx.beginPath();
      tCtx.arc(ring.x, ring.y, 2, 0, Math.PI * 2);
      tCtx.fillStyle = ring.color;
      tCtx.fill();
      tCtx.restore();
    }

    // 2. Draw Fiber-Optic Connection Lines between nearby cursor data packets
    for (let i = 0; i < cursorPackets.length; i++) {
      for (let j = i + 1; j < cursorPackets.length; j++) {
        const p1 = cursorPackets[i];
        const p2 = cursorPackets[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 75) {
          const lineAlpha = (1 - dist / 75) * Math.min(p1.alpha, p2.alpha) * 0.45;
          tCtx.save();
          tCtx.beginPath();
          tCtx.moveTo(p1.x, p1.y);
          tCtx.lineTo(p2.x, p2.y);
          tCtx.strokeStyle = p1.color;
          tCtx.globalAlpha = lineAlpha;
          tCtx.lineWidth = 0.8;
          tCtx.stroke();
          tCtx.restore();
        }
      }
    }

    // 3. Draw & update cursor-emitted IT data packets and binary bits
    for (let i = cursorPackets.length - 1; i >= 0; i--) {
      const p = cursorPackets[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      p.alpha = Math.max(0, p.life);

      if (p.life <= 0 || p.y < -30 || p.x < -30 || p.x > tWidth + 30) {
        cursorPackets.splice(i, 1);
        continue;
      }

      tCtx.save();
      tCtx.globalAlpha = p.alpha;

      if (p.isNode) {
        // Draw Glowing Geometric Network Node
        tCtx.beginPath();
        tCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        tCtx.fillStyle = p.color;
        tCtx.shadowColor = p.color;
        tCtx.shadowBlur = 8;
        tCtx.fill();

        // Node halo
        tCtx.beginPath();
        tCtx.arc(p.x, p.y, p.size + 3, 0, Math.PI * 2);
        tCtx.strokeStyle = p.color;
        tCtx.lineWidth = 0.7;
        tCtx.stroke();
      } else {
        // Draw Glowing IT Monospace Text Bit / Packet Label
        tCtx.font = `bold ${Math.round(p.size)}px 'JetBrains Mono', monospace`;
        tCtx.fillStyle = p.color;
        tCtx.shadowColor = p.color;
        tCtx.shadowBlur = 6;
        tCtx.textAlign = 'center';
        tCtx.textBaseline = 'middle';
        tCtx.fillText(p.text, p.x, p.y);
      }

      tCtx.restore();
    }

    // 4. Draw & update ambient background binary bits
    for (let i = 0; i < ambientBits.length; i++) {
      const bit = ambientBits[i];
      bit.x += bit.vx;
      bit.y += bit.vy;

      // Mouse deflection interaction (data deflection)
      if (mouse.x !== -1000) {
        const dx = bit.x - mouse.x;
        const dy = bit.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 70) {
          const force = (70 - dist) / 70;
          bit.x += (dx / dist) * force * 3;
          bit.y += (dy / dist) * force * 3;
        }
      }

      // Recycle to bottom if ascends beyond top
      if (bit.y < -20) {
        bit.y = tHeight + 15;
        bit.x = Math.random() * tWidth;
        bit.text = Math.random() > 0.5 ? '1' : '0';
      }
      if (bit.x < -20) bit.x = tWidth + 15;
      if (bit.x > tWidth + 20) bit.x = -15;

      tCtx.save();
      tCtx.font = `600 ${Math.round(bit.size)}px 'JetBrains Mono', monospace`;
      tCtx.fillStyle = bit.color;
      tCtx.globalAlpha = bit.alpha;
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      tCtx.fillText(bit.text, bit.x, bit.y);
      tCtx.restore();
    }

    requestAnimationFrame(renderTechCanvas);
  }
  renderTechCanvas();
}

// ===== MODERN 3D TILT EFFECT ON CARDS =====
function init3DTilt() {
  const tiltElements = document.querySelectorAll(
    '.project-card, .tg-skill-tile, .highlight-card, .edu-card, .cert-card, .profile-clean-card'
  );

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt rotation (-7deg to 7deg)
      const rotateX = ((centerY - y) / centerY) * 7;
      const rotateY = ((x - centerX) / centerX) * 7;

      this.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`;
    });

    el.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
    });
  });
}
window.addEventListener('DOMContentLoaded', init3DTilt);
init3DTilt();

// ===== NAVBAR BEHAVIOR =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const allNavLinks = document.querySelectorAll('.nav-links a:not(.nav-action-btn)');

window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  
  // Back to top floating button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.classList.toggle('active', window.scrollY > 400);
  }
}, { passive: true });

// Mobile Hamburger Toggle
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('no-scroll', navLinks.classList.contains('active'));
  });
}

// Auto close on navigation link click
allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks) navLinks.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});

// ===== ACTIVE NAVIGATION ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let currentSectionId = '';
  const scrollPos = window.scrollY + 140;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      currentSectionId = section.getAttribute('id');
    }
  });

  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${currentSectionId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}, { passive: true });

// ===== 3D SCROLL REVEAL ANIMATION =====
const reveals = document.querySelectorAll('.reveal');
function checkReveal() {
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 60) {
      el.classList.add('active');
    }
  });
}
window.addEventListener('scroll', checkReveal, { passive: true });
window.addEventListener('load', checkReveal);
checkReveal();

// ===== HERO STATS COUNTER ANIMATION =====
let countersTriggered = false;
const statsContainer = document.querySelector('.hero-stats');

if (statsContainer) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersTriggered) {
      countersTriggered = true;
      document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 1400;
        const steps = 40;
        const stepTime = duration / steps;
        let current = 0;
        const increment = target / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          const formatted = current >= 1000 ? Math.floor(current).toLocaleString() : Math.floor(current);
          counter.textContent = formatted + suffix;
        }, stepTime);
      });
    }
  }, { threshold: 0.3 });

  statsObserver.observe(statsContainer);
}

// ===== HERO DYNAMIC TYPING EFFECT =====
const typingEl = document.querySelector('.typing-text');
if (typingEl) {
  const titles = [
    'IT Infrastructure & Systems Manager',
    'Information Technology Officer',
    'Enterprise Systems & M365 Administrator',
    'Apple & Mosyle MDM Specialist',
    'EdTech & IT Operations Engineer'
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentTitle = titles[titleIndex];

    if (!isDeleting) {
      typingEl.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentTitle.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1600);
        return;
      }
      setTimeout(typeEffect, 65);
    } else {
      typingEl.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeEffect, 400);
        return;
      }
      setTimeout(typeEffect, 30);
    }
  }

  typeEffect();
}

// ===== TOMASZ GAJDA PORTFOLIO FILTER TABS =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'perspective(1000px) rotateX(8deg) translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'perspective(1000px) rotateX(0) translateY(0)';
          }, 40);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = contactForm.querySelector('[name="name"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const subject = contactForm.querySelector('[name="subject"]')?.value.trim() || 'General Inquiry';
    const message = contactForm.querySelector('[name="message"]').value.trim();

    if (!name || !message) {
      alert('Please fill in your name and message.');
      return;
    }

    const whatsappNumber = '971544568425';
    const formattedText = `Hello Rab Nawaz,\n\nMy Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedText)}`;

    window.open(whatsappUrl, '_blank');
    contactForm.reset();
  });
}

// Fallback email button handler
const emailFormBtn = document.getElementById('btn-send-email');
if (emailFormBtn && contactForm) {
  emailFormBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const name = contactForm.querySelector('[name="name"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const subject = contactForm.querySelector('[name="subject"]')?.value.trim() || 'Portfolio Inquiry';
    const message = contactForm.querySelector('[name="message"]').value.trim();

    const bodyText = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:rabnawaz91@hotmail.com?subject=${encodeURIComponent(subject)}&body=${bodyText}`;
  });
}

// ===== SMOOTH SCROLLING FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId === '') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
