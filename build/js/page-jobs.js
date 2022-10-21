const jobsPageElement = document.querySelector(`.jobs-page`);
const navButtons = jobsPageElement.querySelectorAll(`.jobs-page__navButton`);


if (window.location.search === `?resume`) {
  jobsPageElement.dataset.mode = `resume`;
  jobsPageElement.querySelector(`.jobs-page__navButton[data-mode="resume"]`).classList.add(`jobs-page__navButton--active`);
}

if (window.location.search === `` || window.location.search === `?vacancy`) {
  jobsPageElement.dataset.mode = `vacancy`;
  jobsPageElement.querySelector(`.jobs-page__navButton[data-mode="vacancy"]`).classList.add(`jobs-page__navButton--active`);
}

Array.from(navButtons).forEach((button) => {
  button.addEventListener(`click`, () => {
    if (button.classList.contains(`jobs-page__navButton--active`)) {
      return;
    }

    const activeButton = Array.from(navButtons).find((button) => button.classList.contains(`jobs-page__navButton--active`));
    if (activeButton) {
      activeButton.classList.remove(`jobs-page__navButton--active`);
    }

    button.classList.add(`jobs-page__navButton--active`);

    const mode = button.dataset.mode;

    jobsPageElement.dataset.mode = mode;

    const url = `${window.location.origin}/jobs?${mode}`;
    window.history.pushState(null, null, url);
  });
});

const vacancyListElement = jobsPageElement.querySelector(`.jobs-page__list--vacancy`);
Object.keys(jobList).forEach((key) => {
  const vacancy = jobList[key];

  const liItemElement = createListItem(``);
  vacancyListElement.append(liItemElement);

  const titleElement = createHeading(`h3`, ``, vacancy.occupation);
  liItemElement.append(titleElement);

  const textElement = createParagraph(``, vacancy.description);
  liItemElement.append(textElement);
});

const formElement = jobsPageElement.querySelector(`.jobs-page__form`);
const sendResumeButtonWrap = jobsPageElement.querySelector(`.jobs-page__sendButtonWrap`);
const sendResumeButton = sendResumeButtonWrap.querySelector(`.js--sendResumeButton`);
const agreementCheckboxElement = jobsPageElement.querySelector(`input[name="agreement"]`);

const nameInputElement = jobsPageElement.querySelector(`input[name="name"]`);

const citySelectElement = jobsPageElement.querySelector(`select[name="city"]`);
Object.keys(cityListData).forEach((cityId) => {
  const city = cityListData[cityId];

  const cityOption = createOption(``, city);
  cityOption.value = cityId;

  citySelectElement.append(cityOption);
});

const vacancySelectElement = jobsPageElement.querySelector(`select[name="vacancy"]`);
Object.keys(jobList).forEach((key) => {
  const vacancy = jobList[key];

  const cityOption = createOption(``, vacancy.occupation);
  cityOption.value = vacancy.id;

  vacancySelectElement.append(cityOption);
});


const emailInputElement = jobsPageElement.querySelector(`input[name="email"]`);
const phone1InputElement = jobsPageElement.querySelector(`input[id="phone1"]`);
const phone2InputElement = jobsPageElement.querySelector(`input[id="phone2"]`);
const whatsAppCheckboxElement = jobsPageElement.querySelector(`input[name="messenger-whatsApp"]`);
const telegramCheckboxElement = jobsPageElement.querySelector(`input[name="messenger-telegram"]`);
const viberCheckboxElement = jobsPageElement.querySelector(`input[name="messenger-viber"]`);
const icqCheckboxElement = jobsPageElement.querySelector(`input[name="messenger-icq"]`);
const otherCheckboxElement = jobsPageElement.querySelector(`input[name="messenger-other"]`);
const otherMessengerInputElement = jobsPageElement.querySelector(`input[name="messenger"]`);

const vkLinkInputElement = jobsPageElement.querySelector(`input[name="link-vk"]`);
const okLinkInputElement = jobsPageElement.querySelector(`input[name="link-ok"]`);

const bdayInputElement = jobsPageElement.querySelector(`input[name="bday"]`);
const bplaceInputElement = jobsPageElement.querySelector(`input[name="bplace"]`);

const seriesPassportInputElement = jobsPageElement.querySelector(`input[name="passport-series"]`);
const numberPassportInputElement = jobsPageElement.querySelector(`input[name="passport-number"]`);
const datePassportInputElement = jobsPageElement.querySelector(`input[name="passport-date"]`);
const organizationPassportInputElement = jobsPageElement.querySelector(`input[name="passport-organization"]`);

const registrationAddressInputElement = jobsPageElement.querySelector(`input[name="address-registration"]`);
const actualAddressInputElement = jobsPageElement.querySelector(`input[name="address-actual"]`);

const education1InputElement = jobsPageElement.querySelector(`input[name="education-1"]`);
const education2InputElement = jobsPageElement.querySelector(`input[name="education-2"]`);
const educationAddInputElement = jobsPageElement.querySelector(`input[name="education-add"]`);

const skill1CheckboxElement = jobsPageElement.querySelector(`input[name="skill-1"]`);
const skill2CheckboxElement = jobsPageElement.querySelector(`input[name="skill-2"]`);
const skill3CheckboxElement = jobsPageElement.querySelector(`input[name="skill-3"]`);
const skill4CheckboxElement = jobsPageElement.querySelector(`input[name="skill-4"]`);
const skill5CheckboxElement = jobsPageElement.querySelector(`input[name="skill-5"]`);
const skill6CheckboxElement = jobsPageElement.querySelector(`input[name="skill-6"]`);
const skill7CheckboxElement = jobsPageElement.querySelector(`input[name="skill-7"]`);
const skillInputElement = jobsPageElement.querySelector(`input[name="skill"]`);

const job1InputElement = jobsPageElement.querySelector(`textarea[name="job-1"]`);
const job2InputElement = jobsPageElement.querySelector(`textarea[name="job-2"]`);
const job3InputElement = jobsPageElement.querySelector(`textarea[name="job-3"]`);

const marriageInputElement = jobsPageElement.querySelector(`select[name="marriage"]`);
const namePartnerInputElement = jobsPageElement.querySelector(`input[name="partner-name"]`);

const child1InputElement = jobsPageElement.querySelector(`input[name="child-1"]`);
const child2InputElement = jobsPageElement.querySelector(`input[name="child-2"]`);
const child3InputElement = jobsPageElement.querySelector(`input[name="child-3"]`);

const debtInputElement = jobsPageElement.querySelector(`select[name="debt"]`);

const whymeInputElement = jobsPageElement.querySelector(`textarea[name="whyme"]`);
const aboutInputElement = jobsPageElement.querySelector(`textarea[name="about"]`);


agreementCheckboxElement.addEventListener(`change`, () => {
  const isCheck = agreementCheckboxElement.checked;
  sendResumeButton.disabled = !isCheck;
});

sendResumeButton.addEventListener(`click`, () => {
  if (!agreementCheckboxElement.checked) {
    return;
  }

  sendResumeButtonWrap.dataset.inProgress = `true`;

  getData({
    ["set_resume_send"]: {
      ["fio"]: nameInputElement.value,
      ["town"]: citySelectElement.value,
      ["vacancy"]: vacancySelectElement.value,
      ["email"]: emailInputElement.value,
      ["phone"]: phone1InputElement.value,
      ["phone2"]: phone2InputElement.value,

      ["whatsapp"]: whatsAppCheckboxElement.checked,
      ["telegram"]: telegramCheckboxElement.checked,
      ["viber"]: viberCheckboxElement.checked,
      ["icq"]: icqCheckboxElement.checked,

      ["messenger_cb"]: otherCheckboxElement.checked,
      ["messenger"]: otherMessengerInputElement.value,

      ["vk_link"]: vkLinkInputElement.value,
      ["ok_link"]: okLinkInputElement.value,

      ["birthday"]: bdayInputElement.value,
      ["birthplace"]: bplaceInputElement.value,

      ["pass_ser"]: seriesPassportInputElement.value,
      ["pass_num"]: numberPassportInputElement.value,
      ["pass_date"]: datePassportInputElement.value,
      ["pass_org"]: organizationPassportInputElement.value,
      
      ["addr_reg"]: registrationAddressInputElement.value,
      ["addr_real"]: actualAddressInputElement.value,

      ["edu1"]: education1InputElement.value,
      ["edu2"]: education2InputElement.value,
      ["edu_add"]: educationAddInputElement.value,

      ["skills1"]: skill1CheckboxElement.checked,
      ["skills2"]: skill2CheckboxElement.checked,
      ["skills3"]: skill3CheckboxElement.checked,
      ["skills4"]: skill4CheckboxElement.checked,
      ["skills5"]: skill5CheckboxElement.checked,
      ["skills6"]: skill6CheckboxElement.checked,
      ["skills7"]: skill7CheckboxElement.checked,
      ["skills7list"]: skillInputElement.value,

      ["job1"]: job1InputElement.value,
      ["job2"]: job2InputElement.value,
      ["job3"]: job3InputElement.value,

      ["marriage"]: marriageInputElement.value,
      ["partner"]: namePartnerInputElement.value,

      ["kid1"]: child1InputElement.value,
      ["kid2"]: child2InputElement.value,
      ["kid3"]: child3InputElement.value,

      ["debt"]: debtInputElement.value,

      ["whyme"]: whymeInputElement.value,
      ["info"]: aboutInputElement.value,
    }
  })
  .then((response) => {
    if (response.result === `OK`) {
      sendResumeButtonWrap.dataset.inProgress = `false`;
      formElement.remove();
      jobsPageElement.dataset.mode = `success`;
    }
  });
});
