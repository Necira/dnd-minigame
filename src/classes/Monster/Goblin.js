import { Character } from "../Character.js";
import { diceRoll } from "../DiceRoll.js";
export class Goblin extends Character {
  constructor() {
    super();
    this.type = 'Monster';
    this.initialHp = 40
    this.currentHp = this.initialHp;
    this.charName = 'Goblin'
    this.statusEffects.outflank = false
    this.statusEffects.hide = false
    this.icon = "/assets/goblin.jpg"
    this.abilityOneName = 'attack'
    this.abilityTwoName = 'dodge'
    this.abilityThreeName = 'hide'
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