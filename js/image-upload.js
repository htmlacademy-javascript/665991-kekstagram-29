import { resetInputErrors } from './validation-form.js';
import { isEscape } from './utils.js';

const uploadImageInputElement = document.querySelector('.img-upload__input');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const closeButtonElement = document.querySelector('.img-upload__cancel');
const hashtagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');
const imageScaleValueElement = document.querySelector('.scale__control--value');
const body = document.body;

const DEFAULT_IMAGE_SCALE = 100;

const closeImagePreview = () => {
  uploadOverlayElement.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadImageInputElement.value = '';
  imagePreviewElement.classList = '';
  imagePreviewElement.style.filter = null;
  imagePreviewElement.style.transform = null;
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  imageScaleValueElement.value = `${DEFAULT_IMAGE_SCALE}%`;
};

const clearHashtagsAndComments = () => {
  hashtagInputElement.value = '';
  commentInputElement.value = '';
  resetInputErrors();
};

const closeImagePreviewAllData = () => {
  closeImagePreview();
  clearHashtagsAndComments();
};

const onDocumentEscapeKeydown = (evt) => {
  if (hashtagInputElement === document.activeElement) {
    evt.stopPropagation();
  } else if (commentInputElement === document.activeElement) {
    evt.stopPropagation();
  } else if (isEscape(evt)) {
    closeImagePreviewAllData();
    document.removeEventListener('keydown', onDocumentEscapeKeydown);
    document.location.reload();
  }
};

const onUploadImageInputChange = () => {
  uploadOverlayElement.classList.remove('hidden');
  body.classList.add('modal-open');
  imagePreviewElement.src = URL.createObjectURL(uploadImageInputElement.files[0]);
  document.getElementById('effect-none').checked = true;
  imageScaleValueElement.value = `${DEFAULT_IMAGE_SCALE}%`;
  document.addEventListener('keydown', onDocumentEscapeKeydown);
};

uploadImageInputElement.addEventListener('change', onUploadImageInputChange);

const onCloseButtonClick = () => {
  closeImagePreviewAllData();
};

closeButtonElement.addEventListener('click', onCloseButtonClick);

export { closeImagePreview, closeImagePreviewAllData };
