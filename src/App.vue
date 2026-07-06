<script setup lang="ts">
import LayoutMobile from '@/components/Layout/Mobile/LayoutMobile.vue'
import LayoutDesktop from '@/components/Layout/Desktop/LayoutDesktop.vue'
</script>

<template>
  <div class="min-h-dvh bg-primary-content block sm:hidden">
    <LayoutMobile />
  </div>
  <div class="hidden sm:block sm:min-h-dvh sm:bg-primary-content">
    <LayoutDesktop />
  </div>
</template>
