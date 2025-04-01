<template>
  <div class="logAll">
    <button class="button" @click="showLog()"> Combat Log </button>
    <div v-if="showLogNow">
      <ul>
      <li class="list"
          :key="index" 
          v-for="(entry, index) in list"> {{ entry }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'gameLog',
  props: [
    'heal',
    'ability',
    'damage',
    'activePlayer',
    'target',
    'log',
    'logStatus',
    'logMonsterStatus'
  ],
  data() {
    return {
      list: [],
      showLogNow : false,
    }
  },
  methods: {
    showLog() {
      console.log("log button was pressed")
      this.showLogNow = !this.showLogNow
    },
    pushList() {
      console.log(this.activePlayer.charName, "= aktiver spieler",this.ability, " = abiility", )
      if (this.damage != 0 ) {
        this.list.push(
          `${this.activePlayer.charName} casted ${this.ability} 
          on ${this.target.charName} 
          and landed ${this.damage} damage`
        )
      }
      else if (this.heal != 0) {
        this.list.push(
        `${this.activePlayer.charName} drank a potion and healed ${this.heal} hp`
        )
      }
      else { 
        this.list.push(
        `${this.activePlayer.charName} channeled ${this.ability} , face the consequences`
      )    
      }
      this.statusLog()
      console.log("update", this.list)
    },
  /**
   * if no statuseffect is empty it skips
   */
    statusLog() {
      if (this.log != 'nothing') {
        this.list.push(
        `${this.activePlayer.charName} ${this.log[1]} ${this.log[0]} `
        )
      }
    }
  },
  watch: {
    logStatus() { 
        console.log(this.logStatus, "logstatus")
        this.pushList(); 
    },
  }
});
</script>
<style scoped>
.logAll {
  display: flex;
  flex-direction: column;
}
.list {

  margin: 5px;
  padding:5px;
  border-bottom: 1px solid white;
  background-color: rgba(106, 106, 169, 0.191);
  border-radius:3px;
  width: 400px;
  color:white;
 
}

.button {
  color:white;
  margin-top: 100px;
  padding: 5px;
  background-color: rgba(106, 106, 169, 0.432);
  border-radius: 3px;

}
</style>