<script setup lang="ts">
import CountdownBase from '@/views/CountdownBase.vue'
</script>

<template>
  <main class="app">
    <CountdownBase />
  </main>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}

.app {
  height: 100dvh;
  width: 100dvw;
  box-sizing: border-box;
}
</style>