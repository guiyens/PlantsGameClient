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
    <div class="select-player-panel__container">
      <p class="select-player-panel__text">
        Selecciona al jugador al que le quieres aplicar una carta de estrés
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
      <button class="select-player-panel__cancel" @click="$emit('cancel')">Cancelar</button>
    </div>
  </div>
</template>

<style>
.select-player-panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 102;
  align-items: center;
  padding-top: 50px;
  gap: 15px;
}
.select-player-panel__container {
  width: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media (min-width: 768px) {
    background-color: rgba(255, 255, 255, 1);
    padding: 50px 30px;
  }
}
.select-player-panel__player {
  font-size: 18px;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 5px;
  @media (min-width: 768px) {
    width: 50%;
    margin: 0 auto;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
  }
}
.select-player-panel__text {
  font-size: 20px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 55px;
  line-height: 24px;
  @media (min-width: 768px) {
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 50px;
    line-height: 30px;
    width: 400px;
    margin: 0 auto 55px;
  }
}
.select-player-panel__cancel {
  margin: 50px auto;
  display: block;
}
</style>
