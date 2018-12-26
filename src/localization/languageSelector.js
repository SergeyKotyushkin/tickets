import storageKeys from 'constants/storageKeys';

const languageSelector = {
  get: _get,
  set: _set
};

export default languageSelector;

function _get() {
  return localStorage.getItem(storageKeys.language);
}

function _set(language) {
  localStorage.setItem(storageKeys.language, language);
}
