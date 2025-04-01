/* eslint-disable */

export function diceRoll(throws, eyes) {
  let num = 0;
  for (let step = 0; step < throws; step++) {
    let result = Math.floor(Math.random()*eyes) + 1;
    num += result;
  }
  return num
}