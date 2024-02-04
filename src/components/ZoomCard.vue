<script setup lang="ts">
import type { PropType } from 'vue'
import type { ICard } from '@/Infertaces/ICard'
import { getImage } from '@/utils/getImage'

const props = defineProps({
  card: Object as PropType<ICard>
})
</script>

<template>
  <div class="specialCard__panel">
    <div class="specialCard__container">
      <img class="specialCard__image" :src="getImage(card as ICard)" />
      <button class="specialCard__button" @click="$emit('closeSpecialZoomCard')">Cerrar</button>
    </div>
  </div>
</template>

<style>
.specialCard__panel {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.9);
}
.specialCard__container {
  width: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.specialCard__title {
  font-size: 20px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 25px;
  line-height: 24px;
}
.specialCard__image {
  width: 70%;
  display: block;
  margin: 30px auto 0;
  @media (min-width: 768px) {
    width: 24%;
  }
}
.specialCard__button {
  display: block;
  margin: 20px auto 0;
}
</style>
