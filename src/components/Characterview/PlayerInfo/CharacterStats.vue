<template>
  <ol :class="['list', { 'isActive' : active}]">
    <img :src="icon" class="icon"> <img>
    <li class="player">{{player}}</li>
    <li class="hpHead">hp:</li>
    <li class="hp">
      <div class="progressBar">
        <div class="progressBarFill" :style="{ width: hpPercentage + '%' }"></div>
      </div>
      {{hp}} / {{ initialHp }}
    </li>
    <li class="initiativeHead">initiative:</li>
    <li class="initiative">{{ initiative }}</li>
    <li class="damageDealHead">damage dealt:</li>
    <li class="damageDeal">{{damageDeal}}</li>
    <li class="damageTakeHead">damage taken:</li>
    <li class="damageTake">{{damageTake}}</li>
    <li class="potionHead">potions:</li>
    <li class="potion">{{potions}}</li>
    <li class="statusEffectsHead">status effects :</li>
    <li class="statusEffectsFireBall" v-if="showEffects === false"> none </li>
    <li class="statusEffectsFireBall" v-if="statusEffects.fireBall">fireball status :</li>
    <li class="statusEffectsFireBall" v-if="statusEffects.fireBall">{{statusEffects.fireBall}}</li>
    <li class="statusEffectsDirt" v-if="statusEffects.dirt">dirt status :</li>
    <li class="statusEffectsDirt" v-if="statusEffects.dirt">{{statusEffects.dirt}}</li>
    <li class="statusEffectsMirrors" v-if="statusEffects.mirrors">mirror status :</li>
    <li class="statusEffectsMirrors" v-if="statusEffects.mirrors">{{statusEffects.mirrors}}</li>
    <li class="statusEffectsMirrors" v-if="statusEffects.mirrors"> remaining rounds {{statusEffectsCounter}}</li>
    <li class="statusEffectsShield" v-if="statusEffects.shield">shield status :</li>
    <li class="statusEffectsShield" v-if="statusEffects.shield">{{statusEffects.shield}}</li>
    <li class="statusEffectsShield" v-if="statusEffects.hide">is hiding: </li>
    <li class="statusEffectsShield" v-if="statusEffects.hide">{{statusEffects.hide}}</li>
    <li class="statusEffectsShield" v-if="statusEffects.outflank">is outflanking: </li>
    <li class="statusEffectsShield" v-if="statusEffects.outflank">{{statusEffects.outflank}}</li>
  </ol>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
name : "CharacterStats",
props: [
  'statusEffectsCounter',
  'icon',
  'initiative',
  'player',
  'initialHp',
  'hp',
  'damageDeal',
  'damageTake',
  'statusEffects',
  'potions',
  'color',
  'active'
],
computed: {
  showEffects() {
    for (let status in this.statusEffects) {
      if (this.statusEffects[status]) {
        return true
      } 
    }
    return false;
  },
  hpPercentage() {
    return (this.hp / this.initialHp) * 100;
  }
}
});
</script>

<style scoped>
.list {
  display: grid;
  grid-template-areas:  "icon"
                        "player"
                        "hpHead"
                        "hp"
                        "initiativeHead"
                        "initiative"
                        "damageDealHead"
                        "damageDeal"
                        "damageTakeHead"
                        "damageTake"
                        "potionHead"
                        "potion"
                        "statusEffectsHead"
                        "statusEffects";                                            
  grid-template-columns: auto;     
  grid-template-rows: auto ;           
  margin: 10px;
  padding: 30px;
  justify-self: center;
  background-color: #21497136;
  border-radius: 10px;
  color:white;
  width: 100px;
}
.icon {
  grid-area:icon;
  height:90px;
  border-radius: 10px;
  margin:10px;
  justify-self:center;
}
.player {
  grid-area: player;
  justify-self: center;
  padding:10px;
  border-bottom: 2px solid white;
  margin-bottom:20px;
}
.hp {
  border-bottom: 1px solid white;
  margin-bottom: 8px;
  grid-area: hp;
  padding:10px;
  display:flex;
  flex-direction: column;
  align-items: center;
}

.progressBar {
  background-color: #555;
  border-radius: 5px;
  width: 80px;
  height: 10px;
  margin-bottom: 5px;
  position: relative;
}

.progressBarFill {
  background-color: #59d659;
  height: 100%;
  border-radius: 5px;
}

.damageDeal{
  border-bottom: 1px solid white;
  margin-bottom: 8px;
  grid-area: damageDeal;
  justify-self: center;
  padding:10px;
}
.initiative {
  border-bottom: 1px solid white;
  margin-bottom: 8px;
  grid-area: initiative;
  justify-self: center;
  padding:10px;
}
.damageTake {
  border-bottom: 1px solid white;
  margin-bottom: 8px;
  grid-area: damageTake;
  justify-self: center;
  padding: 10px;
}

.statusEffects {
  border-bottom: 1px solid white;
  margin-bottom: 8px;
  grid-area: statusEffects;
  justify-self: center;
  padding:10px;
}

.hpHead {
  grid-area: hpHead;
  justify-self: center;
}

.damageDealHead{
  grid-area: damageDealHead;
  justify-self: center;
}
.initiativeHead {
  grid-area: initiativeHead;
  justify-self: center;
}

.damageTakeHead {
  grid-area: damageTakeHead;
  justify-self: center;
}

.statusEffectsHead {
grid-area: statusEffectsHead;
justify-self: center;
}
.potionHead {
padding: 5px;
grid-area: potionHead;
justify-self: center;
}
.potion {
border-bottom: 1px solid white;
grid-area: potion;
justify-self: center;
}
.isActive {
  background-color: #214971;
  border: 1px solid gold;
  color:gold;
}
</style>
