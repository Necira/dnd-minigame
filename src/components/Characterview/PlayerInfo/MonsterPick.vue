<template>
  <div class="monsterClass">
    <button class="header" @click ="onClick()"> Pick Monster </button>
    <class-info :class="{goblinInfo: showGoblin }"
                :clickable ="false"
                :show="showGoblin"
                :name="'Goblin'"
                @toggled="showEmit"
                img="../assets/goblin.jpg"
                infoType="Goblin"
                description="a big goblin threatens you and your comrade"
                :componentName="'goblin-abilities'"/>
    <class-info :class="{dragonInfo: showDragon }"
                :clickable ="false"
                :show="showDragon"
                :name="'Dragon'"
                @toggled="showEmit"
                img="../assets/dragon.jpg"
                infoType="Dragon"
                description="a furious dragon wants to slap you"
                :componentName="'dragon-abilities'"/>
    <br>
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
      showGoblin: false,
      showDragon: false,
      pick: "",
      header: this.playerOne? 'player two pick' : 'player one pick',
    }
  },
  emits: ['pickingMonster', 'naming'],
  methods: {
    
    /**
     * defines property pick with toggled class
     * @param {*} type rogue,warrior,mage
     * @param {*} toggled visibility
     */
    showEmit (type, toggled) {
       if (type === 'Goblin' && toggled) {
        this.showGoblin = true;
        this.showDragon = false;
        this.pick = 'Goblin';
      }  
      else if (type === 'Dragon' && toggled) {
        this.showGoblin = false;
        this.showDragon = true;
        this.pick = 'Dragon';
      }
      this.toggled = toggled;
    },

    onClick() {
    if (this.pick) {
        this.$emit('pickingMonster', this.pick);
      }
    }
  }
});
</script>
<style scoped>
.monsterClass{
  display: grid;
  grid-template-areas:
                    "goblin dragon "
                    "header header";
  align-items: row; 
  grid-template-columns:  1fr 1fr ;
  grid-template-rows: auto auto ;
  border-radius: 10px;
  padding: 10px;
  justify-self: center;
}
.header{
  grid-area: header;
  background-color: rgb(166, 170, 91);
  border-radius: 10px;
  justify-self: center;
  color:white;
  padding: 10px;
  margin: 30px;
  border-radius: 8px;
}
.goblinInfo {
  background-color: rgba(166, 170, 91, 0.61);
  grid-area: goblin;
  border-radius: 10px;
  justify-self: center;
}
.dragonInfo {
  background-color: rgba(151, 94, 85, 0.45);
  grid-area: dragon;
  border-radius: 10px;
  justify-self: center;
}
.monsterName {
  background-color: rgba(165, 167, 129, 0.45);
  grid-area: monsterName;
  border-radius: 10px;
  justify-self: center;
  color:white;
  padding: 10px;
  margin: 30px;
  border-radius: 8px;
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

</style>