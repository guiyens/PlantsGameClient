<script setup lang="ts">
import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { io } from 'socket.io-client'
import { StateEnum, type IGame } from '@/Infertaces/IGame'
import { EGroup, type ICard } from '@/Infertaces/ICard'
import type { IPlayer } from '@/Infertaces/IPlayer'
import type { ICrop } from '@/Infertaces/ICrop'
import Crop from '@/components/Crop.vue'
import PlayerCards from '@/components/PlayerCards.vue'
import WildCardSelectionPanel from '@/components/WildCardSelectionPanel.vue'
import SpecialCardPanel from '@/components/SpecialCardPanel.vue'
import GameEndedPanel from '@/components/GameEndedPanel.vue'
import PlayerControls from '@/components/PlayerControls.vue'
import InitialPanel from '@/components/InitialPanel.vue'
const url = 'https://plantsgameserver.onrender.com'
//const url = 'http://localhost:3000'

var socket = io(url, { transports: ['websocket'] })

const nameConnected = ref('')
const socketId = ref('')
const error = ref('')
const game: any = ref({})
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
const isSpecialCardFound = ref(false)
const SpecialCardFound: Ref<ICard | undefined> = ref(undefined)
const isUserValid = ref(false)
const errorNotValid = ref('')

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

function isExtresSettableOnPlayer(player: IPlayer): boolean {
  return !(player.crop.dictionary[EGroup.EXTRES] as Array<ICard>).some(
    (card: ICard) => card.type === selectedExtresCardToPlay.value?.type
  )
}

function addUser(name: string) {
  socket.emit('addUser', name)
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

async function setCode(code: string) {
  isUserValid.value = code === 'Pl4nt4'
  if (!(code === 'Pl4nt4')) {
    errorNotValid.value = '¡El codigo no es valido!'
  }
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
  gameEndedMessage.value =
    socketId.value === winnerSocketId
      ? 'El juego ha terminado, HAS GANADO!!!!'
      : 'El juego ha terminado, has perdido. El ganador ha sido ' +
        game.value.players.find((player: IPlayer) => player.socketId === winnerSocketId).name
})
</script>

<template>
  <main>
    <div v-if="!gameEnded">
      <!-- Error =========-->
      <p v-if="error">{{ error }}</p>
      <!-- Initial Panel =========-->
      <InitialPanel
        v-if="!error"
        :nameConnected="nameConnected"
        :gameState="game.state"
        :isUserValid="isUserValid"
        :errorNotValid="errorNotValid"
        @addUser="addUser"
        @setCode="setCode"
      ></InitialPanel>
      <!--======== Players-other =========-->
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
            :class="{
              'player-cards--selecting': isSelectionActiveChoosePlayer,
              'player-cards--disabled':
                isSelectionActiveChoosePlayer && !isExtresSettableOnPlayer(player)
            }"
            @click="selectPlayer(player)"
          >
            {{ player.name }}
          </h1>
          <Crop
            v-if="player?.crop && game.state !== StateEnum.WAITING"
            :playerCrop="player.crop"
            :gameState="game.state"
          ></Crop>
        </div>
      </div>
      <!--========Player =========-->
      <div class="player">
        <PlayerControls
          v-if="nameConnected && game.state === StateEnum.STARTED"
          :isSelectionActiveToDiscard="isSelectionActiveToDiscard"
          :isSelectionActiveToPlay="isSelectionActiveToPlay"
          :isSelectionActiveChoosePlayer="isSelectionActiveChoosePlayer"
          :isSelectionCardFromWildcard="isSelectionCardFromWildcard"
          :selectedCardsToDiscard="selectedCardsToDiscard"
          :gameState="game.state"
          :nameConnected="nameConnected"
          :userActive="game.userActive"
          :socketId="socketId"
          @disscard="disscard"
          @playCard="playCard"
          @cancel="cancel"
          @sendDisscards="sendDisscards"
        ></PlayerControls>
        <PlayerCards
          :playerCards="playerCards"
          :isSelectionActiveToDiscard="isSelectionActiveToDiscard"
          :isSelectionActiveToPlay="isSelectionActiveToPlay"
          :selectedCardsToDiscard="selectedCardsToDiscard"
          :playerCrop="playerCrop"
          @selectCard="selectCard"
        ></PlayerCards>
        <Crop :playerCrop="playerCrop" :gameState="game.state"></Crop>
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
    <GameEndedPanel v-if="gameEnded" :gameEndedMessage="gameEndedMessage"></GameEndedPanel>
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
</style>
