<script setup lang="ts">
import { type PropType, toRefs } from 'vue'
import { type ICard, EGroup } from '@/Infertaces/ICard'
import { StateEnum } from '@/Infertaces/IGame'
import type { ICrop } from '@/Infertaces/ICrop'
import { getImage, getImageNocard } from '@/utils/getImage'
import { elements } from '@/config/elementsImagesNames'

const props = defineProps({
  playerCrop: Object as PropType<ICrop>,
  gameState: Object as PropType<StateEnum>
})

const { playerCrop } = toRefs(props)

function isElementActive(element: string, type: string) {
  if (!playerCrop?.value || element === 'INSECTICIDE2') {
    return false
  }
  if (type === EGroup.VEGETETIVE_ORGAN) {
    return !!(playerCrop.value.dictionary[element] as ICard).id
  }

  if (type === EGroup.EXTRES || type === EGroup.INDUCTING_CONDITION || type === EGroup.TREATMENT) {
    return (playerCrop.value.dictionary[type] as Array<ICard>).some((card) => card.type === element)
  }

  if (
    (type === EGroup.FRUIT && element === 'FRUIT') ||
    (type === EGroup.FLOWER && element === 'FLOWER')
  ) {
    return (playerCrop.value.dictionary[type] as Array<ICard>).length > 0
  }

  if (
    (type === EGroup.FRUIT && element === 'FRUIT2') ||
    (type === EGroup.FLOWER && element === 'FLOWER2')
  ) {
    return (playerCrop.value.dictionary[type] as Array<ICard>).length > 1
  }

  return false
}
</script>

<template>
  <div class="crop" v-if="playerCrop && playerCrop.dictionary && gameState !== StateEnum.WAITING">
    <div class="crop-elements">
      <img
        class="crop-element"
        v-for="element in Object.keys(elements)"
        :src="getImageNocard(elements[element].name)"
        :key="element"
        :class="{ 'crop-element--active': isElementActive(element, elements[element].type) }"
        alt=""
      />
    </div>
  </div>
  <!-- <div class="crop" v-if="playerCrop && playerCrop.dictionary && gameState !== StateEnum.WAITING">
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
  </div> -->
</template>

<style>
.crop {
  display: flex;
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
.crop-elements {
  position: relative;
  width: 360px;
  height: 467px;
  overflow: hidden;
  background: url('src/assets/images/game_elements/Fondo.png') center 32%;
}

.crop-element {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.3;
}

.crop-element--active {
  opacity: 1;
}
</style>
