const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
const themeToggle = document.querySelector('.theme-toggle');
const currentYear = document.querySelector('#year');

function setTheme(theme, persist = true) {
  const isDark = theme === 'dark';
  document.body.dataset.theme = isDark ? 'dark' : 'light';
  themeToggle.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
  themeToggle.setAttribute('title', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
  themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀' : '☾';
  document.querySelector('meta[name="theme-color"]').content = isDark ? '#493035' : '#f7e5e8';

  if (persist) {
    try {
      localStorage.setItem('mannabom-theme', isDark ? 'dark' : 'light');
    } catch {
      // Theme switching still works when browser storage is unavailable.
    }
  }
}

let savedTheme = 'light';
try {
  savedTheme = localStorage.getItem('mannabom-theme') || 'light';
} catch {
  // Use the light theme when browser storage is unavailable.
}
setTheme(savedTheme, false);

themeToggle.addEventListener('click', () => {
  setTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark');
});

function setMenuOpen(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  primaryNav.classList.toggle('is-open', open);
}

menuToggle.addEventListener('click', () => {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

primaryNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuOpen(false);
});

document.addEventListener('click', (event) => {
  if (!primaryNav.contains(event.target) && !menuToggle.contains(event.target)) {
    setMenuOpen(false);
  }
});

currentYear.textContent = new Date().getFullYear();
