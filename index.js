let nameInput = document.getElementById('firstName');
let nameHelperText = document.getElementById('firstNameHelp');

let lastNameInput = document.getElementById('lastName');
let lastNameHelperText = document.getElementById('lastNameHelp');

let emailInput = document.getElementById('email');
let emailInputHelperText = document.getElementById('emailHelp');

let numberInput = document.getElementById('phoneNumber');
let numberInputHelperText = document.getElementById('phoneNumberHelp');

let loginForm = document.getElementById('form');

let formHasError = false;

const namesRegEx = /^[a-z]{2,}$/i;
const shortNamesRegEx = /^[a-z]{1,}$/i;
const emailRegEx = /^.+@.+\..+$/i;

function getObjectKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function setInputHasError(inpId, helpTextId, text) {
  inpId.classList.add('border-danger');

  helpTextId.classList.remove('text-muted');
  helpTextId.classList.add('text-danger');

  helpTextId.innerText = text;
}

function setInputCorrect(inpId, helpTextId, text) {
  inpId.classList.remove('border-danger');

  helpTextId.classList.remove('text-danger');
  helpTextId.classList.add('text-muted');

  helpTextId.innerText = text;
}

function testNames(which, value) {
  if (which === 'f') {
    if (
      value.trim() === '' ||
      (value.trim().length === 1 && shortNamesRegEx.test(value))
    ) {
      formHasError = true;
      setInputHasError(
        nameInput,
        nameHelperText,
        'Please, enter atleast 2 symbols'
      );
    } else if (!namesRegEx.test(value)) {
      formHasError = true;
      setInputHasError(
        nameInput,
        nameHelperText,
        'Please, use only latin letters'
      );
    } else {
      formHasError = false;
      setInputCorrect(
        nameInput,
        nameHelperText,
        'Please, enter your first name'
      );
    }
  }
  if (which === 'l') {
    if (
      value.trim() === '' ||
      (value.trim().length === 1 && shortNamesRegEx.test(value))
    ) {
      formHasError = true;
      setInputHasError(
        lastNameInput,
        lastNameHelperText,
        'Please, enter atleast 2 symbols'
      );
    } else if (!namesRegEx.test(value)) {
      formHasError = true;
      setInputHasError(
        lastNameInput,
        lastNameHelperText,
        'Please, use only latin letters'
      );
    } else {
      formHasError = false;
      setInputCorrect(
        lastNameInput,
        lastNameHelperText,
        'Please, enter your last name'
      );
    }
  }
}

function testEmail(value) {
  if (!emailRegEx.test(value)) {
    setInputHasError(
      emailInput,
      emailInputHelperText,
      'Please, enter correct email'
    );
    formHasError = true;
  } else {
    formHasError = false;
    setInputCorrect(
      emailInput,
      emailInputHelperText,
      'Please, enter your email'
    );
  }
}

function testPhone() {
  if (!phoneInput.isValidNumber()) {
    const providedPhoneError = getObjectKeyByValue(
      // eslint-disable-next-line no-undef
      intlTelInputUtils.validationError,
      phoneInput.getValidationError()
    );

    if (providedPhoneError === 'TOO_SHORT') {
      setInputHasError(
        numberInput,
        numberInputHelperText,
        'Provided number is too short'
      );
    } else if (providedPhoneError === 'TOO_LONG') {
      setInputHasError(
        numberInput,
        numberInputHelperText,
        'Provided number is too long'
      );
    } else {
      setInputHasError(
        numberInput,
        numberInputHelperText,
        'Please, enter correct phone number'
      );
    }
    formHasError = true;
  } else {
    formHasError = false;
    setInputCorrect(
      numberInput,
      numberInputHelperText,
      'Please, enter your phone number'
    );
  }
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let arrayOfInputs = document.getElementsByTagName('input');
  let [fInpt, sInpt, tInpt] = arrayOfInputs;

  const providedName = fInpt.value;
  const providedLName = sInpt.value;
  const providedEmail = tInpt.value;
  const providedPhone = phoneInput.getNumber();

  testNames('f', providedName);
  testNames('l', providedLName);
  testEmail(providedEmail);
  testPhone();

  if (formHasError) {
    return;
  }

  console.log(providedName, providedLName, providedEmail, providedPhone);
});
