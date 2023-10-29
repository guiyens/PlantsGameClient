<script setup lang="ts">
import { type ComputedRef, toRefs } from 'vue'
import type { PropType } from 'vue'
import type { ICard } from '@/Infertaces/ICard'
import type { ICrop } from '@/Infertaces/ICrop'
import { StateEnum, type IGame } from '@/Infertaces/IGame'

const props = defineProps({
  gameEndedMessage: String
})
</script>

<template>
  <div
    class="gameEndedPanel"
    :class="{ 'gameEndedPanel--winner': gameEndedMessage?.includes('GANADO') }"
  >
    <p class="gameEndedPanel__icon">{{ gameEndedMessage?.includes('GANADO') ? '🏆' : '😞' }}</p>
    <p class="gameEndedPanel__text">{{ gameEndedMessage }}</p>
  </div>
</template>

<style>
.gameEndedPanel {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(224, 102, 102);
}
.gameEndedPanel--winner {
  background-color: rgb(128, 249, 128);
}
.gameEndedPanel__text {
  text-align: center;
  font-size: 26px;
  width: 70%;
  margin: 20px auto;
  color: #fff;
}

.gameEndedPanel__icon {
  text-align: center;
  font-size: 50px;
  width: 90%;
  margin: 100px auto 0;
}
</style>
