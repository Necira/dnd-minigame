<template>
  <div class="startScreen">
    <button class="StartButton" @click="$emit('startGame')">Player vs Player</button>
    <button class="monsterButton" @click="$emit('startMonster')">2 Players vs Monster</button>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name : "startScreen",
});
</script>
<style scoped>
.startScreen {
  display:grid;
  grid-area: '.'
              'startButton'
            'monsterButton';
  grid-template-columns: auto;
  grid-template-rows: auto;
  margin:auto;

}
.StartButton, .monsterButton {
  border: none;
  color: rgb(129, 175, 228);
  padding: 15px 32px;
  text-decoration: none;
  font-size: 50px;
  cursor: pointer;
  border-radius: 8px;
  background-color:rgba(212, 216, 223, 0.492);
}
.StartButton {
  grid-area: 'startButton';
}
.monsterButton {
  grid-area: 'monsterButton';
}
.StartButton:hover, .monsterButton:hover {
  background-color: rgb(255, 255, 255);
  transform: scale(1.1);
}

</style>