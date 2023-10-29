<script setup lang="ts">
import { type PropType, toRefs } from 'vue'
import { type ICard, EGroup } from '@/Infertaces/ICard'
import type { IPlayer } from '@/Infertaces/IPlayer'

const props = defineProps({
  isSelectionActiveChoosePlayer: Boolean,
  selectedExtresCardToPlay: Object as PropType<ICard>,
  players: Array<IPlayer>,
  playerId: String
})

const { selectedExtresCardToPlay, isSelectionActiveChoosePlayer } = toRefs(props)

function isExtresSettableOnPlayer(player: IPlayer): boolean {
  return !(player.crop.dictionary[EGroup.EXTRES] as Array<ICard>).some(
    (card: ICard) => card.type === selectedExtresCardToPlay?.value?.type
  )
}
</script>

<template>
  <div class="select-player-panel">
    <p class="select-player-panel__text">
      Selecicona al jugador al que le quieres mandar una carta de extress
    </p>
    <div v-for="playerInplayers in players!" :key="playerInplayers.name">
      <h3
        v-if="playerInplayers.socketId !== playerId"
        style="text-align: center"
        class="select-player-panel__player"
        :class="{
          'player-cards--selecting': isSelectionActiveChoosePlayer,
          'player-cards--disabled':
            isSelectionActiveChoosePlayer && !isExtresSettableOnPlayer(playerInplayers)
        }"
        @click="$emit('sendExtresCardToplay', playerInplayers)"
      >
        {{ playerInplayers.name }}
      </h3>
    </div>
    <button @click="$emit('cancel')">Cancelar</button>
  </div>
</template>

<style>
.select-player-panel {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 102;
  align-items: center;
  padding-top: 50px;
  gap: 15px;
}
.select-player-panel__player {
  font-size: 18px;
  padding: 5px 10px;
}
.select-player-panel__text {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
  font-weight: 700;
}
</style>
