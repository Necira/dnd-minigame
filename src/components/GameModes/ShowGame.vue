<template>  
  <div class="showTheGame">
    <player-pick  v-if="playerPicked === false"
                  @picking="initializePlayer">
    </player-pick> 
    <div class="game" v-if="endOfGame === false">
      <div class="combat">
        <character-stats v-if="playerPicked" 
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
                        :statusEffectsCounter="playerOne.statusEffectsCounter.mirrorsCounter"
                        :initialHp="playerOne.initialHp"/>
        <character-stats v-if="playerPicked" 
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
                        :statusEffectsCounter="playerTwo.statusEffectsCounter.mirrorsCounter"
                        :initialHp="playerTwo.initialHp"/>
        <h1 class="activePlayer" 
              v-if="activePlayer">{{ this.activePlayer.charName }} 's turn
        </h1>
        <mage-abilities class="abilityCombat"
                        v-if="activePlayer.type === 'Mage' && activePlayer" 
                        :potions = "activePlayer.potions"
                        @pressedAbility="onClick"
                        :clickable="true"/>
        <rogue-abilities v-if="activePlayer.type === 'Rogue' && activePlayer" 
                        class="abilityCombat"
                        :potions = "activePlayer.potions"
                        @pressedAbility="onClick"
                        :sneakAttackUsed="activePlayer.sneakAttackUsed"
                        :initiative="inactivePlayer"
                        :clickable="true"/>
        <warrior-abilities v-if="activePlayer.type === 'Warrior' && activePlayer" 
                          class="abilityCombat"
                          :potions = "activePlayer.potions"
                          @pressedAbility="onClick"
                          :clickable="true"/>
      </div>
    </div>
    <div class="combatLog" v-if="playerPicked ">
      <game-log :ability='ability'
                :activePlayer="logActivePlayer"
                :target="logTarget"
                :damage="logDamage"
                :heal="logHeal"
                :log ="log"
                :logStatus="logStatus"/>
    </div>
    <div class="end">
      <end-screen :playerWin="playerWin"
                  v-if="endOfGame"> 
      </end-screen>
    </div>
  </div>
</template>
<script>

import { Mage } from '../../classes/Playable/Mage.js';
import { Warrior } from '../../classes/Playable/Warrior.js';
import { Rogue } from '../../classes/Playable/Rogue.js';
import { defineComponent } from 'vue';
import { diceRoll } from '@/classes/DiceRoll';
import gameLog from '../Characterview/PlayerInfo/gameLog.vue';
import CharacterStats from '../Characterview/PlayerInfo/CharacterStats.vue';
import PlayerPick from '../Characterview/PlayerInfo/PlayerPick.vue';
import MageAbilities from '../Characterview/Abilities/MageAbilities.vue';
import RogueAbilities from '../Characterview/Abilities/RogueAbilities.vue';
import WarriorAbilities from '../Characterview/Abilities/WarriorAbilities.vue';
import EndScreen from '../StartEnd/EndScreen.vue'
export default defineComponent({

  name: "showGame",
  components: {
    PlayerPick,
    CharacterStats,
    MageAbilities,
    WarriorAbilities,
    RogueAbilities,
    gameLog,
    EndScreen,
  },
  data() {
    return {
      log: [],
      playerOne: undefined,
      playerTwo: undefined,
      activePlayer: false,
      inactivePlayer: false,
      playerPicked: false,
      playerWin: '',
      ability: "",
      endOfGame: false,
      logStatus: true,
      logDamage: 0,
      logTarget: undefined,
      logHeal: 0,
      logActivePlayer: undefined
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
        try {this[player]
          this[player] = this.pickClass(pick);
          this[player].charName = name;
          if (player === 'playerTwo') {
            this.initiativeOrder();
        } 
      }
      catch (exception) {
        console.log(exception) 
      }
        return this[player].type
    },

    /**
     * returns new instance of classobject
     * @param {*} pick chosen class by active player, emited by playerpick.vue
     */
    pickClass(pick) {
      let pickedClass = undefined;
      if (pick === 'Warrior'){
        pickedClass = new Warrior();
      } else if (pick === 'Mage'){
        pickedClass = new Mage();
      } else if (pick === 'Rogue'){
        pickedClass = new Rogue();
      }
      return pickedClass;
    },

    /**
     * sets the order of active players
     */
    initiativeOrder() {
      if (this.playerTwo.initiative > this.playerOne.initiative) {
        this.activePlayer = this.playerTwo;
        this.inactivePlayer = this.playerOne;
        this.playerPicked = true;
      } else if (this.playerTwo.initiative < this.playerOne.initiative) { 
        this.activePlayer = this.playerOne;
        this.inactivePlayer = this.playerTwo;
        this.playerPicked = true;
      }
      this.activateColor();
    },
    activateColor() {
      this.activePlayer.color = true
    },
    deactivateColor() {
      this.playerOne.color = false;
      this.playerTwo.color = false;
    },
    /**
    * triggers and checks statuseffects, 
    * adjusts hp and switches player
    * @param {*} ability pressed ability
    */ 
    onClick(ability) {
      console.log(ability,"ability")
      this.resetAll(ability);
      try {
        this.activePlayer[ability](this.inactivePlayer);
      } catch (exception) {
        console.log(exception)
      }
      this.triggerHeal();
      this.countStatusEffects();
      this.triggerStatusEffects();
      this.triggerDamage();
      this.sendToLog();
      this.resetStatusEffects();
      this.switchPlayer();
      this.activateColor();
    },

    sendToLog(ability,succ) {
      if (ability != undefined && succ != undefined) {
        this.log = [ability, succ];
      } else {
        this.logDamage = this.activePlayer.damage;
        this.logHeal = this.activePlayer.heal;
        this.logTarget = this.inactivePlayer;
        this.logStatus = !this.logStatus;
        this.logActivePlayer = this.activePlayer;
      }
    },

    resetAll(ability) {
      this.deactivateColor();
      this.log = 'nothing';
      this.activePlayer.damage = 0;
      this.activePlayer.heal = 0;
      this.inactivePlayer.selfDamage = 0;
      this.ability = ability;
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
      this.activePlayer.currentHp -= this.activePlayer.selfDamage;
      this.inactivePlayer.currentHp -= this.activePlayer.damage;
      this.activePlayer.damageDeal = this.activePlayer.damage;
      this.inactivePlayer.damageTake = this.activePlayer.damage;     
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
      if (this.inactivePlayer.statusEffects.fireBall === true) {
          this.activePlayer.selfDamage = diceRoll(2,8);
          this.sendToLog('fireball','was struck by');
      }
      if (this.activePlayer.statusEffects.dirt === true) {
        this.activePlayer.damage = 0
        this.sendToLog('dirt','succeeded');
      } else {
        if (this.inactivePlayer.statusEffects.mirrors === true) {
          let mirrorLuck = diceRoll(1,2);
          if (mirrorLuck > 1 ) {
            this.activePlayer.damage = 0;
            this.sendToLog('mirror','succeeded');
          } else {
            this.sendToLog('mirror','failed');
          }
        }
        else if (this.inactivePlayer.statusEffects.shield === true) {
          Math.floor(this.activePlayer.damage / 2);
          this.sendToLog('shield','succeeded');
        }
      }
    },

    resetStatusEffects() {
      this.inactivePlayer.statusEffects.shield = false;
      this.activePlayer.statusEffects.dirt = false;
      this.inactivePlayer.statusEffects.fireBall = false;
    },

    switchPlayer() {
      if (this.activePlayer === this.playerOne) {
        this.activePlayer = this.playerTwo;
        this.inactivePlayer = this.playerOne;
      }
      else {
        this.activePlayer = this.playerOne;
        this.inactivePlayer = this.playerTwo;
      }
      this.EndOfCombat();
    },

    EndOfCombat() {
      console.log(this.playerOne.currentHp, this.playerTwo.currentHp, 'hp')
      if (this.playerOne.currentHp <= 0) {
        this.playerWin = this.playerOne.charName;
        this.endOfGame = true;
      }
      if (this.playerTwo.currentHp <= 0) {
        this.playerWin = this.playerTwo.charName;
        this.endOfGame = true;
      }
    },
  }
});
</script>
<style scoped>

.combat {
  display:grid;
  grid-template-areas: "activePlayer activePlayer activePlayer"
                        "playerOne abilityCombat playerTwo"
                        "combatLog combatLog combatLog";
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 1fr 1fr;
}
.combatLog {
  grid-area: combatLog;
  display:flex;
  justify-content: center;
}
.activePlayer {
  background-color: rgba(168, 168, 173, 0.553);
  color:white;
  font-size: 30px;
  grid-area: activePlayer;
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