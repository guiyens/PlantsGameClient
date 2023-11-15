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
  players: Array<IPlayer>,
  maxPlayers: Number
})

const name = ref('')
const code = ref('')
</script>

<template>
  <div class="inital-panel-container" v-if="!isUserValid">
    <div class="inital-panel">
      <h2 class="inital-panel__title">¡Bienvenido a Planta!</h2>
      <p class="inital-panel__text"><strong>Código de validación</strong></p>
      <p class="inital-panel__text inital-panel__text--red" v-if="errorNotValid !== ''">
        {{ errorNotValid }}
      </p>
      <div>
        <input class="inital-panel__input" type="password" autofocus v-model="code" />
      </div>
      <button class="inital-panel__button" @click="$emit('setCode', code)">Enviar</button>
    </div>
  </div>
  <div
    class="inital-panel-container"
    v-if="isUserValid && gameState !== StateEnum.STARTED && gameState !== StateEnum.FINISHED"
  >
    <div class="inital-panel" v-if="!nameConnected">
      <h2 class="inital-panel__title inital-panel__title--green inital-panel__title--border">
        <strong>¡Perfecto!</strong> <br />
        Ya puedes jugar
      </h2>
      <p class="inital-panel__text"><strong>¿Cuál es tu nombre?</strong></p>
      <div>
        <input class="inital-panel__input" autofocus type="text" v-model="name" />
      </div>
      <button class="inital-panel__button" @click="$emit('addUser', name)">Enviar</button>
    </div>
    <div class="inital-panel" v-if="nameConnected && gameState === StateEnum.WAITING">
      <p class="inital-panel__alert">
        A partir de aquí <strong>si cambias la url</strong> o
        <strong>actualizas la página</strong> saldrás de la partida y
        <strong>no podrás volver a entrar</strong>
      </p>
      <img
        class="inital-panel__image"
        :src="getImage({ type: 'semilla', image: 'semilla.png' } as ICard)"
        alt=""
      />
      <div class="inital-panel__title inital-panel__title--no-margin-top">
        <p class="inital-panel__text inital-panel__text--24 inital-panel__title--green">
          <strong
            >¡ Ya estas dentro <br />
            {{ nameConnected }} !</strong
          >
        </p>
        <p class="inital-panel__text">Esperando a más jugadores</p>
        <p class="inital-panel__text--24">({{ players?.length }} / {{ maxPlayers }})</p>
      </div>
      <button
        v-if="!!players && players.length > 1"
        class="inital-panel__start"
        @click="$emit('startGame')"
      >
        Comenzar
      </button>
    </div>
  </div>
</template>

<style>
.inital-panel-container {
  background: url('@/assets/images/game_elements/fondo-inicio.png') center center;
  height: 100%;
  background-size: auto 100%;
  position: absolute;
  width: 100%;
}
.inital-panel {
  padding: 50px 20px;
  width: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
}
.inital-panel__title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 25px;
}
.inital-panel__title--no-margin-top {
  margin: 0;
}
.inital-panel__title--green {
  color: rgb(29, 155, 86);
}

.inital-panel__title--border {
  border-bottom: 1px dotted rgb(29, 155, 86);
  padding-bottom: 25px;
}

.inital-panel__text {
  text-align: center;
  font-size: 18px;
}
.inital-panel__text--24 {
  font-size: 24px;
}
.inital-panel__text--red {
  color: rgb(227, 103, 103);
  font-weight: 300;
}
.inital-panel__input {
  width: 100%;
  margin: 10px auto;
  font-size: 17px;
  text-align: center;
  display: block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
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
  width: 190px;
  margin: 0 auto;
  display: block;
  margin-top: 20px;
  animation: fadeIn 5s infinite;
}
.inital-panel__start {
  display: block;
  margin: 20px auto;
}

.inital-panel__alert {
  padding: 10px;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  color: #b91919;
  font-size: 13px;
  border-radius: 5px;
  border: 1px solid;
  line-height: 17px;
}

@keyframes fadeIn {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
</style>
