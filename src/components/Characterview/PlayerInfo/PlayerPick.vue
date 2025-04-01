<template>
  <div class="classes">
    <h1 class="header">{{header}}</h1>
    <class-info :class="{rogueInfo:showRogue}" 
                :clickable ="false"
                :name="'Rogue'"
                :show="showRogue" 
                @toggled="showEmit" 
                img="../assets/rogue.jpg" 
                showDice="false" 
                infoType="Rogue" 
                description="a versatile character, capable of sneaky combat and nimble tricks"
                :componentName="'rogue-abilities'"/>
    <class-info :class="{mageInfo:showMage }"
                :clickable ="false"
                :name="'Mage'"
                :show="showMage" 
                @toggled="showEmit" 
                img="../assets/mage.jpg" 
                showDice="false" 
                infoType="Mage" 
                description="Spellcasters who spent countless hours learning about magic and experimenting their findings"
                :componentName="'mage-abilities'"/>
    <class-info :class="{warriorInfo:showWarrior}" 
                :clickable ="false"
                :name="'Warrior'"
                :show="showWarrior" 
                @toggled="showEmit" 
                img="../assets/warrior.jpg"  
                showDice="false" 
                infoType="Warrior" 
                description="The warrior is proficient in the use of all simple weapons with great durablity"
                :componentName="'warrior-abilities'"/>
  <div class="name">
    <p class = "nameHead">Choose your Name</p>
    <br>
    <p class="pickedName" 
      style="white-space: pre-line;">
      {{ naming }}
    </p>
    <br>
    <input class="naming"
            type="text" 
            placeholder="Gustav" 
            v-model="naming"  
            v-if="playerOne === false">
    <button class="enter" @click="onClick('playerOne', naming)"
            v-if="playerOne === false && naming != ''">
            enter first player
    </button>
    <input type="text" 
            class="naming" 
            v-model="naming"
            placeholder="Paula"  
            v-if="playerOne === true">
    <button class="enter" @click="onClick('playerTwo', naming)"
            v-if="playerOne === true && naming != ''">
            enter second player 
    </button>
   
  </div>
  <h2 class="monsterName"
      v-if="Monster">
      Monster
  </h2>
</div>
</template>
<script>
import ClassInfo from '../PlayerInfo/ClassInfo.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "PlayerPick",
  props: [
    'Monster'
  ],
  components: {
    ClassInfo,
  },

  data() {
    return {
      toggled: false,
      naming: "",
      playerOne: false,
      playerTwo: false,
      showWarrior: false,
      showRogue: false,
      showMage: false,
      showMonster: false,
      pick: "",
      header: 'player one pick' ,
    }
  },
  emits: ['picking', 'naming'],
  methods: {
    heading() {
      this.header = this.playerOne? 'Second player pick' : 'player one pick'
    },
   /**
    * emits picked class and name with active player when enter is pressed (sets player)
    * @param {*} player active player
    * @param {*} name name chosen by player
    */
    onClick(player, name) {
      if (this.toggled) {
        this.$emit('picking', this.pick, player, name);
        if (player === 'playerOne') {
          this.playerOne = true
          this.showRogue = false;
          this.showMage = false;
          this.showWarrior = false;
          this.toggled = false;
          this.heading();
        } 
        else if (player === 'playerTwo') {
          this.playerTwo = true
        }
      } else {
        alert("pick class")
      }
    },
    
    /**
     * defines property pick with toggled class
     * @param {*} type rogue,warrior,mage
     * @param {*} toggled visibility
     */
    showEmit (type, toggled) {
      if (type === 'Rogue' && toggled) {
        this.showRogue = true;
        this.showMage = false;
        this.showWarrior = false;
        this.pick = "Rogue";
      }
      else if (type === 'Warrior' && toggled) {
        this.showWarrior = true;
        this.showMage = false;
        this.showRogue = false;
        this.pick = "Warrior";
      }
      else if (type === 'Mage' && toggled) {
        this.showMage = true;
        this.showWarrior = false;
        this.showRogue = false;
        this.pick = "Mage";
      }  
      else if (type === 'Monster' && toggled) {
        this.showMage = true;
        this.showWarrior = false;
        this.showRogue = false;
        this.showMonster = true;
      }  
    this.toggled = toggled;
    }
  }
});
</script>
<style scoped>
.classes {
  display: grid;
  grid-template-areas:"header header header"
                    "rogue mage warrior"
                    "name name name"
                    "enter enter enter"
                    "monsterName monsterName monsterName"
                    "monster monster monster";
  align-items: row; 
  grid-template-columns:  3fr 3fr 3fr;
  grid-template-rows: auto auto auto;
  border-radius: 10px;
  padding: 10px;
  justify-self: center;
  border-color: white;
}
.rogueInfo {
  grid-area: rogue;
  border-radius: 10px;
  justify-self: center;
  background-image:url("../../../../public/assets/rogueBackground.jpg" );
}
.mageInfo {
  grid-area: mage;
  border-radius: 10px;
  justify-self: center;
  background-color: rgba(115, 127, 136, 0.569);
  background-image:url("../../../../public/assets/mageBackground.jpg" );

}
.warriorInfo {
  background-color: rgba(151, 173, 148, 0.594);
  grid-area: warrior;
  border-radius: 10px;
  justify-self: center;
  background-image:url("../../../../public/assets/warriorBackground.jpg" );
  transition: transform ease-in-out 0.8s;
}

.monsterInfo {
  background-color: rgba(166, 170, 91, 0.55);
  grid-area: monster;
  border-radius: 10px;
  justify-self: center;
  transition: transform ease-in-out 0.2s;
}
.monsterName {
  background-color: rgba(159, 162, 101, 0.578);
  grid-area: monsterName;
  border-radius: 10px;
  justify-self: center;
  color:white;
  padding: 10px;
  margin: 30px;
  border-radius: 8px;
}
.name {
  padding: 10px;
  grid-area: name;
  justify-self: center;
  margin: 30px;
  background-color: #65375b;
  border-radius: 8px;
  color:white;
}
.pickedName {
  text-align: center;
}
.nameHead {
  text-align: center;
  padding: 10px;
  border-bottom: 2px solid white;
}
.enter {
  grid-area: enter;
  justify-self: center;
  margin: 20px;
  cursor: pointer;
  transition: transform ease-in-out 0.2s;
  background-color: white;
  border-radius: 8px;

}
.enter:hover, .naming:hover {
  transform: scale(1.2);
}
.header {
  background-color: #65375b;
  padding: 20px;
  border-radius: 8px;
  color:white;
  grid-area: header;
  text-align: center;
  justify-self: center;
  font-size: 20px;
  margin: 20px;
}

</style>