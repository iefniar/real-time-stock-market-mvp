<script setup lang="ts">
import NavBarMobile from './NavBarMobile.vue'
</script>

<template>
  <div
    class="flex flex-col bg-primary-content p-4 mt-18 pb-56 relative overflow-hidden min-h-screen"
  >
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
  <NavBarMobile />
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 250ms ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(200px);
}

.page-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-200px);
}

/* Prevent layout shifts while the old page is leaving */
.page-leave-active {
  position: absolute;
  inset: 0;
  width: 100%;
}
</style>
