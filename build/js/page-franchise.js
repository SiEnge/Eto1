const callbackButton = document.querySelector(`.franchise-page__callbackButton`);
const callbackModalElement = document.querySelector(`.js--callbackModal`);

if (callbackButton) {
  callbackButton.addEventListener(`click`, () => {
    callbackModalElement.classList.add(`modal--show`);
    document.addEventListener(`keydown`, onEscPressModalHandler);
  });
}

const phoneInputElement = callbackModalElement.querySelector(`input[name="phone"]`);

const sendRequestButton = document.querySelector(`.js--sendRequestButton`);

sendRequestButton.addEventListener(`click`, () => {
  
  const nameInput = callbackModalElement.querySelector(`input[name="name"]`);
  const emailInput = callbackModalElement.querySelector(`input[name="email"]`);
  const cityInput = callbackModalElement.querySelector(`input[name="city"]`);
  const captureInputElement = callbackModalElement.querySelector(`input[name="capture"]`);

  const wrapButtonElement = callbackModalElement.querySelector(`.modal__buttonWrap`);
  const errorMessageElement = callbackModalElement.querySelector(`.modal__errorMessage`);

  wrapButtonElement.dataset.mode = `progress`;
  errorMessageElement.textContent = ``;

  getData({
    ["set_business_feedback"]: {
      ["name"]: nameInput.value,
      ["phone"]: phoneInputElement.value,
      ["email"]: emailInput.value,
      ["city"]: cityInput.value,
      ["capture"]: captureInputElement.value,
    }
  })
  .then((response) => {
    if (response.result == `OK`) {
      callbackModalElement.classList.remove(`modal--show`);
      document.removeEventListener(`keydown`, onEscPressModalHandler);
  
      nameInput.value = ``;
      phoneInputElement.value = ``;
      emailInput.value = ``;
      cityInput.value = ``;
    }
    if (response.result == `ERROR`) {
      errorMessageElement.textContent = response.error;
    }
  })
  .finally(() => {
    wrapButtonElement.dataset.mode = `button`;
  });
});
