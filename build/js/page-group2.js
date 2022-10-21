// <-- filter
const productListPageElement = document.querySelector(`.product-list-page`);
const countElement = productListPageElement.querySelector(`.product-list-page__count`);


const getCurrentFilter = () => {
  const currentFilter = {};

  const filterUrl = getUrlSearch(`f`);

  if (!filterUrl) {
    return currentFilter;
  }

  Object.keys(filterList).forEach((itemId) => {
    const filterItem = filterList[itemId];
    const alias = filterItem.alias;
    const values = filterItem.values;

    const result = filterUrl
      .split(`,`)
      .filter((param) => param.slice(0, param.indexOf(`_`)) === alias)
      .map((param) => {
        const id = param.slice(param.indexOf(`_`) + 1);
        const valueId = Object.keys(values).find((key) => {
          return String(values[key].value) === id;
        });

        return {
          id,
          title: valueId ? values[valueId].title : ``, 
        }
      });

    if (!isEmptyArray(result)) {
      if (filterItem.type === `rng`) {
        currentFilter[alias] = {
          type: `range`,
          title: filterItem.title,
          min: result[0].id.split(`-`)[0],
          max: result[0].id.split(`-`)[1],
        }
      } 

      if (filterItem.type === `lst`) {
        currentFilter[alias] = {
          type: `list`,
          values: result,
        }
      }
    }
  });
  
  return currentFilter;
};

const getUrlParamText = (urlParams) => {
  if (isEmptyArray(urlParams)) {
    return ``;
  }

  return `?${urlParams.join(`&`)}`;
};

const getSortUrl = () => {
  const urlParams = [];

  if (filter.name) {
    urlParams.push(`s=${filter.name}`);
  }

  if (getUrlSearch(`a`)) {
    urlParams.push(`a=${getUrlSearch(`a`)}`);
  }

  if (getUrlSearch(`f`)) {
    urlParams.push(`f=${getUrlSearch(`f`)}`);
  }

  if (getUrlSearch(`p`)) {
    urlParams.push(`p=${getUrlSearch(`p`)}`);
  }

  urlParams.push(`sort=${sort}`);

  return `${window.location.origin}${window.location.pathname}${getUrlParamText(urlParams)}`;
};

const getPageUrl = () => {
  const urlParams = [];

  if (filter.name) {
    urlParams.push(`s=${filter.name}`);
  }

  if (getUrlSearch(`a`)) {
    urlParams.push(`a=${getUrlSearch(`a`)}`);
  }

  if (getUrlSearch(`f`)) {
    urlParams.push(`f=${getUrlSearch(`f`)}`);
  }

  urlParams.push(`p=${activePage2}`);

  urlParams.push(`sort=${sort}`);

  return `${window.location.origin}${window.location.pathname}${getUrlParamText(urlParams)}`;
};

const getFilterUrl = (results) => {
  const urlParams = [];

  if (filter.name) {
    urlParams.push(`s=${filter.name}`);
  }

  if (getUrlSearch(`a`)) {
    urlParams.push(`a=${getUrlSearch(`a`)}`);
  }

  if (!isEmptyArray(results)) {
    urlParams.push(`f=${results.join(`,`)}`);
  }

  urlParams.push(`p=${activePage2}`);

  urlParams.push(`sort=${sort}`);

  return `${window.location.origin}${window.location.pathname}${getUrlParamText(urlParams)}`;
};

const setFilterUrl = () => {
  const results = [];

  Object.keys(filter)
  .filter((alias) => alias !== `parent` && alias !== `name` && alias !== `promo`)
  .forEach((alias) => {
    if (filter[alias].type === `range`) {
      results.push(`${alias}_${filter[alias].min}-${filter[alias].max}`);
    } 

    if (filter[alias].type === `list`) {
      filter[alias].values.forEach((value) => results.push(`${alias}_${value.id}`));
    }
  });

  const url = getFilterUrl(results);
  window.history.pushState(null, null, url);
};

const onRangeFilterChangeHandler = (alias, startValue, finishValue, min, max, title) => {
  const start = startValue === min ? `` : startValue;
  const finish = finishValue === max ? `` : finishValue;

  if (!start && !finish) {
    delete filter[alias];
  } else {
    filter[alias] = {
      type: `range`,
      title,
      min: start,
      max: finish,
    };
  }

  setActivePage(1);
  getItems();
  setFilterUrl();
};


const onChekboxFilterChangeHandler = (evt) => {
  const checkboxInputElement = evt.target;
  const isCheck = checkboxInputElement.checked;
  const alias = checkboxInputElement.dataset.alias;
  const id = checkboxInputElement.dataset.id;
  const title = checkboxInputElement.dataset.title;

  if (isCheck) {
    const newValue = {id, title};

    if (alias in filter) {
      filter[alias].values.push(newValue);
    } else {
      filter[alias] = {
        type: `list`,
        values: [newValue]
      };
    }

  } else {
    if (alias in filter) {
      const index = filter[alias].values.findIndex((it) => it.id === id);

      if (index !== -1) {
        filter[alias].values.splice(index, 1);
      }

      if (isEmptyArray(filter[alias])) {
        delete filter[alias];
      }
    }
  }

  setActivePage(1);
  getItems();
  setFilterUrl();
};

// отрисовка фильтра
const renderFilter = (filterList) => {
  const filterElement = document.querySelector(`.filter`);
  if (!filterElement) {
    return;
  }

  const filterFormElement = filterElement.querySelector(`.filter__form`);
  if (!filterFormElement) {
    return;
  }
  
  filterFormElement.innerHTML = ``;

  Object.keys(filterList).forEach((itemId) => {
    const filterItem = filterList[itemId];

    if (filterItem.type === `lst`) {
      const fieldsetElement = createFieldset(`filter__item`);
      filterFormElement.append(fieldsetElement);

      const legendElement = createLegend(`filter__itemTitle`, filterItem.title);
      fieldsetElement.append(legendElement);

      const divElement = createDiv(`filter__wrap`);
      fieldsetElement.append(divElement);

      const values = filterItem.values;
      
      Object.keys(values).forEach((valueId) => {
        const value = values[valueId];

        const labelElement = createLabel(`filter__checkbox`);
        divElement.append(labelElement);
  
        const checkboxInputElement = createInput(`filter__checkboxInput`, `checkbox`);
        checkboxInputElement.dataset.alias = filterItem.alias;
        checkboxInputElement.dataset.id = value.value;
        checkboxInputElement.dataset.title = value.title;

        if (!!filter[filterItem.alias]) {
          checkboxInputElement.checked = filter[filterItem.alias].values
          .map((it) => it.id)
          .includes(String(value.value));
        }

        labelElement.append(checkboxInputElement);
        checkboxInputElement.addEventListener(`change`, onChekboxFilterChangeHandler)
  
        const titleSpanElement = createSpan(`filter__checkboxLabel`, value.title);
        labelElement.append(titleSpanElement);

        if (value.count) {
          const countSpanElement = createSpan(`filter__checkboxCount`, value.count);
          labelElement.append(countSpanElement);
        }
      });
    }

    if (filterItem.type === `rng`) {
      const fillColor = () => {
        const range = maxValue - minValue;
        
        const percent1 = ((startValue - minValue) / range) * 100;
        const percent2 = ((finishValue - minValue) / range) * 100;

        rangeTrack.style.left = `${percent1}%`;
        rangeTrack.style.right = `${100 - percent2}%`;
      };

      const fieldsetElement = createFieldset(`filter__item`);
      filterFormElement.append(fieldsetElement);

      const legendElement = createLegend(`filter__itemTitle`, filterItem.title);
      fieldsetElement.append(legendElement);

      const divElement = createDiv(`filter__wrap`);
      fieldsetElement.append(divElement);

      const minValue = filterItem.values.min;
      const maxValue = filterItem.values.max;

      let startValue = filter[filterItem.alias] && filter[filterItem.alias].min ? +filter[filterItem.alias].min : +minValue;
      let finishValue = filter[filterItem.alias] && filter[filterItem.alias].max ? +filter[filterItem.alias].max : +maxValue;

      const inputWrap = createDiv(`filter__inputWrap`);
      divElement.append(inputWrap);

      const startInputElement = createInput(`filter__input`, `number`, startValue);
      inputWrap.append(startInputElement);

      const spanElement = createSpan(``, `-`);
      inputWrap.append(spanElement);

      const finishInputElement = createInput(`filter__input`, `number`, finishValue);
      inputWrap.append(finishInputElement);

      const rangeWrap = createDiv(`filter__rangeWrap`);
      divElement.append(rangeWrap);

      const rangeTrackWrap = createDiv(`filter__rangeTrackWrap`);
      rangeWrap.append(rangeTrackWrap);

      const rangeTrack = createSpan(`filter__rangeTrack`);
      rangeTrackWrap.append(rangeTrack);

      const startRangeElement = createInput(`filter__range`, `range`, startValue);
      startRangeElement.min = minValue; 
      startRangeElement.max = maxValue; 
      // startRangeElement.step = `0.1`; 
      startRangeElement.value = startValue; 

      rangeWrap.append(startRangeElement);

      const finishRangeElement = createInput(`filter__range`, `range`, finishValue);
      rangeWrap.append(finishRangeElement);

      finishRangeElement.min = minValue; 
      finishRangeElement.max = maxValue; 
      // finishRangeElement.step = `0.1`; 
      finishRangeElement.value = finishValue; 

      startInputElement.addEventListener(`change`, () => {
        let value = +startInputElement.value;
        
        if (value < minValue) {
          value = minValue;
        }

        if (value > maxValue) {
          value = maxValue;
        }

        if (value > finishValue) {
          value = finishValue;
        }

        startRangeElement.value = startInputElement.value = startValue = value;
        fillColor();

        onRangeFilterChangeHandler(filterItem.alias, startValue, finishValue, minValue, maxValue, filterItem.title);
      });

      finishInputElement.addEventListener(`change`, () => {
        let value = +finishInputElement.value;
        
        if (value < minValue) {
          value = minValue;
        }

        if (value > maxValue) {
          value = maxValue;
        }

        if (value < startValue) {
          value = startValue;
        }
        finishRangeElement.value = finishInputElement.value = finishValue = value;
        fillColor();

        onRangeFilterChangeHandler(filterItem.alias, startValue, finishValue, minValue, maxValue, filterItem.title);
      });

      startRangeElement.addEventListener(`input`, () => {
        let value = +startRangeElement.value;
        
        if (value > finishValue) {
          value = finishValue;
        }

        startInputElement.value = startRangeElement.value = startValue = value;

        fillColor();
      });
      
      startRangeElement.addEventListener(`change`, () => {
        onRangeFilterChangeHandler(filterItem.alias, startValue, finishValue, minValue, maxValue, filterItem.title);
      });

      finishRangeElement.addEventListener(`input`, () => {
        let value = +finishRangeElement.value;

        if (value < startValue) {
          value = startValue;
        }

        finishInputElement.value = finishRangeElement.value = finishValue = value;
        fillColor();
      });

      finishRangeElement.addEventListener(`change`, () => {
        onRangeFilterChangeHandler(filterItem.alias, startValue, finishValue, minValue, maxValue, filterItem.title);
      });

      fillColor();
    }
  });
};

const filter = getCurrentFilter();


const onOpenFilterHandler = () => {
  productListPageElement.dataset.isFilterShow = true;
  document.querySelector(`body`).classList.add(`overflowHidden`);
};

const onCloseFilterHandler = () => {
  productListPageElement.dataset.isFilterShow = false;
  document.querySelector(`body`).classList.remove(`overflowHidden`);
};

const openFilterButton = productListPageElement.querySelector(`.product-list-page__filterButton`);
if (openFilterButton) {
  openFilterButton.addEventListener(`click`, onOpenFilterHandler);
}

const closeFilterButton = productListPageElement.querySelector(`.filter__closeButton`);
if (closeFilterButton) {
  closeFilterButton.addEventListener(`click`, onCloseFilterHandler);
}

const overlayFilterButton = productListPageElement.querySelector(`.filter__overlay`);
if (overlayFilterButton) {
  overlayFilterButton.addEventListener(`click`, onCloseFilterHandler);
}

const applyFilterButton = productListPageElement.querySelector(`.filter__applyButton`);
if (applyFilterButton) {
  applyFilterButton.addEventListener(`click`, onCloseFilterHandler);
}

// filter -->


filter.parent = itemList.parent || undefined;
filter.name = itemList.filter ? itemList.filter.name : ``;
filter.promo = itemList.filter ? itemList.filter.promo : ``;

const setActiveSort = (data) => {
  sort = data;

  const url = getSortUrl();
  window.history.pushState(null, null, url);
};

let sort = itemList.order_by;
if (sort) {
  const currentSortButton = productListPageElement.querySelector(`.sort__button[data-sort-id="${sort}"]`);
  currentSortButton.classList.add(`sort__button--active`);
}

// сортировка
const sortElement = productListPageElement.querySelector(`.sort`);
const sortButtons = sortElement.querySelectorAll(`.sort__button`);



const onSortChoiceHandler = (evt) => {
  const button = evt.target;
  const activeButton = sortElement.querySelector(`.sort__button--active`);

  activeButton.classList.remove(`sort__button--active`);
  activeButton.removeEventListener(`click`, onSortListShowHandler);
  activeButton.addEventListener(`click`, onSortChoiceHandler);

  button.classList.add(`sort__button--active`);
  button.removeEventListener(`click`, onSortChoiceHandler);
  button.addEventListener(`click`, onSortListShowHandler);

  sort = button.dataset.sortId;
  sortElement.dataset.isShow = false;

  setActivePage(1);
  setActiveSort(sort)
  getItems();
};

const onSortListShowHandler = () => {
  sortElement.dataset.isShow = true;
};

Array.from(sortButtons).forEach((button) => {
  if (button.classList.contains(`sort__button--active`)) {
    button.addEventListener(`click`, onSortListShowHandler);
  } else {
    button.addEventListener(`click`, onSortChoiceHandler);
  }
});

const productListElement = productListPageElement.querySelector(`.product-list`);
const appliedFilterList = productListPageElement.querySelector(`.product-list-page__appliedFilterList`);

// отрисовка карточек
const renderItems = (items = []) => {
  // window.scrollTo(0,0);
  productListElement.innerHTML = ``;

  const render = () => {
    Object.keys(items)
    .forEach((itemId) => {
      const product = items[itemId]; 

      const liItemElement = createListItem(`product-list__item`);
      productListElement.append(liItemElement);

      const articleElement = createArticle(`product-list__itemWrap`);
      liItemElement.append(articleElement);

      const headingElement = createHeading(`h3`, `product-list__itemTitle`, ``);
      articleElement.append(headingElement);

      const anchorElement = createAnchor(``, product.item_name, product.item_link);
      headingElement.append(anchorElement);

      const imageAnchorElement = createAnchor(`product-list__itemImage`, ``, product.item_link);
      articleElement.append(imageAnchorElement);
  
      const imgElement = createImage(``, product.item_image, product.item_name);
      imageAnchorElement.append(imgElement);

      if (!isEmptyArray(Object.keys(product.item_labels))) {
        const labelListElement = createList(`product-list__itemLabelList`);
        articleElement.append(labelListElement);

        Object.keys(product.item_labels).forEach((key) => {
          const label = product.item_labels[key];

          const labelItemElement = createListItem(`product-list__itemLabelItem`, label.title);
          labelListElement.append(labelItemElement);

          if (label.background) {
            labelItemElement.style.backgroundColor = label.background;
          }
        });
      }

      const ratingDivElement = createDiv(`product-list__itemRatingWrap`);
      articleElement.append(ratingDivElement);
  
      const ratingButtonElement = createButton(product.item_rating, `product-list__itemRating`);
      ratingDivElement.append(ratingButtonElement);
  
      const commentButtonElement = createButton(product.item_comments, `product-list__itemComment`);
      ratingDivElement.append(commentButtonElement);

      const propertyDivElement = createDiv(`product-list__itemPropertyWrap`);
      articleElement.append(propertyDivElement);

      const propertyListElement = createList(`product-list__itemPropertyList`);
      propertyDivElement.append(propertyListElement);

      Object.keys(product.item_prop)
      .forEach((propId) => {
        const prop = product.item_prop[propId];

        const propertyLiItemElement = createListItem(`product-list__itemProperty`);
        propertyListElement.append(propertyLiItemElement);

        const propertyParagraphElement = createParagraph(`product-list__itemPropertyText`, `${prop.title}: `);
        propertyLiItemElement.append(propertyParagraphElement);

        const spanElement = createSpan(``, prop.value);
        propertyParagraphElement.append(spanElement);
      });

      if (product.item_act) {
        const actionDivElement = createDiv(`product-list__itemActionWrap`);
        actionDivElement.dataset.inCart = +product.item_cart !== 0;
        articleElement.append(actionDivElement);
    
        if (product.item_price_old) {
          const oldPriceParagraphElement = createPriceElement(`product-list__itemPriceOld`, product.item_price_old);
          actionDivElement.append(oldPriceParagraphElement);
        }
  
        const priceParagraphElement = createPriceElement(`product-list__itemPrice`, product.item_price);
        actionDivElement.append(priceParagraphElement);
    
        const addItemButtonElement = createButton(`В корзину`, `product-list__itemAddButton`);
        addItemButtonElement.title = `Добавить в корзину`;
        actionDivElement.append(addItemButtonElement);
  
        addItemButtonElement.addEventListener(`click`, () => {
          const addCounterButtonElement = counterElement.querySelector(`.counter__button--add`);
          addCounterButtonElement.click();
        });
  
        const counterElement = createCounterElement(`product-list__counter counter`, +product.item_cart, product.item_id, (response) => {
          actionDivElement.dataset.inCart = `true`;
        });
        actionDivElement.append(counterElement);
  
        const toCartAnchorElement = createAnchor(`product-list__itemCartButton`, `Оформить`, `/cart`);
        actionDivElement.append(toCartAnchorElement);

        const storeDivElement = createDiv(`product-list__itemStoreWrap`);
        articleElement.append(storeDivElement);
    
        if (isInteger(product.item_store)) {
          if (+product.item_store) {
            const storeParagraphElement = createParagraph(`product-list__itemStore`, `В наличии в ${shopInfoData.town_p}, ${product.item_store} шт.`);
            storeDivElement.append(storeParagraphElement);
          }
        } else {
          if (String(product.item_store) === `true`) {
            const storeParagraphElement = createParagraph(`product-list__itemStore`, `В наличии в ${shopInfoData.town_p}`);
            storeDivElement.append(storeParagraphElement);
          }
        }
    
        if (product.item_date) {
          const dateStoreParagraphElement = createParagraph(`product-list__itemDate`, `Склад, поступление ${product.item_date}`);
          storeDivElement.append(dateStoreParagraphElement);
        }
      } else {
        const storeParagraphElement = createParagraph(`product-list__itemNotAvailable`, `Нет в наличии`);
        articleElement.append(storeParagraphElement);
      }


    });
  };

  setTimeout(render, 200);
};

const renderAppliedFilter = () => {
  appliedFilterList.innerHTML = ``;
  
  Object.keys(filter)
  .filter((alias) => alias !== `parent` && alias !== `name` && alias !== `promo`)
  .forEach((alias) => {

    if (filter[alias].type === `range`) {
      const liItemElement = createListItem(`product-list-page__appliedFilterItem`);
      appliedFilterList.append(liItemElement);

      const startText = filter[alias].min ? `от ${filter[alias].min} ` : ``;
      const finishText = filter[alias].max ? `до ${filter[alias].max}` : ``;
      const text = `${filter[alias].title}: ${startText} ${finishText}`;

      const buttonElement = createButton(text, `product-list-page__appliedFilterButton`);
      buttonElement.title = `Удалить`;
      liItemElement.append(buttonElement);
      const svg = createSvg(``, `10`, `10`, `sienge/img/sprite.svg#close`);
      buttonElement.append(svg);

      buttonElement.addEventListener(`click`, () => {
        if (alias in filter) {
          delete filter[alias];
        }

        setActivePage(1);
        getItems();
        setFilterUrl();
      });
    } 

    if (filter[alias].type === `list`) {
      filter[alias].values.forEach((value) => {
        const liItemElement = createListItem(`product-list-page__appliedFilterItem`);
        appliedFilterList.append(liItemElement);
    
        const buttonElement = createButton(value.title, `product-list-page__appliedFilterButton`);
        buttonElement.title = `Удалить`;
        liItemElement.append(buttonElement);
        const svg = createSvg(``, `10`, `10`, `sienge/img/sprite.svg#close`);
        buttonElement.append(svg);
  
        buttonElement.addEventListener(`click`, () => {
          const id = value.id;

          if (alias in filter) {
            const index = filter[alias].values.findIndex((it) => it.id === id);
      
            if (index !== -1) {
              filter[alias].values.splice(index, 1);
            }
      
            if (isEmptyArray(filter[alias])) {
              delete filter[alias];
            }
          }

          setActivePage(1);
          getItems();
          setFilterUrl();
        });
      });
    }

  });
 
};

const activeListView = () => {
  listViewButton.classList.add(`product-list-page__viewButton--active`);
  tileViewButton.classList.remove(`product-list-page__viewButton--active`);
  productListElement.classList.add(`product-list--list`);
  productListElement.classList.remove(`product-list--tile`);
};

const activeTileView = () => {
  tileViewButton.classList.add(`product-list-page__viewButton--active`);
  listViewButton.classList.remove(`product-list-page__viewButton--active`);
  productListElement.classList.add(`product-list--tile`);
  productListElement.classList.remove(`product-list--list`);
};

const listViewButton = productListPageElement.querySelector(`.product-list-page__viewButton--list`);
const tileViewButton = productListPageElement.querySelector(`.product-list-page__viewButton--tile`);

const activeView = window.localStorage[`viewProductList`] ? window.localStorage[`viewProductList`] : `tile`;

if (activeView === `list`) {
  activeListView();
}

if (activeView === `tile`) {
  activeTileView();
}


if (listViewButton) {
  listViewButton.addEventListener(`click`, () => {
    activeListView();
    window.localStorage[`viewProductList`] = `list`;
  });
}

if (tileViewButton) {
  tileViewButton.addEventListener(`click`, () => {
    activeTileView();
    window.localStorage[`viewProductList`] = `tile`;
  });
}


if (window.location.pathname !== `/search`) {
  const titleElement = productListPageElement.querySelector(`.product-list-page__title`);
  titleElement.textContent = itemList.title;
}

// пагинатор
const paginatorElement = productListPageElement.querySelector(`.paginator`);
let activePage2 = +getUrlSearch(`p`) || 1;

const setActivePage = (page) => {
  activePage2 = page;

  const url = getPageUrl();
  window.history.pushState(null, null, url);
};


const renderPaginator = (pageCount) => {
  paginatorElement.innerHTML = ``;

  if (!pageCount) {
    return;
  }

  if (+pageCount <= 1) {
    return;
  }

  if (+activePage2 !== 1) {
    const prevPageButtonElement = createButton(`Предыдущая`, `paginator__button paginator__button--prev`);
    paginatorElement.append(prevPageButtonElement);
    const svg = createSvg(``, `10`, `10`, `sienge/img/sprite.svg#arrow-small`);
    prevPageButtonElement.append(svg);
  
    prevPageButtonElement.addEventListener(`click`, () => {
      setActivePage(+activePage2 - 1);
      getItems();

      window.scrollTo(0,0);
    });
  }

  // список страниц
  const paginatorListElement = createList(`paginator__list`);
  paginatorElement.append(paginatorListElement);

  let isRenderActive = false;
  let countPageAfterActivePage = 0;
  let countPageBeforeActivePage = 0;
  let isRender = true;

  new Array(pageCount)
    .fill('')
    .forEach((numberPage, i) => {
      const page = i + 1;
      const isActive = +activePage2 === +page;
      if (isActive) { 
        isRenderActive = true;
      }
      if (!isRenderActive) {
        countPageBeforeActivePage += 1;
      }
      if (isRenderActive) {
        countPageAfterActivePage += 1;
      }

      if (+activePage2 - countPageBeforeActivePage === 2 ) {
        isRender = true;
      }

      if (isRender || +pageCount === page || page === 1) {
        let pageButtonElement = null;

        if (page === 1 || +pageCount === +page || (!isRenderActive && +activePage2 - countPageBeforeActivePage < 4) || (isRenderActive && (countPageAfterActivePage < 4 || page === pageCount - 1))) {
          pageButtonElement = createButton(page, `paginator__button paginator__button--number ${isActive ? `paginator__button--active` : ``}`);
          pageButtonElement.dataset.page = page;
        } else {
          pageButtonElement = createButton(`...`, `paginator__button paginator__button--number ${isActive ? `paginator__button--active` : ``}`);
          pageButtonElement.dataset.page = page;
          isRender = false;
        }
  
        pageButtonElement.addEventListener(`click`, () => {
          setActivePage(page);
          getItems();
          window.scrollTo(0,0);
        });
        
        const liItemElement = createListItem(`paginator__page`);
        paginatorListElement.append(liItemElement);
        liItemElement.append(pageButtonElement);
      }
    });

  if (+activePage2 !== +pageCount) {
    const nextPageButtonElement = createButton(`Следующая`, `paginator__button paginator__button--next`);
    paginatorElement.append(nextPageButtonElement);
    const svg = createSvg(``, `10`, `10`, `sienge/img/sprite.svg#arrow-small`);
    nextPageButtonElement.append(svg);

    nextPageButtonElement.addEventListener(`click`, () => {
      setActivePage(+activePage2 + 1);
      getItems();

      window.scrollTo(0,0);
    });
  }
};


if (+itemList.count) {
  countElement.innerHTML = getProductNumeralEnding(itemList.count);

  renderAppliedFilter();
  renderItems(itemList.items);
  renderFilter(filterList);
  renderPaginator(+itemList.page_count);
} else {
  const contentElement = productListPageElement.querySelector(`.product-list-page__content`);
  contentElement.remove();

  const paragraphElement = createParagraph(`product-list-page__emptyMessage`, `По Вашему запросу ничего не найдено`);
  productListPageElement.append(paragraphElement);

}







const getFilter = () => {
  const resultFilter = {};

  Object.keys(filter).forEach((alias) => {
    if (alias === `parent` || alias === `name` || alias === `promo`) {
      resultFilter[alias] = filter[alias];
    } else if (filter[alias].type === `range`) {
      resultFilter[alias] = `${filter[alias].min}-${filter[alias].max}`;
    } else {
      resultFilter[alias] = filter[alias].values.map((it) => it.id).join(`,`);
    }
  });

  return resultFilter;
};

// запросы на получение товаров
const getItems = () => {
  getData({
    ["get_items"]: {
      ["filter"]: getFilter(),
      ["order_by"]: sort,
      ["page_num"]: String(activePage2),
    }
  })
  .then((response) => {
    renderItems(response.items);
    countElement.innerHTML = getProductNumeralEnding(response.count);
    renderFilter(response.filter_list);
    renderAppliedFilter();
    renderPaginator(+response.page_count);
  });
};

const clearFilterButton = productListPageElement.querySelector(`.filter__clearButton`);
if (clearFilterButton) {
  clearFilterButton.addEventListener(`click`, () => {

    Object.keys(filter)
      .filter((alias) => alias !== `parent` && alias !== `name` && alias !== `promo`)
      .forEach((alias) => delete filter[alias]);

    setActivePage(1);
    getItems();
    setFilterUrl();
  });
}