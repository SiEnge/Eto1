const orderPageElement = document.querySelector(`.order-page`);

const gettingWrap = orderPageElement.querySelector(`.order-page__fieldset--getting`);
const gettingInputElements = orderPageElement.querySelectorAll(`input[name="getting"]`);

Array.from(gettingInputElements).forEach((input) => {
  input.addEventListener(`change`, () => {
    gettingWrap.dataset.mode = input.id;
    const isDelivery = input.id === `delivery`;
    calcDelivery(isDelivery);
  });
});


const nameInputElement = orderPageElement.querySelector(`input[name="name"]`);
nameInputElement.value = orderData.name_i;

const lastnameInputElement = orderPageElement.querySelector(`input[name="lastname"]`);
lastnameInputElement.value = orderData.name_f;

const phoneInputElement = orderPageElement.querySelector(`input[name="phone"]`);
phoneInputElement.value = orderData.phone;
phoneInputElement.focus();
phoneInputElement.blur();

const emailInputElement = orderPageElement.querySelector(`input[name="email"]`);
emailInputElement.value = orderData.email;

const titlePickupElement = orderPageElement.querySelector(`.order-page__pickupTitle`);
titlePickupElement.textContent = `Магазин ${shopInfoData.town}`;

const addressPickupElement = orderPageElement.querySelector(`.order-page__pickupAddress`);
addressPickupElement.textContent = `${shopInfoData.town}, ${shopInfoData.addr}`;

const worktimePickupElement = orderPageElement.querySelector(`.order-page__pickupWorktime`);
worktimePickupElement.textContent = shopInfoData.worktime;

const statusPickupElement = orderPageElement.querySelector(`.order-page__pickupStatus`);
statusPickupElement.textContent = orderData.delivery_date;

const getCheckedCity = (cityId) => {
  const index = Object.keys(orderData.delivery_town).find((itemId) => {
    return orderData.delivery_town[itemId].id === cityId;
  });

  return orderData.delivery_town[index] ? orderData.delivery_town[index] : null;
};

const calcDelivery = (isDelivery = true) => {
  let totalPrice = 0;

  if (isDelivery) {
    const city = getCheckedCity(citySelectElement.value);
    if (!city) {
      return;
    }

    const deliveryPrice = +city.dcost;
    const risePrice = isLiftDeliveryElement.checked ? 0 : (+city.fcost * +floorDeliveryElement.value);
    totalPrice = +deliveryPrice + +risePrice;
  }

  totalDeliveryElement.innerHTML = totalPrice === 0 ? `` : `Стоимость доставки <span>${getFormattedPrice(totalPrice)}</span> &#8381;`;

  fullpriceElement.innerHTML = `${getFormattedPrice(+orderData.order_sum + totalPrice)} <span>&#8381;</span>`;
  orderFullpriceElement.innerHTML = `Итого: ${getFormattedPrice(orderData.order_sum + totalPrice)} <span>&#8381;</span>`;
};

const citySelectElement = orderPageElement.querySelector(`select[name="city"]`);
citySelectElement.addEventListener(`change`, () => calcDelivery());

const addressDeliveryElement = orderPageElement.querySelector(`input[name="address"]`);

const floorDeliveryElement = orderPageElement.querySelector(`input[name="floor"]`);
floorDeliveryElement.addEventListener(`input`, () => calcDelivery());

const isLiftDeliveryElement = orderPageElement.querySelector(`input[name="is-lift"]`);
isLiftDeliveryElement.addEventListener(`change`, () => calcDelivery());

const commentElement = orderPageElement.querySelector(`textarea[name="comment"]`);
const isConsultationElement = orderPageElement.querySelector(`input[name="consultation"]`);


const cityOption = createOption(``, `Выберите город`);
cityOption.disabled = true;
cityOption.selected = true;
cityOption.value = ``;
citySelectElement.append(cityOption);

Object.keys(orderData.delivery_town).forEach((itemId) => {
  const city = orderData.delivery_town[itemId];

  const cityOption = createOption(``, city.name);
  cityOption.value = city.id;
  cityOption.dataset.cost = city.dcost;

  citySelectElement.append(cityOption);
});

const paymentWrapElement = orderPageElement.querySelector(`.order-page__radioWrap--payment`);

Object.keys(orderData.payment_type).forEach((itemId, i) => {
  const payment = orderData.payment_type[itemId]; 

  const radioParagraphElement = createParagraph(`order-page__radio`);
  paymentWrapElement.append(radioParagraphElement);

  const radioInputElement = createInput(``, `radio`);
  radioInputElement.checked = !i;
  radioInputElement.name = `payment`;
  radioInputElement.id = `payment_${payment.id}`;
  radioInputElement.value = payment.id;
  radioParagraphElement.append(radioInputElement);

  const labelElement = createLabel(``, payment.name);
  labelElement.htmlFor = `payment_${payment.id}`;
  radioParagraphElement.append(labelElement);
});


const sellerSelectElement = orderPageElement.querySelector(`select[name="seller"]`);

if (isEmptyArray(Object.keys(orderData.seller_name))) {
  const sellerSelectWrapElement = sellerSelectElement.parentElement;
  sellerSelectWrapElement.remove();
} else {
  const sellerOption = createOption(``, `Выберите из списка`);
  sellerOption.disabled = true;
  sellerOption.selected = true;
  sellerOption.value = ``;
  
  sellerSelectElement.append(sellerOption);

  Object.keys(orderData.seller_name).forEach((itemId, i) => {
    const seller = orderData.seller_name[itemId];

    const sellerOption = createOption(``, seller);
    sellerOption.value = seller;

    sellerSelectElement.append(sellerOption);
  });
}


const orderCountElement = orderPageElement.querySelector(`.order-page__orderCount`);
orderCountElement.innerHTML = getProductNumeralEnding(Object.keys(orderData.content).length);

const orderFullpriceElement = orderPageElement.querySelector(`.order-page__orderFullprice`);
orderFullpriceElement.innerHTML = `Итого: ${getFormattedPrice(orderData.order_sum)} <span>&#8381;</span>`;


const totalTitleElement = orderPageElement.querySelector(`.order-page__totalTitle`);
totalTitleElement.innerHTML = `${getItemNumeralEnding(Object.keys(orderData.content).length)} в заказе`;

const totalListElement = orderPageElement.querySelector(`.order-page__totalList`);

Object.keys(orderData.content).forEach((itemId) => {
  const product = orderData.content[itemId]; 

  const liItemElement = createListItem(`order-page__totalItem`);
  totalListElement.append(liItemElement);

  const titleParagraphElement = createParagraph(`order-page__totalItemTitle`, product.item_name);
  liItemElement.append(titleParagraphElement);

  const priceParagraphElement = createParagraph(`order-page__totalPrice`, `${getFormattedPrice(product.item_price)} &#8381; - ${product.item_count} шт.`);
  liItemElement.append(priceParagraphElement);
});

const totalDeliveryElement = orderPageElement.querySelector(`.order-page__totalDelivery`);

const fullpriceElement = orderPageElement.querySelector(`.order-page__totalResultFullprice`);
fullpriceElement.innerHTML = `${getFormattedPrice(orderData.order_sum)} <span>&#8381;</span>`;

const bonusesElement = orderPageElement.querySelector(`.order-page__totalResultFullBonuses`);
bonusesElement.innerHTML = `+${getFormattedPrice(orderData.bonus)} &#8381; бонусов`;

const orderButtonWrap = orderPageElement.querySelector(`.order-page__orderButtonWrap`);
const orderErrorElement = orderButtonWrap.querySelector(`.order-page__orderError`);

const createOrder = () => {
  orderButtonWrap.dataset.mode = `progress`;
  orderErrorElement.textContent = ``;

  getData({
    ["set_order_create"]: {
      ["name_i"]: nameInputElement.value,
      ["name_f"]: lastnameInputElement.value,
      ["phone"]: phoneInputElement.value,
      ["email"]: emailInputElement.value,
      ["delivery"]: orderPageElement.querySelector(`input[name="getting"]:checked`).value, //2-самовывоз, 1-доставка
      ["town_id"]: citySelectElement.value,
      ["address"]: addressDeliveryElement.value,
      ["floor"]: floorDeliveryElement.value,
      ["has_lift"]: isLiftDeliveryElement.checked ? `1` : `0`,
      ["comment"]: commentElement.value,
      ["payment_type"]: orderPageElement.querySelector(`input[name="payment"]:checked`).value,
      ["call_back"]: isConsultationElement.checked ? `1` : `0`,
      ["seller_name"]: sellerSelectElement.value || ``
    }
  })
  .then((response) => {
    

    if (response.result === `OK`) {
      if (response.redirect) {
        document.location.href = response.redirect;
      } else {
        orderPageElement.dataset.mode = `created`;
        fillCreatedOrder(response);
      }
    }

    if (response.result === `ERROR`) {
      orderButtonWrap.dataset.mode = `button`;
      orderErrorElement.textContent = `Ошибка: ${response.error}`;
    }
  });
};

const orderButton = orderPageElement.querySelector(`.order-page__orderButton`);
orderButton.addEventListener(`click`, () => {
  if (userSessionData) {
    createOrder();
    return;
  }

  showAuthPopup(createOrder);
});

const fillCreatedOrder = (orderData) => {
  const emailTextElement = orderPageElement.querySelector(`.order-page__createdText--email`);
  if (!orderData.email) {
    emailTextElement.remove();
  } else {
    emailTextElement.innerHTML = `Мы отправили вам письмо со всей информацией о заказе на email: <b>${orderData.email}</b>`;
  }

  const createdOrderButton = orderPageElement.querySelector(`.order-page__createdOrderButton span`);
  createdOrderButton.textContent = `Заказ ${orderData.order_id}`;

  const createdOrderFullpriceElement = orderPageElement.querySelector(`.order-page__createdOrderFullprice`);
  createdOrderFullpriceElement.innerHTML = `${getFormattedPrice(orderData.order_sum)} <span>&#8381;</span>`;

  const listProductElement = orderPageElement.querySelector(`.order-page__createdListProduct`);

  Object.keys(orderData.content).forEach((itemId) => {
    const product = orderData.content[itemId]; 

    const liItemElement = createListItem(`order-page__createdProduct`);
    listProductElement.append(liItemElement);

    const imgElement = createImage(`order-page__createdProductImage`, product.item_image, product.item_name);
    liItemElement.append(imgElement);

    const titleParagraphElement = createParagraph(`order-page__createdProductTitle`, product.item_name);
    liItemElement.append(titleParagraphElement);

    const countParagraphElement = createParagraph(`order-page__createdProductCount`, product.item_count);
    liItemElement.append(countParagraphElement);

    const priceParagraphElement = createParagraph(`order-page__createdProductPrice`, `${getFormattedPrice(product.item_price)} <span>&#8381;</span>`);
    liItemElement.append(priceParagraphElement);
  });

  const reservDateCreatedOrderElement = orderPageElement.querySelector(`.order-page__createdInfoText--reservDate`);
  reservDateCreatedOrderElement.textContent = orderData.rezerv_date;

  const shipmentDateCreatedOrderElement = orderPageElement.querySelector(`.order-page__createdInfoText--shipmentDate`);
  shipmentDateCreatedOrderElement.textContent = orderData.delivery_date;

  const linkCreditOrderElement = orderPageElement.querySelector(`.order-page__createdCreditLink`);
  if (orderData.credit_link) {
    linkCreditOrderElement.href = orderData.credit_link;
  } else {
    linkCreditOrderElement.remove();
  }

  const linkCreatedOrderElement = orderPageElement.querySelector(`.order-page__createdInfoLink`);
  linkCreatedOrderElement.href = orderData.order_link;

  const gettingTextElement = orderPageElement.querySelector(`.order-page__createdText--getting`);
  gettingTextElement.innerHTML = `Вы выбрали способ получения товара - <b>«${orderData.delivery_type}»</b>`;

  const infoTextElement = orderPageElement.querySelector(`.order-page__createdText--info`);
  infoTextElement.innerHTML = orderData.delivery_info;
};
