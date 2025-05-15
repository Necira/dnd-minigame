<template>
  <div class="container">
    <div class="classes">
      <h1 class="header">{{header}}</h1>
      <class-info :class="{rogueInfo:showRogue}" 
                  :clickable="false"
                  :name="'Rogue'"
                  :show="showRogue" 
                  @toggled="showEmit" 
                  img="../assets/rogue.jpg" 
                  showDice="false" 
                  infoType="Rogue" 
                  description="a versatile character, capable of sneaky combat and nimble tricks"
                  :componentName="'rogue-abilities'"/>
      <class-info :class="{mageInfo:showMage}"
                  :clickable="false"
                  :name="'Mage'"
                  :show="showMage" 
                  @toggled="showEmit" 
                  img="../assets/mage.jpg" 
                  showDice="false" 
                  infoType="Mage" 
                  description="Spellcasters who spent countless hours learning about magic and experimenting their findings"
                  :componentName="'mage-abilities'"/>
      <class-info :class="{warriorInfo:showWarrior}" 
                  :clickable="false"
                  :name="'Warrior'"
                  :show="showWarrior" 
                  @toggled="showEmit" 
                  img="../assets/warrior.jpg"  
                  showDice="false" 
                  infoType="Warrior" 
                  description="The warrior is proficient in the use of all simple weapons with great durability"
                  :componentName="'warrior-abilities'"/>
       <class-info :class="{paladinInfo:showPaladin}" 
                  :clickable="false"
                  :name="'Paladin'"
                  :show="showPaladin" 
                  @toggled="showEmit" 
                  img="../assets/paladin.png"  
                  showDice="false" 
                  infoType="Paladin" 
                  description="The paladin is a holy whiteknight with a tragic backstory, a champion of justice and righteousness, who fights for the light and women who don't need saving"
                  :componentName="'paladin-abilities'"/>
    </div>

    <!-- Name Section -->
    <div class="name">
      <p class="nameHead">Choose your Name</p>
      <p class="pickedName" style="white-space: pre-line;">
        {{ naming }}
      </p>
      <input class="naming"
             type="text" 
             placeholder="Gustav" 
             v-model="naming"  
             v-if="playerOne === false">
      <button class="enter" @click="onClick('playerOne', naming)"
              v-if="playerOne === false && naming != ''">
        Enter First Player
      </button>
      <input type="text" 
             class="naming" 
             v-model="naming"
             placeholder="Paula"  
             v-if="playerOne === true">
      <button class="enter" @click="onClick('playerTwo', naming)"
              v-if="playerOne === true && naming != ''">
        Enter Second Player
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
      showPaladin: false,
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
          this.showPaladin = false;
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
        this.showPaladin = false;
        this.pick = "Rogue";
      }
      else if (type === 'Warrior' && toggled) {
        this.showWarrior = true;
        this.showMage = false;
        this.showRogue = false;
        this.showPaladin = false;
        this.pick = "Warrior";
      }
      else if (type === 'Mage' && toggled) {
        this.showMage = true;
        this.showWarrior = false;
        this.showRogue = false;
        this.showPaladin = false;
        this.pick = "Mage";
      }  
      else if (type === 'Paladin' && toggled) {
        this.showMage = false;
        this.showWarrior = false;
        this.showRogue = false;
        this.showPaladin = true;
        this.pick = "Paladin";
      }  
      else if (type === 'Monster' && toggled) {
        this.showMage = true;
        this.showWarrior = false;
        this.showRogue = false;
        this.showPaladin = false;
        this.showMonster = true;
      }  
    this.toggled = toggled;
    }
  }
});
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Uncial+Antiqua&display=swap');

/* Schleier über das Hintergrundbild */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Halbtransparenter schwarzer Schleier */
  z-index: -1; /* Hinter allen anderen Elementen */
}

/* Container */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* Klassen-Grid */
.classes {
  display: grid;
  grid-template-areas: 
    "header header header header"
    "rogue mage warrior paladin"
    "enter enter enter enter"
    "monsterName monsterName monsterName monsterName"
    "monster monster monster monster";
  align-items: start;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto auto auto;
  border-radius: 10px;
  padding: 10px;
  gap: 2rem;
  width: 100%;
  min-height: 30rem; 
  box-sizing: border-box;
}

.naming {
  width: 20%; 
  height: 3rem; 
  padding: 5px; 
  border-radius: 8px;
  border: 2px solid #8a5a44;
  font-size: 1.2rem; 
  font-family: 'Cinzel', serif; 
  background-color: rgba(255, 255, 255, 0.9); 
  color: #4b2e83;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); 
  text-align: center; 
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.naming:focus {
  outline: none;
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6); 
}


.header {
  grid-area: header;
  background: linear-gradient(135deg, #4b2e83, #2c1a4d); 
  padding: 20px;
  border-radius: 15px;
  color: #f5e6cc; 
  text-align: center;
  font-size: 28px;
  font-family: 'Cinzel', serif;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); 
  border: 3px solid #8a5a44; 
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.header:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6); 
}

.name {
  margin-top: 2rem;
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 10rem;
  font-family: 'Uncial Antiqua', serif; 
  color: #f5e6cc; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); 
}

.nameHead {
  font-size: 24px;
  margin-bottom: 1rem;
  font-weight: bold;
  background: linear-gradient(135deg, #8a5a44, #4b2e83);
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #f5e6cc; 
  display: inline-block;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); 
}


.enter {
  margin-top: 1rem;
  cursor: pointer;
  transition: transform ease-in-out 0.2s;
  background: linear-gradient(135deg, #4b2e83, #8a5a44);
  border-radius: 8px;
  padding: 10px 20px;
  text-align: center;
  font-family: 'Cinzel', serif; 
  font-size: 1.2rem;
  color: #f5e6cc; 
  border: 2px solid #f5e6cc; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); 
}

.enter:hover {
  transform: scale(1.1); 
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6); 
}
</style>