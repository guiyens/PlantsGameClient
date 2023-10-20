<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { StateEnum } from '@/Infertaces/IGame'
import { getImage } from '@/utils/getImage'
import type { ICard } from '@/Infertaces/ICard'
import type { IPlayer } from '@/Infertaces/IPlayer'

const props = defineProps({
  nameConnected: String,
  gameState: Object as PropType<StateEnum>,
  isUserValid: Boolean,
  errorNotValid: String,
  players: Array<IPlayer>
})

const name = ref('')
const code = ref('')
</script>

<template>
  <div v-if="!isUserValid">
    <h2 class="inital-panel__title">¡¡Bienvenido a Planta!!</h2>
    <p class="inital-panel__text">Código de validación</p>
    <p class="inital-panel__text inital-panel__text--red" v-if="errorNotValid !== ''">
      {{ errorNotValid }}
    </p>
    <div>
      <input class="inital-panel__input" autofocus type="text" v-model="code" />
    </div>
    <button class="inital-panel__button" @click="$emit('setCode', code)">Enviar</button>
  </div>
  <div v-if="isUserValid">
    <div class="inital-panel" v-if="!nameConnected">
      <h2 class="inital-panel__title inital-panel__title--green">¡¡Perfecto, ya puedes jugar!!</h2>
      <p class="inital-panel__text">¿Cual es tu nombre?</p>
      <div>
        <input class="inital-panel__input" autofocus type="text" v-model="name" />
      </div>
      <button class="inital-panel__button" @click="$emit('addUser', name)">Enviar</button>
    </div>
    <div v-if="nameConnected && gameState === StateEnum.WAITING">
      <img
        class="inital-panel__image"
        :src="getImage({ type: 'semilla', image: 'semilla.jpeg' } as ICard)"
        alt=""
      />
      <h2 class="inital-panel__title inital-panel__title--no-margin-top">
        ¡¡ Ya estas dentro {{ nameConnected }} !! Esperando a más jugadores ({{ players?.length }} /
        X)
      </h2>
      <button
        v-if="!!players && players.length > 1"
        class="inital-panel__start"
        @click="$emit('startGame')"
      >
        Comenzar ya
      </button>
    </div>
  </div>
</template>

<style>
.inital-panel__title {
  margin-top: 150px;
  text-align: center;
  font-size: 30px;
  margin-bottom: 50px;
}
.inital-panel__title--no-margin-top {
  margin-top: 0;
}
.inital-panel__title--green {
  color: rgb(54, 210, 124);
}
.inital-panel__text {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
}
.inital-panel__text--red {
  color: rgb(227, 103, 103);
  font-weight: 300;
}
.inital-panel__input {
  width: 300px;
  display: block;
  margin: 10px auto;
  font-size: 17px;
  border-radius: 5px;
  text-align: center;
  padding: 5px 0;
  border-color: #ddd;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.inital-panel__input:focus {
  outline: none;
}
.inital-panel__button {
  display: block;
  margin: 40px auto 0;
  font-size: 15px;
  width: 100px;
  padding: 5px 0;
}
.inital-panel__image {
  width: 300px;
  margin: 0 auto;
  display: block;
  margin-top: 20vh;
  animation: fadeIn 5s infinite;
}
.inital-panel__start {
  display: block;
  margin: 20px auto;
}

@keyframes fadeIn {
  0% {
    opacity: 1;
    width: 300px;
  }
  50% {
    opacity: 0.4;
    width: 290px;
  }
  100% {
    opacity: 1;
    width: 300px;
  }
}
</style>
