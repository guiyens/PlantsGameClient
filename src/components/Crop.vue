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
      <div class="flowers-count">
        {{(playerCrop.dictionary["FLOWER"] as Array<ICard>).length}} / 2
          <img
            class="flowers-count__image"
            :src="getImageNocard('Flor.png')"
          />
      </div>
      <div class="fruits-count">
        {{(playerCrop.dictionary["FRUIT"] as Array<ICard>).length}} / 2
          <img
            class="fruits-count__image"
            :src="getImageNocard('Fruto.png')"
          />
      </div>
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
</template>

<style>
.crop {
  display: flex;
  justify-content: center;
  background: url('/src/assets/images/game_elements/Fondo.png') center -160px;
  background-size: 900px;
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
  width: 100%;
  height: 467px;
  overflow: hidden;
  background: url('@/assets/images/game_elements/Fondo.png') cover;

  @media (min-width: 768px) {
    width: 385px;
  }
}

.crop-element {
  position: absolute;
  top: 0;
  left: 50%;
  opacity: 0.2;
  transform: translateX(-50%);
}

.crop-element--active {
  opacity: 1;
}

.flowers-count,
.fruits-count {
  position: absolute;
  z-index: 100;
  top: 0px;
  color: #595959;
  padding: 9px 17px;
  display: flex;
  gap: 5px;
  background: #fff;
  font-size: 17px;
  font-weight: 300;
}

/* .flowers-count__image,
.fruits-count__image{
  width: 18px;
} */

.flowers-count {
  left: 0px;
}

.fruits-count {
  right: 0px;
}
</style>
