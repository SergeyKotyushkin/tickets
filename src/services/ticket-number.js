export default function TicketNumberService() {
  this.getNumberFromDigits = _getNumberFromDigits;
  this.getDigitsFromNumber = _getDigitsFromNumber;
}

// main
function _getNumberFromDigits(digits) {
  let number = 0;
  let mul = 1;
  for (var i = 0; i < 6; i++) {
    number += digits[5 - i] * mul;
    mul *= 10;
  }

  return number;
}

function _getDigitsFromNumber(number) {
  let digits = [];
  for (var i = 0; i < 6; i++) {
    digits[5 - i] = number % 10;
    number = Math.floor(number / 10);
  }

  return digits;
}
