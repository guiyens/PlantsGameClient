<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { StateEnum } from '@/Infertaces/IGame'

const props = defineProps({
  nameConnected: String,
  gameState: Object as PropType<StateEnum>
})

const name = ref('')
</script>

<template>
  <div v-if="!nameConnected">
    Nombre: <input type="text" v-model="name" />
    <button @click="$emit('addUser', name)">Enviar</button>
  </div>
  <h2 v-if="nameConnected && gameState === StateEnum.WAITING">Esperando a más jugadores</h2>
</template>

<style>
.gameEndedPanel {
  width: 100vw;
  height: 100vh;
}
.gameEndedPanel__text {
  text-align: center;
  padding-top: 16%;
  font-size: 40px;
}
</style>
