<template>
<player-pick  v-if="playerPicked === false"
                  @picking="initializePlayer"
                  :Monster="true"/>
<monster-pick v-if="playerPicked && monsterPicked === false"
                  @pickingMonster="initializeMonster"/>
  <div class="game" v-if="endOfGame === false">
    <div class="combat">
      <character-stats v-if="playerPicked && monsterPicked" 
                      class="playerOne" 
                      :icon="playerOne.icon"
                      :initiative="playerOne.initiative"
                      :player="playerOne.charName"
                      :hp="playerOne.currentHp" 
                      :damageDeal="playerOne.damageDeal" 
                      :damageTake="playerOne.damageTake" 
                      :statusEffects="playerOne.statusEffects"
                      :potions="playerOne.potions"
                      :active="playerOne.color"
                      :initialHp="playerOne.initialHp"/>
      <character-stats v-if="playerPicked && monsterPicked" 
                      class="playerTwo" 
                      :icon="playerTwo.icon"
                      :initiative="playerTwo.initiative"
                      :player="playerTwo.charName"
                      :hp="playerTwo.currentHp" 
                      :damageDeal="playerTwo.damageDeal" 
                      :damageTake="playerTwo.damageTake" 
                      :statusEffects="playerTwo.statusEffects"
                      :potions="playerTwo.potions"
                      :active="playerTwo.color"
                      :initialHp="playerTwo.initialHp"/>
      <character-stats v-if="playerPicked && monsterPicked" 
                      class="monster" 
                      :icon="monster.icon"
                      :initiative="monster.initiative"
                      :player="monster.charName"
                      :hp="monster.currentHp" 
                      :damageDeal="monster.damageDeal" 
                      :damageTake="monster.damageTake" 
                      :statusEffects="monster.statusEffects"
                      :active="monster.color"
                      :initialHp="monster.initialHp"/>
      <h1 class="activePlayer" 
            v-if="activePlayer">{{ this.activePlayer.charName }} 's turn
      </h1>
      <mage-abilities class="abilityCombat"
                      v-if="activePlayer.type === 'Mage' && activePlayer" 
                      :potions="activePlayer.potions"
                      @pressedAbility="onClick"
                      :clickable="true"/>
      <rogue-abilities v-if="activePlayer.type === 'Rogue' && activePlayer" 
                      class="abilityCombat"
                      :potions="activePlayer.potions"
                      @pressedAbility="onClick"
                      :sneakAttackUsed="activePlayer.sneakAttackUsed"
                      :initiative="target"
                      :clickable="true"/>
      <warrior-abilities v-if="activePlayer.type === 'Warrior' && activePlayer" 
                        class="abilityCombat"
                        :potions="activePlayer.potions"
                        @pressedAbility="onClick"
                        :clickable="true"/>
      <component :is="componentMonster" v-if="monsterTurn && activePlayer.type === 'Monster' && activePlayer"
                        class="abilityCombat"
                        potions="activePlayer.potions"
                        @pressedAbility="onClick"
                        :clickable="false"/>
    <div class="combatLog" v-if="playerPicked && monsterPicked">
      <game-log :ability='logAbility'
                :activePlayer="logActivePlayer"
                :target="logTarget"
                :damage="logDamage"
                :heal="logHeal"
                :log="log"
                :logStatus="logStatus">
      </game-log>
    </div>
   
  </div>
  </div>
 
  <div class="end">
    <end-screen :playerWin="playerWin"
                v-if="endOfGame">
    </end-screen>
  </div>
</template>

<script>
import EndScreen from '../StartEnd/EndScreen.vue'
import { Mage } from '../../classes/Playable/Mage.js';
import { Warrior } from '../../classes/Playable/Warrior.js';
import { Rogue } from '../../classes/Playable/Rogue.js';
import { Goblin }from '../../classes/Monster/Goblin.js';
import { Dragon }from '../../classes/Monster/Dragon.js';
import { diceRoll } from '@/classes/DiceRoll';
import gameLog from '../Characterview/PlayerInfo/gameLog.vue';
import CharacterStats from '../Characterview/PlayerInfo/CharacterStats.vue';
import PlayerPick from '../Characterview/PlayerInfo/PlayerPick.vue';
import MonsterPick from '../Characterview/PlayerInfo/MonsterPick.vue';
import GoblinAbilities from '../Characterview/Abilities/GoblinAbilities.vue';
import MageAbilities from '../Characterview/Abilities/MageAbilities.vue';
import RogueAbilities from '../Characterview/Abilities/RogueAbilities.vue';
import WarriorAbilities from '../Characterview/Abilities/WarriorAbilities.vue';
import DragonAbilities from '../Characterview/Abilities/DragonAbilities.vue';
import { defineComponent } from 'vue';
export default defineComponent({

name: "ShowMonsterGame",
components: {
  MonsterPick,
    DragonAbilities,
    EndScreen,
    PlayerPick,
    CharacterStats,
    MageAbilities,
    WarriorAbilities,
    RogueAbilities,
    gameLog,
    GoblinAbilities
},
data() {
    return {
      playerOne: undefined,
      playerTwo: undefined,
      activePlayer: false,
      target: false,
      playerPicked: false,
      monsterPicked: false,
      playerWin: '',
      ability: "",
      endOfGame: false,
      monster: undefined,
      turn: [],
      monsterTurn : false,
      componentMonster: false,
      logStatus:true,
      log : [],
      logDamage: 0,
      logTarget: undefined,
      logHeal: 0,
      logActivePlayer: undefined,
      logAbility: undefined
    }
  },

  methods: {
    /**
     * sets classobject in active player, emited by playerpick.vue
     * @param {*} pick class chosen by active player
     * @param {*} player active player
     * @param {*} name name chosen by active player
     */
      initializePlayer(pick, player, name)  { 
        try {
          this[player]
          this[player] = this.pickClass(pick);
          this[player].charName = name;
        if (player === 'playerTwo') {
          this.playerPicked = true;
        } 
      }
      catch (exception) {
        console.log(exception) 
      }
        return this[player].type
    },
    initializeMonster(pick) {
      if (pick === 'Goblin'){
        this.monster = new Goblin();
        this.componentMonster = 'GoblinAbilities'
      } else if (pick === 'Dragon'){
        this.monster = new Dragon();
        this.componentMonster = 'DragonAbilities'
      }
      this.monsterPicked = true;
      this.initiativeOrder();
      this.targetSearch();
    },

    /**
     * returns new instance of classobject
     * @param {*} pick chosen class by active player, emited by playerpick.vue
     */
    pickClass(pick) {
      let pickedClass = undefined;
      if (pick === 'Warrior') {
        pickedClass = new Warrior();
      } else if (pick === 'Mage') {
        pickedClass = new Mage();
      } else if (pick === 'Rogue') {
        pickedClass = new Rogue();
      }
      return pickedClass;
    },

    /**
     * sets the order of active players
     */
    initiativeOrder() {
      let ini = [this.playerOne, this.playerTwo, this.monster];
      for (let i= 0; i< ini.length -1; i++) {
        if (ini[i].initiative < ini[i+1].initiative) {
          let temp = ini[i];
          ini[i] = ini[i+1];
          ini[i+1] = temp;
        }
      }
      this.activePlayer = ini[0]
      this.playerPicked = true;
      this.turn = ini;
      this.monsterAbilityRandom();
      this.activateColor();
    },

    /**
    * triggers and checks statuseffects, 
    * adjusts hp and switches player
    * @param {*} ability pressed ability
    */ 
    onClick(ability) {
      console.log("onClick")
      this.deactivateColor();
      this.resetAll(ability);
      this.monsterAbilityRandom();
      this.monsterTurn = true;
      if (this.activePlayer != this.monster) {
        try {
          this.activePlayer[ability](this.monster);
        } catch (exception) {
          console.log(exception)
        }
      }
      this.triggerHeal();
      this.countStatusEffects();
      this.triggerStatusEffects();
      this.triggerDamage();
      if (this.activePlayer === this.monster) {
        setTimeout(() => {
          this.sendToLog();
          this.resetStatusEffects();
          this.switchPlayer();
      }, 2000);
      } else {
        this.sendToLog();
        this.resetStatusEffects();
        this.switchPlayer();
      }
      this.activateColor();
    },

    sendToLog(ability,succ) {
      if (ability != undefined || succ != undefined) {
        this.log = [ability, succ];
      } else {
        this.logDamage = this.activePlayer.damage;
        this.logHeal = this.activePlayer.heal;
        this.logTarget = this.target;
        this.logActivePlayer = this.activePlayer;
        this.logStatus = !this.logStatus;
        this.logAbility = this.ability;

      }
    },
    resetAll(ability) {
      this.log = 'nothing';
      this.activePlayer.damage = 0;
      this.activePlayer.heal = 0;
      this.target.selfDamage = 0;
      this.ability = ability;
      this.heal = 0;
    },
    activateColor() {
      this.activePlayer.color = true
    },
    deactivateColor() {
      this.playerOne.color = false;
      this.playerTwo.color= false;
      this.monster.color = false;
    },
    triggerHeal() {
      if(this.activePlayer.heal != 0) {
        if (this.activePlayer.currentHp + this.activePlayer.heal <= this.activePlayer.initialHp) {
          this.activePlayer.currentHp += this.activePlayer.heal;
        } else {
          this.activePlayer.currentHp = this.activePlayer.initialHp;
        }
      }
    },

    triggerDamage() {
      this.activePlayer.currentHp -= this.activePlayer.selfDamage
      this.target.currentHp -= this.activePlayer.damage;
      this.activePlayer.damageDeal = this.activePlayer.damage
      this.target.damageTake = this.activePlayer.damage 
          
    },

    /**
     * counts rounds on status effects dirt and mirror
     */
    countStatusEffects() {
      if (this.activePlayer.type === 'Mage') {
        this.activePlayer.mirrorCount();
      }
    },

    /**
     * triggers fireball and mirrors, if lucky oder dirt sets damage to 0
     */
    triggerStatusEffects() {
      if(this.activePlayer === this.monster) {
        if (this.playerOne.statusEffects.fireBall || this.playerTwo.statusEffects.fireBall) {
          this.activePlayer.selfDamage = diceRoll(2,8);
          this.sendToLog('fireball','was struck by');
        }   
      }
      else if (this.monster.statusEffects.outflank) {
        let luck = diceRoll(1,2);
        if(luck > 1) { 
          this.activePlayer.damage = 0;
          this.sendToLog('outflanked','was');
        }
        else if (this.monster.statusEffects.hide) {
          this.activePlayer.damage = 0;
          this.sendToLog('invisible','is');
        }
        if (this.target.statusEffects.dirt) {
          this.activePlayer.damage = 0;
          this.sendToLog('dirt','succeeded');
        } 
      }
      else {
        if (this.playerOne.statusEffects.mirrors || this.playerTwo.statusEffects.mirrors) {
          let mirrorLuck = diceRoll(1,2);
          if (mirrorLuck > 1 ) {
            this.activePlayer.damage = 0;
            this.sendToLog('mirror','succeeded');
          } else {
          this.sendToLog('mirror','failed');
          }
        }
        else if (this.playerOne.statusEffects.shield || this.playerTwo.statusEffects.shield) {
          Math.floor(this.activePlayer.damage / 2);
          this.sendToLog('shield','succeeded');
        }
      }
    },
    
    resetStatusEffects() {
      this.target.statusEffects.shield = false;
      this.activePlayer.statusEffects.dirt = false;
      this.target.statusEffects.fireBall = false;
    },
    switchPlayer() {
      if (this.turn[0] === this.activePlayer) {
        this.activePlayer = this.turn[1];
      } else if (this.turn[1] === this.activePlayer) {
        this.activePlayer = this.turn[2];
      } else if (this.turn[2] === this.activePlayer) {
        this.activePlayer = this.turn[0];
      }
      this.targetSearch();
      this.EndOfCombat();   
      if (this.activePlayer === this.monster) {
        this.onClick(this.ability); 
      }
      this.deactivateColor();
      this.activateColor();
  },

  monsterAbilityRandom() {
    if ( this.activePlayer === this.monster) {
      let random = diceRoll(1,3);
      if (random === 1) {
        this.ability = this.monster.abilityOneName
        this.monster.abilityOne();
      }
      else if (random === 2) {
        this.ability = this.monster.abilityTwoName
        this.monster.abilityTwo();
      }
      else if (random === 3) {
        this.ability = this.monster.abilityThreeName
        this.monster.abilityThree();
      }
    }
    console.log(this.ability, "monsterabilityrandom")
  },
    targetSearch() {
      if(this.activePlayer != this.monster) {
        this.target = this.monster;
      }
      else if (this.activePlayer === this.monster) {
        let luck = diceRoll(1,2);
        if (luck > 1) {
          this.target = this.playerOne;
        } else {
          this.target = this.playerTwo;
        }
      }
    },

    EndOfCombat() {
      if (this.playerOne.currentHp <= 0) {
        this.playerWin = this.monster.charName;
        this.endOfGame = true;
      }
      if (this.playerTwo.currentHp <= 0) {
        this.playerWin = this.monster.charName;
        this.endOfGame = true;
      }
      if (this.monster.currentHp <= 0) {
        this.playerWin = this.playerTwo.charName + this.playerOne.charName;
        this.endOfGame = true;
      }
    }
  }
});
</script>
<style scoped>

.combat {
  display:grid;
  grid-template-areas: "activePlayer activePlayer activePlayer"
                        "playerOne abilityCombat playerTwo"
                        "monster monster combatLog";
  grid-template-rows: auto auto auto;
  grid-template-columns: 1fr 1fr 1fr;
}
.combatLog {
  grid-area: combatLog;
  display:flex;
  justify-content: center;
}
.monster {
  grid-area: monster;
}
.activePlayer {
  background-color: rgba(168, 168, 173, 0.553);
  color:white;
  font-size: 30px;
  grid-area: activePlayer;
  border-color:gold;
  padding: 20px;
  margin: 30px;
  justify-self: center;
  border-radius: 8px;
}
.playerOne {
  grid-area: playerOne;
}
.abilityCombat {
  grid-area: abilityCombat;
}
.playerTwo {
  grid-area: playerTwo;
}
.win {
  font-size: large;
  color:red;
  display: flex;
  margin: 200px;
  justify-content: center;
}
</style>
