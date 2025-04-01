import { Character } from "../Character.js";
import { diceRoll } from "../DiceRoll.js";
export class Dragon extends Character {
  constructor() {
    super();
    this.type = 'Monster';
    this.initialHp = 40
    this.currentHp = this.initialHp;
    this.charName = 'Dragon'
    this.statusEffects.outflank = false
    this.statusEffects.hide = false
    this.icon = "/assets/dragon.jpg"
    this.abilityOneName = 'firebreath'
    this.abilityTwoName = 'dodge'
    this.abilityThreeName = 'fly'
  }
  abilityOne() {
    this.damage = diceRoll(1,4);
  }
  abilityTwo() {
    this.statusEffects.outflank = true
  }
  abilityThree() {
    this.statusEffects.hide = true
  }
}