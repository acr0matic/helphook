const forms = document.querySelectorAll('form');
let selectedValue;

forms.forEach(form => {
  const formMessage = form.querySelector('.form__info');
  const formType = form.getAttribute('data-form');

  const fields = form.querySelectorAll('input, textarea');
  const requiredFields = form.querySelectorAll('[data-required]');

  const action = form.getAttribute('action');

  let formData;

  requiredFields.forEach(field => {
    field.addEventListener('click', () => {
      field.classList.remove('input-field--error')
      formMessage.classList.remove('form__info--show');
      formMessage.classList.remove('form__info--error');
    });
  });

  form.onsubmit = async (e) => {
    e.preventDefault();

    if (InputValidation(requiredFields)) {
      formData = new FormData(form);
      formData.append('user_select', selectedValue);
      formData.append('form_type', formType);

      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      ClearForm(requiredFields);
    }

    else {
      formMessage.innerHTML = 'Вы ошиблись при вводе! Попробуйте снова.'
      formMessage.classList.add('form__info--show', 'form__info--error');
    }
  };
});

function InputValidation(inputs) {
  let isValide = false;

  inputs.forEach(field => {

    if (field.tagName !== 'UL') {
      if (!field.value) {
        field.classList.add('input-field--error')
        isValide = false;
      }

      else isValide = true;
    }

    else {
      const selected = field.querySelector(".select__item--selected");

      if (selected) selectedValue = selected.innerHTML;
      else field.classList.add('input-field--error');
    }
  });

  return isValide;
}

function ClearForm(fields) {
  fields.forEach(field => {
    field.value = '';

    if (field.tagName === 'UL') {
      const defaultItem = field.querySelector('li[style="display: none;"]');
      const selectedItem = field.querySelector('.select__item--selected');

      defaultItem.style.display = 'block';
      selectedItem.classList.remove('select__item--selected');
    }
  });
}