const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
const themeToggle = document.querySelector('.theme-toggle');
const currentYear = document.querySelector('#year');
const signupModal = document.querySelector('#signup-modal');
const signupForm = document.querySelector('#signup-form');
const signupCloseButton = document.querySelector('.signup-close');
const signupLink = 'https://form.naver.com/response/FLbXgttDDTc';
let signupOpener = null;

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

function openSignup() {
  signupOpener = document.activeElement;
  signupModal.classList.add('is-open');
  signupModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  if (!signupForm.hasAttribute('src')) signupForm.src = signupLink;
  signupCloseButton.focus();
}

function closeSignup() {
  if (!signupModal.classList.contains('is-open')) return;
  signupModal.classList.remove('is-open');
  signupModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  signupOpener?.focus();
}

document.querySelectorAll('[data-open-signup]').forEach((button) => {
  button.addEventListener('click', openSignup);
});
document.querySelectorAll('[data-close-signup]').forEach((button) => {
  button.addEventListener('click', closeSignup);
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
  if (event.key === 'Escape') {
    closeSignup();
    setMenuOpen(false);
  }
  if (event.key === 'Tab' && signupModal.classList.contains('is-open')) {
    if (event.shiftKey && document.activeElement === signupCloseButton) {
      event.preventDefault();
      document.querySelector('.signup-fallback').focus();
    } else if (!event.shiftKey && document.activeElement === document.querySelector('.signup-fallback')) {
      event.preventDefault();
      signupCloseButton.focus();
    }
  }
});

document.addEventListener('click', (event) => {
  if (!primaryNav.contains(event.target) && !menuToggle.contains(event.target)) {
    setMenuOpen(false);
  }
});

currentYear.textContent = new Date().getFullYear();
