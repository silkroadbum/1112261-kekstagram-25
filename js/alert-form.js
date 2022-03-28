const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const showAlertSuccesForm = () => {
  const message = successTemplate.cloneNode(true);
  document.body.appendChild(message);
};

const showAlertErrorForm = () => {
  const message = errorTemplate.cloneNode(true);
  document.body.appendChild(message);
};

export {showAlertSuccesForm, showAlertErrorForm};
