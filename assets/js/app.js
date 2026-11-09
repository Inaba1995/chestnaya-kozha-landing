const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = mobileMenu.querySelectorAll('a');
const revealElements = document.querySelectorAll('.reveal');
const magneticButtons = document.querySelectorAll('.magnetic');
const heroParallax = document.querySelector('.hero__bg');
const smartForm = document.getElementById('smartForm');
const toMax = document.getElementById('toMax');

const TELEGRAM_USERNAME = 'Anna_Grom_kosmetolog';

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach((el) => observer.observe(el));

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (scrolled > 40) header.classList.add('header--scrolled');
  else header.classList.remove('header--scrolled');

  if (heroParallax) {
    heroParallax.style.transform = `translateY(${scrolled * 0.12}px)`;
  }
});

magneticButtons.forEach((btn) => {
  const strength = 10;
  btn.addEventListener('mousemove', (event) => {
    const rect = btn.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

function buildTelegramLink(name, concern) {
  const text = `Привет! Меня зовут ${name.trim()}, меня беспокоит ${concern}. Хочу записаться на консультацию.`;
  return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(text)}`;
}

function buildMaxLink(name, concern) {
  const text = `Привет! Меня зовут ${name.trim()}, меня беспокоит ${concern}. Хочу записаться на консультацию.`;
  return `https://max.ru/share?text=${encodeURIComponent(text)}`;
}

if (smartForm) {
  smartForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(smartForm);
    const name = formData.get('name');
    const concern = formData.get('concern');
    if (!name || !concern) return;
    window.open(buildTelegramLink(name, concern), '_blank', 'noopener');
  });
}

if (toMax) {
  toMax.addEventListener('click', () => {
    const nameInput = smartForm?.querySelector('input[name="name"]');
    const concernSelect = smartForm?.querySelector('select[name="concern"]');
    const name = nameInput?.value || '';
    const concern = concernSelect?.value || '';
    if (!name || !concern) {
      smartForm?.reportValidity();
      smartForm?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    window.open(buildMaxLink(name, concern), '_blank', 'noopener');
  });
}
