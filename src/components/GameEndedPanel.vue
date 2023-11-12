<script setup lang="ts">
import { type ComputedRef, toRefs } from 'vue'
import type { PropType } from 'vue'
import type { ICard } from '@/Infertaces/ICard'
import type { ICrop } from '@/Infertaces/ICrop'
import { StateEnum, type IGame } from '@/Infertaces/IGame'

const props = defineProps({
  areYouWinner: Boolean
})
</script>

<template>
  <div class="gameEndedPanel" :class="{ 'gameEndedPanel--winner': areYouWinner }"></div>
</template>

<style>
.gameEndedPanel {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: url('@/assets/images/game_elements/Pantalla-has-perdido.png') center 32%;
  background-size: 730px auto;
}
.gameEndedPanel--winner {
  background: url('@/assets/images/game_elements/Pantalla-Ganador.png') center 32%;
}
</style>
