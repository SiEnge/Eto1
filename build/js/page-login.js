const loginPageElement = document.querySelector(`.login-page`);
const ordersListElement = loginPageElement.querySelector(`.login-page__ordersList`);
let showNextOrdersButtonElement = null;
let countShowOrders = 0;

const paymentsListElement = loginPageElement.querySelector(`.login-page__paymentsList`);
let showNextPaymentsButtonElement = null;
let countShowPayments = 0;

const getOrderIdByUrl = () => {
  if (window.location.search.indexOf(`?orders`) < 0) {
    return ``;
  }
  
  return getUrlSearch(`id`) || ``;
};

const renderShowOrdersButton = () => {
  const ordersSection = loginPageElement.querySelector(`.login-page__section--orders`)

  showNextOrdersButtonElement = createButton(`Показать еще`, `login-page__showNextOrdersButton`);
  ordersSection.append(showNextOrdersButtonElement);

  showNextOrdersButtonElement.addEventListener(`click`, () => {
    getData({
      ["get_order_list"]: {
        ["start"]: countShowOrders,
        ["id"]: getOrderIdByUrl(),
      }
    })
    .then((response) => {
      if (response.result === `OK`) {
        renderLoginOrders(response.orders);
        if (Object.keys(response.orders).length < 10) {
          removeShowOrdersButton();
        }
        countShowOrders += 10;
      }
    });
  });

};

const removeShowOrdersButton = () => {
  showNextOrdersButtonElement.remove();
};

const renderCreditError = (orderData, errorMessage) => {
  window.scrollTo(0,0);

  const creditSection = loginPageElement.querySelector(`.login-page__section--credit`);
  creditSection.innerHTML = ``;

  const creditForm = createForm(`login-page__creditForm`);
  creditSection.append(creditForm);

  const titleElement = createParagraph(`login-page__creditTitle`, `Создание заявки на кредит по заказу №${orderData.order_id}`);
  creditForm.append(titleElement);

  const errorTextElement = createParagraph(`login-page__creditError`, `Ошибка: ${errorMessage}`);
  creditForm.append(errorTextElement);
};

const renderCreditOrderForm = (orderData) => {
  const creditData = orderData.creditData;

  window.scrollTo(0,0);

  const creditSection = loginPageElement.querySelector(`.login-page__section--credit`)
  creditSection.innerHTML = ``;

  const progressWrapElement = createDiv(`login-page__progress`);
  creditSection.append(progressWrapElement);

  const progressElement = createImage(``, `/sienge/img/load_bar.gif`);
  progressWrapElement.append(progressElement);

  const creditForm = createForm(`login-page__creditForm`);
  creditSection.append(creditForm);

  if (!creditData.credit_date) {
    const titleElement = createParagraph(`login-page__creditTitle`, `Создание заявки на ${creditData.credit_type_v} по заказу №${orderData.order_id}`)
    creditForm.append(titleElement);
  } else {
    const title1Element = createParagraph(`login-page__creditTitle`, `Заявка на ${creditData.credit_type_v} по заказу №${orderData.order_id} уже создавалась. <br>
    Дата создания заявки: ${creditData.credit_date}.`)
    creditForm.append(title1Element);

    const title2Element = createParagraph(`login-page__creditTitle`, `Повторное создание заявки на ${creditData.credit_type_v} по заказу №${orderData.order_id}.`)
    creditForm.append(title2Element);
  }

  const titleTableElement = createParagraph(`login-page__creditText`, `Состав заказа:`)
  creditForm.append(titleTableElement);

  // таблица с товарами - нужен orderData
  const orderTable = createTable(`login-page__creditTable`);
  creditForm.append(orderTable);

  const headerTable = createTableHeaderRow(``, 3, [`Наименование`, `Количество`, `Цена, руб.`]);
  orderTable.append(headerTable);

  Object.keys(orderData.items)
  .forEach((key) => {
    const product = orderData.items[key];

    if (product.item_credit) {
      const tableRow = createTableRow(``, 3, [product.item_name, product.item_count, product.item_price]);
      orderTable.append(tableRow);
    }
  });

  const priceTextElement = createParagraph(`login-page__creditText`, `Итого: ${getFormattedPrice(orderData.order_sum)} руб.`)
  creditForm.append(priceTextElement);

  if (creditData.point_address) {
    const addressPickupElement = createParagraph(`login-page__creditText`, `Пункт выдачи заказа: ${creditData.point_address}`)
    creditForm.append(addressPickupElement);
  }

  // фамилия
  const lastnameInputWrapElement = createParagraph(`login-page__creditInput input`, ``)
  creditForm.append(lastnameInputWrapElement);

  const lastnameLabel = createLabel(``, `Фамилия:`);
  lastnameLabel.htmlFor = `credit_lastname`;
  lastnameInputWrapElement.append(lastnameLabel);

  const lastnameInput = createInput(``, `text`, userData.name_f);
  lastnameInput.id = `credit_lastname`;
  lastnameInputWrapElement.append(lastnameInput);
  
  // имя
  const nameInputWrapElement = createParagraph(`login-page__creditInput input`, ``)
  creditForm.append(nameInputWrapElement);

  const nameLabel = createLabel(``, `Имя:`);
  nameLabel.htmlFor = `credit_name`;
  nameInputWrapElement.append(nameLabel);

  const nameInput = createInput(``, `text`, userData.name_i);
  nameInput.id = `credit_name`;
  nameInputWrapElement.append(nameInput);

  // отчество
  const middlenameInputWrapElement = createParagraph(`login-page__creditInput input`, ``)
  creditForm.append(middlenameInputWrapElement);

  const middlenameLabel = createLabel(``, `Отчество:`);
  middlenameLabel.htmlFor = `credit_middlename`;
  middlenameInputWrapElement.append(middlenameLabel);

  const middlenameInput = createInput(``, `text`, userData.name_o);
  middlenameInput.id = `credit_middlename`;
  middlenameInputWrapElement.append(middlenameInput);
  
  // дата рождения
  const bdayInputWrapElement = createParagraph(`login-page__creditInput input`, ``)
  creditForm.append(bdayInputWrapElement);

  const bdayLabel = createLabel(``, `Дата рождения:`);
  bdayLabel.htmlFor = `credit_bday`;
  bdayInputWrapElement.append(bdayLabel);

  const bdayInput = createInput(``, `date`, userData.birthday);
  bdayInput.id = `credit_bday`;
  bdayInputWrapElement.append(bdayInput);

  // моб телефон + маска
  const phoneInputWrapElement = createParagraph(`login-page__creditInput input`, ``)
  creditForm.append(phoneInputWrapElement);

  const phoneLabel = createLabel(``, `Мобильный телефон:`);
  phoneLabel.htmlFor = `credit_phone`;
  phoneInputWrapElement.append(phoneLabel);

  const phoneInput = createInput(``, `tel`, userData.phone);
  phoneInput.id = `credit_phone`;
  phoneInputWrapElement.append(phoneInput);

  IMask(phoneInput, {
    mask: '+{7} (000) 000-00-00'
  });

  phoneInput.focus();
  phoneInput.blur();

  // паспорт 
  // const passportTextElement = createParagraph(`login-page__creditText`, `Паспорт:`)
  // creditForm.append(passportTextElement);

  // серия 
  const passportSeriesInputWrapElement = createParagraph(`login-page__creditInput input`, ``)
  creditForm.append(passportSeriesInputWrapElement);

  const passportSeriesLabel = createLabel(``, `Серия паспорта:`);
  passportSeriesLabel.htmlFor = `credit_passportSeries`;
  passportSeriesInputWrapElement.append(passportSeriesLabel);

  const passportSeriesInput = createInput(``, `text`, ``);
  passportSeriesInput.id = `credit_passportSeries`;
  passportSeriesInputWrapElement.append(passportSeriesInput);

  // номер
  const passportNumberInputWrapElement = createParagraph(`login-page__creditInput input`, ``)
  creditForm.append(passportNumberInputWrapElement);

  const passportNumberLabel = createLabel(``, `Номер паспорта:`);
  passportNumberLabel.htmlFor = `credit_passportNumber`;
  passportNumberInputWrapElement.append(passportNumberLabel);

  const passportNumberInput = createInput(``, `text`, ``);
  passportNumberInput.id = `credit_passportNumber`;
  passportNumberInputWrapElement.append(passportNumberInput);

  // дата
  const passportDateInputWrapElement = createParagraph(`login-page__creditInput input`, ``)
  creditForm.append(passportDateInputWrapElement);

  const passportDateLabel = createLabel(``, `Дата выдачи:`);
  passportDateLabel.htmlFor = `credit_passportDate`;
  passportDateInputWrapElement.append(passportDateLabel);

  const passportDateInput = createInput(``, `date`, ``);
  passportDateInput.id = `credit_passportDate`;
  passportDateInputWrapElement.append(passportDateInput);

  // выпадающий список Размр первоначального взноса
  const downpaymentSelectWrapElement = createParagraph(`login-page__creditSelect input`, ``)
  creditForm.append(downpaymentSelectWrapElement);

  const downpaymentLabel = createLabel(``, `Размер первоначального взноса:`);
  downpaymentLabel.htmlFor = `downpayment`;
  downpaymentSelectWrapElement.append(downpaymentLabel);

  const downpaymentSelect = createSelect(`downpayment`, `downpayment`);
  downpaymentSelectWrapElement.append(downpaymentSelect);

  const downpaymentOption = createOption(``, `Выберите из списка`);
  downpaymentOption.disabled = true;
  downpaymentOption.selected = true;
  downpaymentSelect.append(downpaymentOption);

  Object.keys(creditData.downpayment).forEach((itemId, i) => {
    const downpayment = creditData.downpayment[itemId];

    const option = createOption(``, `${downpayment.percent}% (${getFormattedPrice(downpayment.price)} руб.)`);
    option.value = downpayment.percent;

    downpaymentSelect.append(option);
  });

  // выпадающий список Срок кредита
  const periodSelectWrapElement = createParagraph(`login-page__creditSelect input`, ``)
  creditForm.append(periodSelectWrapElement);

  const periodLabel = createLabel(``, `Срок кредита в месяцах:`);
  periodLabel.htmlFor = `period`;
  periodSelectWrapElement.append(periodLabel);

  const periodSelect = createSelect(`period`, `period`);
  periodSelectWrapElement.append(periodSelect);

  const periodOption = createOption(``, `Выберите из списка`);
  periodOption.disabled = true;
  periodOption.selected = true;
  periodSelect.append(periodOption);

  Object.keys(creditData.credit_period).forEach((itemId, i) => {
    const period = creditData.credit_period[itemId];

    const option = createOption(``, `${period} мес.`);
    option.value = period;

    periodSelect.append(option);
  });

  const noteTextElement = createParagraph(`login-page__creditText`, `Нажатием кнопки «Отправить заявку» Вы даёте согласие на обработку своих персональных данных.`)
  creditForm.append(noteTextElement);

  const sendCreditButtonElement = createButton(`Отправить заявку`, `login-page__sendCreditButton`);
  creditForm.append(sendCreditButtonElement);

  sendCreditButtonElement.addEventListener(`click`, () => {
    creditForm.dataset.mode = `hide`;
    creditSection.dataset.inProgress = true;

    getData({
      ["set_credit_create"]: {
        ["order_id"]: orderData.order_id,
        ["name_f"]: lastnameInput.value,
        ["name_i"]: nameInput.value,
        ["name_o"]: middlenameInput.value,
        ["phone"]: phoneInput.value,
        ["birthday"]: bdayInput.value,
        ["pass_series"]: passportSeriesInput.value,
        ["pass_number"]: passportNumberInput.value,
        ["pass_date"]: passportDateInput.value,
        ["downpayment"]: downpaymentSelect.value, 
        ["credit_period"]: periodSelect.value
      }
    })
    .then((response) => {
      if (response.result === `OK`) {
        const messageElement = createParagraph(`login-page__message`, response.message);
        creditSection.append(messageElement);

        creditForm.remove();
      }

      if (response.result === `ERROR`) {
        creditForm.dataset.mode = `show`;
      }

      creditSection.dataset.inProgress = false;
    });
  });
};

const showCreditForm = (orderData) => {
  const activeButton = Array.from(navButtons).find((button) => button.classList.contains(`login-page__navButton--active`));
  if (activeButton) {
    activeButton.classList.remove(`login-page__navButton--active`);
  }

  renderCreditOrderForm(orderData);

  contentElement.dataset.mode = `credit`;
};

const showCreditError = (orderData, errorMessage) => {
  const activeButton = Array.from(navButtons).find((button) => button.classList.contains(`login-page__navButton--active`));
  if (activeButton) {
    activeButton.classList.remove(`login-page__navButton--active`);
  }

  renderCreditError(orderData, errorMessage);

  contentElement.dataset.mode = `credit`;
};

const renderLoginOrders = (orders) => {
  Object.keys(orders).forEach((itemId) => {
    const order = orders[itemId];

    const liItemElement = createListItem(`login-page__ordersItem`);
    liItemElement.dataset.mode = `hide`;
    liItemElement.id = order.order_id;
    ordersListElement.append(liItemElement);

    const orderWrapElement = createDiv(`login-page__order`);
    liItemElement.append(orderWrapElement);

    const orderButtonElement = createButton(`Заказ ${order.order_id} <span>от ${order.order_date}</span>`, `login-page__orderButton`);
    orderButtonElement.dataset.mode = `hide`;
    orderWrapElement.append(orderButtonElement);
    const svg = createSvg(``, `10`, `10`, `sienge/img/sprite.svg#arrow-small`);
    orderButtonElement.append(svg);

    orderButtonElement.addEventListener(`click`, () => {
      const mode = liItemElement.dataset.mode === `show` ? `hide` : `show`;
      liItemElement.dataset.mode = mode;
      orderButtonElement.dataset.mode = mode;
      
      if (mode === `show` && orderContentElement.dataset.get !== `true`) {
        getData({
          ["get_order_content"]: {
            ["order_id"]: order.order_id,
          }
        })
        .then((response) => {
          if (response.result === `OK`) {
            orderContentElement.dataset.get = `true`;
            renderLoginOrder(orderContentElement, response);
          }
        });
      }
    });

    const priceOrderElement = createPriceElement(`login-page__orderPrice`, order.order_sum);
    orderWrapElement.append(priceOrderElement);

    const orderState = ORDER_STATE[order.order_state];
    const statusOrderElement = createParagraph(`login-page__orderStatus`, orderState.title);
    statusOrderElement.style.backgroundColor = `#${orderState.color}`
    orderWrapElement.append(statusOrderElement);

    const orderContentElement = createDiv(`login-page__orderContent`);
    liItemElement.append(orderContentElement);
  });
};

const showPaymentForm = (orderData) => {
  const activeButton = Array.from(navButtons).find((button) => button.classList.contains(`login-page__navButton--active`));
  if (activeButton) {
    activeButton.classList.remove(`login-page__navButton--active`);
  }

  const currentButton = loginPageElement.querySelector(`.login-page__navButton[data-mode="pay"]`);
  if (currentButton) {
    currentButton.classList.add(`login-page__navButton--active`);
  }

  contentElement.dataset.mode = `payment`;

  const url = `${window.location.origin}/login?pay=${orderData.order_id}`;
  window.history.pushState(null, null, url);

  const paymentWrapElement = loginPageElement.querySelector(`.login-page__paymentWrap`);

  renderPaymentOrderForm(paymentWrapElement, orderData);
};

const renderPaymentOrderForm = (container, orderData) => {
  container.innerHTML = ``;

  window.scrollTo(0, 0);

  const wrapElement = createDiv(`login-page__paymentOrderWrap`);
  container.append(wrapElement);

  const titleElement = createParagraph(`login-page__paymentOrderTitle`, `Оплата заказа №${orderData.order_id} на сумму ${getFormattedPrice(orderData.order_sum)} руб.`)
  wrapElement.append(titleElement);

  const paymentOrderButton = createButton(`Оплатить ${getFormattedPrice(orderData.order_sum)} руб.`, `login-page__paymentOrderButton`);
  wrapElement.append(paymentOrderButton);

  let prepayOrderButton = null;

  if (orderData.allow_prepay) {
    prepayOrderButton = createButton(`Внести предоплату 20%`, `login-page__prepayOrderButton`);
    wrapElement.append(prepayOrderButton);
  }

  const progressWrapElement = createDiv(`login-page__progress`);
  wrapElement.append(progressWrapElement);
  const progressElement = createImage(``, `/sienge/img/load_bar.gif`);
  progressWrapElement.append(progressElement);

  const textElement = createParagraph(`login-page__paymentOrderText`, `Для оплаты (ввода реквизитов Вашей карты) Вы будете перенаправлены на платежный шлюз ПАО&nbsp;СБЕРБАНК. Соединение с платежным шлюзом и передача информации осуществляется в защищенном режиме с использованием протокола шифрования SSL. В случае если Ваш банк поддерживает технологию безопасного проведения интернет-платежей Verified&nbsp;By&nbsp;Visa или MasterCard&nbsp;SecureCode для проведения платежа также может потребоваться ввод специального пароля. Настоящий сайт поддерживает 256-битное шифрование. Конфиденциальность сообщаемой персональной информации обеспечивается ПАО&nbsp;СБЕРБАНК. Введенная информация не будет предоставлена третьим лицам за исключением случаев, предусмотренных законодательством РФ. Проведение платежей по банковским картам осуществляется в строгом соответствии с требованиями платежных систем МИР, Visa Int. и MasterCard Europe Sprl.<br>
  Cогласно 54-ФЗ кассовый чек будет предоставлен в момент передачи товара.`)
  wrapElement.append(textElement);  

  
  paymentOrderButton.addEventListener(`click`, () => {
    paymentOrderButton.remove();
    if (prepayOrderButton) {
      prepayOrderButton.remove();
    }

    wrapElement.dataset.inProgress = true;

    getData({
      ["get_payment_link"]: {
        ["mode"]: `pay`,
        ["order_id"]: orderData.order_id,
        ["order_sum"]: orderData.order_sum
      }
    })
    .then((response) => {
      if (response.result === `OK` && response.payment_link) {
        window.location.href = response.payment_link;
      }
      wrapElement.dataset.inProgress = false;

    });
  });

  if (prepayOrderButton) {
    prepayOrderButton.addEventListener(`click`, () => {
      prepayOrderButton.remove();
      paymentOrderButton.remove();
      wrapElement.dataset.inProgress = true;

      getData({
        ["get_payment_link"]: {
          ["mode"]: `prepay`,
          ["order_id"]: orderData.order_id,
          ["order_sum"]: orderData.order_sum
        }
      })
      .then((response) => {
        if (response.result === `OK` && response.payment_link) {
          window.location.href = response.payment_link;
        }
        wrapElement.dataset.inProgress = false;
      });
    });
  }
};

const renderLoginOrder = (container, orderData) => {
  const renderCancelOrderForm = (container) => {
    const parentWrap = container.parentElement;

    const formElement = createForm(`login-page__cancelOrderForm`);
    container.append(formElement);
  
    const wrapInputElement = createDiv(`CancelForm input`);
    formElement.append(wrapInputElement);
  
    const labelElement = createLabel(``, `Пожалуйста, укажите причину отмены заказа. <br>Это поможет нам улучшить качество обслуживания:`);
    labelElement.htmlFor = `cancel-message`;
    wrapInputElement.append(labelElement);
  
    const textareaElement = createTextarea(``, ``, `4`);
    textareaElement.name = `cancel-message`;
    textareaElement.id = `cancel-message`;
    wrapInputElement.append(textareaElement);
  
    const cancelOrderButton = createButton(`Отменить заказ`, `login-page__cancelOrderButton`);
    formElement.append(cancelOrderButton);
  
    cancelOrderButton.addEventListener(`click`, () => {
      wrapControlButtonsElement.remove();
      formElement.remove();

      container.dataset.inProgress = true;

      getData({
        ["set_order_cancel"]: {
          ["order_id"]: orderData.order_id,
          ["reason"]: textareaElement.value
        }
      })
      .then((response) => {
        if (response.result === `OK`) {
          const statusOrderElement = parentWrap.querySelector(`.login-page__orderStatus`);
          const orderState = ORDER_STATE[`0`];
          statusOrderElement.style.backgroundColor = `#${orderState.color}`
          statusOrderElement.innerHTML = orderState.title;

          const messageElement = createParagraph(`login-page__message login-page__message--ok`, response.message);
          container.append(messageElement);
        }

        if (response.result === `ERROR`) {
          const messageElement = createParagraph(`login-page__message login-page__message--error`, response.message);
          container.append(messageElement);
        }

        container.dataset.inProgress = false;
      });
    });
  };

  const anchorElement = createAnchor(`login-page__orderPrint`, `Распечатать`, orderData.order_link);
  anchorElement.target = `_blank`;
  container.append(anchorElement);

  const listElement = createList(`login-page__orderProductList`);
  container.append(listElement);

  Object.keys(orderData.items).forEach((itemId) => {
    const product = orderData.items[itemId];

    const liItemElement = createListItem(`login-page__orderProductItem`);
    listElement.append(liItemElement);

    const divElement = createDiv(`product-line`);
    liItemElement.append(divElement);

    const imgElement = createImage(`product-line__image`, product.item_image, product.item_name);
    divElement.append(imgElement);

    if (product.item_link) {
      const linkElement = createAnchor(`product-line__title`, product.item_name, product.item_link);
      linkElement.target = `_blank`;
      divElement.append(linkElement);
    } else {
      const titleParagraphElement = createParagraph(`product-line__title`, product.item_name);
      divElement.append(titleParagraphElement);
    }

    if (product.item_id) {
      const idParagraphElement = createParagraph(`product-line__id`, `Код товара ${product.item_id}`);
      divElement.append(idParagraphElement);
    }

    const countParagraphElement = createParagraph(`product-line__count`, `${product.item_count}шт.`);
    divElement.append(countParagraphElement);

    const priceParagraphElement = createParagraph(`product-line__price`, `${product.item_price} <span>&#8381;</span>`);
    divElement.append(priceParagraphElement);

    // const priceParagraphElement = createPriceElement(`product-line__price`, product.item_price);
    // divElement.append(priceParagraphElement);
  });

  const wrapControlButtonsElement = createDiv(`login-page__orderControlButtonsWrap`);
  container.append(wrapControlButtonsElement);

  const progressWrapElement = createDiv(`login-page__progress`);
  container.append(progressWrapElement);

  const progressElement = createImage(``, `/sienge/img/load_bar.gif`);
  progressWrapElement.append(progressElement);


  if (orderData.allow_credit) {
    const creditButtonElement = createButton(`Оформить кредит`, `login-page__orderControlButton`);
    wrapControlButtonsElement.append(creditButtonElement);

    creditButtonElement.addEventListener(`click`, () => {
      const url = `${window.location.origin}/login?credit&order_id=${orderData.order_id}`;
      window.history.pushState(null, null, url);

      if (`creditData` in orderData) {
        showCreditForm(orderData);
        return;
      }

      container.dataset.inProgress = true;

      getData({
        ["get_credit_form"]: {
          ["order_id"]: orderData.order_id,
          ["order_sum"]: orderData.order_sum,
        }
      })
      .then((response) => {
        if (response.result === `OK`) {
          orderData.creditData = response;

          showCreditForm(orderData);
        }

        if (response.result === `ERROR`) {
          orderData.creditData = null;

          showCreditError(orderData, response.error);
        }

        container.dataset.inProgress = false;
      });
    });
  }

  if (orderData.allow_pay) {
    const payButtonElement = createButton(`Оплатить онлайн`, `login-page__orderControlButton`);
    wrapControlButtonsElement.append(payButtonElement);

    payButtonElement.addEventListener(`click`, () => {
      showPaymentForm(orderData);
    });

  }

  if (orderData.allow_cancel) {
    const cancelButtonElement = createButton(`Отменить`, `login-page__orderControlButton`);
    wrapControlButtonsElement.append(cancelButtonElement);

    cancelButtonElement.addEventListener(`click`, () => {
      container.dataset.form = `cancel`;
    });

    renderCancelOrderForm(container);
  }
};

const renderLoginScore = (container, score) => {
  const liItemElement = createListItem(`login-page__scoresItem`);
  container.append(liItemElement);

  const dateOrderElement = createParagraph(`login-page__scoreInfo`, score.date_act);
  liItemElement.append(dateOrderElement);

  const valueOrderElement = createParagraph(`login-page__scoreValue`, score.value);
  liItemElement.append(valueOrderElement);

  const noteOrderElement = createParagraph(`login-page__scoreInfo`, score.comment);
  noteOrderElement.style.color = `#${score.color}`;
  liItemElement.append(noteOrderElement);
};

const updateLoginScores = (container, scoresData) => {
  const scoreTotalElement = container.querySelector(`.login-page__scoreTotal`);
  scoreTotalElement.innerHTML = getBonusNumeralEnding(scoresData.bonus_sum || 0);

  const scoresListElement = container.querySelector(`.login-page__scoresList`);
  scoresListElement.innerHTML = ``;

  Object.keys(scoresData.bonus_log).forEach((itemId) => {
    const score = scoresData.bonus_log[itemId];
    renderLoginScore(scoresListElement, score);
  });
};

const renderLoginScores = (scoresData) => {
  const scoresSection = loginPageElement.querySelector(`.login-page__section--scores`)

  const scoreTotalElement = scoresSection.querySelector(`.login-page__scoreTotal`);
  scoreTotalElement.innerHTML = getBonusNumeralEnding(scoresData.bonus_sum || 0);

  if (!isEmptyObject(scoresData.bonus_log)) {
    const headingElement = createHeading(`h3`, `login-page__scoresTitle`, `История`);
    scoresSection.append(headingElement);

    const scoresListElement = createList(`login-page__scoresList`);
    scoresSection.append(scoresListElement);

    Object.keys(scoresData.bonus_log).forEach((itemId) => {
      const score = scoresData.bonus_log[itemId];
      renderLoginScore(scoresListElement, score);
    });
  }

  const promocodeElement = scoresSection.querySelector(`.login-page__promocode`);
  const promocodeInputElement = promocodeElement.querySelector(`input[name="promocode"]`);

  if (scoresData.current_promo) {
    promocodeInputElement.value = scoresData.current_promo;
  }
  
  // const startPromocodeButton = scoresSection.querySelector(`.login-page__startPromocodeButton`);
  // startPromocodeButton.addEventListener(`click`, () => {
  //   promocodeElement.dataset.mode = `activate`;
  // });

  const activatePromocodeButton = scoresSection.querySelector(`.login-page__activatePromocodeButton`);
  activatePromocodeButton.addEventListener(`click`, () => {
    promocodeElement.dataset.mode = `progress`;

    getData({
      ["set_bonus_promo"]: {
        ["promo"]: promocodeInputElement.value,
      }
    })
    .then((response) => {
      if (response.result === `OK`) {
        infoPromocodeButton.innerHTML = response.promo_msg;

        getData({
          ["get_bonus_log"]: ""
        })
        .then((response) => {
          if (response.result === `OK`) {
            updateLoginScores(scoresSection, response);
          }
        });
      }

      if (response.result === `ERROR`) {
        infoPromocodeButton.innerHTML = response.error;
      }
      
      promocodeElement.dataset.mode = `info`;
      promocodeInputElement.value = ``;
    });

  });

  const infoPromocodeButton = scoresSection.querySelector(`.login-page__infoPromocodeButton`);
  infoPromocodeButton.addEventListener(`click`, () => {
    promocodeElement.dataset.mode = `activate`;
  });
};

const renderShowPaymentsButton = () => {
  const paymentsSection = loginPageElement.querySelector(`.login-page__section--pay`)

  showNextPaymentsButtonElement = createButton(`Показать еще`, `login-page__showNextPaymentsButton`);
  paymentsSection.append(showNextPaymentsButtonElement);

  showNextPaymentsButtonElement.addEventListener(`click`, () => {
    getData({
      ["get_payment_list"]: {
        ["start"]: countShowPayments,
      }
    })
    .then((response) => {
      if (response.result === `OK`) {
        renderLoginPayments(response.payments);
        if (Object.keys(response.payments).length < 10) {
          removeShowPaymentsButton();
        }
        countShowPayments += 10;
      }
    });
  });

};

const removeShowPaymentsButton = () => {
  showNextPaymentsButtonElement.remove();
};

const renderLoginPayments = (payments) => {
  Object.keys(payments).forEach((itemId) => {
    const payment = payments[itemId];

    const liItemElement = createListItem(`login-page__paymentsItem`);
    paymentsListElement.append(liItemElement);

    const titlePaymentElement = createParagraph(`login-page__paymentTitle`, `№ ${payment.payment_id} <span>от ${payment.payment_date1}</span>`);
    liItemElement.append(titlePaymentElement);

    const orderPaymentElement = createParagraph(`login-page__paymentOrder`, `Заказ ${payment.order_id}`);
    liItemElement.append(orderPaymentElement);

    const pricePaymentElement = createParagraph(`login-page__paymentPrice`, `${payment.payment_sum} <span>&#8381;</span>`);
    liItemElement.append(pricePaymentElement);

    if (String(payment.payment_state) === `-1` || (String(payment.payment_state) === `-2`)) {
      const datePaymentElement = createParagraph(`login-page__paymentDate`, `Отменен ${payment.payment_date2}`);
      liItemElement.append(datePaymentElement);
    }

    if (String(payment.payment_state) === `1`) {
      const datePaymentElement = createParagraph(`login-page__paymentDate`, `Оплачен ${payment.payment_date2}`);
      liItemElement.append(datePaymentElement);
    }

    const paymentState = PAYMENT_STATE[payment.payment_state];
    const statusPaymentElement = createParagraph(`login-page__paymentStatus`, paymentState.title);
    statusPaymentElement.style.backgroundColor = `#${paymentState.color}`
    liItemElement.append(statusPaymentElement);
  });
};

// проверка авторизован чел или нет
const wrapElement = loginPageElement.querySelector(`.login-page__wrap`);
const navButtons = loginPageElement.querySelectorAll(`.login-page__navButton`);
const contentElement = loginPageElement.querySelector(`.login-page__content`);

const activateMode = (mode) => {
  const activeButton = Array.from(navButtons).find((button) => button.classList.contains(`login-page__navButton--active`));
  if (activeButton) {
    activeButton.classList.remove(`login-page__navButton--active`);
  }

  const currentButton = loginPageElement.querySelector(`.login-page__navButton[data-mode="${mode}"]`);
  if (currentButton) {
    currentButton.classList.add(`login-page__navButton--active`);
  }

  contentElement.dataset.mode = mode;

  let url = ``;

  switch (mode) {
    case `login`:
      url = `${window.location.origin}/login`;
      break;
    case `orders`:
      const orderId = getUrlSearch(`id`);
      if (orderId) {
        url = `${window.location.origin}/login?${mode}&id=${orderId}`;
      } else {
        url = `${window.location.origin}/login?${mode}`;
      }
      break;
    default:
      url = `${window.location.origin}/login?${mode}`
      break;
  }

  // const url = (mode === `login`) ? `${window.location.origin}/login` : `${window.location.origin}/login?${mode}`;
  window.history.pushState(null, null, url);
};

if (userData.logged) {
  wrapElement.dataset.state = `show`;

  if (window.location.search === `` || !window.location.search) {
    activateMode(`login`);
  }

  if (window.location.search.indexOf(`?orders`) >= 0) {
    activateMode(`orders`);
  }

  if (window.location.search === `?scores`) {
    activateMode(`scores`);
  }

  if (window.location.search.indexOf(`?pay`) >= 0) {
    const orderId = getUrlSearch(`pay`);
    if (!orderId) {
      activateMode(`pay`);
    } else {
      getData({
        ["get_order_content"]: {
          ["order_id"]: orderId,
        }
      })
      .then((response) => {
        if (response.result === `OK`) {
          orderData = response;
          showPaymentForm(orderData);
        }
        if (response.result === `ERROR`) {
          activateMode(`login`);
        }
      });
    }
  }

  if (window.location.search.indexOf(`?credit&order_id`) === 0) {
    const orderId = getUrlSearch(`order_id`);
    let orderData = {};

    getData({ // дубль
      ["get_order_content"]: {
        ["order_id"]: orderId,
      }
    })
    .then((response) => {

      if (response.result === `OK`) {
        orderData = response;

        if (!orderData.allow_credit) {
          showCreditError(orderData, `оформление кредита для заказа №${orderData.order_id} недоступно`);
        } else {
          getData({
            ["get_credit_form"]: {
              ["order_id"]: orderData.order_id,
              ["order_sum"]: orderData.order_sum,
            }
          })
          .then((response) => {
            if (response.result === `OK`) {
              orderData.creditData = response;
  
              showCreditForm(orderData);
            }
  
            if (response.result === `ERROR`) {
              orderData.creditData = null;
    
              showCreditError(orderData, response.error);
            }
          });
        }

      }
    });
  }

  // if (window.location.search.indexOf(`?pay=`) === 0) {
  //   activateMode(`login`);
  // }
  
  Array.from(navButtons).forEach((button) => {
    button.addEventListener(`click`, () => {
      if (button.classList.contains(`login-page__navButton--active`)) {
        return;
      }

      const mode = button.dataset.mode;

      activateMode(mode);
    });
  });

  const exitButton = loginPageElement.querySelector(`.login-page__exitButton`);
  if (exitButton) {
    exitButton.addEventListener(`click`, () => {
      getData({
        ["set_auth_exit"]: ``,
      })
      .then((response) => {
        if (response.result === `OK`) {
          document.location.href = `${window.location.origin}`;
        }
      });
    });
  }
  
  // заполнение данными
  const nameInputElement = loginPageElement.querySelector(`input[name="name"]`);
  nameInputElement.value = userData.name_i;

  const lastnameInputElement = loginPageElement.querySelector(`input[name="lastname"]`);
  lastnameInputElement.value = userData.name_f;

  const middlenameInputElement = loginPageElement.querySelector(`input[name="middlename"]`);
  middlenameInputElement.value = userData.name_o;

  const bdayInputElement = loginPageElement.querySelector(`input[name="bday"]`);
  bdayInputElement.value = userData.birthday;

  const sexInputElement = loginPageElement.querySelector(`input[value="${userData.sex}"]`);
  if (sexInputElement) {
    sexInputElement.checked = true;
  }

  loginPageElement.querySelector(`input[name="sex"]:checked`)

  const cityInputElement = loginPageElement.querySelector(`input[name="city"]`);
  cityInputElement.value = userData.town;

  const addressInputElement = loginPageElement.querySelector(`input[name="address"]`);
  addressInputElement.value = userData.address;

  const emailInputElement = loginPageElement.querySelector(`input[name="email"]`);
  emailInputElement.value = userData.email;

  const phoneInputElement = loginPageElement.querySelector(`input[name="phone"]`);
  phoneInputElement.value = userData.phone;
  // phoneInputElement.focus();
  // phoneInputElement.blur();
  
  const passwordFirstInputElement = loginPageElement.querySelector(`input[name="password1"]`);
  const passwordSecondInputElement = loginPageElement.querySelector(`input[name="password2"]`);

  const userInfoControlElement = loginPageElement.querySelector(`.login-page__loginControl--userInfo`);
  const setUserInfoButton = userInfoControlElement.querySelector(`.login-page__saveButton`);
  const setUserInfoMessage = userInfoControlElement.querySelector(`.login-page__saveMessage`);

  setUserInfoButton.addEventListener(`click`, () => {
    userInfoControlElement.dataset.inProgress = true;

    getData({
      ["set_user_info"]: {
        ["name_i"]: nameInputElement.value,
        ["name_f"]: lastnameInputElement.value,
        ["name_o"]: middlenameInputElement.value,
        ["birthday"]: bdayInputElement.value,
        ["sex"]: loginPageElement.querySelector(`input[name="sex"]:checked`).value,
        ["town"]: cityInputElement.value,
        ["address"]: addressInputElement.value,
        ["phone"]: phoneInputElement.value,
        ["email"]: emailInputElement.value,
      }
    })
    .then((response) => {
      if (response.result === `OK`) {
        setUserInfoMessage.dataset.mode = `ok`;
        setUserInfoMessage.textContent = `Данные сохранены`;
      }

      if (response.result === `ERROR`) {
        setUserInfoMessage.dataset.mode = `error`;
        setUserInfoMessage.textContent = `Ошибка: ${response.error}`;
      }
    })
    .finally(() => {
      userInfoControlElement.dataset.inProgress = false;
    });
  });

  const setUserPasswordElement = loginPageElement.querySelector(`.login-page__loginControl--setPassword`);
  const setUserPasswordButton = setUserPasswordElement.querySelector(`.login-page__saveButton`);
  const setUserPasswordMessage = setUserPasswordElement.querySelector(`.login-page__saveMessage`);

  if (setUserPasswordButton) {
    setUserPasswordButton.addEventListener(`click`, () => {
      setUserPasswordElement.dataset.inProgress = true;

      getData({
        ["set_user_password"]: {
          ["pass1"]: passwordFirstInputElement.value,
          ["pass2"]: passwordSecondInputElement.value,
        }
      })
      .then((response) => {
        if (response.result === `OK`) {
          setUserPasswordMessage.dataset.mode = `ok`;
          setUserPasswordMessage.textContent = `Пароль изменен`;
        }
        
        if (response.result === `ERROR`) {
          setUserPasswordMessage.dataset.mode = `error`;
          setUserPasswordMessage.textContent = `Ошибка: ${response.error}`;
        }
      })
      .finally(() => {
        setUserPasswordElement.dataset.inProgress = false;
      });
    });
  }



  window.addEventListener(`load`, () => {
    const orderId = getOrderIdByUrl();

    // запрос о заказах (пока сразу)
    getData({
      ["get_order_list"]: {
        ["start"]: countShowOrders,
        ["id"]: orderId,
      }
    })
    .then((response) => {
      if (response.result === `OK`) {
        renderLoginOrders(response.orders);
        if (Object.keys(response.orders).length >= 10) {
          renderShowOrdersButton();
        }
        countShowOrders += 10;

        if (window.location.search.indexOf(`?orders`) >= 0) {

          if (orderId) {
            const liItemElement = document.getElementById(orderId);
    
            if (liItemElement) {
              const orderButtonElement = liItemElement.querySelector(`.login-page__orderButton`);
              const orderContentElement = liItemElement.querySelector(`.login-page__orderContent`);
        
              const mode = liItemElement.dataset.mode === `show` ? `hide` : `show`;
              liItemElement.dataset.mode = mode;
              orderButtonElement.dataset.mode = mode;
              
              if (mode === `show` && orderContentElement.dataset.get !== `true`) {
                getData({
                  ["get_order_content"]: {
                    ["order_id"]: orderId,
                  }
                })
                .then((response) => {
                  if (response.result === `OK`) {
                    orderContentElement.dataset.get = `true`;
                    renderLoginOrder(orderContentElement, response);

                    // clickLink(`#${orderId}`, false);
                  }
                });
              }
            }

          }
        }

      }
    })


    // запрос о бонусах (пока сразу)
    getData({
      ["get_bonus_log"]: ""
    })
    .then((response) => {
      if (response.result === `OK`) {
        renderLoginScores(response);
      }
    });

    // запрос об оплатах (пока сразу)
    getData({
      ["get_payment_list"]: {
        ["start"]: countShowPayments,
      }
    })
    .then((response) => {
      if (response.result === `OK`) {
        renderLoginPayments(response.payments);
        if (Object.keys(response.payments).length === 10) {
          renderShowPaymentsButton();
        }
        countShowPayments += 10;
      }
    });
  });
} else {
  if (wrapElement) {
    wrapElement.remove();
  }
  const notAuthElement = loginPageElement.querySelector(`.login-page__notAthorization`);
  notAuthElement.dataset.state = `show`;

  const authButton = notAuthElement.querySelector(`.login-page__authButton`);
  authButton.addEventListener(`click`, () => {
    authorizationModalElement = document.querySelector(`.js--authorizationModal`);
    if (authorizationModalElement) {
      authorizationModalElement.classList.add(`modal--show`);
      document.addEventListener(`keydown`, onEscPressModalHandler);
    }
  });
}
