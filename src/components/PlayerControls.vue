<script setup lang="ts">
import type { PropType } from 'vue'
import type { ICard } from '@/Infertaces/ICard'
import { StateEnum } from '@/Infertaces/IGame'

const props = defineProps({
  isSelectionActiveToDiscard: Boolean,
  isSelectionActiveToPlay: Boolean,
  isSelectionActiveChoosePlayer: Boolean,
  isSelectionCardFromWildcard: Boolean,
  selectedCardsToDiscard: Array<ICard>,
  gameState: Number,
  nameConnected: String,
  userActive: String,
  socketId: String
})
</script>

<template>
  <!--div>Socket id: {{ socketId }}</div-->
  <h1 style="text-align: center">{{ nameConnected }}</h1>
  <div v-if="gameState === StateEnum.STARTED">
    {{ nameConnected }} <strong v-if="userActive !== socketId">no</strong> es tu turno
    <button
      v-if="
        userActive === socketId &&
        !isSelectionActiveToDiscard &&
        !isSelectionActiveToPlay &&
        !isSelectionActiveChoosePlayer &&
        !isSelectionCardFromWildcard
      "
      @click="$emit('disscard')"
    >
      Descartar
    </button>
    <button
      v-if="
        userActive === socketId &&
        !isSelectionActiveToDiscard &&
        !isSelectionActiveToPlay &&
        !isSelectionActiveChoosePlayer &&
        !isSelectionCardFromWildcard
      "
      @click="$emit('playCard')"
    >
      Jugar carta
    </button>
    <div v-if="userActive === socketId && isSelectionActiveToDiscard">
      <p>Selecciona las cartas que quieres descarter y confirma</p>
      <button @click="$emit('cancel')">Cancelar</button>
      <button :disabled="selectedCardsToDiscard!.length === 0" @click="$emit('sendDisscards')">
        Confirmar
      </button>
    </div>
    <div v-if="userActive === socketId && isSelectionActiveToPlay">
      <button @click="$emit('cancel')">Cancelar</button>
      Selecciona la carta que quieres jugar
    </div>
    <div v-if="userActive === socketId && isSelectionActiveChoosePlayer">
      <button @click="$emit('cancel')">Cancelar</button>
      Selecciona un jugador para aplicarle la carta de estres
    </div>
  </div>
</template>

<style></style>
