<script setup lang="ts">
import { toRefs, ref } from 'vue'
import type { IPlayer } from '@/Infertaces/IPlayer'

const props = defineProps({
  players: Array<IPlayer>,
  socketId: String
})

const { players } = toRefs(props)
const emit = defineEmits(['displayPlayer'])

const playerDisplayed = ref('')

const changeDisplayPlayer = (playerId: string) => {
  playerDisplayed.value = playerId
  emit('displayPlayer', playerId)
}
</script>

<template>
  <!--======== Players Selector =========-->
  <div class="players-selector players-selector--movil">
    <h3 class="player-cards__title">CULTIVOS</h3>
    <button
      class="layers-selector__button"
      v-for="player in players"
      :class="{ 'players-selector__button--selected': player.socketId === playerDisplayed }"
      :key="player.socketId"
      @click="changeDisplayPlayer(player.socketId)"
    >
      {{ player.name }}
    </button>
  </div>
</template>

<style>
.player-cards__title {
  display: none;
  @media (min-width: 768px) {
    display: block;
    font-weight: 700;
    margin-bottom: 15px;
    text-align: center;
  }
}
.players-selector--movil {
  display: none;
  @media (min-width: 768px) {
    display: block !important;
  }
}

.players-selector__button--selected {
  @media (min-width: 768px) {
    background-color: blue;
  }
}
</style>
