const responsePageElement = document.querySelector(`.response-page`);
const responseWrapElement = document.querySelector(`.response-page__wrap`);
const responseFormElement = document.querySelector(`.response-page__form`);

const nameInputElement = document.querySelector(`input[name="name"]`);
const phoneInputElement = document.querySelector(`input[name="phone"]`);
const emailInputElement = document.querySelector(`input[name="email"]`);
const orderInputElement = document.querySelector(`input[name="order"]`);
const cityInputElement = document.querySelector(`input[name="city"]`);
const typeInputElement = document.querySelector(`select[name="type"]`);
const subjectInputElement = document.querySelector(`input[name="subject"]`);
const messageInputElement = document.querySelector(`textarea[name="message"]`);
const captureInputElement = document.querySelector(`input[name="capture"]`);

const sendResponseButton = responsePageElement.querySelector(`.js--sendResponseButton`);

const renderAnswer = () => {
  const answerWrapElement = createDiv(`response-page__answerWrap`);
  responseWrapElement.append(answerWrapElement);

  const textElement = createParagraph(`response-page__answerText`, `Спасибо за ваше обращение! <br> В ближайшее время мы свяжемся с вами.`)
  answerWrapElement.append(textElement);
};

sendResponseButton.addEventListener(`click`, () => {
  responseFormElement.dataset.mode = `progress`;

  getData({
    ["set_feedback"]: {
      ["name"]: nameInputElement.value,
      ["phone"]: phoneInputElement.value,
      ["email"]: emailInputElement.value,
      ["order"]: orderInputElement.value,
      ["city"]: cityInputElement.value,
      ["type"]: typeInputElement.value,
      ["subject"]: subjectInputElement.value,
      ["message"]: messageInputElement.value,
      ["capture"]: captureInputElement.value,
    }
  })
  .then((response) => {
    if (response.result === `OK`) {
      responseFormElement.remove();
      renderAnswer();
    } else {
      responseFormElement.dataset.mode = `input`;
    }
  });
});

// error: "Неправильно введён код"
// result: "ERROR"