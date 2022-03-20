import {imageUser} from './scale-image.js';

const sliderElement = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const radioButtonsEffect = document.querySelectorAll('.effects__radio');


const effects = {
  'chrome' : {
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    class: 'effects__preview--chrome',
    filter: 'grayscale',
    unit: ''
  },
  'sepia' : {
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    class: 'effects__preview--sepia',
    filter: 'sepia',
    unit: ''
  },
  'marvin' : {
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    class: 'effects__preview--marvin',
    filter: 'invert',
    unit: '%'
  },
  'phobos' : {
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
    class: 'effects__preview--phobos',
    filter: 'blur',
    unit: 'px'
  },
  'heat' : {
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
    class: 'effects__preview--heat',
    filter: ' brightness',
    unit: ''
  }
};

const clearClassesImage = () => {
  for (const element in effects) {
    imageUser.classList.remove(effects[element].class);
  }
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

sliderElement.style.visibility = 'hidden';
sliderValue.value = '';

for (const radioButtonEffect of radioButtonsEffect) {
  radioButtonEffect.addEventListener('change', (evt) => {
    clearClassesImage();
    if (evt.target.checked) {
      if (evt.target.value === 'none') {
        sliderElement.style.visibility = 'hidden';
        sliderValue.value = '';
        imageUser.style.filter = '';
      } else {
        sliderElement.style.visibility = 'visible';
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: effects[radioButtonEffect.value].min,
            max: effects[radioButtonEffect.value].max
          },
          start: effects[radioButtonEffect.value].start,
          step: effects[radioButtonEffect.value].step
        });
        imageUser.classList.add(effects[radioButtonEffect.value].class);
        sliderElement.noUiSlider.on('update', () => {
          sliderValue.value = sliderElement.noUiSlider.get();
          imageUser.style.filter = `${effects[radioButtonEffect.value].filter}(${sliderValue.value}${effects[radioButtonEffect.value].unit})`;
        });
      }
    }
  });
}

export {clearClassesImage};
