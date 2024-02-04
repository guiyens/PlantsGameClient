<script setup lang="ts">
import type { ILog } from '@/Infertaces/ILog'
import { EGroup, type ICard } from '@/Infertaces/ICard'

const props = defineProps({
  logs: Array<ILog>,
  playerName: String
})

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
</script>

<template>
  <section class="log__container">
    <h4 class="log__title">Acciones de {{ playerName }}</h4>
    <ul class="log__actions">
      <li class="log__action">
        <span>Esperando acciones de {{ playerName }}...</span>
      </li>
      <li class="log__action" v-for="(log, index) in logs" :key="index">
        <span v-html="buildStringAction(log)"></span>
      </li>
    </ul>
  </section>
</template>

<style>
.log__container {
  height: calc(100% - 496px);
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  overflow-y: hidden;
  @media (min-width: 768px) {
    position: static;
    height: 600px;
    bottom: auto;
    border: 1px solid #ddd;
  }
}
.log__title {
  font-size: 16px;
  font-weight: 500;
  padding: 6px 20px;
  text-align: center;
  background: #fff;
  @media (min-width: 768px) {
    display: block;
    font-weight: 400;
    font-size: 24px;
    text-align: center;
    padding: 10px;
    line-height: 20px;
    color: rgb(51, 51, 51);
  }
}
.log__actions {
  padding: 10px 20px;
  height: calc(100vh - 535px);
  overflow-y: auto;
  @media (min-width: 768px) {
    height: 580px;
    background-color: rgba(255, 255, 255, 0.6);
  }
}
.log__action {
  font-size: 13px;
  list-style: none;
  @media (min-width: 768px) {
    color: rgb(51, 51, 51);
  }
}

.log__action strong {
  font-weight: 600;
}
</style>
