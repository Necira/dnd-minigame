import  { Character } from "../Character.js";
import { diceRoll } from "../DiceRoll.js";
export class Paladin extends Character {

  constructor() {
    super();
    this.type = 'Paladin';
    this.initialHp = 10
    this.currentHp = this.initialHp;
    this.icon = "../assets/paladin.png" 
  }
  potion() {
    this.heal = diceRoll(1,4)
    this.potions = 0
  }
  sword() {
    this.damage = diceRoll(1,6);
  }
  command(target) {
        let command = target.statusEffects.command = true;
        return command
     }
}