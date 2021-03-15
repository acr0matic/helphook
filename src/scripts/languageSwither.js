const languageComponent = document.querySelectorAll('.language');

languageComponent.forEach(component => {
  const arrow = component.querySelector('.language__control');
  const element = component.querySelector('.language__item');

  element.addEventListener('click', () => {
    const items = component.querySelectorAll('.language__item--hide');
    const container = component.querySelector('.language__container');

    items.forEach(item => item.classList.toggle('language__item--visible'));

    container.classList.toggle('language__container--open');
    arrow.classList.toggle('language__control--open')
  });
});
