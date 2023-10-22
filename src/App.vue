<script setup lang="ts">
import GameView from '@/views/GameView.vue'
</script>

<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<style>
.cards-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}
.player-cards {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}
.card {
  width: 92px;
  text-align: center;
  height: 100%;
}
.player-cards--selecting {
  border: 3px dashed green;
}
.card.player-cards--selected {
  border: 3px solid green;
  margin-top: -10px;
}
.player-cards--disabled {
  pointer-events: none;
  opacity: 0.6;
  border: none;
}

.card img {
  width: 100%;
}
.easter-egg {
  width: 50px;
  height: 50px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;
}
</style>
