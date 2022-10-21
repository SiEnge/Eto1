window.addEventListener(`load`, () => {


  // Баннеры
  const bannerElement = document.querySelector(`.banner`);
  if (bannerElement) {
    const bannerListElement = bannerElement.querySelector(`.banner__list`);
    
    Object.keys(bannerList)
    .forEach((itemId) => {
      const liItemElement = createListItem(`banner__item swiper-slide`);
      bannerListElement.append(liItemElement);

      const anchorElement = createAnchor(`banner__link`, ``, bannerList[itemId].link);
      anchorElement.title = bannerList[itemId].title;
      liItemElement.append(anchorElement);

      const picElement = createPicture();
      anchorElement.append(picElement);

      const sourceElement = createSourceImage(bannerList[itemId].image, `(min-width: 1000px)`);
      picElement.append(sourceElement);

      const imgElement = createImage(`banner__image`, bannerList[itemId].image_mob, bannerList[itemId].title);
      imgElement.width = `1000`;
      picElement.append(imgElement);
    });


    new Swiper('.banner__wrap', {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
    
      pagination: {
        el: '.swiper-pagination',
      },
    
      navigation: {
        nextEl: '.swiper__button--next',
        prevEl: '.swiper__button--prev',
        hiddenClass: 'main-page__swiperButton--hidden',
        disabledClass: 'main-page__swiperButton--disabled',
        lockClass: 'main-page__swiperButton--lock'
      },
    });
  }

  const renderProduct = (container, product) => {
    const liItemElement = createListItem(`actions__item swiper-slide`);
    container.append(liItemElement);

    const articleElement = createArticle(`actions__preview-product preview-product`);
    liItemElement.append(articleElement);

    const wrapElement = createDiv(`preview-product__wrap`);
    wrapElement.title = product.item_name;
    articleElement.append(wrapElement);

    const headingElement = createHeading(`h3`, `preview-product__title`, ``);
    wrapElement.append(headingElement);

    const anchorTitleElement = createAnchor(``, product.item_name, product.item_link);
    headingElement.append(anchorTitleElement);

    const anchorImgElement = createAnchor(`preview-product__image`, ``, product.item_link);
    wrapElement.append(anchorImgElement);

    const imgElement = createImage(``, product.item_image, product.item_name);
    anchorImgElement.append(imgElement);

    if (product.item_act) {
      const actionWrapElement = createDiv(`preview-product__actionWrap`);
      actionWrapElement.dataset.inCart = +product.item_cart > 0;
      wrapElement.append(actionWrapElement);
  
      const paragraphElement = createPriceElement(`preview-product__price`, product.item_price);
      actionWrapElement.append(paragraphElement);
  
      const addToCartButton = createButton(`Добавить в корзину`, `preview-product__cartButton`);
      addToCartButton.title = `Добавить в корзину`;
      actionWrapElement.append(addToCartButton);
  
      addToCartButton.addEventListener(`click`, () => {
        getData({
          ["set_cart"]: {
            ["item_id"]: product.item_id,
            ["action"]: `add`,
          }
        })
        .then((response) => {
          setCountCartHeader(response.cart_count);
          actionWrapElement.dataset.inCart = `true`;
        });
      });
  
      const toCartAnchorElement = createAnchor(`preview-product__cartLink`, `Оформить`, `/cart`);
      actionWrapElement.append(toCartAnchorElement);
    } else {
      const storeParagraphElement = createParagraph(`preview-product__itemNotAvailable`, `Нет в наличии`);
      wrapElement.append(storeParagraphElement);
    }

  };

  // акционные товары
  const actionsElement = document.querySelector(`.main-page__section--actions`);
  if (actionsElement) {
    const renderActionItems = () => {
      const productList = actionList.items;
      if (isEmptyObject(productList)) {
        return;
      }
    
      actionsElement.classList.remove(`hide`);

      const titleElement = actionsElement.querySelector(`.main-page__title`);
      titleElement.textContent = actionList.title;
    
      const actionListElement = actionsElement.querySelector(`.main-page__list`);
    
      Object.keys(productList)
      .forEach((itemId) => {
        const product = productList[itemId];
        renderProduct(actionListElement, product)
      });

      new Swiper(`.swiper--actions`, {
        direction: 'horizontal',
        // spaceBetween: 10,

        navigation: {
          nextEl: '.swiper__button--next',
          prevEl: '.swiper__button--prev',
          hiddenClass: 'main-page__swiperButton--hidden',
          disabledClass: 'main-page__swiperButton--disabled',
          lockClass: 'main-page__swiperButton--lock'
        },
      
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          420: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 4,
          }
        }
      });
    };

    renderActionItems();
  }

  // Новости
  const newsElement = document.querySelector(`.main-page__section--news`);
  if (newsElement) {
    const renderNewsItems = () => {
      const newsListElement = newsElement.querySelector(`.main-page__list`);
    
      Object.keys(newsList)
      .forEach((itemId) => {
        const liItemElement = createListItem(`news__item swiper-slide`);
        newsListElement.append(liItemElement);
    
        const asideElement = createAside(``);
        liItemElement.append(asideElement);
    
        const anchorElement = createAnchor(`news__link`, ``, newsList[itemId].news_link);
        asideElement.append(anchorElement);
    
        const headingElement = createHeading(`h3`, `news__title`, newsList[itemId].news_title);
        anchorElement.append(headingElement);
    
        const timeElement = createTime(`news__date`, newsList[itemId].news_dt, newsList[itemId].news_dt);
        anchorElement.append(timeElement);
    
        const paragraphElement = createParagraph(`news__text`, newsList[itemId].news_text);
        anchorElement.append(paragraphElement);
      });

      new Swiper(`.swiper--news`, {
        direction: 'horizontal',
        spaceBetween: 10,

        navigation: {
          nextEl: '.swiper__button--next',
          prevEl: '.swiper__button--prev',
          hiddenClass: 'swiper__button--hidden',
          disabledClass: 'swiper__button--disabled',
          lockClass: 'swiper__button--lock'
        },
      
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          420: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 4,
          }
        }
      });
    };

    renderNewsItems();
  }

  // просмотренные товары
  const recentsElement = document.querySelector(`.main-page__section--recents`);
  if (recentsElement) {
    const renderRecentItems = () => {
      const productList = document.location.hostname == `localhost` ? {} : recentsList.items;
      if (isEmptyObject(productList)) {
        return;
      }
    
      recentsElement.classList.remove(`hide`);

      const titleElement = recentsElement.querySelector(`.main-page__title`);
      titleElement.textContent = recentsList.title;
    
      const recentListElement = recentsElement.querySelector(`.main-page__list`);
    
      Object.keys(productList)
      .forEach((itemId) => {
        const product = productList[itemId];
        renderProduct(recentListElement, product)
      });

      new Swiper(`.swiper--recents`, {
        direction: 'horizontal',
        spaceBetween: 10,

        navigation: {
          nextEl: '.swiper__button--next',
          prevEl: '.swiper__button--prev',
          hiddenClass: '.main-page__swiperButton--hidden',
          disabledClass: 'main-page__swiperButton--disabled',
          lockClass: 'main-page__swiperButton--lock'
        },
      
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          420: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          1100: {
            slidesPerView: 4,
          }
        }
      });
    };

    renderRecentItems();
  }
});
