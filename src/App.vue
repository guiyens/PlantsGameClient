<script setup lang="ts">
import { ref } from 'vue'
import { io } from 'socket.io-client'
import { StateEnum, type IGame } from '@/Infertaces/IGame'

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

socket.on('addedUser', function (name: string) {
  nameConnected.value = name
})

socket.on('socketCreated', function (id: string) {
  socketId.value = id
})

socket.on('alreadyAddedUser', function () {
  error.value = 'User name is not available, choose a new one'
})

socket.on('updateGame', function (newGame: IGame) {
  game.value = newGame
})

socket.on('closedGame', function () {
  error.value = 'No se permiten más jugadores'
})
</script>

<template>
  <main>
    <div v-if="false">
      <p v-if="error">{{ error }}</p>
      <div v-if="!error">
        <div v-if="!nameConnected">
          Nombre: <input type="text" v-model="name" />
          <button @click="addUser">Enviar</button>
        </div>
        <h2 v-if="nameConnected && game.state === StateEnum.WAITING">Esperando a más jugadores</h2>
        <div v-if="nameConnected">
          <div>Socket id: {{ socketId }}</div>
          <div>User name: {{ nameConnected }}</div>
        </div>
        <div v-if="game.state === StateEnum.STARTED">
          {{ nameConnected }} <strong v-if="game.userActive !== socketId">no</strong> es tu turno
          <button v-if="game.userActive === socketId" @click="nextTurn()">Pasar turno</button>
        </div>
      </div>
      <div class="cards-container" v-if="game.cardDeck?.cards?.length">
        <div class="card" v-for="card in game.cardDeck.cards" :key="card.id">
          {{ card.type.replace('_', ' ') }}
        </div>
      </div>
    </div>
    <div v-if="true">
      <router-view></router-view>
    </div>
  </main>
</template>

<style scoped>
.cards-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}
.card {
  border: 1px solid #333;
  width: 150px;
  height: 200px;
  text-align: center;
  padding: 80px 10px 10px;
}
</style>
