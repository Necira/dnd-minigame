import { Character } from "../Character.js";
import { diceRoll } from "../DiceRoll.js";
export class Mage extends Character {
  constructor() {
    super();
    this.type = 'Mage';
    this.initialHp = 8
    this.currentHp = this.initialHp;
    this.icon = "../assets/mage.jpg" 
    this.mirrorCounts = 0
  }
  potion() {
    this.heal = diceRoll(1,4)
    this.potions = 0
  }
  
  magicMissile() {
    this.damage = diceRoll(1,4);

  }

  fireBall() {
    this.statusEffects.fireBall = true;
  }
  mirrors() {
    this.statusEffects.mirrors = true;
  }
  mirrorCount() {
    let remaining = 4 - this.mirrorCounts
    if (this.statusEffects.mirrors === true) {
      if (this.mirrorCounts > 4) {
        this.mirrorCounts = 0;
        this.statusEffects.mirrors = false;
      } else {
        this.mirrorCounts++;
        this.statusEffectsCounter.mirrorsCounter = remaining
      }
    }
  }

}