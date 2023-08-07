const hashtagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');
const submitFormElement = document.querySelector('.img-upload__form');

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;

const pristine = new Pristine(submitFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-danger',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form-text-error' ,
});

pristine.addValidator(hashtagInputElement, (value) => {
  const hashtagList = value.split(/\s/);
  if (hashtagList.length === 1 && hashtagList[0] === '') {
    return true;
  }
  if (new Set(hashtagList).size !== hashtagList.length) {
    return false;
  }
  if (hashtagList.length > MAX_HASHTAG_COUNT) {
    return false;
  }
  for (let i = 0; i < hashtagList.length; i++) {
    const validationTemplate = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
    const testResult = validationTemplate.test(hashtagList[i]);
    if (!testResult) {
      return false;
    }
  }
  return true;
}, 'Введен некорректный хэштэг', 1, false);

pristine.addValidator(commentInputElement, (value) => {
  if (value.length > MAX_COMMENT_LENGTH) {
    return false;
  }
  return true;
}, `Комментарий не может превышать ${ MAX_COMMENT_LENGTH } символов`, 1, false);

const resetInputErrors = () => {
  pristine.reset();
};

export { pristine, resetInputErrors };
