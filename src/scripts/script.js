const languageSwitcher = document.getElementById('languageSwitcher');
const languageComponent = document.getElementById('languageComponent');

languageSwitcher.addEventListener('click', () => {
  const items = languageComponent.querySelectorAll('.language__item--hide');
  const container = languageComponent.querySelector('.language__container');

  items.forEach(item  => {
    item.classList.toggle('language__item--visible');
  });

  container.classList.toggle('language__container--open');
  languageSwitcher.classList.toggle('language__control--open')
});