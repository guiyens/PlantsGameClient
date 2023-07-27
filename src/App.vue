<script setup lang="ts">
import { ref } from 'vue'
import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'
import { StateEnum } from '@/Infertaces/IGame'

//var socket = io('http://localhost:3000', { transports: ['websocket'] })
var socket = io('https://plantsgameserver.onrender.com', { transports: ['websocket'] })

const name = ref('')
const nameConnected = ref('')
const socketId = ref('')
const error = ref('')
const game: any = ref({})

function addUser() {
  socket.emit('addUser', name.value)
}

function nextTurn() {
  socket.emit('nextTurn', name.value)
}

socket.on('addedUser', function (name) {
  nameConnected.value = name
})

socket.on('socketCreated', function (id) {
  socketId.value = id
})

socket.on('alreadyAddedUser', function () {
  error.value = 'User name is not available, choose a new one'
})

socket.on('updateGame', function (newGame) {
  game.value = newGame
})

socket.on('closedGame', function () {
  error.value = 'No se permiten más jugadores'
})
</script>

<template>
  <div v-if="!nameConnected">
    Nombre: <input type="text" v-model="name" />
    <button @click="addUser">Enviar</button>
  </div>
  <main>
    <div v-if="game.state === StateEnum.WAITING">
      <h2 v-if="nameConnected">Esperando a más jugadores</h2>
      <div>Socket id: {{ socketId }}</div>
      <div>User name: {{ nameConnected }}</div>
    </div>
    <div v-if="game.state === StateEnum.STARTED">
      {{ nameConnected }} <strong v-if="game.userActive !== socketId">no</strong> es tu turno
      <button @click="nextTurn()">Pasar turno</button>
    </div>
  </main>
</template>

<style scoped></style>
