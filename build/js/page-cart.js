const cartPageElement = document.querySelector(`.cart-page`);

const countCartElement = cartPageElement.querySelector(`.cart-page__count`);
countCartElement.innerHTML = getProductNumeralEnding(cartData.cart_count);

const totalPriceElement = cartPageElement.querySelector(`.cart-page__totalPrice`);

const promocodeWrapElement = cartPageElement.querySelector(`.cart-page__promocodeWrap`);

if (cartData.promo_allow) {
  const promocodeInputWrapElement = promocodeWrapElement.querySelector(`.cart-page__promocodeInput`);
  const promocodeInputElement = promocodeInputWrapElement.querySelector(`input`);
  const promocodeButton = promocodeWrapElement.querySelector(`.cart-page__promocodeButton`);
  const promocodeSendButton = promocodeWrapElement.querySelector(`.cart-page__promocodeSendButton`);
  const promocodeResetButton = promocodeWrapElement.querySelector(`.cart-page__promocodeResetButton`);
  const promocodeDeleteButton = promocodeWrapElement.querySelector(`.cart-page__promocodeDeleteButton`);
  const promocodeMessageElement = promocodeWrapElement.querySelector(`.cart-page__promocodeMessage`);

  const appliedPromocode = (data) => {
    promocodeInputWrapElement.dataset.mode = `apply`;
    promocodeInputElement.value = data.promo_name;
    promocodeMessageElement.innerHTML = `Промокод успешно применен`;

    totalPriceElement.innerHTML = `${getFormattedPrice(data.fullprice)} <span>&#8381;</span>`;
  };

  const notAppliedPromocode = (data) => {
    promocodeInputWrapElement.dataset.mode = `error`;
    promocodeMessageElement.innerHTML = `Промокод не найден`;

    totalPriceElement.innerHTML = `${getFormattedPrice(data.fullprice)} <span>&#8381;</span>`;
  };

  const resetPromocode = (data) => {
    promocodeMessageElement.innerHTML = ``;
    promocodeInputElement.value = ``;
    promocodeInputWrapElement.dataset.mode = `empty`;

    totalPriceElement.innerHTML = `${getFormattedPrice(data.fullprice)} <span>&#8381;</span>`;
  };

  if (!cartData.promo_entered) {
    promocodeWrapElement.dataset.mode = `button`;
  } else {
    promocodeWrapElement.dataset.mode = `input`;

    if (cartData.promo_used) {
      appliedPromocode(cartData);
    } else {
      notAppliedPromocode(cartData);
    }
  }

  promocodeInputElement.addEventListener(`input`, () => {
    const value = promocodeInputElement.value;
    promocodeInputWrapElement.dataset.mode = value ? `input` : `empty`;
  });

  promocodeButton.addEventListener(`click`, () => {
    promocodeWrapElement.dataset.mode = `input`;
  });
  
  promocodeSendButton.addEventListener(`click`, () => {
    const promocode = promocodeInputElement.value;

    getData({
      ["set_cart_promo"]: promocode
    })
    .then((cartData) => {
      if (!cartData.bonus_allow) {
        bonusWrapElement.dataset.show = cartData.bonus_allow;
        // bonusWrapElement.remove();
      }
      if (cartData.promo_used) {
        appliedPromocode(cartData);
      } else {
        notAppliedPromocode(cartData);
      }
    });
  });

  promocodeResetButton.addEventListener(`click`, () => {
    getData({
      ["set_cart_promo"]: `-1`
    })
    .then((cartData) => {
      if (!cartData.bonus_allow) {
        bonusWrapElement.dataset.show = cartData.bonus_allow;
        // bonusWrapElement.remove();
      }
      resetPromocode(cartData);
    });
  });

  promocodeDeleteButton.addEventListener(`click`, () => {
    promocodeInputElement.value = ``;
    promocodeInputWrapElement.dataset.mode = `empty`;
    promocodeMessageElement.innerHTML = ``;
  });
} else {
  promocodeWrapElement.dataset.show = `false`;
  // promocodeWrapElement.remove();
}

const bonusWrapElement = cartPageElement.querySelector(`.cart-page__bonusWrap`);

const updateBonuses = () => {
  if (!userSessionData) {
    return;
  }

  if (!cartData.bonus_allow) {
    return;
  }

  const bonusCountElement = bonusWrapElement.querySelector(`.cart-page__bonusCount`);
  const bonusInputWrapElement = bonusWrapElement.querySelector(`.cart-page__bonusInput`);
  const bonusInputElement = bonusInputWrapElement.querySelector(`input`);

  if (+cartData.bonus_used > 0) {
    bonusWrapElement.dataset.mode = `input`;
    bonusInputWrapElement.dataset.mode = `apply`;
    bonusInputElement.value = cartData.bonus_used;
    bonusCountElement.innerHTML = `Осталось ${getBonusNumeralEnding(+userSessionData.bonus_sum - +cartData.bonus_used)}`;
  } else {
    bonusWrapElement.dataset.mode = `button`;
    bonusInputWrapElement.dataset.mode = `empty`;
    bonusInputElement.value = ``;
    bonusCountElement.innerHTML = `У вас есть ${getBonusNumeralEnding(+userSessionData.bonus_sum)}`;
  }

  totalPriceElement.innerHTML = `${getFormattedPrice(cartData.fullprice)} <span>&#8381;</span>`;
};

if (cartData.bonus_allow) {
  const bonusButton = bonusWrapElement.querySelector(`.cart-page__bonusButton`);
  const bonusInputWrapElement = bonusWrapElement.querySelector(`.cart-page__bonusInput`);
  const bonusInputElement = bonusInputWrapElement.querySelector(`input`);
  const bonusSendButton = bonusWrapElement.querySelector(`.cart-page__bonusSendButton`);
  const bonusResetButton = bonusWrapElement.querySelector(`.cart-page__bonusResetButton`);

  bonusButton.addEventListener(`click`, () => {
    bonusWrapElement.dataset.mode = `input`;
  });

  bonusInputElement.addEventListener(`input`, () => {
    const value = bonusInputElement.value;
    bonusInputWrapElement.dataset.mode = value ? `input` : `empty`;
  });

  bonusSendButton.addEventListener(`click`, () => {
    const bonus = bonusInputElement.value;

    getData({
      ["set_cart_bonus"]: bonus
    })
    .then((response) => {
      cartData = response;
      if (!cartData.promo_allow) {
        promocodeWrapElement.dataset.show = cartData.promo_allow;
        // promocodeWrapElement.remove();
      }
      updateBonuses();
    });
  });

  bonusResetButton.addEventListener(`click`, () => {
    getData({
      ["set_cart_bonus"]: `-1`
    })
    .then((response) => {
      cartData = response;
      if (!cartData.promo_allow) {
        promocodeWrapElement.dataset.show = cartData.promo_allow;
        // promocodeWrapElement.remove();
      }
      updateBonuses();
    });
  });

} else {
  bonusWrapElement.dataset.show = `false`;
  // bonusWrapElement.remove();
}


totalPriceElement.innerHTML = `${getFormattedPrice(cartData.fullprice)} <span>&#8381;</span>`;

const cartListElement = cartPageElement.querySelector(`.cart-page__listItem`);
const items = cartData.items;

Object.keys(items).forEach((key) => {
  const itemData = items[key];

  const liItemElement = createListItem(`cart-page__item`);
  cartListElement.append(liItemElement);

  const sectionElement = createSection(`cart-page__itemWrap`);
  liItemElement.append(sectionElement);

  const titleElement = createHeading(`h2`, `cart-page__itemTitle`);
  sectionElement.append(titleElement);

  const anchorElement = createAnchor(``, itemData.item_name, itemData.item_link);
  titleElement.append(anchorElement);

  const idParagraphElement = createParagraph(`cart-page__itemId`, `Код товара: ${itemData.item_id}`);
  sectionElement.append(idParagraphElement);

  const imgElement = createImage(`cart-page__itemImage`, itemData.item_image, itemData.item_name);
  sectionElement.append(imgElement);

  if (itemData.item_act) {
    const storeDivElement = createDiv(`cart-page__storeWrap`);
    sectionElement.append(storeDivElement);

    const dateParagraphElement = createParagraph(`cart-page__itemDate`, `Склад, поступление ${itemData.item_date}`);
    storeDivElement.append(dateParagraphElement);

    if (itemData.item_store && itemData.item_store !== `0`) {
      const storeParagraphElement = createParagraph(`cart-page__itemStore`, `В наличии в ${shopInfoData.town_p}, ${itemData.item_store} шт.`);
      storeDivElement.append(storeParagraphElement);
    }

    const counterElement = createCounterElement(`cart-page__counter counter`, itemData.item_count, itemData.item_id, (response) => {
      totalPriceElement.innerHTML = `${getFormattedPrice(response.fullprice)} <span>&#8381;</span>`;
      countCartElement.innerHTML = getProductNumeralEnding(response.cart_count);

      const itemNewData = response.items[itemData.item_id];

      if (itemNewData) {
        priceParagraphElement.innerHTML = `${getFormattedPrice(itemNewData.item_sum)} <span>&#8381;</span>`
      }

      if (oldPriceParagraphElement) {
        oldPriceParagraphElement.innerHTML = response.item_sum_old;
      }
    });
    sectionElement.append(counterElement);

    let oldPriceParagraphElement = null;
    if (itemData.item_price_old) {
      const oldPrice = (+itemData.item_count === 1) ? itemData.item_price_old : itemData.item_sum_old;
      oldPriceParagraphElement = createParagraph(`cart-page__oldPrice`, getFormattedPrice(oldPrice));
      sectionElement.append(oldPriceParagraphElement);
    }

    const price = (+itemData.item_count === 1) ? itemData.item_price : itemData.item_sum;

    const priceParagraphElement = createPriceElement(`cart-page__price`, price);
    sectionElement.append(priceParagraphElement);

  } else {
    const notAvailableParagraphElement = createParagraph(`cart-page__notAvailable`, `Нет в наличии`);
    sectionElement.append(notAvailableParagraphElement);
  }


  const deleteButtonElement = createButton(`Удалить`, `cart-page__deleteButton`);
  deleteButtonElement.title = `Удалить`;
  sectionElement.append(deleteButtonElement);
  const svg = createSvg(``, `24`, `24`, `sienge/img/sprite.svg#icon-trash`);
  deleteButtonElement.append(svg);

  deleteButtonElement.addEventListener(`click`, () => {
    getData({
      ["set_cart"]: {
        ["item_id"]: itemData.item_id,
        ["action"]: `delete`,
      }
    })
    .then((response) => {
      setCountCartHeader(response.cart_count);

      totalPriceElement.innerHTML = `${getFormattedPrice(response.fullprice)} <span>&#8381;</span>`;
      liItemElement.remove();
    });
  });

  const options = itemData.options;

  const updateOptions = (options) => {
    servicesListElement.innerHTML = ``;
    renderOptions(servicesListElement, options);
  };

  const renderOptions = (container, options) => {
    Object.keys(options)
    .forEach((optionId) => {
        const option = options[optionId];

        const servicesItemElement = createListItem(`cart-page__servicesItem`);
        container.append(servicesItemElement);

        const labelElement = createLabel(`cart-page__servicesCheckbox checkbox`);
        servicesItemElement.append(labelElement);
  
        const checkboxInputElement = createInput(`checkbox__input`, `checkbox`);
        checkboxInputElement.checked = option.used;
        labelElement.append(checkboxInputElement);
        checkboxInputElement.addEventListener(`change`, () => {
          const action = checkboxInputElement.checked ? `add` : `delete`;

          getData({
            ["set_cart"]: {
              ["item_id"]: itemData.item_id,
              ["action"]: action,
              ["option"]: optionId,
            }
          })
          .then((response) => {
            setCountCartHeader(response.cart_count);

            totalPriceElement.innerHTML = `${getFormattedPrice(response.fullprice)} <span>&#8381;</span>`;
            
            const itemNewData = response.items[itemData.item_id];
            if (itemNewData) {
              updateOptions(itemNewData.options);
            }
          });
        });
  
        const titleSpanElement = createSpan(`checkbox__label`, option.title);
        labelElement.append(titleSpanElement);

        const servicesParagraphElement = createPriceElement(`cart-page__servicesPrice`, option.price);
        servicesItemElement.append(servicesParagraphElement);
      });
  };

  let servicesListElement = null;

  if (options && !isEmptyObject(options) && itemData.item_act) {
    const openServicesButtonElement = createButton(`Дополнительные услуги`, `cart-page__openServicesButton`);
    sectionElement.append(openServicesButtonElement);
    const arrowSvg = createSvg(``, `10`, `10`, `sienge/img/sprite.svg#arrow-small`);
    openServicesButtonElement.append(arrowSvg);
    openServicesButtonElement.addEventListener(`click`, () => {
      const mode = servicesSectionElement.dataset.mode === `show` ? `hide` : `show`;
      servicesSectionElement.dataset.mode = mode;
      openServicesButtonElement.dataset.mode = mode;
    });

    const countServices = Object.keys(options).length;
    const spanElement = createSpan(`cart-page__countServices`, countServices);
    openServicesButtonElement.append(spanElement);

    const servicesSectionElement = createSection(`cart-page__services`);
    sectionElement.append(servicesSectionElement);
    servicesSectionElement.dataset.mode = document.documentElement.clientWidth > 1000 ? `show` : `hide`;

    servicesListElement = createList(`cart-page__servicesList`);
    servicesSectionElement.append(servicesListElement);

    renderOptions(servicesListElement, options);
  }
});
