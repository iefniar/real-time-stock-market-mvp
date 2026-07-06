<template>
  <div
    class="relative overflow-hidden flex flex-col w-[80vw] sm:w-[50vw] md:w-[30vw] gap-[20vw] md:gap-24 py-2 px-3 bg-neutral/50 rounded-2xl border-neutral-content border"
  >
    <div
      class="absolute inset-0 opacity-[0.1] dark:opacity-[0.1]"
      :style="patternStyle"
    ></div>
    <div class="flex items-center gap-1 text-secondary/75 text-xs">
      <component :is="icon" class="size-3" />
      <div>
        {{ label }}
      </div>
    </div>
    <div class="text-info-content text-sm text-end">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component
  label: string
  value: string
}>()

const patternStyle = {
  backgroundImage: `
    repeating-linear-gradient(
      45deg,

      #3b82f6 0px,
      #3b82f6 1px,
      rgba(59,130,246,0) 1px,
      rgba(59,130,246,0) 10px,

      #8b5cf6 10px,
      #8b5cf6 11px,
      rgba(139,92,246,0) 11px,
      rgba(139,92,246,0) 20px,

      #ec4899 20px,
      #ec4899 21px,
      rgba(236,72,153,0) 21px,
      rgba(236,72,153,0) 30px
    )
  `,
  backgroundSize: '7px 7px'
}
</script>
