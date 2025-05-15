<template>
  <div class="all">
    <div class="start" v-if="isPlayingPVP === false && isPlayingMonster === false">
      <div class="menu">
        <startScreen  
          @startGame="isPlayingPVP = true" 
          @startMonster="isPlayingMonster = true" 
          v-if="isPlayingPVP === false && isPlayingMonster === false"/>
      </div>
    </div>
    <ShowGame v-if="isPlayingPVP"/>
    <ShowMonsterGame v-if="isPlayingMonster"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import startScreen from './components/StartEnd/StartScreen.vue';
import ShowGame from './components/GameModes/ShowGame.vue';
import ShowMonsterGame from './components/GameModes/ShowMonsterGame.vue'
export default defineComponent ({
  name: 'App',
  components: {
    startScreen,
    ShowGame,
    ShowMonsterGame,
  },

  data() {
    return {
      isPlayingPVP: false,
      isPlayingMonster: false
    }
  },
});

</script>

<style>

.all {

  background: 
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),  /* Grauschleier */
    url("../public/assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.start {
  display:flex;
  align-items: center;
  justify-content: center;
  height:1000px;
}
.menu {
display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

</style>
