<script setup lang="ts">
import NavBarMobile from './NavBarMobile.vue'
</script>

<template>
  <div class="flex flex-col bg-primary-content p-4 mt-18 mb-28">
    <router-view></router-view>
  </div>
  <NavBarMobile />
</template>
