const productPageElement = document.querySelector(`.product-page`);
const switchSpec = (spec) => {
  const activeNavTabs = productPageElement.querySelectorAll(`.product-page__navTab--active`);
  activeNavTabs.forEach((tab) => tab.classList.remove(`product-page__navTab--active`));

  const specTab = productPageElement.querySelector(`.product-page__navTab[data-spec="${spec}"]`);
  specTab.classList.add(`product-page__navTab--active`);

  const activeSpecWraps = productPageElement.querySelectorAll(`.product-page__spec--active`);
  activeSpecWraps.forEach((wrap) => wrap.classList.remove(`product-page__spec--active`));

  const specWrap = productPageElement.querySelector(`.product-page__spec[data-spec="${spec}"]`);
  specWrap.classList.add(`product-page__spec--active`);
};


const renderReview = (container, review) => {
  const blockquoteElement = createBlockquote(`reviews__blockquote`);
  container.append(blockquoteElement);

  const authorWrapElement = createDiv(`reviews__authorWrap`);
  blockquoteElement.append(authorWrapElement);

  const authorImageElement = createImage(`reviews__authorImg`, review.ava, review.author);
  authorImageElement.width = `50`;
  authorImageElement.height = `50`;
  authorWrapElement.append(authorImageElement);

  const authorTitleElement = createCite(`reviews__author`, review.author);
  authorWrapElement.append(authorTitleElement);

  const authorRatingElement = createDiv(`reviews__authorRating`);
  authorWrapElement.append(authorRatingElement);

  const starSvg = createSvg(``, `20`, `20`, `sienge/img/sprite.svg#icon-star`);
  authorRatingElement.append(starSvg);

  const authorRatingTextElement = createSpan(``, review.rate);
  authorRatingElement.append(authorRatingTextElement);

  // переделать на time
  const dateElement = createSpan(`reviews__date`, review.date);
  authorWrapElement.append(dateElement);

  const reviewContentListElement = createList(`reviews__contentList`);
  blockquoteElement.append(reviewContentListElement);

  if (review.dost) {
    const reviewContentItemElement = createListItem(`reviews__contentItem`);
    reviewContentListElement.append(reviewContentItemElement);
  
    const titleReviewContentElement = createParagraph(`reviews__contentTitle`, `Достоинства`);
    reviewContentItemElement.append(titleReviewContentElement);
  
    const textReviewContentElement = createParagraph(``, review.dost);
    reviewContentItemElement.append(textReviewContentElement);
  }

  if (review.nedost) {
    const reviewContentItemElement = createListItem(`reviews__contentItem`);
    reviewContentListElement.append(reviewContentItemElement);
  
    const titleReviewContentElement = createParagraph(`reviews__contentTitle`, `Недостатки`);
    reviewContentItemElement.append(titleReviewContentElement);
  
    const textReviewContentElement = createParagraph(``, review.nedost);
    reviewContentItemElement.append(textReviewContentElement);
  }

  if (review.text) {
    const reviewContentItemElement = createListItem(`reviews__contentItem`);
    reviewContentListElement.append(reviewContentItemElement);
  
    const titleReviewContentElement = createParagraph(`reviews__contentTitle`, `Комментарий`);
    reviewContentItemElement.append(titleReviewContentElement);
  
    const textReviewContentElement = createParagraph(``, review.text);
    reviewContentItemElement.append(textReviewContentElement);
  }

  // const reviewRatingWrapElement = createDiv(`reviews__reviewRating`);
  // blockquoteElement.append(reviewRatingWrapElement);

  // const reviewRatingUpElement = createDiv(`reviews__authorRating`);
  // reviewRatingWrapElement.append(reviewRatingUpElement);

  // const upSvg = createSvg(``, `20`, `20`, `sienge/img/sprite.svg#icon-thumb-up`);
  // reviewRatingUpElement.append(upSvg);

  // const reviewRatingUpTextElement = createSpan(``, review.yes);
  // reviewRatingUpElement.append(reviewRatingUpTextElement);

  // const reviewRatingDownElement = createDiv(`reviews__authorRating`);
  // reviewRatingWrapElement.append(reviewRatingDownElement);

  // const downSvg = createSvg(``, `20`, `20`, `sienge/img/sprite.svg#icon-thumb-up`);
  // reviewRatingDownElement.append(downSvg);

  // const reviewRatingDownTextElement = createSpan(``, review.no);
  // reviewRatingDownElement.append(reviewRatingDownTextElement);
};

const navTabs = productPageElement.querySelectorAll(`.product-page__navTab`);

navTabs.forEach((tab) => {
  tab.addEventListener(`click`, () => {
    if (tab.classList.contains(`product-page__navTab--active`)) {
      return;
    }
    switchSpec(tab.dataset.spec);
  });
});

const parametersAllSpecButton = productPageElement.querySelector(`.product-page__allSpecButton--parameters`);
if (parametersAllSpecButton) {
  parametersAllSpecButton.addEventListener(`click`, () => switchSpec(`parameters`));
}

const reviewsAllSpecButton = productPageElement.querySelector(`.product-page__allSpecButton--reviews`);
if (reviewsAllSpecButton) {
  reviewsAllSpecButton.addEventListener(`click`, () => switchSpec(`reviews`));
}

const commentButtonElement = productPageElement.querySelector(`.product-page__comment`);
if (commentButtonElement) {
  commentButtonElement.addEventListener(`click`, () => switchSpec(`reviews`));
}

const cityElement = productPageElement.querySelector(`.product-page__city`);
cityElement.innerHTML = shopInfoData.subdiv;

const offerPriceButton = productPageElement.querySelector(`.product-page__offerPriceButton`);
const offerPriceModalElement = document.querySelector(`.js--offerPriceModal`);
if (offerPriceButton) {
  offerPriceButton.addEventListener(`click`, () => {
    offerPriceModalElement.classList.add(`modal--show`);
    document.addEventListener(`keydown`, onEscPressModalHandler);
    
    offerPriceModalElement.querySelector(`.js--errorMessage`).textContent = ``;
  });
}

const offerPriceModalButton = document.querySelector(`.js--offerPriceButton`);

offerPriceModalButton.addEventListener(`click`, () => {
  const formElement = offerPriceModalElement.querySelector(`.modal__form`);
  const priceValue = offerPriceModalElement.querySelector(`input[name="price"]`).value;
  const urlValue = offerPriceModalElement.querySelector(`input[name="url"]`).value;
  const emailValue = offerPriceModalElement.querySelector(`input[name="email"]`).value;
  const phoneValue = offerPriceModalElement.querySelector(`input[name="phone"]`).value;

  const errorTextElement = offerPriceModalElement.querySelector(`.js--errorMessage`);

  formElement.dataset.mode = `progress`;

  getData({
    ["set_ack_price"]: {
      ["item_id"]: itemData.item_id,
      ["price"]: priceValue,
      ["link"]: urlValue,
      ["email"]: emailValue,
      ["phone"]: phoneValue,
    }
  })
  .then((response) => {
    if (response.result === `OK`) {
      offerPriceModalElement.classList.remove(`modal--show`);
      document.removeEventListener(`keydown`, onEscPressModalHandler);

      showRespectModal(`Спасибо за Ваше обращение!`);
    }

    if (response.result === `ERROR`) {
      errorTextElement.textContent = response.error;
    }
  })
  .finally(() => {
    formElement.dataset.mode = `input`;
  });

});

const showRespectModal = (text = ``) => {
  const modalElement = document.querySelector(`.js--respectModal`);
  const titleElement = modalElement.querySelector(`.modal__title`);
  titleElement.textContent = text;

  modalElement.classList.add(`modal--show`);
  document.addEventListener(`keydown`, onEscPressModalHandler);

  setTimeout(() => {
    modalElement.classList.remove(`modal--show`);
    document.removeEventListener(`keydown`, onEscPressModalHandler);
  }, 3000);
};

const informFormElement = productPageElement.querySelector(`.product-page__informForm`);
const informProductButton = informFormElement.querySelector(`.product-page__informButton`);
const informTextElement = informFormElement.querySelector(`.product-page__informMessage`);

informProductButton.addEventListener(`click`, () => {
  informFormElement.dataset.mode = `progress`;
  informTextElement.textContent =  ``;

  const emailInput = informFormElement.querySelector(`.product-page__informInput`);

  getData({
    ["set_item_wait"]: {
      ["item_id"]: itemData.item_id,
      ["email"]: emailInput.value,
    }
  })
  .then((response) => {
    if (response.result === `OK`) {
      showRespectModal(`Ваш запрос получен`);
    }

    if (response.result === `ERROR`) {
      informTextElement.textContent = response.error;
    };
  })
  .finally(() => {
    informFormElement.dataset.mode = `input`;
  });
});

const wrapImageElement = productPageElement.querySelector(`.product-page__wrapImg`);
const imageListElement = productPageElement.querySelector(`.product-page__imageList`);
const previewListElement = productPageElement.querySelector(`.product-page__previewList`);

Object.keys(itemData.item_images).forEach((key) => {
  const image = itemData.item_images[key];

  const imageItemElement = createListItem(`product-page__imageItem swiper-slide`);
  imageListElement.append(imageItemElement);

  imageItemElement.addEventListener(`click`, () => {
    // открытие попапа
    wrapImageElement.classList.add(`popup`, `popup--show`);
    document.addEventListener(`keydown`, onEscPressPopupHandler);
    document.querySelector(`body`).classList.add(`overflowHidden`);
  });

  const imageElement = createImage(`product-page__image`, image.link, itemData.item_name);
  imageItemElement.append(imageElement);


  const previewItemElement = createListItem(`product-page__previewItem swiper-slide`);
  previewListElement.append(previewItemElement);

  const previewElement = createParagraph(`product-page__preview`);
  previewItemElement.append(previewElement);

  const previewImageElement = createImage(``, image.prev, itemData.item_name);
  previewElement.append(previewImageElement);
});

var imageSwiper = new Swiper(`.product-page__previewSwiper`, {
  spaceBetween: 20,
  // loop: true,
  // freeMode: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".swiper__button--next",
    prevEl: ".swiper__button--prev",
    hiddenClass: 'product-page__swiperButton--hidden',
    disabledClass: 'product-page__swiperButton--disabled',
    lockClass: 'product-page__swiperButton--lock'
  },

  breakpoints: {
    320: {
      slidesPerView: 3,
    },
    420: {
      slidesPerView: 4,
    },
    520: {
      slidesPerView: 5,
    },
    620: {
      slidesPerView: 6,
    },
    720: {
      slidesPerView: 7,
    },
    850: {
      slidesPerView: 8,
    },
    1000: {
      slidesPerView: 5,
    }
  },
});

var previewSwiper = new Swiper(`.product-page__wrapImage`, {
  lazy: true,
  loop: true,
  slidesPerView: 1,

  thumbs: {
    swiper: imageSwiper,
    slideThumbActiveClass: `product-page__previewItem--active`,
  },
});


if (!isEmptyObject(itemData.item_labels)) {
  const itemLabelWrap = productPageElement.querySelector(`.product-page__labelList`);

  Object.keys(itemData.item_labels).forEach((key) => {
    const liItemElement = createListItem(`product-page__labelItem`, itemData.item_labels[key].title);
    itemLabelWrap.append(liItemElement);
    if (itemData.item_labels[key].background) {
      liItemElement.style.backgroundColor = itemData.item_labels[key].background;
    }
  });
}


const itemTitle = productPageElement.querySelector(`.product-page__title`);
itemTitle.textContent = itemData.item_name;

const itemRating = productPageElement.querySelector(`.product-page__rating span`);
itemRating.textContent = itemData.item_rating;

const itemComment = productPageElement.querySelector(`.product-page__comment span`);
itemComment.innerHTML = getReviewNumeralEnding(itemData.item_comment_count);


const itemId = productPageElement.querySelector(`.product-page__id span`);
itemId.textContent = itemData.item_id;

if (itemData.item_act) {
  const inStockWrap = productPageElement.querySelector(`.product-page__isStock`);
  inStockWrap.dataset.show = `true`;

  const priceWrapElement = productPageElement.querySelector(`.product-page__priceWrap`);

  if (itemData.item_price_old && itemData.item_price_old !== itemData.item_price) {
    const paragraphElement = createParagraph(`product-page__oldPrice`, `${itemData.item_price_old} <span>&#8381;</span>`);
    priceWrapElement.append(paragraphElement);
  }

  if (itemData.item_bonus) {
    const paragraphElement = createParagraph(`product-page__bonus`, `+${getBonusNumeralEnding(itemData.item_bonus)}`);
    priceWrapElement.append(paragraphElement);
  }

  const itemPrice = productPageElement.querySelector(`.product-page__price`);
  itemPrice.innerHTML = `${getFormattedPrice(itemData.item_price)} <span>&#8381;</span>`;

  const cartButtonWrapElement = productPageElement.querySelector(`.product-page__cartButtons`);
  cartButtonWrapElement.dataset.inCart = +itemData.item_cart > 0;

  const productCartButtonWrapElement = productPageElement.querySelector(`.product-page__cartButtonWrap`);

  const counterElement = createCounterElement(`product-page__counter counter`, itemData.item_cart, itemData.item_id, (response) => {
    cartButtonWrapElement.dataset.inCart = `true`;
  });
  productCartButtonWrapElement.append(counterElement);

  const addToCartButton = productPageElement.querySelector(`.product-page__addButton`);
  if (addToCartButton) {
    addToCartButton.addEventListener(`click`, () => {
      const addCounterButtonElement = counterElement.querySelector(`.counter__button--add`);

      addCounterButtonElement.click();       
    });
  }

  const paramListElement = productPageElement.querySelector(`.product-page__paramList`);

  let deliveryText = ``;

  if (itemData.item_delivery === 0) {
    deliveryText = `<b>Самовывоз — бесплатно.</b> Оплата — при получении.`
  }
  if (itemData.item_delivery === 1) {
    deliveryText = `<b>Доставка домой — в подарок.</b> Оплата — при получении.`
  }
  const deliveryLiItemElement = createListItem(`product-page__paramItem`);
  paramListElement.append(deliveryLiItemElement);

  const deliveryParagraphElement = createParagraph(`product-page__param`, deliveryText);
  deliveryLiItemElement.append(deliveryParagraphElement);


  if (+itemData.item_credit) {
    const liItemElement = createListItem(`product-page__paramItem`);
    paramListElement.append(liItemElement);

    const paragraphElement = createParagraph(`product-page__param`, `от ${itemData.item_credit}&#8381; / месяц`);
    liItemElement.append(paragraphElement);
  }

  if (isInteger(itemData.item_store)) {
    if (+itemData.item_store) {
      const liItemElement = createListItem(`product-page__paramItem`);
      paramListElement.append(liItemElement);
  
      const paragraphElement = createParagraph(`product-page__param`, `В наличии в ${shopInfoData.town_p}, ${itemData.item_store} шт.`);
      liItemElement.append(paragraphElement);
    }
  } else {
    if (String(itemData.item_store) === `true`) {
      const liItemElement = createListItem(`product-page__paramItem`);
      paramListElement.append(liItemElement);
  
      const paragraphElement = createParagraph(`product-page__param`, `В наличии в ${shopInfoData.town_p}`);
      liItemElement.append(paragraphElement);
    }
  }

  if (itemData.item_date) {
    const liItemElement = createListItem(`product-page__paramItem`, );
    paramListElement.append(liItemElement);

    const paragraphElement = createParagraph(`product-page__param`, `Склад, поступление ${itemData.item_date}`);
    liItemElement.append(paragraphElement);
  }

} else {
  const notAvailableWrap = productPageElement.querySelector(`.product-page__notAvailable`);
  notAvailableWrap.classList.remove(`hide`);
}

if (!isEmptyObject(itemData.item_prop)) {
  const tableElement = productPageElement.querySelector(`.product-page__table`);

  Object.keys(itemData.item_prop)
  .filter((key) => itemData.item_prop[key].main)
  .forEach((key) => {
    const tableRow = createTableRow(``, 2, [itemData.item_prop[key].title, itemData.item_prop[key].value]);
    tableElement.append(tableRow);
  });
}

const specItemDescription = productPageElement.querySelector(`.product-page__specItem--description`);
if (itemData.item_descr) {
  specItemDescription.classList.remove(`hide`);
  const itemDescription = specItemDescription.querySelector(`.product-page__specContent`);
  const descriptionParagraphElement = createParagraph(``, itemData.item_descr);
  itemDescription.append(descriptionParagraphElement);
} else {
  specItemDescription.remove();
}

const specItemPopularReview = productPageElement.querySelector(`.product-page__specItem--popularReview`);
if (itemData.item_comment_pop && !isEmptyObject(itemData.item_comment_pop)) {
  specItemPopularReview.classList.remove(`hide`);
  const itemPopularReview = specItemPopularReview.querySelector(`.product-page__specContent`);
  renderReview(itemPopularReview, itemData.item_comment_pop);
} else {
  specItemPopularReview.remove();
}

const navItemReviews = productPageElement.querySelector(`.product-page__navItem--reviews`);
if (!isEmptyObject(itemData.item_comments)) {
  navItemReviews.classList.remove(`hide`);
  const commentNavTabElement = productPageElement.querySelector(`.product-page__navTab[data-spec="reviews"] span`);
  commentNavTabElement.textContent = itemData.item_comment_count;
}

if (!isEmptyObject(itemData.item_prop)) {
  const parametersTableElement = productPageElement.querySelector(`.product-page__specContent--parameters table`);

  Object.keys(itemData.item_prop)
  .forEach((key) => {
    const tableRow = createTableRow(``, 2, [itemData.item_prop[key].title, itemData.item_prop[key].value]);
    parametersTableElement.append(tableRow);
  });
}

// оценки

const rateElement = productPageElement.querySelector(`.product-page__wrapRate`);

const ratingRateElement = rateElement.querySelector(`.rate__rating`);
ratingRateElement.querySelector(`span`).innerHTML = itemData.item_rating;


const reviewRateButtonElement = rateElement.querySelector(`.rate__review`);
reviewRateButtonElement.innerHTML = getReviewNumeralEnding(itemData.item_comment_count);

reviewRateButtonElement.addEventListener(`click`, () => {
  // аналог кнопки Показать все
  getData({
    ["get_item_comments"]: {
      ["item_id"]: itemData.item_id,
      ["start"]: 0,
    }
  })
  .then((itemData) => {
    if (itemData.result === `OK`) {
      showReviewsButton.remove();

      reviewsListElement.textContent = ``;

      const buttonElements = rateListElement.querySelectorAll(`.rate__button`);

      Array.from(buttonElements)
      .forEach((elem) => elem.dataset.check = `false`);

      Object.keys(itemData.item_comments).forEach((itemId) => {
        const review = itemData.item_comments[itemId];
        renderReviewItem(review);
      });
    }

    if (itemData.result === `ERROR`) {
      debugger;
    }
  });
});

const rateListElement = rateElement.querySelector(`.rate__list`);

Object.keys(itemData.item_rate_list)
.reverse()
.forEach((rate) => {
  const liItemElement = createListItem(`rate__item`);
  rateListElement.append(liItemElement);

  const buttonElement = createButton(``, `rate__button`);
  liItemElement.append(buttonElement);

  const orderElement = createSpan(`rate__order`, rate);
  buttonElement.append(orderElement);

  const progressWrapElement = createDiv(`rate__progress`);
  buttonElement.append(progressWrapElement);

  const progressElement = createSpan();
  progressElement.style.width = `${Math.round(+itemData.item_rate_list[rate] / +itemData.item_comment_count * 100)}%`;
  progressWrapElement.append(progressElement);

  const countElement = createSpan(`rate__count`, itemData.item_rate_list[rate]);
  buttonElement.append(countElement);

  buttonElement.addEventListener(`click`, () => {
    buttonElement.dataset.check = buttonElement.dataset.check === `true` ? `false` : `true`;

    if (buttonElement.dataset.check === `true`) {
      const buttonElements = rateListElement.querySelectorAll(`.rate__button`);

      Array.from(buttonElements)
      .filter((elem) => elem !== buttonElement)
      .forEach((elem) => elem.dataset.check = `false`);

      // отправить запрос
      getData({
        ["get_item_comments"]: {
          ["item_id"]: itemData.item_id,
          ["rating"]: rate,
        }
      })
      .then((itemData) => {
        if (itemData.result === `OK`) {
          showReviewsButton.remove();
          reviewsListElement.textContent = ``;
          
          Object.keys(itemData.item_comments).forEach((itemId) => {
            const review = itemData.item_comments[itemId];
            renderReviewItem(review);
          });
        }
    
        if (itemData.result === `ERROR`) {
          debugger;
        }
      })
    }

    if (buttonElement.dataset.check === `false`) {
      getData({
        ["get_item_comments"]: {
          ["item_id"]: itemData.item_id,
          ["start"]: 0,
        }
      })
      .then((itemData) => {
        if (itemData.result === `OK`) {
          showReviewsButton.remove();
    
          reviewsListElement.textContent = ``;
          
          Object.keys(itemData.item_comments).forEach((itemId) => {
            const review = itemData.item_comments[itemId];
            renderReviewItem(review);
          });
        }
    
        if (itemData.result === `ERROR`) {
          debugger;
        }
      })
    }

  });

});



// отзывы
const reviewsListElement = productPageElement.querySelector(`.reviews__list`);

const renderReviewItem = (review) => {
  const liItemElement = createListItem(`reviews__item`);
  reviewsListElement.append(liItemElement);

  renderReview(liItemElement, review);
}

Object.keys(itemData.item_comments).forEach((itemId) => {
  const review = itemData.item_comments[itemId];
  renderReviewItem(review);
});

const showReviewsButton = productPageElement.querySelector(`.reviews__showButton`);
showReviewsButton.innerHTML = `Показать все ${itemData.item_comment_count} отзывов`;

showReviewsButton.addEventListener(`click`, () => {
  getData({
    ["get_item_comments"]: {
      ["item_id"]: itemData.item_id,
      ["start"]: Object.keys(itemData.item_comments).length,
    }
  })
  .then((itemData) => {
    if (itemData.result === `OK`) {
      showReviewsButton.remove();

      Object.keys(itemData.item_comments).forEach((itemId) => {
        const review = itemData.item_comments[itemId];
        renderReviewItem(review);
      });
    }

    if (itemData.result === `ERROR`) {
      debugger;
    }
  });
});

// Показать все 26 отзывов
