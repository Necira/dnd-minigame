import { diceRoll } from "./DiceRoll.js";
export class Character {
  charName = '';
  initiative = diceRoll(1,20);
  damageDeal = 0;
  damageTake = 0;
  statusEffects = {};
  statusEffectsCounter = {}
  type = "";
  potions = 1;
  icon ="";
  color = false;
  selfDamage = 0;
  damage = 0;
  heal = 0;
  constructor() {
    this.statusEffects = {  
      fireBall: false,
      mirrors:false,
      dirt:false,
      shield:false,
    }
    this.statusEffectsCounter = {
      mirrorsCounter: 0,
    }
  }

  setStatusEffects(effect, state) {
    if (!this.effects[effect]) {
      this.effects[effect] = [];
    }
    this.statusEffects[effect].push(state);
  }

  setName(name) {
    this.charName = name;
  }

  setInitiative(initiative) {
    this.initiative = initiative;
  }

  setInitialHp(hp) {
    this.initialHp = hp;
    this.currentHp = hp;
  }

  setCurrentHp(hp) {
    this.currentHp = hp;
  }

  getCurrentHp() {
    return this.currentHp;
  }

  getDamageTake() {
    return this.damageTake;
  }

  getDamageDeal() {
    return this.damageDeal;
  }
}
