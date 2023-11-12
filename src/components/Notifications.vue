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
}
.notification {
  padding: 5px 20px 5px 10px;
  background-color: rgb(199, 242, 208);
  border: 1px solid rgb(77, 236, 111);
  color: #333;
  font-size: 16px;
  margin-bottom: 10px;
  border-radius: 5px;
  list-style: none;
  text-align: center;
  animation: fadeOut ease 1s;
  animation-fill-mode: forwards;
  animation-delay: 3s;
  position: relative;
}
.notification__close {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-weight: 700;
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
