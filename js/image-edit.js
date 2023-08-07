const smallButtonElement = document.querySelector('.scale__control--smaller');
const bigButtonElement = document.querySelector('.scale__control--bigger');
const radioButtons = document.querySelectorAll('.effects__radio');
const imageScaleInputElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectValueFieldElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');

const SCALE_STEP = 25;
const MAX_IMAGE_SCALE = 100;

const imageScaleTransformation = (numericScale) => {
  imagePreviewElement.style.transform = `scale(${numericScale * 0.01})`;
};

const onSmallButtonClick = () => {
  let imgScl = imageScaleInputElement.value.replace('%', '');
  if (imgScl > SCALE_STEP) {
    imgScl -= SCALE_STEP;
    imageScaleInputElement.value = `${imgScl}%`;
    imageScaleTransformation(imgScl);
  }
};

smallButtonElement.addEventListener('click', onSmallButtonClick);

const onBigButtonClick = () => {
  const imgScl = imageScaleInputElement.value.replace('%', '');
  if (imgScl < MAX_IMAGE_SCALE) {
    let numScl = parseInt(imgScl, 10);
    numScl += SCALE_STEP;
    imageScaleInputElement.value = `${numScl  }%`;
    imageScaleTransformation(numScl);
  }
};

bigButtonElement.addEventListener('click', onBigButtonClick);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
});

const changeSliderScale = (effectName) => {
  switch(effectName) {
    case 'chrome':
      effectValueFieldElement.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      break;
    case 'sepia':
      effectValueFieldElement.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      break;
    case 'marvin':
      effectValueFieldElement.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1
      });
      break;
    case 'phobos':
      effectValueFieldElement.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      break;
    case 'heat':
      effectValueFieldElement.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      break;
    case 'none':
      imagePreviewElement.style.filter = null;
      effectValueFieldElement.classList.add('hidden');
      break;
  }
};

const onRadioButtonClick = (event) => {
  imagePreviewElement.classList = '';
  imagePreviewElement.classList.add(`effects__preview--${event.target.value}`);
  changeSliderScale(event.target.value);
};

for (const radioButtonElement of radioButtons) {
  radioButtonElement.addEventListener('change', onRadioButtonClick);
}

sliderElement.noUiSlider.on('update', () => {
  const levelSlider = sliderElement.noUiSlider.get();
  const effectClass = imagePreviewElement.classList.value;
  switch(effectClass) {
    case 'effects__preview--chrome':
      imagePreviewElement.style.filter = `grayscale(${levelSlider})`;
      break;
    case 'effects__preview--sepia':
      imagePreviewElement.style.filter = `sepia(${levelSlider})`;
      break;
    case 'effects__preview--marvin':
      imagePreviewElement.style.filter = `invert(${levelSlider}%)`;
      break;
    case'effects__preview--phobos':
      imagePreviewElement.style.filter = `blur(${levelSlider}px)`;
      break;
    case 'effects__preview--heat':
      imagePreviewElement.style.filter = `brightness(${levelSlider})`;
      break;
  }
  effectLevelValueElement.value = levelSlider;
});
