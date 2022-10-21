const Method = {
  GET: `GET`,
  POST: `POST`,
};

// //////

const clickLink = (link, download = `download`) => {
  let linkElement = document.createElement(`a`);
  linkElement.href = link;
  linkElement.download = download;
  linkElement.click();
  linkElement = null;
};

const getFormattedPhone = (phone) => {
  if (!phone) {
    return ``;
  }

  const mask = `* *** *** ****`;
  let text = ``;
  let i = 0;

  Array.from(mask).forEach((symbol) => {
    if (symbol === `*`) {
      text = `${text}${phone[i]}`;
      i++;
    }

    if (symbol === ` `) {
      text = `${text} `;
    }
  });

  return text;
};

const setCookie = (name, value, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  const expires = `expires=`+ d.toUTCString();
  document.cookie = name + `=` + value + `;` + expires + `;path=/;domain=` + window.location.hostname.split('.').slice(-2).join('.');
};

const getPhoneNumber = (phone) => {
  if (!phone) {
    return ``;
  }

  if (phone[0] === `8`) {
    return `tel:+7${phone.slice(1)}`;
  }

  return `tel:${phone}`;
};

const isEmptyArray = (array) => array.length === 0;

const isEmptyObject = (object) => isEmptyArray(Object.keys(object));

const isInteger = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const getUrlSearch = (name) => {
  const params = new URLSearchParams(document.location.search.substring(1));
  return params.get(name);
};


const DEBOUNCE_INTERVAL = 700;

const debounce = (cb) => {
  let lastTimeout = null;

  return function () {
    const parameters = arguments;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb.apply(null, parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

const createDiv = (className) => {
  const div = document.createElement(`div`);
  div.className = className;

  return div;
};

const createSection = (className) => {
  const section = document.createElement(`section`);
  section.className = className;

  return section;
};

const createAside = (className) => {
  const aside = document.createElement(`aside`);
  aside.className = className;

  return aside;
};

const createArticle = (className) => {
  const article = document.createElement(`article`);
  article.className = className;

  return article;
};

const createForm = (className) => {
  const form = document.createElement(`form`);
  form.action = ``;
  form.className = className;

  return form;
};

const createFieldset = (className) => {
  const fieldset = document.createElement(`fieldset`);
  fieldset.className = className;

  return fieldset;
};

const createLegend = (className, text) => {
  const legend = document.createElement(`legend`);
  legend.className = className;
  legend.textContent = text;

  return legend;
};

const createLabel = (className, text = ``) => {
  const label = document.createElement(`label`);
  label.className = className;
  label.innerHTML = text;

  return label;
};

const createInput = (className, type, text = ``) => {
  const input = document.createElement(`input`);
  input.className = className;
  input.type = type;
  input.value = text;

  return input;
};

const createTextarea = (className, text = ``, rows = `5`) => {
  const textarea = document.createElement(`textarea`);
  textarea.className = className;
  textarea.value = text;
  textarea.rows = rows;

  return textarea;
};

const createOption = (className, text = ``) => {
  const option = document.createElement(`option`);
  option.className = className;
  option.textContent = text;

  return option;
};

const createSelect = (name, id) => {
  const select = document.createElement(`select`);
  select.name = name;
  select.id = id;

  return select;
};

const createButton = (title, className) => {
  const btn = document.createElement(`button`);
  btn.type = `button`;
  btn.className = className;
  btn.innerHTML = title;

  return btn;
};

const createAnchor = (className = ``, text = ``, href = ``) => {
  const a = document.createElement(`a`);
  a.className = className;
  a.innerHTML = text;
  a.href = href;

  return a;
};

const createHeading = (type, className, text = ``) => {
  const h = document.createElement(type);
  h.className = className;
  h.innerHTML = text;

  return h;
};

const createParagraph = (className, text = ``) => {
  const p = document.createElement(`p`);
  p.className = className;
  p.innerHTML = text;

  return p;
};

const createSpan = (className, text = ``) => {
  const span = document.createElement(`span`);
  span.className = className;
  span.innerHTML = text;

  return span;
};

const createTime = (className, datetime, text = ``) => {
  const time = document.createElement(`time`);
  time.className = className;
  time.datetime = datetime;
  time.innerHTML = text;

  return time;
};

const createPicture = () => {
  const pic = document.createElement(`picture`);

  return pic;
};

const createSourceImage = (src = ``, media = ``) => {
  const source = document.createElement(`source`);
  source.srcset = src;
  source.media = media;

  return source;
};

const createImage = (className, src = ``, title = ``) => {
  const img = document.createElement(`img`);
  img.className = className;
  img.src = src;
  img.alt = title;

  return img;
};

const createSvg = (className = ``, width = `18`, height = `18`, link = ``) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  
  svg.setAttribute(`className`, className);
  svg.setAttribute(`width`, width);
  svg.setAttribute(`height`, height);
  svg.setAttribute(`aria-hidden`, `true`);

  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute(`href`, link);
  svg.appendChild(use);

  return svg;
};

const createList = (className) => {
  const ul = document.createElement(`ul`);
  ul.className = className;

  return ul;
};

const createListItem = (className, text = ``) => {
  const li = document.createElement(`li`);
  li.className = className;
  li.innerHTML = text;

  return li;
};

const createTable = (className = ``) => {
  const table = document.createElement(`table`);
  table.className = className;

  return table;
};

const createTableHeaderRow = (className = ``, countColumn, values) => {
  const tr = document.createElement(`tr`);
  tr.className = className;

  for (let i = 0; i < countColumn; i++) {
    const th = document.createElement(`th`);
    th.innerHTML = values[i] || ``;

    tr.append(th);
  }

  return tr;
};

const createTableRow = (className = ``, countColumn, values) => {
  const tr = document.createElement(`tr`);
  tr.className = className;

  for (let i = 0; i < countColumn; i++) {
    const td = document.createElement(`td`);
    td.innerHTML = values[i] || ``;

    tr.append(td);
  }

  return tr;
};



const createBlockquote = (className) => {
  const blockquote = document.createElement(`blockquote`);
  blockquote.className = className;

  return blockquote;
};

const createCite = (className, text = ``) => {
  const cite = document.createElement(`cite`);
  cite.className = className;
  cite.innerHTML = text;

  return cite;
};

const getFormattedPrice = (price) => {
  let result = ``;

  Array.from(String(price)).reverse().forEach((symbol, i) => {
    const orderSymbol = i + 1;
    result = symbol + result;

    if (orderSymbol % 3 === 0) {
      result = ` ` + result;
    }
  });

  return result;
};

const createPriceElement = (className, price) => {
  const formattedPrice = getFormattedPrice(price);

  return createParagraph(`${className} price`, `${formattedPrice} <span>&#8381;</span>`);
};

const createCounterElement = (className, countItem, itemId, onResolveHandler = () => {}) => {
  let count = +countItem;

  const wrapElement = createDiv(className);

  const deleteButtonElement = createButton(`–`, `counter__button counter__button--delete`);
  deleteButtonElement.title = `Удалить`;
  if (count === 1) {
    deleteButtonElement.disabled = true;
  }
  wrapElement.append(deleteButtonElement);

  const inputElement = createInput(`counter__input`, `number`, count);
  inputElement.min = 0;
  inputElement.max = 999;
  inputElement.readOnly = true;
  wrapElement.append(inputElement);

  const addButtonElement = createButton(`+`, `counter__button counter__button--add`);
  addButtonElement.title = `Добавить`;
  wrapElement.append(addButtonElement);

  addButtonElement.addEventListener(`click`, () => {
    inputElement.value = ++count;

    if (count !== 1) {
      deleteButtonElement.disabled = false;
    }

    getData({
      ["set_cart"]: {
        ["item_id"]: itemId,
        ["action"]: `add`,
      }
    })
    .then((response) => {
      setCountCartHeader(response.cart_count);
      onResolveHandler(response);
    });
  });


  deleteButtonElement.addEventListener(`click`, () => {
    inputElement.value = --count;

    if (count === 1) {
      deleteButtonElement.disabled = true;
    }
    
    getData({
      ["set_cart"]: {
        ["item_id"]: itemId,
        ["action"]: `reduce`,
      }
    })
    .then((response) => {
      setCountCartHeader(response.cart_count);
      onResolveHandler(response);
    });
  });

  return wrapElement;
};

// <-- авторизация
const auth = document.querySelector(`.authorization`);
if (auth) {
  const getSendPasswordText = (response) => {
    if (response.login === `email`) {
      return `Пароль отправлен на e-mail ${response.email}`;
    }

    if (response.login === `phone`) {
      return `Пароль отправлен на телефон ${response.phone}`;
    }

    return ``;
  };

  const getAuthCode = () => {
    const wrapButtonElement = loginScreenAuthElement.querySelector(`.modal__buttonWrap`);
    const errorMessageElement = loginScreenAuthElement.querySelector(`.modal__errorMessage`);

    wrapButtonElement.dataset.mode = `progress`;
    errorMessageElement.textContent = ``;
    

    getData({
      ["get_auth_code"]: {
        ["phone"]: phoneAuth,
      }
    })
    .then((response) => {
      if (response.result === `OK`) {
        const sendCodeTextElemetn = codeScreenAuthElement.querySelector(`.js--sendCodeText`);
        sendCodeTextElemetn.innerHTML = `Код отправлен на номер ${response.phone}`;

        auth.dataset.mode = `code`;
      }

      if (response.result === `ERROR`) {
        errorMessageElement.textContent = response.error;
        wrapButtonElement.dataset.mode = `button`;
      }
    })
    .catch(() => {
      wrapButtonElement.dataset.mode = `button`;
    });
  };

  const getPassword = () => {
    login = recoveryLoginInput.value;

    const wrapButtonElement = recoveryPasswordScreenAuthElement.querySelector(`.modal__buttonWrap`);
    const errorMessageElement = recoveryPasswordScreenAuthElement.querySelector(`.modal__errorMessage`);

    wrapButtonElement.dataset.mode = `progress`;
    errorMessageElement.textContent = ``;

    getData({
      ["get_auth_pass"]: {
        ["auth_login"]: login,
      }
    })
    .then((response) => {
      if (response.result === `OK`) {
        const loginPasswordInput = loginPasswordScreenAuthElement.querySelector(`.js--loginInput`);
        loginPasswordInput.value = login;

        const sendPasswordTextElemetn = loginPasswordScreenAuthElement.querySelector(`.js--sendPasswordText`);
        sendPasswordTextElemetn.innerHTML = getSendPasswordText(response);

        auth.dataset.mode = `loginPassword`;
      }

      if (response.result === `ERROR`) {
        errorMessageElement.textContent = response.error;
        wrapButtonElement.dataset.mode = `button`;
      }
    })
    .catch(() => {
      wrapButtonElement.dataset.mode = `button`;
    });
  };

  const setAuthCode = () => {
    const wrapButtonElement = codeScreenAuthElement.querySelector(`.modal__buttonWrap`);
    const errorMessageElement = codeScreenAuthElement.querySelector(`.modal__errorMessage`);

    wrapButtonElement.dataset.mode = `progress`;
    errorMessageElement.textContent = ``;

    getData({
      ["set_auth_code"]: {
        ["phone"]: phoneAuth,
        ["code"]: codeInput.value,
      }
    })
    .then((response) => {
      if (response.result === `OK`) {
        window.location.reload();
      }
      if (response.result === `ERROR`) {
        errorMessageElement.textContent = response.error;
        wrapButtonElement.dataset.mode = `button`;
      }
    })
    .catch(() => {
      wrapButtonElement.dataset.mode = `button`;
    });
  };

  const getAuth = () => {
    const wrapButtonElement = loginPasswordScreenAuthElement.querySelector(`.modal__buttonWrap`);
    const errorMessageElement = loginPasswordScreenAuthElement.querySelector(`.modal__errorMessage`);

    wrapButtonElement.dataset.mode = `progress`;
    errorMessageElement.textContent = ``;
    
    login = loginInput.value;

    if (!loginInput && !passwordInput.value) {
      return;
    }

    // валидация поля
    getData({
      ["set_auth_pass"]: {
        ["auth_login"]: login,
        ["auth_pass"]: passwordInput.value,
      }
    })
    .then((response) => {
      if (response.result === `OK`) {
        window.location.reload();
      }
      if (response.result === `ERROR`) {
        errorMessageElement.textContent = response.error;
        wrapButtonElement.dataset.mode = `button`;
      }
    })
    .catch(() => {
      wrapButtonElement.dataset.mode = `button`;
    });
  };

  let phoneAuth = ``;
  let login = ``;

  const loginScreenAuthElement = auth.querySelector(`.authorization__screen--login`);
  const codeScreenAuthElement = auth.querySelector(`.authorization__screen--code`);
  const loginPasswordScreenAuthElement = auth.querySelector(`.authorization__screen--loginPassword`);
  const recoveryPasswordScreenAuthElement = auth.querySelector(`.authorization__screen--recoveryPassword`);
  
  // кнопка назад
  const backButtons = auth.querySelectorAll(`.modal__backButton`);
  Array.from(backButtons).forEach((button) => {
    button.addEventListener(`click`, () => {
      auth.dataset.mode = `login`;
    });
  });

  // получить авторизационный код
  const getAuthCodeButton = auth.querySelector(`.js--getAuthCodeButton`);
  getAuthCodeButton.addEventListener(`click`, () => getAuthCode());

  const inputAuthCodeButton = auth.querySelector(`.js--inputAuthCodeButton`);
  inputAuthCodeButton.addEventListener(`click`, () => {
    auth.dataset.mode = `code`;
  });
  
  const phoneInput = loginScreenAuthElement.querySelector(`.js--phoneInput`);
  phoneInput.addEventListener(`input`, () => {
    phoneAuth = phoneInput.value;
  });

  phoneInput.addEventListener(`keydown`, (evt) => {
    const isEnterKeyDown = evt.key === `Enter`;

    if (!isEnterKeyDown) {
      return;
    }

    if (!phoneInput.value) {
      return;
    }

    getAuthCode();
  });

  // отправить авторизационный код
  const setAuthCodeButton = auth.querySelector(`.js--setAuthCodeButton`);
  setAuthCodeButton.addEventListener(`click`, () => setAuthCode());

  const codeInput = codeScreenAuthElement.querySelector(`.js--codeInput`);
  codeInput.addEventListener(`keydown`, (evt) => {
    const isEnterKeyDown = evt.key === `Enter`;

    if (!isEnterKeyDown) {
      return;
    }

    if (!codeInput.value) {
      return;
    }

    setAuthCode();
  });

  // переключение экрана на ввод логин/пароль
  const loginPasswordButton = auth.querySelector(`.js--loginPasswordButton`);
  loginPasswordButton.addEventListener(`click`, () => {
    auth.dataset.mode = `loginPassword`;
  });

  // переключение экрана на восстановление пароля
  const recoveryPasswordButton = auth.querySelector(`.js--recoveryPasswordButton`);
  recoveryPasswordButton.addEventListener(`click`, () => {
    auth.dataset.mode = `recoveryPassword`;
  });

  // авторизация
  const loginInput = loginPasswordScreenAuthElement.querySelector(`.js--loginInput`);
  loginInput.addEventListener(`keydown`, (evt) => {
    const isEnterKeyDown = evt.key === `Enter`;

    if (!isEnterKeyDown) {
      return;
    }

    if (!loginInput.value) {
      return;
    }

    if (!passwordInput.value) {
      passwordInput.focus();
      return;
    }

    getAuth();
  });

  const passwordInput = loginPasswordScreenAuthElement.querySelector(`.js--passwordInput`);
  passwordInput.addEventListener(`keydown`, (evt) => {
    const isEnterKeyDown = evt.key === `Enter`;

    if (!isEnterKeyDown) {
      return;
    }

    if (!passwordInput.value) {
      return;
    }

    if (!loginInput.value) {
      loginInput.focus();
      return;
    }

    getAuth();
  });

  const loginButton = auth.querySelector(`.js--loginButton`);
  loginButton.addEventListener(`click`, () => getAuth());

  // получение пароля
  const getPasswordButton = auth.querySelector(`.js--getPasswordButton`);
  getPasswordButton.addEventListener(`click`, () => getPassword());

  const recoveryLoginInput = recoveryPasswordScreenAuthElement.querySelector(`.js--loginInput`);
  recoveryLoginInput.addEventListener(`keydown`, (evt) => {
    const isEnterKeyDown = evt.key === `Enter`;

    if (!isEnterKeyDown) {
      return;
    }

    if (!recoveryLoginInput.value) {
      return;
    }

    getPassword();
  });
}

// авторизация -->

const getNumeralEnding = (numeralEnding, count) => {
  if (!count && count !== 0) {
    return ``;
  }

  const string = count.toString();
  const lastChar = string.slice(-1);
  const twoLastChar = string.slice(-2);

  if (isNaN(count)) {
    return ``;
  } 
  
  if (lastChar === `1` && twoLastChar !== `11`) {
    return `${count} <span>${numeralEnding.ONE}</span>`;
  } 
  
  if (lastChar === `2` && twoLastChar !== `12` 
    || lastChar === `3` && twoLastChar !== `13`
    || lastChar == `4` && twoLastChar !== `14`) {
    return `${count} <span>${numeralEnding.SEVERAL}</span>`;
  }

  return `${count} <span>${numeralEnding.MANY}</span>`;
};

const getProductNumeralEnding = (count) => {
  const numeralEnding = {
    ONE: `товар`,
    SEVERAL: `товара`,
    MANY: `товаров`
  };
  return getNumeralEnding(numeralEnding, count);
};

const getReviewNumeralEnding = (count) => {
  const numeralEnding = {
    ONE: `отзыв`,
    SEVERAL: `отзыва`,
    MANY: `отзывов`
  };
  return getNumeralEnding(numeralEnding, count);
};

const getBonusNumeralEnding = (count) => {
  const numeralEnding = {
    ONE: `бонус`,
    SEVERAL: `бонуса`,
    MANY: `бонусов`
  };
  return getNumeralEnding(numeralEnding, count);
};

const getItemNumeralEnding = (count) => {
  const numeralEnding = {
    ONE: `позиция`,
    SEVERAL: `позиции`,
    MANY: `позиций`
  };
  return getNumeralEnding(numeralEnding, count);
};


// /////////

// ЗАПРОСЫ
const loadRequest = ({url = "../../ajax.php", method = Method.GET, body = null, credentials = 'same-origin', headers = new Headers(), signal = null}) => {
  return fetch(url, {method, body, credentials, headers, signal})
  .then((response) => checkStatus(response, body))
  .catch((err) => {
    debugger;
    throw err;
  });
};

const checkStatus = (response, body) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

const getData = (data) => {
  return loadRequest({
    method: Method.POST,
    body: JSON.stringify(data),
    headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
  })
  .then((response) => response.json());
}


// ///////
let userSessionData = null;

const cartHeaderLink = document.querySelector(`.js--cartHeaderLink`);

const setCountCartHeader = (count) => cartHeaderLink.dataset.count = !count ? `` : count;

const headerElement = document.querySelector(`.main-header`);
const centerHeaderElement = headerElement.querySelector(`.main-header__center`);

const showAuthPopup = (onSuccessHandler = () => {}) => {
  authorizationModalElement = document.querySelector(`.js--authorizationModal`);
  if (authorizationModalElement) {
    authorizationModalElement.classList.add(`modal--show`);
    document.addEventListener(`keydown`, onEscPressModalHandler);
  }
};

window.addEventListener(`load`, () => {
  if (headerElement) {
    window.addEventListener(`scroll`, (evt) => {
      const scroll = evt.target.scrollingElement.scrollTop;
      if (scroll >= 200) {
        headerElement.classList.add(`main-header--scroll`);
      } else {
        headerElement.classList.remove(`main-header--scroll`);
      }
    });

    const burgerButton = headerElement.querySelector(`.main-header__burgerButton`);
    if (burgerButton) {
      burgerButton.addEventListener(`click`, () => {
        if (centerHeaderElement) {
          centerHeaderElement.classList.add(`popup`, `popup--show`);
          document.addEventListener(`keydown`, onEscPressPopupHandler);
          centerHeaderElement.style = `display: block`;
        }
      });
    }
  }


  // запросы
  // авторизация
  const authorizationButton = document.querySelector(`.js--authorizationButton`);
  if (authorizationButton) {
    getData({
      ["get_header_user"]: ``,
    })
    .then((response) => {
      if (response.result === `OK`) {
        userSessionData = response;

        authorizationButton.querySelector(`span`).innerHTML = userSessionData.user_name;

        authorizationButton.addEventListener(`click`, () => {
          document.location.href = `${window.location.origin}/login`;
        });

        if (document.querySelector(`.cart-page__bonusCount`)) {
          updateBonuses();
        }
      } else {
        authorizationButton.querySelector(`span`).innerHTML = `Войти`;
        
        authorizationButton.addEventListener(`click`, () => {
          showAuthPopup();
        });

        if (document.querySelector(`.order-page`)) {
          showAuthPopup();
        }
      }
    });
  }

  // количество в корзине
  if (cartHeaderLink) {
    getData({
      ["get_header_cart"]: ``,
    })
    .then((response) => {
      if (response.result === `OK`) {
        setCountCartHeader(response.cart_count);
      }

      if (response.result === `ERROR`) {
        cartHeaderLink.dataset.count = ``;
      }
    });
  }


  const oldDesignButton = headerElement.querySelector(`.main-header__oldDesignButton`);

  if (shopInfoData.select_design) {
    oldDesignButton.classList.remove(`hide`);

    oldDesignButton.addEventListener(`click`, () => {
      getData({
        ["set_cookie"]: {
          ["name"]: `design`,
          ["value"]: `old`,
          ["exdays"]: 7,
        }
      })
      .then(() => {
        document.location.reload();
      });
    });
  } else {
    oldDesignButton.remove();
  }


  // переключение на режим поиска на мобилке
  const onSearchModeButton = headerElement.querySelector(`.main-header__searchButton`);
  if (onSearchModeButton) {
    onSearchModeButton.addEventListener(`click`, () => {
      headerElement.dataset.isSearch = true;
      searchElement.dataset.showResult = true;
      document.querySelector(`body`).classList.add(`overflowHidden`);
    });
  }

  const offSearchModeButton = headerElement.querySelector(`.main-header__cancelSearchButton`);
  if (offSearchModeButton) {
    offSearchModeButton.addEventListener(`click`, () => {
      headerElement.dataset.isSearch = false;
      searchElement.dataset.showResult = false;
      document.querySelector(`body`).classList.remove(`overflowHidden`);
    });
  }

  // поиск
  const searchElement = document.querySelector(`.search`);
  if (searchElement) {
    const searchInputElement = searchElement.querySelector(`.search__input`);
    const searchResultElement = searchElement.querySelector(`.search__result`);
    const clearButton = searchElement.querySelector(`.search__clearButton`);

    const renderSearchResult = (searchData) => {
      searchElement.dataset.showResult = true;
      document.querySelector(`body`).classList.add(`overflowHidden`);
      searchResultElement.innerHTML = ``;

      if (isEmptyObject(searchData.groups) && isEmptyObject(searchData.items.items)) {
        const resultNotFoundElement = createParagraph(`search__resultNotFound`, `Не найдено`)
        searchResultElement.append(resultNotFoundElement);
        return;
      }

      if (!isEmptyObject(searchData.groups)) {
        const groupsResultWrapElement = createDiv(`search__groupsResultWrap`);
        searchResultElement.append(groupsResultWrapElement);
  
        const groupsListElement = createList(`search__groupsResultList`);
        groupsResultWrapElement.append(groupsListElement);
  
        Object.keys(searchData.groups).forEach((itemId) => {
          const group = searchData.groups[itemId];
  
          const liItemElement = createListItem(`search__groupsResultItem`);
          groupsListElement.append(liItemElement);
  
          const anchorElement = createAnchor(`search__groupsResultItemLink`, group.name, group.link);
          liItemElement.append(anchorElement);
        }); 
      }

      if (!isEmptyObject(searchData.items.items)) {
        const itemsResultWrapElement = createDiv(`search__itemsResultWrap`);
        searchResultElement.append(itemsResultWrapElement);

        const itemsListElement = createList(`search__itemsResultList`);
        itemsResultWrapElement.append(itemsListElement);
  
        Object.keys(searchData.items.items).forEach((itemId) => {
          const item = searchData.items.items[itemId];
  
          const liItemElement = createListItem(`search__itemsResultItem`);
          itemsListElement.append(liItemElement);
  
          const anchorElement = createAnchor(`search__itemsResultItemLink`, ``, item.item_link);
          liItemElement.append(anchorElement);
  
          const imgElement = createImage(`search__itemsResultItemImage`, item.item_image, item.item_name);
          anchorElement.append(imgElement);
  
          const titleParagraphElement = createParagraph(`search__itemsResultItemTitle`, item.item_name);
          anchorElement.append(titleParagraphElement);

          if (item.item_act) {
            const priceParagraphElement = createPriceElement(`search__itemsResultItemPrice`, item.item_price);
            anchorElement.append(priceParagraphElement);
          } else {
            const noAvailableParagraphElement = createParagraph(`search__itemsResultItemNotAvailable`, `Нет в наличии`);
            anchorElement.append(noAvailableParagraphElement);
          }
  
        });
  
        const showAllLinkElement = createAnchor(`search__showAllLink`, `Посмотреть все результаты`, `/search?s=${searchData.items.filter.name}`);
        itemsResultWrapElement.append(showAllLinkElement);
      }
    };

    const onSearchInputHandler = () => {
      const value = searchInputElement.value;

      if (!value) {
        searchResultElement.dataset.mode = `hide`;
      } else {
        getData({
          ["get_search"]: value,
        })
        .then((response) => {
          if (response.result === `OK`) {
            renderSearchResult(response);
          }
        });
      }
    };

    searchInputElement.addEventListener(`input`, debounce(onSearchInputHandler));
    searchInputElement.addEventListener(`input`, () => {
      clearButton.dataset.mode = searchInputElement.value ? `show` : `hide`;
    });

    clearButton.addEventListener(`click`, () => {
      searchInputElement.value = ``;
      clearButton.dataset.mode = `hide`;
      searchElement.dataset.showResult = false;
      document.querySelector(`body`).classList.remove(`overflowHidden`);
    });
  }
});


const getAlphabetCities = (cities) => {
  const results = [];

  cities.forEach((city) => {
    const firstLetter = city.title[0]; 
    const index = results.findIndex((result) => result.firstLetter === firstLetter);

    if (index === -1) {
      results.push({
        firstLetter,
        cities: [city],
      });
    } else {
      results[index].cities.push(city);
    }
  });

  return results.slice().sort((a, b) => {
    if (a.firstLetter > b.firstLetter) {
      return 1;
    }
    if (a.firstLetter < b.firstLetter) {
      return -1;
    }

    return 0;
  });
};

const onEscPressPopupHandler = (evt) => {
  if (evt.key === `Escape`) {
    const popupElements = document.querySelectorAll(`.popup--show`);
    popupElements.forEach((elem) => {
      elem.classList.remove(`popup--show`);
      centerHeaderElement.classList.remove(`main-header__center--popup`);
      document.removeEventListener(`keydown`, onEscPressPopupHandler);
      document.querySelector(`body`).classList.remove(`overflowHidden`);
    });
  }
};


const logoImgElements = document.querySelectorAll(`.logo__img`);
Array.from(logoImgElements).forEach((elem) => {
  elem.src = shopInfoData.logo;
  elem.alt = shopInfoData.logo_alt || ``;
});

if (!shopInfoData.show_fr) {
  const franchiseNavItemElements = document.querySelectorAll(`.js--franchiseNavItem`);
  Array.from(franchiseNavItemElements).forEach((elem) => {
    elem.remove();
  });
}

if (!shopInfoData.show_bonus) {
  const bonusNavItemElements = document.querySelectorAll(`.js--bonusNavItem`);
  Array.from(bonusNavItemElements).forEach((elem) => {
    elem.remove();
  });
}

const shopCityElements = document.querySelectorAll(`.js--shopCity`);
const cityListPopup = document.querySelector(`.js--cityListPopup`);

if (shopInfoData.select_town) {
  Array.from(shopCityElements).forEach((elem) => {
    elem.textContent = shopInfoData.subdiv || ``;
    elem.classList.remove(`hide`);
    elem.addEventListener(`click`, () => {
      if (cityListPopup) {
        cityListPopup.classList.add(`popup--show`);
        centerHeaderElement.classList.add(`main-header__center--popup`);
        document.addEventListener(`keydown`, onEscPressPopupHandler);
        document.querySelector(`body`).classList.add(`overflowHidden`);
      }
    });
  });

  if (shopInfoData.require_town) {
    if (cityListPopup) {
      cityListPopup.classList.add(`popup--show`);
      centerHeaderElement.classList.add(`main-header__center--popup`);
      centerHeaderElement.classList.add(`popup`, `popup--show`);
      centerHeaderElement.style = `display: block`;

      document.addEventListener(`keydown`, onEscPressPopupHandler);
      document.querySelector(`body`).classList.add(`overflowHidden`);
    }
  }
} else {
  Array.from(shopCityElements).forEach((elem) => elem.remove());
}


const shopPhoneElements = document.querySelectorAll(`.js--shopPhone`);

Array.from(shopPhoneElements).forEach((elem) => {
  elem.querySelector(`span`).textContent = getFormattedPhone(shopInfoData.phone);
  elem.href = getPhoneNumber(shopInfoData.phone);
});

const vkSocialElements = document.querySelectorAll(`.social__link--vk`);
Array.from(vkSocialElements).forEach((elem) => elem.href = shopInfoData.vk_group);

const igSocialElements = document.querySelectorAll(`.social__link--ig`);
Array.from(igSocialElements).forEach((elem) => elem.href = shopInfoData.ig_group);


const closePopupButtons = document.querySelectorAll(`.popup__closeButton`);
Array.from(closePopupButtons).forEach((btn) => {
  btn.addEventListener(`click`, () => {
    const popup = btn.parentElement.parentElement;
    popup.classList.remove(`popup--show`);
    document.removeEventListener(`keydown`, onEscPressPopupHandler);
    document.querySelector(`body`).classList.remove(`overflowHidden`);
  });
});


// вывод городов для попапа
const citiesElement = document.querySelector(`.js--cityListData`);

const setCity = (city) => {
  getData({
    ["set_cookie"]: {
      ["name"]: `shop_id`,
      ["value"]: city.cityId,
      ["exdays"]: 7,
    }
  })
  .then((response) => {
    if (window.location.hostname === `dev.eto1.ru`) {
      document.location.reload();
    } else {
      document.location.href = `${window.location.protocol}//eto1.ru${window.location.pathname}${window.location.search}${window.location.hash}`;
    }
  });
};

const cities = Object.keys(shopListData)
.map((cityId) => {
  return {
    cityId,
    title: shopListData[cityId],
    isActive: shopListData[cityId] === shopInfoData.subdiv,
  };
});

const citiesListElement = createList(`cities__list`);
citiesElement.append(citiesListElement);

cities.forEach((city) => {
  const liItemElement = createListItem(`cities__item`);
  const cityButton = createButton(city.title, `cities__cityButton`);
  cityButton.dataset.cityId = city.cityId;
  if (city.isActive) {
    cityButton.dataset.active = `true`;
  }
  cityButton.addEventListener(`click`, () => {
    setCity(city);
  });

  liItemElement.append(cityButton);
  citiesListElement.append(liItemElement);
});


// вывод отсортированных по алфавиту городов для попапа
const alphabetCityListElement = document.querySelector(`.js--alphabetCityListData`);

const alphabetCitiesListElement = createList(`cities__list`);
alphabetCityListElement.append(alphabetCitiesListElement);

const alphabetCities = getAlphabetCities(cities);

alphabetCities.forEach((alphabetCity) => {
  const liItemElement = createListItem(`cities__item`);
  liItemElement.innerHTML = alphabetCity.firstLetter;
  const citiesListElement = createList(`cities__sublist`);
  // повтор <--

  alphabetCity.cities.forEach((city) => {
    const subItemElement = createListItem(`cities__subitem`);
    const cityButton = createButton(city.title, `cities__cityButton`);
    cityButton.dataset.cityId = city.cityId;
    if (city.isActive) {
      cityButton.dataset.active = `true`;
    }
    cityButton.addEventListener(`click`, () => {
      setCity(city);
    });

    subItemElement.append(cityButton);
    citiesListElement.append(subItemElement);
  });
// --->

  liItemElement.append(citiesListElement);
  alphabetCitiesListElement.append(liItemElement);
});


const catalogButtonElements = document.querySelectorAll(`.js--catalogButton`);
const catalogPopup = document.querySelector(`.js--catalogPopup`);

Array.from(catalogButtonElements).forEach((elem) => {
  elem.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    if (catalogPopup) {
      catalogPopup.classList.add(`popup--show`);
      document.addEventListener(`keydown`, onEscPressPopupHandler);
      document.querySelector(`body`).classList.add(`overflowHidden`);
    }
  });
});

// вывод каталога
const catalogElement = document.querySelector(`.js--catalog`);
const catalogListElement = catalogElement.querySelector(`.catalog__list`);

Object.keys(catalogList)
.filter((key) => key !== `current`)
.forEach((itemId) => {
  const liItemElement = createListItem(`catalog__item`);
  catalogListElement.append(liItemElement);
  liItemElement.addEventListener(`mouseover`, () => {
    inactivateCatalogItems();
    liItemElement.classList.add(`catalog__item--active`);
  });

  const anchorElement = createAnchor(`catalog__link`, catalogList[itemId].name, catalogList[itemId].link);
  liItemElement.append(anchorElement);

  const subWrapElement = createDiv(`catalog__subwrap`);
  liItemElement.append(subWrapElement);

  const subListElement = createList(`catalog__sublist`);
  subWrapElement.append(subListElement);

  const subCatalogList = catalogList[itemId].subgroup;

  Object.keys(subCatalogList)
  .forEach((subItemId) => {
    const subLiItemElement = createListItem(`catalog__subitem`);
    const subAnchorElement = createAnchor(`catalog__link`, subCatalogList[subItemId].name, subCatalogList[subItemId].link);
  
    subLiItemElement.append(subAnchorElement);
    subListElement.append(subLiItemElement);
  });

});

const catalogItemElements = catalogListElement.querySelectorAll(`.catalog__item`);

const inactivateCatalogItems = () => {
  Array.from(catalogItemElements).forEach((elem) => {
    elem.classList.remove(`catalog__item--active`);
  })
};

// «Хлебные крошки»
const breadcrumbsElement = document.querySelector(`.breadcrumbs`);
if (breadcrumbsElement) {
  const brearcrumbsListElement = createList(`breadcrumbs__list`);
  breadcrumbsElement.append(brearcrumbsListElement);

  Object.keys(breadcrumbsData)
  .forEach((key) => {
    const breadcrumb = breadcrumbsData[key];

    const liItemElement = createListItem(`breadcrumbs__item`);
    const anchorElement = createAnchor(``, breadcrumb.title || ``, breadcrumb.link || ``);
  
    liItemElement.append(anchorElement);
    brearcrumbsListElement.append(liItemElement);
  });
}


// <-- для страницы catalog.html
const catalogPageElement = document.querySelector(`.catalog-page`);
if (catalogPageElement) {
  const SUBITEM_COUNT = 8;
  const catalogPageListElement = catalogPageElement.querySelector(`.catalog-page__list`);

  Object.keys(catalogList)
  .filter((key) => key !== `current`)
  .forEach((itemId) => {
    const liItemElement = createListItem(`catalog-page__item`);
    
    const anchorElement = createAnchor(`catalog-page__itemLink`, catalogList[itemId].name, catalogList[itemId].link);
    liItemElement.append(anchorElement);

    const imgElement = createImage(`catalog-page__itemIcon`, catalogList[itemId].icon, ``);
    imgElement.width = `30`;
    imgElement.height = `30`;
    anchorElement.append(imgElement);

    const subListElement = createList(`catalog-page__sublist`);
    liItemElement.append(subListElement);
    
    const subCatalogList = catalogList[itemId].subgroup;
    
    Object.keys(subCatalogList)
      .forEach((subItemId, i) => {
        const subItemElement = createListItem(`catalog-page__subitem ${i > SUBITEM_COUNT - 1 ? `catalog-page__subitem--hide` : ``}`);
        const subAnchorElement = createAnchor(`catalog-page__sublink`, subCatalogList[subItemId].name, subCatalogList[subItemId].link);
      
        subItemElement.append(subAnchorElement);
        subListElement.append(subItemElement);
    });

    if (Object.keys(subCatalogList).length > SUBITEM_COUNT) {
      const buttonElement = createButton(`Показать все`, `catalog-page__showButton`);
      buttonElement.dataset.mode = `show`;

      buttonElement.addEventListener(`click`, () => {
        const subItemElements = subListElement.querySelectorAll(`.catalog-page__subitem`);

        if (buttonElement.dataset.mode === `show`) {
          subItemElements.forEach((elem) => {
            elem.classList.remove(`catalog-page__subitem--hide`);
          });

          buttonElement.dataset.mode = `hide`;
          buttonElement.innerHTML = `Скрыть`;

          return;
        }

        if (buttonElement.dataset.mode === `hide`) {
          const hideSubItemElements = Array.from(subItemElements).slice(8);

          hideSubItemElements.forEach((elem) => {
            elem.classList.add(`catalog-page__subitem--hide`);
          });

          buttonElement.dataset.mode = `show`;
          buttonElement.innerHTML = `Показать все`;
        }
      });

      liItemElement.append(buttonElement);
    }
  
    catalogPageListElement.append(liItemElement);
  });
}

// для страницы catalog.html -->


// <-- для страницы group1.html
const groupPageElement = document.querySelector(`.group-page`);
if (groupPageElement) {
  const currentIndex = (document.location.hostname == `localhost`) ? `1` : catalogList.current;

  const groupData = catalogList[currentIndex];

  const titlePage = groupPageElement.querySelector(`.title`);
  const navListElement = groupPageElement.querySelector(`.group-page__navList`);
  const groupListElement = groupPageElement.querySelector(`.group-page__groupList`);

  titlePage.innerHTML = groupData.name;

  const subCatalogList = groupData.subgroup;
  
  Object.keys(subCatalogList)
    .forEach((subItemId) => {
      const liItemElement = createListItem(`group-page__navItem`);

      const anchorElement = createAnchor(`group-page__navLink`, subCatalogList[subItemId].name, subCatalogList[subItemId].link);
      liItemElement.append(anchorElement);
      
      navListElement.append(liItemElement);
  });

  Object.keys(subCatalogList)
    .forEach((subItemId) => {
      const liItemElement = createListItem(`group-page__groupItem`);

      const anchorElement = createAnchor(`group-page__groupLink`, ``, subCatalogList[subItemId].link);
      liItemElement.append(anchorElement);

      const imgElement = createImage(`group-page__groupImg`, subCatalogList[subItemId].image, subCatalogList[subItemId].name);
      anchorElement.append(imgElement);

      const paragraphElement = createParagraph(`group-page__groupTitle`, subCatalogList[subItemId].name);
      anchorElement.append(paragraphElement);

      groupListElement.append(liItemElement);
  });
}

// для страницы group1.html -->


// <-- modal
const closeModalButton = document.querySelectorAll(`.modal__closeButton`);

Array.from(closeModalButton).forEach((button) => {
  button.addEventListener(`click`, () => {
    const modal = button.parentElement.parentElement;
    modal.classList.remove(`modal--show`);
    document.removeEventListener(`keydown`, onEscPressModalHandler);
  });
});

const overlayModalButton = document.querySelectorAll(`.modal__overlay`);

Array.from(overlayModalButton).forEach((overlay) => {
  overlay.addEventListener(`click`, () => {
    const modal = overlay.parentElement;
    modal.classList.remove(`modal--show`);
    document.removeEventListener(`keydown`, onEscPressModalHandler);
  });
});

const onEscPressModalHandler = (evt) => {
  if (evt.key === `Escape`) {
    const modalElements = document.querySelectorAll(`.modal--show`);
    modalElements.forEach((elem) => {
      elem.classList.remove(`modal--show`);
      document.removeEventListener(`keydown`, onEscPressModalHandler);
    });
  }
};

//  modal -->

// https://imask.js.org/
const phoneInputElements = document.querySelectorAll(`input[name="phone"]`);

Array.from(phoneInputElements).forEach((element) => {
  const phoneMask = IMask(element, {
    mask: '+{7} (000) 000-00-00'
  });
});

