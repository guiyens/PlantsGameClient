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
    <h4 class="specialCard__title">Se ha encontrado una carta Especial</h4>
    <img class="specialCard__image" :src="getImage(SpecialCardFound as ICard)" />
    <p class="specialCard__text" v-if="SpecialCardFound?.type === 'CROP_ROTATION'">
      Todos los jugadores rotan su cultivo al adversario situado a su derecha. Todas las cartas
      salvo los frutos cosechados.
    </p>
    <p class="specialCard__text" v-if="SpecialCardFound?.type === 'DISASTER'">
      Se han eliminado las flores que todos los jugadores tenían en sus cultivos
    </p>
    <p class="specialCard__text" v-if="SpecialCardFound?.type === 'RELAXED_SEASON'">
      Todas las cartes destrés que los jugadores tenían en sus cultivos se han mandado al mazo de
      descartes
    </p>
    <button class="specialCard__button" @click="$emit('closeSpecialCardPanel')">Cerrar</button>
  </div>
</template>

<style>
.specialCard__panel {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #fff;
}
.specialCard__title {
  font-size: 30px;
  text-align: center;
  margin-top: 30px;
}
.specialCard__image {
  width: 200px;
  display: block;
  margin: 30px auto 0;
}
.specialCard__text {
  font-size: 15px;
  text-align: center;
  margin: 30px auto 0;
  width: 500px;
}
.specialCard__button {
  display: block;
  margin: 20px auto 0;
}
</style>
