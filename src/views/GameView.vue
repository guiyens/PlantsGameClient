<script setup lang="ts">
import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { io } from 'socket.io-client'
import { StateEnum, type IGame } from '@/Infertaces/IGame'
import { EGroup, type ICard } from '@/Infertaces/ICard'
import type { IPlayer } from '@/Infertaces/IPlayer'
import type { ICrop } from '@/Infertaces/ICrop'
import type { ILog } from '@/Infertaces/ILog'
import Crop from '@/components/Crop.vue'
import PlayerCards from '@/components/PlayerCards.vue'
import WildCardSelectionPanel from '@/components/WildCardSelectionPanel.vue'
import SpecialCardPanel from '@/components/SpecialCardPanel.vue'
import Notifications from '@/components/Notifications.vue'
import GameEndedPanel from '@/components/GameEndedPanel.vue'
import PlayerControls from '@/components/PlayerControls.vue'
import InitialPanel from '@/components/InitialPanel.vue'
import BugPlayerSelection from '@/components/BugPlayerSelection.vue'
import PlayerLog from '@/components/PlayerLog.vue'
const url = import.meta.env.DEV ? 'http://localhost:3000' : 'https://plantsgameserver.onrender.com'

var socket = io(url, { transports: ['websocket'] })

const isUserValid = ref(import.meta.env.DEV)
const nameConnected = ref('')
const socketId = ref('')
const error = ref('')
const game: any = ref({})
const isSelectionActiveToDiscard = ref(false)
const isFirstUpdate = ref(true)
const selectedCardsToDiscard: Ref<Array<ICard>> = ref([])
const isSelectionActiveToPlay = ref(false)
const selectedExtresCardToPlay: Ref<ICard | undefined> = ref(undefined)
const isSelectionActiveChoosePlayer = ref(false)
const gameEnded = ref(false)
const areYouWinner = ref(false)
const selectedWildcardToChange: Ref<ICard | undefined> = ref(undefined)
const isSelectionCardFromWildcard = ref(false)
const isSpecialCardFound = ref(false)
const SpecialCardFound: Ref<ICard | undefined> = ref(undefined)
const errorNotValid = ref('')
const isServerConnected = ref(false)
const userDisplayed = ref('')
const lastActions: Ref<Array<string>> = ref([])

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

function addUser(name: string) {
  if (name === '') {
    return
  }
  if (name.length > 15) {
    alert('El nombre no puede tener mas de 15 letras')
    return
  }
  socket.emit('addUser', name)
}

function disscard() {
  isSelectionActiveToDiscard.value = true
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

function cancel() {
  selectedCardsToDiscard.value = []
  isSelectionActiveToDiscard.value = false
  isSelectionActiveToPlay.value = false
  isSelectionActiveChoosePlayer.value = false
  isSelectionCardFromWildcard.value = false
  selectedExtresCardToPlay.value = undefined
  selectedWildcardToChange.value = undefined
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

function closeSpecialCardPanel() {
  isSpecialCardFound.value = false
  SpecialCardFound.value = undefined
}

function setCode(code: string) {
  isUserValid.value = code === 'Pl4nt4'
  if (!(code === 'Pl4nt4')) {
    errorNotValid.value = '¡El codigo no es valido!'
  }
}

function startGameNow() {
  socket.emit('startGame')
}

function displayPlayer(playerId: string): void {
  userDisplayed.value = playerId
}

function buildStringAction(log: ILog): string {
  if (log.action === 'DISMISS') {
    return `<strong>${log.player.name}</strong> se ha descartado`
  }
  if (log.action === 'DISCONNECT') {
    return `<strong>${log.player.name}</strong> se ha desconectado`
  }
  if (log.action === EGroup.EXTRES) {
    return `<strong>${log.player.name}</strong> ha lanzado una carta de <strong>${getActionText(
      log.action
    )}</strong> a <strong>${log.playerAffectted?.name}</strong>`
  }
  return `<strong>${log.player.name}</strong> ha jugado una carta de <strong>${getActionText(
    log.action as EGroup
  )}</strong>`
}

function closeNotifications() {
  lastActions.value = []
}

function getActionText(action: EGroup): string {
  if (action === EGroup.EXTRES) {
    return 'Estrés'
  }
  if (action === EGroup.VEGETETIVE_ORGAN) {
    return 'Organo'
  }
  if (action === EGroup.INDUCTING_CONDITION) {
    return 'Condiciones inductoras'
  }
  if (action === EGroup.TREATMENT) {
    return 'Tratamiento'
  }
  if (action === EGroup.WILDCARD) {
    return 'Comodín'
  }
  return ''
}

socket.on('connect', function () {
  isServerConnected.value = true
  isUserValid.value = import.meta.env.DEV
  game.value = {}
})

socket.on('disconnect', function (reason) {
  console.log(reason)
  isServerConnected.value = false
  game.value = {}
})

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
  if (game.value.activityLog.length) {
    const lastLog = game.value.activityLog[game.value.activityLog.length - 1]
    if (lastLog.player.socketId !== socketId.value) {
      lastActions.value.push(buildStringAction(lastLog))
    }

    setTimeout(function () {
      lastActions.value.push(
        newGame.userActive !== socketId.value
          ? `Es el <strong>turno</strong> de <strong>${game.value.players?.find(
              (player: IPlayer) => player.socketId === newGame.userActive
            ).name}</strong>`
          : 'Es <strong>tu turno</strong>'
      )
    }, 500)

    setTimeout(function () {
      lastActions.value = []
    }, 4000)
  }

  if (isFirstUpdate.value && !!newGame.userActive) {
    userDisplayed.value = game.value.players?.find(
      (player: IPlayer) => player.socketId === socketId.value
    ).socketId
    isFirstUpdate.value = false
  }
})

socket.on('closedGame', function () {
  error.value = 'No se permiten más jugadores'
})

socket.on('startedGame', function () {
  error.value = 'El juego ya ha comenzado'
})

socket.on('SpecialCardFound', function (specialCardInfo: { newGame: IGame; specialCard: ICard }) {
  isSpecialCardFound.value = true
  SpecialCardFound.value = specialCardInfo.specialCard
  game.value = specialCardInfo.newGame
})

socket.on('winnerGame', function (winnerSocketId: string) {
  gameEnded.value = true
  areYouWinner.value = socketId.value === winnerSocketId
})

socket.on('error', (err) => {
  isServerConnected.value = false
})
socket.on('reconnect', (attempt) => {
  isServerConnected.value = true
})
</script>

<template>
  <main class="main-container">
    <div class="server-flag" :class="{ 'server-flag--connected': isServerConnected }"></div>
    <div v-if="!gameEnded">
      <!-- Error =========-->
      <p class="error-container" v-if="error">
        <span class="error-icon">🚫</span>
        <span class="error-text"> {{ error }}</span>
      </p>
      <!-- Initial Panel =========-->
      <InitialPanel
        v-if="!error && (game.state === StateEnum.WAITING || !game.state)"
        :nameConnected="nameConnected"
        :gameState="game.state"
        :isUserValid="isUserValid"
        :errorNotValid="errorNotValid"
        :players="game.players"
        :maxPlayers="game.maxPlayers"
        @addUser="addUser"
        @setCode="setCode"
        @startGame="startGameNow"
      ></InitialPanel>
      <!--======== Players Selector =========-->
      <div class="players-selector" v-if="nameConnected && game.state !== StateEnum.WAITING">
        <div
          class="player-selector"
          @click="displayPlayer(player.socketId)"
          v-for="player in game.players"
          :key="player.socketId"
          :class="{
            'player-selector--active': player.socketId === userDisplayed,
            'player-selector--player': player.socketId === socketId,
            'player-selector--turn': player.socketId === game.userActive
          }"
        >
          {{ player.socketId === socketId ? 'Yo' : player.name }}
        </div>
      </div>
      <!--======== Players-other =========-->
      <div v-if="nameConnected && game.state === StateEnum.STARTED">
        <div
          class="players-other"
          v-for="(player, index) in game.players.filter(
            (player: IPlayer) => player.socketId !== socketId && player.socketId === userDisplayed
          )"
          :key="index"
        >
          <Crop
            v-if="player?.crop && game.state !== StateEnum.WAITING"
            :playerCrop="player.crop"
            :gameState="game.state"
          ></Crop>
          <PlayerLog
            :logs="
              game.activityLog?.filter(
                (element: ILog) => element.player.socketId === player.socketId
              )
            "
            :playerName="player.name"
          ></PlayerLog>
        </div>
      </div>
      <!--========Player =========-->
      <div class="player" v-if="socketId === userDisplayed">
        <Crop :playerCrop="playerCrop" :gameState="game.state"></Crop>
        <PlayerCards
          :playerCards="playerCards"
          :isSelectionActiveToDiscard="isSelectionActiveToDiscard"
          :isSelectionActiveToPlay="isSelectionActiveToPlay"
          :selectedCardsToDiscard="selectedCardsToDiscard"
          :playerCrop="playerCrop"
          @selectCard="selectCard"
        ></PlayerCards>
        <PlayerControls
          v-if="nameConnected && game.state === StateEnum.STARTED"
          :isSelectionActiveToDiscard="isSelectionActiveToDiscard"
          :isSelectionActiveToPlay="isSelectionActiveToPlay"
          :isSelectionActiveChoosePlayer="isSelectionActiveChoosePlayer"
          :isSelectionCardFromWildcard="isSelectionCardFromWildcard"
          :selectedCardsToDiscard="selectedCardsToDiscard"
          :gameState="game.state"
          :userActive="game.userActive"
          :socketId="socketId"
          @disscard="disscard"
          @playCard="playCard"
          @cancel="cancel"
          @sendDisscards="sendDisscards"
        ></PlayerControls>
      </div>
      <!--======== wildcard Selection panel =========-->
      <WildCardSelectionPanel
        v-if="isSelectionCardFromWildcard"
        :isSelectionCardFromWildcard="isSelectionCardFromWildcard"
        @sendWildCard="sendWildCard"
        @cancel="cancel"
      ></WildCardSelectionPanel>
      <!--======== special Card panel =========-->
      <SpecialCardPanel
        v-if="isSpecialCardFound"
        :SpecialCardFound="SpecialCardFound"
        @closeSpecialCardPanel="closeSpecialCardPanel"
      ></SpecialCardPanel>
    </div>
    <!--======== game Ended Panel =========-->
    <GameEndedPanel v-if="gameEnded" :areYouWinner="areYouWinner"></GameEndedPanel>
    <!--======== selection Player Panel =========-->
    <BugPlayerSelection
      v-if="isSelectionActiveChoosePlayer"
      :isSelectionActiveChoosePlayer="isSelectionActiveChoosePlayer"
      :selectedExtresCardToPlay="selectedExtresCardToPlay"
      :players="game.players"
      :playerId="socketId"
      @sendExtresCardToplay="sendExtresCardToplay"
      @cancel="cancel"
    ></BugPlayerSelection>
    <Notifications
      v-if="lastActions.length"
      @closeNotifications="closeNotifications"
      :lastActions="lastActions"
    ></Notifications>
  </main>
</template>

<style>
.main-container {
  width: 360px;
  margin: 0 auto;
  background-color: #67360b;
  @media (max-width: 768px) {
    width: 100%;
  }
}
.cards-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}
.player-cards {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.card {
  width: 80px;
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
.player {
}
.server-flag {
  position: fixed;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
  top: 50px;
  right: 50px;
}
.server-flag--connected {
  background-color: green;
}
.players-selector {
  display: flex;
  background-color: #fff;
}
.player-selector {
  color: #444;
  padding: 2px 6px;
  cursor: pointer;
  flex-grow: 1;
  text-align: center;
  background-color: #fff;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex-wrap: nowrap;
  font-size: 16px;
  text-transform: capitalize;
}
.player-selector--active {
  background-color: #67360b;
  color: #fff;
  font-weight: 700;
  text-overflow: inherit;
  overflow: inherit;
  max-width: 120px;
}
.player-selector--player {
  max-width: 70px;
}
.player-selector--turn {
  -webkit-animation: target-fade 1.5s infinite alternate;
  -moz-animation: target-fade 1.5s infinite alternate;
}
.player-selector--turn.player-selector--active {
  -webkit-animation: target-fade-active 2s infinite alternate;
  -moz-animation: target-fade-active 2s infinite alternate;
}

@-webkit-keyframes target-fade {
  0% {
    background-color: rgba(45, 245, 82, 0.8);
  }
  100% {
    background-color: rgba(253, 253, 253, 0);
  }
}
@-moz-keyframes target-fade {
  0% {
    background-color: rgba(45, 245, 82, 0.8);
  }
  100% {
    background-color: rgba(253, 253, 253, 0);
  }
}

@-webkit-keyframes target-fade-active {
  0% {
    background-color: rgb(103, 54, 11, 1);
  }
  100% {
    background-color: rgb(103, 54, 11, 0.5);
  }
}
@-moz-keyframes target-fade-active {
  0% {
    background-color: rgb(103, 54, 11, 1);
  }
  100% {
    background-color: rgb(103, 54, 11, 0.5);
  }
}

.error-container {
  background-color: rgb(224, 102, 102);
  text-align: center;
  font-size: 26px;
  padding: 0 50px;
  color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.error-icon {
  margin-top: 100px;
  font-size: 80px;
}

button {
  background: rgb(29, 155, 86);
  border: none;
  font-size: 17px !important;
  padding: 8px 15px !important;
  color: white;
}
button:disabled {
  opacity: 0.5;
}
</style>
