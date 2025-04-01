<template>
   <div>
    <ability-info v-for="(ability, key, index) in abilityArray"
                  :ability="ability"
                  @click="console.log(ability.name), $emit('pressedAbility', ability.name)"
                  :key="index"
                  :clickable="clickable"
    ></ability-info>
   </div>
</template>
<script>
import { defineComponent} from 'vue';
import AbilityInfo from './AbilityInfo.vue';
export default defineComponent({
  name: 'MageAbilities',
  components: {
    AbilityInfo
  },
  props: [
    'showDice',
    'potions',
    'clickable'
  ],
  emits : [
    'pressedAbility'
  ],
  data() {
    return {
      abilities: {
        magicMissile: {
          description: "fires bolt of magic",
          image: "/assets/magicMissile.jpg",
          name:"magicMissile",
        },
        fireBall: {
          description : "fires next turn",
          image: "/assets/fireBall.jpg",
          name:"fireBall",
        },
        mirrors: {
          description: "summons defense for 4 turns, has a 50% save rate",
          image: "./assets/mirrors.jpg",
          name:"mirrors",
        },
        potion: {
          description: "heals you, only one potion available, does not stack!",
          image: "./assets/potion.jpg",
          name:"potion",
        }
      },
     }
    },
    computed: {
      abilityArray() {
        let array = Object.values(this.abilities);
          if (this.potions === 0 ) {
            array.pop();
            return array;
        }
        return array;
      }
    }

});
</script>
<style scoped>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>