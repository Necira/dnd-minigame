<template>
  <div class="classInfo">
    <img :src="img" class="image" @click="toggleInfos()" />

    <!-- Togglebarer Bereich, der Layout nicht verschiebt -->
    <div class="toggleContent" :class="{ visible: showClass }">
      <p class="name">{{ name }}</p>
      <p class="description">{{ description }}</p>
      <p class="header">abilities</p>
      <component :is="componentName" class="ability" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import GoblinAbilities from '../Abilities/GoblinAbilities.vue'
import DragonAbilities from '../Abilities/DragonAbilities.vue'
import RogueAbilities from '../Abilities/RogueAbilities.vue'
import MageAbilities from '../Abilities/MageAbilities.vue'
import WarriorAbilities from '../Abilities/WarriorAbilities.vue'
import PaladinAbilities from '../Abilities/PaladinAbilities.vue'

export default defineComponent({
  name: "ClassInfo",
  components: {
    RogueAbilities,
    MageAbilities,
    WarriorAbilities,
    GoblinAbilities,
    DragonAbilities,
    PaladinAbilities,
  },
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
  emits: ['toggled'],
  data() {
    return {
      showClass: false,
    }
  },
  methods: {
    toggleInfos() {
      this.showClass = !this.showClass
      this.$emit('toggled', this.infoType, this.showClass)
    }
  },
  watch: {
    show(newVal, oldVal) {
      if (oldVal) {
        this.showClass = false
      }
    }
  }
})
</script>

<style scoped>
* {
  color: white;
}

.classInfo {
  display: grid;
  grid-template-areas:
    "image"
    "toggleContent";
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  transition: transform ease-in-out 0.2s;
  justify-self: center;
  padding: 10px;

  overflow: hidden;
  position: relative;
}

.image {
  grid-area: image;
  margin: 10px 0 20px 0;
  height: 30rem;
  background-color: white;
  border-radius: 10px;
  border: solid black 2px;
  justify-self: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
              rgba(0, 0, 0, 0.12) 0px -12px 30px,
              rgba(0, 0, 0, 0.12) 0px 4px 6px,
              rgba(0, 0, 0, 0.17) 0px 12px 13px,
              rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
.image:hover {
  transform: scale(1.3);
}

.toggleContent {
  grid-area: toggleContent;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.5s ease, opacity 0.5s ease;
}

.toggleContent.visible {
  max-height: 1000px; /* groß genug für den Inhalt */
  opacity: 1;
}

.name,
.description,
.header {
  background-color: #65375b;
  border-radius: 10px;
  border: 2px solid black;
  margin: 10px auto;
  padding: 10px;
  width: 90%;
  font-size:2rem;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
              rgba(0, 0, 0, 0.12) 0px -12px 30px,
              rgba(0, 0, 0, 0.12) 0px 4px 6px,
              rgba(0, 0, 0, 0.17) 0px 12px 13px,
              rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.ability {
  margin-top: 10px;
  padding: 10px;
}
</style>
