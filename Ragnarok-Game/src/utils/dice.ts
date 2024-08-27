

function randomIntegerBelow(value: number): number {
  return Math.floor(Math.random() * value);
}

function randomIntegerBetween(min: number, max: number): number {
  return randomIntegerBelow(max + 1 - min) + min;
}

/**
* En funktion til at få et tilfældigt tal mellem 1 og x.
* Efterligner en x-sidet terning, hvor x skal være et heltal, altså:
*      dX(6) = 1d6
*/
function dX(x: number): number {
  if (isNaN(x) || x <= 0) {
      console.log('Indputtet skal være et tal og større end null.');
      return 0;
  }
  return randomIntegerBetween(1, x + 1);
}

/**
* En funktion til at få et tilfældigt tal mellem x og x*y.
* Efterligner x y-sidede terninger, hvor x og y skal være heltal, altså:
*      XdY(2, 12) = 2d12
*/
function XdY(x: number, y: number): number {
  var result = 0;
  if (isNaN(x) || x <= 0) {
      console.log('Indputtet skal være et tal og større end null.');
      return 0;
  }
  if (isNaN(y) || y <= 0) {
      console.log('Indputtet skal være et tal og større end null.');
      return 0;
  }
  for (var i = 0; i < x; i++) {
      result += dX(y);
  }
  return result;
}

export {
  randomIntegerBelow,
  randomIntegerBetween,
  dX,
  XdY
};