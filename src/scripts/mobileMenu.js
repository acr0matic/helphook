const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOpen = document.querySelector('.header__mobile-button');
const mobileMenuClose = mobileMenu.querySelector('.mobile-menu__close');
const mobileMenuItems = mobileMenu.querySelectorAll('.mobile-menu__item');

mobileMenuOpen.addEventListener('click', () => {
  mobileMenu.classList.toggle('mobile-menu--open')
});

mobileMenuClose.addEventListener('touchend', () => {
  mobileMenu.classList.toggle('mobile-menu--open')
});

mobileMenuItems.forEach(item => {
  item.addEventListener('click', () => {
    mobileMenu.classList.toggle('mobile-menu--open')
  });
});