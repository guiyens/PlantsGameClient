<script setup lang="ts">
import type { PropType } from 'vue'
import type { ICard } from '@/Infertaces/ICard'
import { StateEnum } from '@/Infertaces/IGame'
import type { ICrop } from '@/Infertaces/ICrop'
import { getImage } from '@/utils/getImage'

const props = defineProps({
  playerCrop: Object as PropType<ICrop>,
  gameState: Object as PropType<StateEnum>
})
</script>

<template>
  <div class="crop" v-if="playerCrop && playerCrop.dictionary && gameState !== StateEnum.WAITING">
    <div class="crop__container">
      <div class="crop__root card">
        <img :src="getImage(playerCrop.dictionary['ROOT'] as ICard)" />
      </div>
    </div>
    <div class="crop__container">
      <div class="crop__leave card">
        <img :src="getImage(playerCrop.dictionary['LEAVE'] as ICard)" />
      </div>
    </div>
    <div class="crop__container">
      <div class="crop__stem card">
        <img :src="getImage(playerCrop.dictionary['STEM'] as ICard)" />
      </div>
    </div>
    <div class="crop__container crop__container--extres">
      <div
        class="crop__extres card"
        v-for="(card, index) in playerCrop.dictionary['EXTRES']"
        v-bind:key="index"
      >
        <img :src="getImage(card as ICard)" />
      </div>
    </div>
    <div class="crop__container crop__container--treatements">
      <div
        class="crop__treatements card"
        :class="{ 'card--bordered': !getImage(card as ICard) }"
        v-for="(card, index) in playerCrop.dictionary['TREATMENT']"
        v-bind:key="index"
      >
        <img :src="getImage(card as ICard)" />
      </div>
    </div>
    <div class="crop__container crop__container--inductingConditions">
      <div
        class="crop__inductingConditions card"
        :class="{
          'card--bordered': !getImage(card as ICard)
        }"
        v-for="(card, index) in playerCrop.dictionary['INDUCTING_CONDITION']"
        v-bind:key="index"
      >
        <img :src="getImage(card as ICard)" />
      </div>
    </div>
    <div class="crop__container crop__container--flower">
      <div
        class="crop__flower card"
        :class="{ 'card--bordered': !getImage(card as ICard) }"
        v-for="(card, index) in playerCrop.dictionary['FLOWER']"
        v-bind:key="index"
      >
        <img :src="getImage(card as ICard)" />
      </div>
    </div>
    <div class="crop__container crop__container--fruit">
      <div
        class="crop__fruit card"
        v-for="(card, index) in playerCrop.dictionary['FRUIT']"
        v-bind:key="index"
      >
        <div :class="{ 'card--bordered': !getImage(card as ICard) }">
          <img :src="getImage(card as ICard)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.crop {
  display: flex;
  margin-top: 20px;
  justify-content: center;
}
.crop__container {
  border: 1px solid #333;
  height: 110px;
  background-color: greenyellow;
}
.crop__container .card {
  width: 70px;
}
.crop__container--extres {
  width: 100px;
  background-color: pink;
}
.crop__container--treatements {
  width: 100px;
  background-color: yellow;
}
.crop__container--inductingConditions {
  width: 100px;
  background-color: blue;
}
.crop__container--flower {
  width: 100px;
  background-color: palevioletred;
}
.crop__container--fruit {
  width: 100px;
  background-color: red;
}
</style>
