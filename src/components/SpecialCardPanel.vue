<script setup lang="ts">
import type { PropType } from 'vue'
import type { ICard } from '@/Infertaces/ICard'
import { getImage } from '@/utils/getImage'

const props = defineProps({
  SpecialCardFound: Object as PropType<ICard>
})
</script>

<template>
  <div class="specialCard__panel">
    <div class="specialCard__container">
      <h4 class="specialCard__title">Se ha encontrado una carta Especial</h4>
      <img
        class="specialCard__image specialCard__image--special"
        :src="getImage(SpecialCardFound as ICard)"
      />
      <p class="specialCard__text" v-if="SpecialCardFound?.type === 'CROP_ROTATION'">
        Todos los jugadores rotan su cultivo al adversario situado a su derecha. Todas las cartas
        salvo los frutos cosechados.
      </p>
      <p class="specialCard__text" v-if="SpecialCardFound?.type === 'DISASTER'">
        Se han eliminado las flores que todos los jugadores tenían en sus cultivos
      </p>
      <p class="specialCard__text" v-if="SpecialCardFound?.type === 'RELAXED_SEASON'">
        Todas las cartas de estrés que los jugadores tenían en sus cultivos se han mandado al mazo
        de descartes
      </p>
      <button class="specialCard__button" @click="$emit('closeSpecialCardPanel')">Cerrar</button>
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
  background-color: rgba(255, 255, 255, 0.8);

  @media (min-width: 768px) {
    background-color: rgba(255, 255, 255, 1) !important;
  }
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
  @media (min-width: 768px) {
    font-size: 28px !important;
    font-weight: 500 !important;
    margin-bottom: 35px !important;
  }
}
.specialCard__image--special {
  width: 150px;
  display: block;
  margin: 30px auto 0;
  @media (min-width: 768px) {
    width: 35% !important;
  }
}
.specialCard__text {
  font-size: 17px;
  text-align: center;
  margin: 30px auto 0;
  line-height: 22px;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  @media (min-width: 768px) {
    width: 400px;
  }
}
.specialCard__button {
  display: block;
  margin: 20px auto 0;
}
</style>
