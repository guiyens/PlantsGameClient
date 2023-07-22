<script setup lang="ts">
import { ref } from 'vue'
import io from 'socket.io-client'

const user = ref('')

//const socket = io('http://localhost:3000')
const socket = io('https://plantsgameserver.onrender.com')

socket.on('userConencted', (msg) => {
  debugger
  user.value = msg
  //socket.emit("dealDeck", socket.id);
})
</script>

<template>
  <main>
    <h1>User: {{ user }}</h1>
  </main>
</template>
