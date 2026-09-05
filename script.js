const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('.desktop-nav');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('mobile-open');
  });
}
