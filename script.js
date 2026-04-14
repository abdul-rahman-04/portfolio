// ── PHOTO ERROR HANDLER ──
const heroPhoto = document.getElementById('heroPhoto');
if (heroPhoto) {
  heroPhoto.addEventListener('error', function () {
    this.classList.add('error');
  });
}

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

// ── SKILL BARS ──
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(el => barObserver.observe(el));

// ── TYPING EFFECT ──
const roles = [
  'Electrical & Electronics Engineer',
  'Python Software Developer',
  'Database Administrator',
  'Logical Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const titleEl = document.querySelector('.hero-title');

// Set up title node
titleEl.innerHTML = '';
titleEl.appendChild(document.createTextNode(''));
const cursor = document.createElement('span');
cursor.className = 'cursor';
titleEl.appendChild(cursor);

function type() {
  const current = roles[roleIndex];

  if (!deleting) {
    titleEl.childNodes[0].textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 2200);
      return;
    }
  } else {
    titleEl.childNodes[0].textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(type, deleting ? 50 : 90);
}

setTimeout(type, 1400);

function handleSubmit(e) {
  const btn = e.target.querySelector('button');
  btn.textContent = 'Sending...';
}
onsubmit="handleSubmit(event)"