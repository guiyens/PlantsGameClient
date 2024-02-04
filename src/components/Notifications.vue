<script setup lang="ts">
const props = defineProps({
  lastActions: Array<string>
})
</script>

<template>
  <ul class="notifications">
    <li class="notification" v-for="(action, index) in lastActions" :key="index">
      <span v-html="action"></span>
      <span class="notification__close" @click="$emit('closeNotifications')">x</span>
    </li>
  </ul>
</template>

<style>
.notifications {
  position: absolute;
  top: 50px;
  left: 6%;
  width: 88%;
  padding-left: 0;
  z-index: 200;
  @media (min-width: 768px) {
    width: 300px;
    top: 20px;
    left: auto;
    right: 0;
  }
}
.notification {
  padding: 8px 20px;
  background-color: #a3e3ff;
  color: #3e3e3e;
  font-size: 14px;
  margin-bottom: 10px;
  list-style: none;
  text-align: left;
  animation: fadeOut ease 1s;
  animation-fill-mode: forwards;
  animation-delay: 3s;
  position: relative;
  font-weight: 300px;
}
.notification strong {
  font-weight: 600;
}
.notification__close {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-weight: 500;
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
