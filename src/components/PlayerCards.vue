<script setup lang="ts">
import { toRefs } from 'vue'
import type { PropType } from 'vue'
import type { ICard } from '@/Infertaces/ICard'
import type { ICrop } from '@/Infertaces/ICrop'
import { getImage } from '@/utils/getImage'

const props = defineProps({
  playerCards: Array<ICard>,
  isSelectionActiveToDiscard: Boolean,
  isSelectionActiveToPlay: Boolean,
  selectedCardsToDiscard: Array<ICard>,
  playerCrop: Object as PropType<ICrop>
})

const { playerCrop } = toRefs(props)

function isCardPlayable(card: ICard): boolean {
  if (card.group === 'INDUCTING_CONDITION' || card.group === 'TREATMENT') {
    if (!(playerCrop?.value?.dictionary[card.group] as Array<ICard>).length) {
      return true
    }
    return !(playerCrop?.value?.dictionary[card.group] as Array<ICard>)!.some(
      (cardInCrop: ICard) => card.type === cardInCrop.type
    )
  }
  if (card.group === 'VEGETETIVE_ORGAN') {
    if (!(playerCrop?.value?.dictionary[card.type] as ICard).type) {
      return true
    }
    return (playerCrop?.value?.dictionary[card.type] as ICard).type !== card.type
  }
  return true
}
</script>

<template>
  <div class="player-cards" v-if="playerCards && playerCards.length">
    <div
      class="card"
      v-for="(card, index) in playerCards"
      :class="{
        'player-cards--selecting': isSelectionActiveToDiscard || isSelectionActiveToPlay,
        'player-cards--selected': selectedCardsToDiscard!.some(
          (cardAdded) => card.id === cardAdded.id
        ),
        'player-cards--disabled': isSelectionActiveToPlay && !isCardPlayable(card)
      }"
      :key="index"
    >
      <img :src="getImage(card as ICard)" @click="$emit('selectCard', card)" />
    </div>
  </div>
</template>

<style></style>
