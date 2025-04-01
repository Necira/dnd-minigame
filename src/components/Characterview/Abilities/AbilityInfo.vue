<template>
  <div @click="$emit('click')" 
        :class="['ability',{'clickable' : clickable},{'noclick' : clickable === false}]">
    <span class="name">{{ ability.name }}</span>
    <img class="image" 
        :src="ability.image">
    <p class="description">{{ ability.description }}</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AbilityInfo',
  emits: ['click'],
  props: [
    'ability',
  'clickable'
  ]
   

    
  
});
</script>

<style lang="scss" scoped>
.ability {
  display: grid;
  grid-template-areas:
    'image headline'
    'image description';
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  background-color: #65375b;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  border: solid black 1px;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, 
              rgba(0, 0, 0, 0.12) 0px -12px 30px, 
              rgba(0, 0, 0, 0.12) 0px 4px 6px,
              rgba(0, 0, 0, 0.17) 0px 12px 13px,
             rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
.clickable {
  transition: transform ease-in-out 0.2s;
  cursor: pointer;
  &:hover {
      background-color: #405a78;
      transform: translateX(15px);
    }
  &:active {
    background-color: gray;
  }
}

.name {
  margin-top: 0;
  grid-area: headline;
  justify-self: left;
  align-self: start;
  color: white;
  font-size: 26px;
  border-bottom: 2px solid white;
  width: 100%;
  text-align: left;
}

.image {
  grid-area: image;
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 10px;
  border: solid black 2px;
  margin: 0 5px 0 0;
}
.noclick{
  cursor:initial;
}
.description {
  grid-area: description;
  color: white;
  justify-self: left;
  align-self: start;
  text-align: left;
}
</style>