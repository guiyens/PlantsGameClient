<script setup lang="ts">
import type { ICard } from '@/Infertaces/ICard'
import wilcardToCards from '@/config/wilcardToCards.json'
import { getImage } from '@/utils/getImage'
</script>

<template>
  <div class="wildcardSelection__panel">
    <div class="wildcardSelection__container">
      <p class="wildcardSelection__text">
        Selecciona la carta por la que quieres cambiar el comidín
      </p>
      <div class="wildcardSelection__cards">
        <div
          class="wildcardSelection__card card"
          v-for="card in wilcardToCards.cards"
          :key="card.id"
        >
          <img :src="getImage(card as ICard)" @click="$emit('sendWildCard', card)" />
        </div>
      </div>
      <button class="wildcardSelection__cancel" @click="$emit('cancel')">Cancelar</button>
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
  background-color: rgba(255, 255, 255, 0.7);
  align-items: center;
  gap: 15px;
  @media (min-width: 768px) {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
  }
}
.wildcardSelection__container {
  width: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.wildcardSelection__text {
  font-size: 20px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 25px;
  line-height: 22px;
  @media (min-width: 768px) {
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 50px;
  }
}
.wildcardSelection__cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.wildcardSelection__card {
  width: 64px !important;
  @media (min-width: 768px) {
    height: auto !important;
    width: auto !important;
  }
}
.wildcardSelection__card img {
  height: auto !important;
  width: 100% !important;
  @media (min-width: 768px) {
    height: 140px !important;
    width: auto !important;
  }
}
.wildcardSelection__cancel {
  margin: 30px auto 0;
  display: block;
}
</style>
