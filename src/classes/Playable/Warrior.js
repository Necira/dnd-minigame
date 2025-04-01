import  { Character } from "../Character.js";
import { diceRoll } from "../DiceRoll.js";
export class Warrior extends Character {

  constructor() {
    super();
    this.type = 'Warrior';
    this.initialHp = 10
    this.currentHp = this.initialHp;
    this.icon = "../assets/warrior.jpg" 
  }
  potion() {
    this.heal = diceRoll(1,4)
    this.potions = 0
  }
  sword() {
    this.damage = diceRoll(1,6);
  }
  shield() {
    this.statusEffects.shield = true;
  }
}