<script setup lang="ts">
import type { ICard } from '@/Infertaces/ICard'
import wilcardToCards from '@/config/wilcardToCards.json'
import { getImage } from '@/utils/getImage'
</script>

<template>
  <div class="wildcardSelection__panel">
    <p class="wildcardSelection__text">Selecciona la carta por la que quieres cambiar el comidín</p>
    <div class="wildcardSelection__cards">
      <div class="wildcardSelection__card card" v-for="card in wilcardToCards.cards" :key="card.id">
        <img :src="getImage(card as ICard)" @click="$emit('sendWildCard', card)" />
      </div>
    </div>
    <button class="wildcardSelection__cancel" @click="$emit('cancel')">Cancelar</button>
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
  align-items: center;
  padding-top: 50px;
  gap: 15px;
}
.wildcardSelection__text {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 50px;
}
.wildcardSelection__cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.wildcardSelection__cancel {
  margin: 30px auto 0;
  display: block;
}
</style>
