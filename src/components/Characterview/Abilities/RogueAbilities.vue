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
import { defineComponent } from 'vue';
import AbilityInfo from './AbilityInfo.vue'
export default defineComponent({
  name : "RogueAbilities",
  components: {
    AbilityInfo
  },
  props: [
    'showDice',
    'sneakAttackUsed',
    'potions',
    'initiative',
    'clickable'
  ],
  emits : [
    'pressedAbility'
  ],
  data: () => ({
    abilities: {
      dagger: {
        name: 'dagger',
        image: './assets/dagger.jpg',
        description: 'stab',
      },
      sneakAttack: {
        name: 'sneakAttack',
        image: './assets/sneakAttack.jpg',
        description: 'if your initiative is higher, you can add 1d4 to your dagger',
      },
      dirt: {
        name: 'dirt',
        image: './assets/dirt.jpg',
        description: 'blocks enemy vision',
      },
      potion: {
          description: "heals you, only one potion available, does not stack!",
          image: './assets/potion.jpg',
          name:'potion',
        }
      },
    }),
    watch: {
      sneakAttackUsed() {
        if(this.sneakAttackUsed) {
          delete this.abilities.sneakAttack;
        }
      },
      initiative(higherInitiative, lowerInitiative) {
        if(lowerInitiative) {
          delete this.abilities.sneakAttack;
        }
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