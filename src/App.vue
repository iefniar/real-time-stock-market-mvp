<script setup lang="ts">
import LayoutMobile from '@/components/Layout/Mobile/LayoutMobile.vue'
import LayoutDesktop from '@/components/Layout/Desktop/LayoutDesktop.vue'
</script>

<template>
  <div class="block sm:hidden">
    <LayoutMobile />
  </div>
  <div class="hidden sm:block">
    <LayoutDesktop />
  </div>
</template>
