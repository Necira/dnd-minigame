<template>
  <div>
   <ability-info v-for="(ability, key, index) in abilities"
                 :ability="ability"
                 :key="index"
                 :clickable="clickable"/>
  </div>
</template>
<script>
import { defineComponent} from 'vue';
import AbilityInfo from './AbilityInfo.vue';
export default defineComponent({
 name: 'GoblinAbilities',
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
        fireBreath: {
         description: "swooosh",
         throws: 1,
         dice: 5,
         image: "/assets/breath.jpg",
         name:"fire breath",
       },
       outflank: {
         description : "50% chance of miss",
         throws : 1,
         dice: 6,
         image: "/assets/outflank.jpg",
         name:"dodge",
       },
       hide: {
         description: "fly too high to hit",
         throws: 1,
         dice: 5,
         image: "./assets/wings.jpg",
         name:"I can touch the sky",
       },
     },
    }
   },

});
</script>
<style scoped>
* {
 font-family: Avenir, Helvetica, Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 text-align: center;
 color: #2c3e50;
 margin-top: 60px;
}
</style>