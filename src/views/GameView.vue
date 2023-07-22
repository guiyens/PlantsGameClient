<template>
  <div class="game">
    <h1>This is a Game page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import io from "socket.io-client";

export default defineComponent({
  name: "GameView",
});

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected!");
  //socket.emit("dealDeck", socket.id);
});
</script>
