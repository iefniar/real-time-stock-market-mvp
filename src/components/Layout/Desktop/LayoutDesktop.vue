<script setup lang="ts">
import NavBarDesktop from './NavBarDesktop.vue';
</script>

<template>
    <div class="w-48 fixed top-0 left-0 h-screen bg-primary-content border-r-2 border-r-secondary">
      <NavBarDesktop />
    </div>
    <div class="ml-48 px-4 py-6 bg-primary-content">
      <router-view></router-view>
    </div>

</template>
