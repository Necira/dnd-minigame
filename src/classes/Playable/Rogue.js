import { Character } from "../Character.js";
import { diceRoll } from "../DiceRoll.js";
export class Rogue extends Character {
  
  constructor() {
    super();
    this.type = 'Rogue';
    this.initialHp = 10
    this.currentHp = this.initialHp;
    this.sneakAttackUsed = false
    this.icon = "../assets/rogue.jpg" 
  }
  potion() {
    this.heal = diceRoll(1,4)
    this.potions = 0
  }
  dagger() {
    this.damage = diceRoll(1,4)
  }
  sneakAttack() {
    this.damage = diceRoll(1,4) * 2;
    this.sneakAttackUsed = true;
  }
  dirt(target) {
     let dirts = target.statusEffects.dirt = true;
     return dirts
  }
}