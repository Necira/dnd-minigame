<template>
  <div class="classInfo">
      <img :src="img" class="image" @click="toggleInfos()">
      <p class="name" v-if="showClass"> {{ name }} </p>
      <p class="description" v-if="showClass ">{{ description }}</p>
      <p  class="header" v-if="showClass ">abilities</p>
      <component :is="componentName"
                v-if="showClass"
                class="ability"/>
  </div>
</template>
<script>
import { defineComponent} from 'vue'
import GoblinAbilities from '../Abilities/GoblinAbilities.vue';
import DragonAbilities from '../Abilities/DragonAbilities.vue';
import RogueAbilities from '../Abilities/RogueAbilities.vue';
import MageAbilities from '../Abilities/MageAbilities.vue';
import WarriorAbilities from '../Abilities/WarriorAbilities.vue';
export default defineComponent({
  components: {
    RogueAbilities,
    MageAbilities,
    WarriorAbilities,
    GoblinAbilities,
    DragonAbilities
  },
  name : "ClassInfo",
  props: [
    'name',
    'img',
    'description',
    'abilityInfo',
    'showDice',
    'infoType',
    'show',
    'componentName'
  ],
  emits: [
    'toggled'
  ],
  data() {
    return { 
      showClass : false,
    }
  },

  methods: {
    toggleInfos() {
      this.showClass = !this.showClass;
      this.$emit('toggled', this.infoType, this.showClass);
    }
  },
  watch: {
    show(newP,oldP){
      if(oldP) {
        this.showClass = false;
      }
    }
  }
});
</script>

<style scoped>
* {
  color:white;
}

.classInfo {
  display: grid;
  grid-template-areas: 
                        "image"
                        "name"
                        "description"
                        "header"
                        "abilities";
  grid-template-columns: auto;
  grid-template-rows: auto;
  margin:0px;
  cursor: pointer;
  user-select: none;
  transition: transform ease-in-out 0.2s;
  justify-self: center;
  padding:10px;

}

.name {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, 
              rgba(0, 0, 0, 0.12) 0px -12px 30px, 
              rgba(0, 0, 0, 0.12) 0px 4px 6px,
              rgba(0, 0, 0, 0.17) 0px 12px 13px,
             rgba(0, 0, 0, 0.09) 0px -3px 5px;
  display:flex;
  align-items: center;
  padding:10px;
  grid-area: name;
  color:white;
  background-color:  #65375b;
  border-radius: 10px;
  border: solid black 2px;
  border-bottom: 2px solid black;
  justify-self:center;
}
.image {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, 
              rgba(0, 0, 0, 0.12) 0px -12px 30px, 
              rgba(0, 0, 0, 0.12) 0px 4px 6px,
              rgba(0, 0, 0, 0.17) 0px 12px 13px,
             rgba(0, 0, 0, 0.09) 0px -3px 5px;
  margin:10px;
  margin-bottom:20px;
  grid-area: image;
  height: 100px;
  background-color: white;
  border-radius: 10px;
  border: solid black 2px;
  justify-self:center;
}
.image:hover {
  transform: scale(1.3);
}

.Rogue {
  margin:0;
  padding: 0;
}
.Mage {
  margin:0;
  padding: 0;
}
.Warrior {
  margin:0;
  padding: 0;
}

.Monster {
  margin:0;
  padding:0;
}
.header {
  background-color: #65375b;
  border-radius:10px;
  height:20px;
  justify-self:center;
  color:white;
  padding:5px;
  margin-top:10px;
  grid-area: header;
  border-bottom: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, 
              rgba(0, 0, 0, 0.12) 0px -12px 30px, 
              rgba(0, 0, 0, 0.12) 0px 4px 6px,
              rgba(0, 0, 0, 0.17) 0px 12px 13px,
             rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
.description {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, 
              rgba(0, 0, 0, 0.12) 0px -12px 30px, 
              rgba(0, 0, 0, 0.12) 0px 4px 6px,
              rgba(0, 0, 0, 0.17) 0px 12px 13px,
             rgba(0, 0, 0, 0.09) 0px -3px 5px;
  background-color: #65375b;
  margin:5px;
  margin-bottom: 5px;
  border-bottom: 2px solid black;
  grid-area: description;
  border-radius:10px;
  padding:30px;
  justify-self:center;
  color:rgb(255, 255, 255);
}
</style>
