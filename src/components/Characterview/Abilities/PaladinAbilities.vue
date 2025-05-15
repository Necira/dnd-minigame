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
  import AbilityInfo from './AbilityInfo.vue';
  export default defineComponent({
    name : "PaladinClass",
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
          sword: {
            description: "hit",
            throws: 1,
            dice: 5,
            image: "./assets/sword.jpg",
            name: "sword"
          },
          command: {
            description: "commands to drop weapons, enemy will be stunned for 1 turn",
            throws: 1,
            dice: 5,
            image: "./assets/command.png",
            name: "command"
          },
          potion: {
            description: "heals you, only one potion available, does not stack!",
            throws: 1,
            dice: 4,
            image: "./assets/potion.jpg",
            name:"potion",
          }
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
  })
  </script>
  <style scoped>
  * {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c5042;
  }
  </style>