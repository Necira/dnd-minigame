<template>
  <h1 class="title"> {{ playerWin }} won </h1>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'EndScreen',
  props: [
    'playerWin'
],
  data() {
    return {

    }
  }
});
</script>
<style scoped>
  .title {
    display:flex;
    justify-content: center;
    background-color: rgb(161, 52, 52);
    border-radius: 3px;
    padding:50px;
    color:white;
    text-align: center;
    margin:auto;
    width:50px;
    height:50px;
    font-size:30px;
    
  }
</style>