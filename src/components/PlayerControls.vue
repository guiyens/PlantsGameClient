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
  userActive: String,
  socketId: String
})
</script>

<template>
  <!--div>Socket id: {{ socketId }}</div-->
  <div class="actions" v-if="gameState === StateEnum.STARTED">
    <button
      v-if="
        !isSelectionActiveToDiscard &&
        !isSelectionActiveToPlay &&
        !isSelectionActiveChoosePlayer &&
        !isSelectionCardFromWildcard
      "
      @click="$emit('disscard')"
      :disabled="userActive !== socketId"
      class="action"
    >
      Descartar
    </button>
    <button
      v-if="
        !isSelectionActiveToDiscard &&
        !isSelectionActiveToPlay &&
        !isSelectionActiveChoosePlayer &&
        !isSelectionCardFromWildcard
      "
      @click="$emit('playCard')"
      :disabled="userActive !== socketId"
      class="action"
    >
      Jugar carta
    </button>
    <div v-if="userActive === socketId && isSelectionActiveToDiscard">
      <p>Selecciona las cartas que quieres descarter y confirma</p>
      <button class="action" @click="$emit('cancel')">Cancelar</button>
      <button
        :disabled="selectedCardsToDiscard!.length === 0"
        @click="$emit('sendDisscards')"
        class="action"
      >
        Confirmar
      </button>
    </div>
    <div v-if="userActive === socketId && isSelectionActiveToPlay">
      <button class="action" @click="$emit('cancel')">Cancelar</button>
      Selecciona la carta que quieres jugar
    </div>
    <div v-if="userActive === socketId && isSelectionActiveChoosePlayer">
      <button class="action" @click="$emit('cancel')">Cancelar</button>
      Selecciona un jugador para aplicarle la carta de estres
    </div>
  </div>
</template>

<style>
.username {
  text-align: center;
  text-transform: uppercase;
  font-size: 20px;
  margin-top: 10px;
}
.actions {
  display: flex;
  justify-content: center;
}
.action {
  flex-grow: 1;
  padding: 5px 10px;
  font-size: 15px;
}
</style>
