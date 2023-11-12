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
    <div class="action-desc--discard" v-if="userActive === socketId && isSelectionActiveToDiscard">
      <p class="action-text action-text--discard">
        Selecciona las cartas que quieres descarter y confirma
      </p>
      <div class="action-desc">
        <button class="action action--cancel" @click="$emit('cancel')">Cancelar</button>
        <button
          :disabled="selectedCardsToDiscard!.length === 0"
          @click="$emit('sendDisscards')"
          class="action"
        >
          Confirmar
        </button>
      </div>
    </div>
    <div class="action-desc" v-if="userActive === socketId && isSelectionActiveToPlay">
      <p class="action-text">Selecciona la carta que quieres jugar</p>
      <button class="action action--cancel" @click="$emit('cancel')">Cancelar</button>
    </div>
    <div class="action-desc" v-if="userActive === socketId && isSelectionActiveChoosePlayer">
      <p class="action-text">Selecciona un jugador para aplicarle la carta de estres</p>
      <button class="action action--cancel" @click="$emit('cancel')">Cancelar</button>
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
  position: fixed;
  bottom: 0;
  width: 100%;
}
.action {
  flex-grow: 1;
}
.action-text {
  color: white;
  font-weight: normal;
  padding: 0 0 5px 20px;
  line-height: 20px;
  width: 90%;
  text-align: center;
}
.action--cancel {
  background-color: rgb(224, 102, 102);
}
.action-desc {
  display: flex;
  padding-bottom: 5px;
}
.action-desc--discard {
  display: block;
}
.action-text--discard {
}
</style>
