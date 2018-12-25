import i18n from 'i18next';
import {reactI18nextModule} from 'react-i18next';

import labelsEn from './resources/en';

let localizator = {
  init: _init,
  keys: {}
};

export default localizator;

function _init() {
  const translationEn = _flatObject(labelsEn);
  localizator.keys = _createKeys(translationEn);

  let config = {
    resources: {
      en: {
        translation: translationEn
      }
    },
    lng: "en",
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  };

  i18n.use(reactI18nextModule).init(config);
}

function _flatObject(ob) {
  var toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) 
      continue;
    
    if ((typeof ob[i]) == 'object') {
      var flatObject = _flatObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) 
          continue;
        
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

function _createKeys(data) {
  var result = {}
  for (var i in data) {
    var keys = i.split('.')
    keys.reduce(function(r, e, j) {
      return r[e] || (
        r[e] = isNaN(Number(keys[j + 1]))
          ? (
            keys.length - 1 == j
              ? i
              : {}
          )
          : []
      )
    }, result)
  }
  return result
}
