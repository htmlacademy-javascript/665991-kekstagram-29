import { closeImagePreview } from './image-upload.js';
import { isEscape } from './utils.js';
import { closeImagePreviewAllData } from './image-upload.js';

const body = document.body;

const closeAlert = (evt, popup) => {
  if (isEscape(evt)) {
    document.removeEventListener('keydown', closeAlert);
  }
  popup.remove();
};

const closeAlertOnUtsideClick = (evt, popupElement) => {
  const errorInnerElement = document.querySelector('.error__inner');
  const isOutsideClick = !evt.composedPath().includes(errorInnerElement);
  if (isOutsideClick) {
    popupElement.remove();
  }
};

const showSuccessMessage = () => {
  closeImagePreviewAllData();
  const popupSectionElement = document.querySelector('#success').content.querySelector('.success');
  const successPopupElement = popupSectionElement.cloneNode(true);
  body.append(successPopupElement);
  const onSuccessButtonClick = document.querySelector('.success__button');

  document.addEventListener('keydown', (evt) => {
    closeAlert(evt, successPopupElement);
  });
  onSuccessButtonClick.addEventListener('click', (evt) => {
    closeAlert(evt, successPopupElement);
  });
  successPopupElement.addEventListener('click', (evt) => {
    closeAlertOnUtsideClick(evt, successPopupElement);
  });
};

const showErrorMessage = () => {
  closeImagePreview();
  const errorSectionElement = document.querySelector('#error').content.querySelector('.error');
  const errorPopupElement = errorSectionElement.cloneNode(true);
  body.append(errorPopupElement);
  const errorButton = document.querySelector('.error__button');

  document.addEventListener('keydown', (evt) => {
    closeAlert(evt, errorPopupElement);
  });
  errorButton.addEventListener('click', (evt) => {
    closeAlert(evt, errorPopupElement);
  });

  errorPopupElement.addEventListener('click', (evt) => {
    closeAlertOnUtsideClick(evt, errorPopupElement);
  });
};

const showGetDataErrorMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'pink';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

export { showSuccessMessage, showErrorMessage, showGetDataErrorMessage };
