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
    <button
      class="action action--cancel"
      v-if="userActive === socketId && isSelectionActiveToPlay"
      @click="$emit('cancel')"
    >
      Cancelar
    </button>
    <div class="action-desc" v-if="userActive === socketId && isSelectionActiveChoosePlayer">
      <p class="action-text">Selecciona un jugador para aplicarle la carta de estres</p>
      <button class="action action--cancel m-b-5" @click="$emit('cancel')">Cancelar</button>
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
  width: 100%;
  background: rgba(255, 255, 255, 0.8);

  @media (min-width: 768px) {
    order: 2;
    margin-top: 15px;
    background-color: transparent;
    gap: 10px;
  }
}
.action {
  flex-grow: 1;
}
.action-text {
  color: rgb(51, 51, 51);
  font-weight: normal;
  padding: 5px 10px 5px 20px;
  line-height: 20px;
  width: 90%;
  text-align: center;
  font-size: 12px;
  @media (min-width: 768px) {
    font-size: 15px;
  }
}
button.action--cancel {
  background-color: rgb(224, 102, 102);
  font-size: 15px;
}
.action-desc {
  display: flex;

  @media (min-width: 768px) {
    gap: 10px;
  }
}
.action-desc--discard {
  display: block;
  width: 100%;
}
.action-text--discard {
  position: absolute;
  top: -190px;
  background-color: #67360b;
  width: 100%;
}
</style>
