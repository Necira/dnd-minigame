<template>
  <div>
   <ability-info v-for="(ability, key, index) in abilities"
                 :ability="ability"
                 :key="index"/>
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
 ],
 emits : [
   'pressedAbility'
 ],
 data() {
   return {
     abilities: {
        action: {
         description: "bonk",
         throws: 1,
         dice: 5,
         image: "/assets/action.jpg",
         name:"action",
       },
       outflank: {
         description : "50% chance of miss",
         throws : 1,
         dice: 6,
         image: "/assets/goblinOutflank.jpg",
         name:"outflank",
       },
       hide: {
         description: "turns invincible for next turn",
         throws: 1,
         dice: 5,
         image: "./assets/hide.jpg",
         name:"hide",
       },
     },
    }
   },
 // created() {
 //       this.$watch('this.potions', potionCount => {
 //         if (this.potions === 0) {
 //           console.log("sdfsfdf")
 //           delete this.abilities.potion;
 //         }
 //       });
 //     }
 //   }
 // }
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