<script setup lang="ts">
import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { io } from 'socket.io-client'
import { StateEnum, type IGame } from '@/Infertaces/IGame'
import { EGroup, type ICard } from './Infertaces/ICard'
import type { IPlayer } from './Infertaces/IPlayer'
import type { ICrop } from './Infertaces/ICrop'
import wilcardToCards from './config/wilcardToCards.json'

//var socket = io('http://localhost:3000', { transports: ['websocket'] })
var socket = io('https://plantsgameserver.onrender.com', { transports: ['websocket'] })

const name = ref('')
const nameConnected = ref('')
const socketId = ref('')
const error = ref('')
const game: any = ref({})
const block = ref(true)
const clicks = ref(0)
const isSelectionActiveToDiscard = ref(false)
const selectedCardsToDiscard: Ref<Array<ICard>> = ref([])
const isSelectionActiveToPlay = ref(false)
const selectedExtresCardToPlay: Ref<ICard | undefined> = ref(undefined)
const isSelectionActiveChoosePlayer = ref(false)
const gameEnded = ref(false)
const gameEndedMessage = ref('')
const selectedWildcardToChange: Ref<ICard | undefined> = ref(undefined)
const isSelectionCardFromWildcard = ref(false)

const playerCards: ComputedRef<Array<ICard>> = computed(() => {
  const playerFound = game.value.players?.find(
    (player: IPlayer) => player.socketId === socketId.value
  )
  return playerFound?.cards
})

const playerCrop: ComputedRef<ICrop> = computed(() => {
  const playerFound = game.value.players?.find(
    (player: IPlayer) => player.socketId === socketId.value
  )
  return playerFound?.crop
})

function unBlock() {
  clicks.value++
  if (clicks.value >= 5) {
    block.value = false
  }
}

function getImage(card: ICard) {
  if (card) {
    const newUrl = new URL(`/src/assets/images/cards/${card.image}`, import.meta.url)
    const url = newUrl?.href
    return url
  }
}

function addUser() {
  socket.emit('addUser', name.value)
}

function nextTurn() {
  socket.emit('nextTurn', name.value)
}

function disscard() {
  isSelectionActiveToDiscard.value = true
}

function selectPlayer(player: IPlayer) {
  if (!isSelectionActiveChoosePlayer.value) {
    return
  }
  sendExtresCardToplay(player)
}

function selectCard(card: ICard) {
  if (isSelectionActiveToDiscard.value) {
    selectCardsToDiscard(card)
    return
  }
  if (isSelectionActiveToPlay.value) {
    if (card.group === EGroup.EXTRES) {
      selectedExtresCardToPlay.value = card
      isSelectionActiveChoosePlayer.value = true
      isSelectionActiveToPlay.value = false
      return
    }
    if (card.group === EGroup.WILDCARD) {
      selectedWildcardToChange.value = card
      isSelectionCardFromWildcard.value = true
      isSelectionActiveToPlay.value = false
      return
    }
    sendCardToplay(card)
    return
  }
}

function selectCardsToDiscard(card: ICard) {
  if (!isSelectionActiveToDiscard.value) {
    return
  }
  card.isSelected = !card.isSelected

  if (card.isSelected) {
    selectedCardsToDiscard.value.push(card)
  } else {
    selectedCardsToDiscard.value = selectedCardsToDiscard.value.filter(
      (cardToDiscard) => cardToDiscard.id !== card.id
    )
  }
}

function cancelDisscard() {
  selectedCardsToDiscard.value = []
  isSelectionActiveToDiscard.value = false
  isSelectionActiveToPlay.value = false
}

function sendDisscards() {
  socket.emit('dismiss', selectedCardsToDiscard.value)
  selectedCardsToDiscard.value = []
  isSelectionActiveToDiscard.value = false
}

function playCard() {
  isSelectionActiveToPlay.value = true
}

function sendCardToplay(card: ICard) {
  socket.emit('playCard', card)
  isSelectionActiveToPlay.value = false
}

function sendExtresCardToplay(player: IPlayer) {
  socket.emit('playExtressCard', {
    card: selectedExtresCardToPlay.value,
    playerId: player.socketId
  })
  isSelectionActiveChoosePlayer.value = false
  selectedExtresCardToPlay.value = undefined
}

function sendWildCard(card: ICard) {
  socket.emit('playWildcard', {
    newCard: card,
    wildcard: selectedWildcardToChange.value
  })
  isSelectionCardFromWildcard.value = false
  selectedWildcardToChange.value = undefined
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
  console.log('players', newGame.players.length)
  console.log('Game state', newGame.state)
  game.value = newGame
})

socket.on('closedGame', function () {
  error.value = 'No se permiten más jugadores'
})

socket.on('startedGame', function () {
  error.value = 'El juego ya ha comenzado'
})

socket.on('winnerGame', function (winnerSocketId: string) {
  gameEnded.value = true
  gameEndedMessage.value =
    socketId.value === winnerSocketId
      ? 'El juego ha terminado, HAS GANADO!!!!'
      : 'El juego ha terminado, has perdido. El ganador ha sido ' +
        game.value.players.find((player: IPlayer) => player.socketId === winnerSocketId).name
})
</script>

<template>
  <main>
    <div v-if="!block">
      <div v-if="!gameEnded">
        <p v-if="error">{{ error }}</p>
        <div v-if="!error">
          <div v-if="!nameConnected">
            Nombre: <input type="text" v-model="name" />
            <button @click="addUser">Enviar</button>
          </div>
          nameConnected: {{ nameConnected }} / state waiting: {{ game.state === StateEnum.WAITING }}
          <h2 v-if="nameConnected && game.state === StateEnum.WAITING">
            Esperando a más jugadores
          </h2>
        </div>
        <div v-if="nameConnected && game.state === StateEnum.STARTED">
          <div
            class="players-other"
            v-for="(player, index) in game.players.filter(
              (player: IPlayer) => player.socketId !== socketId
            )"
            :key="index"
          >
            <h1
              style="text-align: center"
              :class="{ 'player-cards--selecting': isSelectionActiveChoosePlayer }"
              @click="selectPlayer(player)"
            >
              {{ player.name }}
            </h1>
            <div class="crop" v-if="player?.crop && game.state !== StateEnum.WAITING">
              <div class="crop__container">
                <div class="crop__root card">
                  <img :src="getImage(player.crop.dictionary['ROOT'])" />
                </div>
              </div>
              <div class="crop__container">
                <div class="crop__leave card">
                  <img :src="getImage(player.crop.dictionary['LEAVE'])" />
                </div>
              </div>
              <div class="crop__container">
                <div class="crop__stem card">
                  <img :src="getImage(player.crop.dictionary['STEM'])" />
                </div>
              </div>
              <div class="crop__container crop__container--extres">
                <div
                  class="crop__extres card"
                  v-for="(card, index) in player.crop.dictionary['EXTRES']"
                  v-bind:key="index"
                >
                  <img :src="getImage(card as ICard)" />
                </div>
              </div>
              <div class="crop__container crop__container--treatements">
                <div
                  class="crop__treatements card"
                  :class="{ 'card--bordered': !getImage(card as ICard) }"
                  v-for="(card, index) in player.crop.dictionary['TREATMENT']"
                  v-bind:key="index"
                >
                  <img :src="getImage(card as ICard)" />
                </div>
              </div>
              <div class="crop__container crop__container--inductingConditions">
                <div
                  class="crop__inductingConditions card"
                  :class="{
                    'card--bordered': !getImage(card as ICard)
                  }"
                  v-for="(card, index) in player.crop.dictionary['INDUCTING_CONDITION']"
                  v-bind:key="index"
                >
                  <img :src="getImage(card as ICard)" />
                </div>
              </div>
              <div class="crop__container crop__container--flower">
                <div
                  class="crop__flower card"
                  v-for="(card, index) in player.crop.dictionary['FLOWER']"
                  v-bind:key="index"
                >
                  <img :src="getImage(card as ICard)" />
                </div>
              </div>
              <div class="crop__container crop__container--fruit">
                <div
                  class="crop__fruit card"
                  v-for="(card, index) in player.crop.dictionary['FRUIT']"
                  v-bind:key="index"
                >
                  <div :class="{ 'card--bordered': !getImage(card as ICard) }">
                    <img :src="getImage(card as ICard)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="player">
          <div v-if="nameConnected && game.state === StateEnum.STARTED">
            <!--div>Socket id: {{ socketId }}</div-->
            <h1 style="text-align: center">{{ nameConnected }}</h1>
            <div v-if="game.state === StateEnum.STARTED">
              {{ nameConnected }} <strong v-if="game.userActive !== socketId">no</strong> es tu
              turno
              <button
                v-if="
                  game.userActive === socketId &&
                  !isSelectionActiveToDiscard &&
                  !isSelectionActiveToPlay
                "
                @click="disscard"
              >
                Descartar
              </button>
              <button
                v-if="
                  game.userActive === socketId &&
                  !isSelectionActiveToDiscard &&
                  !isSelectionActiveToPlay
                "
                @click="playCard"
              >
                Jugar carta
              </button>
              <div v-if="game.userActive === socketId && isSelectionActiveToDiscard">
                <p>Selecciona las cartas que quieres descarter y confirma</p>
                <button @click="cancelDisscard">Cancelar</button>
                <button :disabled="selectedCardsToDiscard.length === 0" @click="sendDisscards">
                  Confirmar
                </button>
              </div>
              <div v-if="game.userActive === socketId && isSelectionActiveToPlay">
                <button @click="cancelDisscard">Cancelar</button>
                Selecciona la carta que quieres jugar
              </div>
            </div>
          </div>
          <div class="player-cards" v-if="playerCards && playerCards.length">
            <div
              class="card"
              v-for="(card, index) in playerCards"
              :class="{
                'player-cards--selecting': isSelectionActiveToDiscard || isSelectionActiveToPlay,
                'player-cards--selected': selectedCardsToDiscard.some(
                  (cardAdded) => card.id === cardAdded.id
                )
              }"
              :key="index"
            >
              <img :src="getImage(card as ICard)" @click="selectCard(card)" />
            </div>
          </div>
          <div
            class="crop"
            v-if="playerCrop && playerCrop.dictionary && game.state !== StateEnum.WAITING"
          >
            <div class="crop__container">
              <div class="crop__root card">
                <img :src="getImage(playerCrop.dictionary['ROOT'] as ICard)" />
              </div>
            </div>
            <div class="crop__container">
              <div class="crop__leave card">
                <img :src="getImage(playerCrop.dictionary['LEAVE'] as ICard)" />
              </div>
            </div>
            <div class="crop__container">
              <div class="crop__stem card">
                <img :src="getImage(playerCrop.dictionary['STEM'] as ICard)" />
              </div>
            </div>
            <div class="crop__container crop__container--extres">
              <div
                class="crop__extres card"
                v-for="(card, index) in playerCrop.dictionary['EXTRES']"
                v-bind:key="index"
              >
                <img :src="getImage(card as ICard)" />
              </div>
            </div>
            <div class="crop__container crop__container--treatements">
              <div
                class="crop__treatements card"
                :class="{ 'card--bordered': !getImage(card as ICard) }"
                v-for="(card, index) in playerCrop.dictionary['TREATMENT']"
                v-bind:key="index"
              >
                <img :src="getImage(card as ICard)" />
              </div>
            </div>
            <div class="crop__container crop__container--inductingConditions">
              <div
                class="crop__inductingConditions card"
                :class="{
                  'card--bordered': !getImage(card as ICard)
                }"
                v-for="(card, index) in playerCrop.dictionary['INDUCTING_CONDITION']"
                v-bind:key="index"
              >
                <img :src="getImage(card as ICard)" />
              </div>
            </div>
            <div class="crop__container crop__container--flower">
              <div
                class="crop__flower card"
                :class="{ 'card--bordered': !getImage(card as ICard) }"
                v-for="(card, index) in playerCrop.dictionary['FLOWER']"
                v-bind:key="index"
              >
                <img :src="getImage(card as ICard)" />
              </div>
            </div>
            <div class="crop__container crop__container--fruit">
              <div
                class="crop__fruit card"
                v-for="(card, index) in playerCrop.dictionary['FRUIT']"
                v-bind:key="index"
              >
                <div :class="{ 'card--bordered': !getImage(card as ICard) }">
                  <img :src="getImage(card as ICard)" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="wildcardSelection__panel" v-if="isSelectionCardFromWildcard">
          <h4>Selecciona la carta por la que quieres cambiar el comidín</h4>
          <div class="wildcardSelection__cards">
            <div
              class="wildcardSelection__card card"
              v-for="card in wilcardToCards.cards"
              :key="card.id"
            >
              <img :src="getImage(card as ICard)" @click="sendWildCard(card)" />
            </div>
          </div>
        </div>
      </div>
      <div class="gameEndedPanel" v-if="gameEnded">
        <h2 class="gameEndedPanel__text">{{ gameEndedMessage }}</h2>
      </div>
    </div>
    <div v-if="block">
      <div class="easter-egg" @click="unBlock"></div>
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
.crop {
  display: flex;
  margin-top: 20px;
  justify-content: center;
}
.crop__container {
  border: 1px solid #333;
  height: 110px;
  background-color: greenyellow;
}
.crop__container .card {
  width: 70px;
}
.crop__container--extres {
  width: 100px;
  background-color: pink;
}
.crop__container--treatements {
  width: 100px;
  background-color: yellow;
}
.crop__container--inductingConditions {
  width: 100px;
  background-color: blue;
}
.crop__container--flower {
  width: 100px;
  background-color: palevioletred;
}
.crop__container--fruit {
  width: 100px;
  background-color: red;
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
.players-other:nth-of-type(1) {
  transform: rotate(270deg) translateY(-50%);
  position: absolute;
  right: -220px;
  top: 39%;
}
.players-other:nth-of-type(2) {
  transform: rotate(180deg) translateX(-50%);
  position: absolute;
  top: 20px;
}
.players-other:nth-of-type(3) {
  transform: rotate(90deg) translateY(-50%);
  position: absolute;
  left: -220px;
  top: 39%;
}
.player {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}
.gameEndedPanel {
  width: 100vw;
  height: 100vh;
}
.gameEndedPanel__text {
  text-align: center;
  padding-top: 16%;
  font-size: 40px;
}

.wildcardSelection__panel {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #fff;
}
.wildcardSelection__cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
