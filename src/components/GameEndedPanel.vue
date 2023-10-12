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
  <div class="gameEndedPanel">
    <h2 class="gameEndedPanel__text">{{ gameEndedMessage }}</h2>
  </div>
</template>

<style>
.gameEndedPanel {
  width: 100vw;
  height: 100vh;
}
.gameEndedPanel__text {
  text-align: center;
  padding-top: 16%;
  font-size: 40px;
}
</style>
