const languageComponent = document.querySelectorAll('.language');

languageComponent.forEach(component => {
  const languageSwitcher = component.querySelector('.language__control');

  languageSwitcher.addEventListener('click', () => {
    const items = component.querySelectorAll('.language__item--hide');
    const container = component.querySelector('.language__container');

    items.forEach(item => item.classList.toggle('language__item--visible'));

    container.classList.toggle('language__container--open');
    languageSwitcher.classList.toggle('language__control--open')
  });
});
