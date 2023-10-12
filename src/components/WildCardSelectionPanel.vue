<script setup lang="ts">
import type { ICard } from '@/Infertaces/ICard'
import wilcardToCards from '@/config/wilcardToCards.json'
import { getImage } from '@/utils/getImage'
</script>

<template>
  <div class="wildcardSelection__panel">
    <h4>Selecciona la carta por la que quieres cambiar el comidín</h4>
    <div class="wildcardSelection__cards">
      <div class="wildcardSelection__card card" v-for="card in wilcardToCards.cards" :key="card.id">
        <img :src="getImage(card as ICard)" @click="$emit('sendWildCard', card)" />
      </div>
      <button @click="$emit('cancel')">Cancelar</button>
    </div>
  </div>
</template>

<style>
.wildcardSelection__panel {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #fff;
}
.wildcardSelection__cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
